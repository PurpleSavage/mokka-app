import { AudioEntity } from "@/modules/audio/domain/entities/audio.entity";

export type HistoryType = "audio" | "music";

export function getDownloadFileName(
  audio: AudioEntity,
  historyType: HistoryType,
) {
  const parsedDate = new Date(audio.createDate);
  const safeDate = Number.isNaN(parsedDate.getTime())
    ? "audio"
    : parsedDate.toISOString().replace(/[:.]/g, "-");

  return `${historyType}-${safeDate}.mp3`;
}

interface DownloadAudioOptions {
  audio: AudioEntity;
  historyType: HistoryType;
}

export async function downloadAudio({
  audio,
  historyType,
}: DownloadAudioOptions) {
  const fileName = getDownloadFileName(audio, historyType);

  const response = await fetch(audio.urlAudio);

  if (!response.ok) {
    throw new Error(`Download failed with status ${response.status}`);
  }

  const audioBlob = await response.blob();
  const objectUrl = URL.createObjectURL(audioBlob);

  const link = document.createElement("a");
  link.href = objectUrl;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(objectUrl);
}