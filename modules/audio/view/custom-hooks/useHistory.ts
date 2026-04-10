"use client";

import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/boundStore";
import { audioDi } from "../../di/audio-container.di";
import { setAudioHistory } from "../../audio-slice/audio-store.slice";
import { useQuery } from "@/modules/shared/common/view/custom-hooks/useQuery";
import { AudioEntity } from "../../domain/entities/audio.entity";
import { downloadAudio, HistoryType } from "../utils/helpers/download-audio";
import { openModalWrapper } from "@/modules/shared/common/common-slice/modals-slice.store";
import { ModalsId } from "@/modules/shared/common/view/wrappers/ModalLookDataWrapper";

interface UseHistoryProps {
  historyType: HistoryType;
}

/**
 * Custom hook to manage audio/music history logic.
 * Handles fetching, filtering, downloading, and modal management.
 */
export function useHistory({ historyType }: UseHistoryProps) {
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

  /**
   * Helper to determine if an audio entity is music or voice based on various possible fields.
   */
  const resolveHistoryType = (audio: AudioEntity): HistoryType => {
    const rawEntity = audio as AudioEntity & {
      type?: string;
      audioType?: string;
      generationType?: string;
      kind?: string;
      category?: string;
    };

    const rawType = String(
      rawEntity.type ??
        rawEntity.audioType ??
        rawEntity.generationType ??
        rawEntity.kind ??
        rawEntity.category ??
        "",
    ).toLowerCase();

    return rawType.includes("music") ? "music" : "audio";
  };

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

  return {
    filteredHistory,
    isPending,
    error,
    isDownloading,
    selectedAudio,
    handleDownloadAudio,
    handleOpenPromptModal,
    resolveHistoryType,
  };
}
