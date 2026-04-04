"use client";

import { RootState } from "@/store/boundStore";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { audioDi } from "../../di/audio-container.di";
import { setAudioHistory } from "../../audio-slice/audio-store.slice";
import HistoryAudiosSkeleton from "../skeletons/HistoryAudiosSkeleton";
import { AxiosError } from "axios";
import AudioVisualizer from "./AudioVisualizer";
import { AudioEntity } from "../../domain/entities/audio.entity";
import { DateFormatter } from "@/modules/shared/common/view/utils/date-formatter.util";
import { RiDownloadLine } from "react-icons/ri";
import { openModalWrapper } from "@/modules/shared/common/common-slice/modals-slice.store";
import ModalLookDataWrapper, {
  ModalsId,
} from "@/modules/shared/common/view/wrappers/ModalLookDataWrapper";
import AudioData from "./AudioData";
import { BsEye } from "react-icons/bs";
import { downloadAudio, HistoryType } from "../utils/helpers/download-audio";
import { useQuery } from "@/modules/shared/common/view/custom-hooks/useQuery";

interface HistoryProps {
  historyType?: HistoryType;
  title?: string;
  emptyMessage?: string;
}
function resolveHistoryType(audio: AudioEntity): HistoryType {
  const rawType = String(
    (
      audio as AudioEntity & {
        type?: string;
        audioType?: string;
        generationType?: string;
        kind?: string;
        category?: string;
      }
    ).type ??
      (audio as AudioEntity & { audioType?: string }).audioType ??
      (audio as AudioEntity & { generationType?: string }).generationType ??
      (audio as AudioEntity & { kind?: string }).kind ??
      (audio as AudioEntity & { category?: string }).category ??
      "",
  ).toLowerCase();

  return rawType.includes("music") ? "music" : "audio";
}

export default function History({
  historyType = "audio",
  title,
  emptyMessage,
}: HistoryProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [selectedAudio, setSelectedAudio] = useState<AudioEntity | null>(null);

  const audioHistory = useSelector(
    (state: RootState) => state.audio.audioHistory,
  );
  const session = useSelector((state: RootState) => state.auth.session);
  const dispatch = useDispatch();

  const { data, error, isPending } = useQuery<AudioEntity[]>({
    fn: () => audioDi.listAudioHistory(session!.user.id),
    dispatchStoreCache: (data: AudioEntity[]) =>
      dispatch(setAudioHistory(data)),
    revalidate: audioHistory.length === 0,
    selector: () => audioHistory,
  });

  const filteredHistory = useMemo(
    () => (data ?? []).filter((audio) => resolveHistoryType(audio) === historyType),
    [data, historyType],
  );

  const handleDownloadAudio = async (audio: AudioEntity) => {
    try {
      setIsDownloading(true);
      await downloadAudio({ audio, historyType });
    } catch (downloadError) {
      console.error("Download error:", downloadError);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleOpenPromptModal = (audio: AudioEntity) => {
    setSelectedAudio(audio);
    dispatch(
      openModalWrapper({
        title: "Audio details",
        modalId: ModalsId.AUDIO_VIEW,
      }),
    );
  };

  if (isPending) {
    return <HistoryAudiosSkeleton size={5} />;
  }

  if (error) {
    return <p className="text-gray-400 text-md">{error}</p>;
  }
  return (
    <div className="mt-6 border border-slate-700/50 rounded-lg bg-[#0f0f0f] p-4">
      <h3 className="text-white text-lg font-semibold mb-3">
        {title ?? (historyType === "music" ? "Music history" : "Audio history")}
      </h3>
      <ModalLookDataWrapper size="max-w-3xl" modalId={ModalsId.AUDIO_VIEW}>
        {selectedAudio && (
          <AudioData audio={selectedAudio} historyType={historyType} />
        )}
      </ModalLookDataWrapper>
      {filteredHistory.length === 0 ? (
        <p className="text-gray-400 text-sm font-medium">
          {emptyMessage ??
            (historyType === "music"
              ? "You don't have a music history yet."
              : "You don't have an audio history yet.")}
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border-separate border-spacing-y-2">
            <thead>
              <tr className="bg-table-head-bg text-center text-white">
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Type</th>
                <th className="px-4 py-2">Model</th>
                <th className="px-4 py-2">Prompt</th>
                <th className="px-4 py-2 min-w-60">Audio</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {filteredHistory.map((audio) => (
                <tr
                  key={audio.id}
                  className="bg-table-body-bg text-white hover:bg-table-body-hover-bg"
                >
                  <td className="px-4 py-3 text-sm whitespace-nowrap">
                    {DateFormatter.formatShort(audio.createDate)}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <span className="rounded-full px-3 py-1 bg-purple-100 text-purple-800 capitalize">
                      {resolveHistoryType(audio)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">{audio.nameModelAudio}</td>
                  <td className="px-4 py-3 text-sm max-w-65">
                    <p className="truncate">{audio.prompt}</p>
                  </td>
                  <td className="px-4 py-3">
                    <AudioVisualizer
                      url={audio.urlAudio}
                      height={34}
                      showSkeleton={true}
                      showControls={true}
                      exclusiveGroup={`${historyType}-history-table`}
                      className="p-2"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleDownloadAudio(audio)}
                        disabled={isDownloading}
                        className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-default-text hover:text-button-hover-bg transition-colors rounded-md"
                        aria-label={`Download ${resolveHistoryType(audio)} generated on ${DateFormatter.formatShort(audio.createDate)}`}
                      >
                        <RiDownloadLine size={16} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleOpenPromptModal(audio)}
                        className="cursor-pointer transition-colors hover:text-button-hover-bg"
                        title="Click to view full prompt"
                      >
                        <BsEye size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
