function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function writeAscii(view: DataView, offset: number, text: string) {
  for (let index = 0; index < text.length; index += 1) {
    view.setUint8(offset + index, text.charCodeAt(index));
  }
}

function audioBufferToWavBlob(audioBuffer: AudioBuffer): Blob {
  const numberOfChannels = audioBuffer.numberOfChannels;
  const sampleRate = audioBuffer.sampleRate;
  const bitDepth = 16;
  const bytesPerSample = bitDepth / 8;
  const blockAlign = numberOfChannels * bytesPerSample;
  const frameCount = audioBuffer.length;
  const dataSize = frameCount * blockAlign;
  const buffer = new ArrayBuffer(44 + dataSize);
  const view = new DataView(buffer);

  writeAscii(view, 0, "RIFF");
  view.setUint32(4, 36 + dataSize, true);
  writeAscii(view, 8, "WAVE");
  writeAscii(view, 12, "fmt ");
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, numberOfChannels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * blockAlign, true);
  view.setUint16(32, blockAlign, true);
  view.setUint16(34, bitDepth, true);
  writeAscii(view, 36, "data");
  view.setUint32(40, dataSize, true);

  let offset = 44;
  for (let frameIndex = 0; frameIndex < frameCount; frameIndex += 1) {
    for (
      let channelIndex = 0;
      channelIndex < numberOfChannels;
      channelIndex += 1
    ) {
      const channelData = audioBuffer.getChannelData(channelIndex);
      const sample = clamp(channelData[frameIndex], -1, 1);
      const pcmSample =
        sample < 0 ? Math.round(sample * 0x8000) : Math.round(sample * 0x7fff);
      view.setInt16(offset, pcmSample, true);
      offset += bytesPerSample;
    }
  }

  return new Blob([buffer], { type: "audio/wav" });
}

function downloadBlob(blob: Blob, fileName: string) {
  const objectUrl = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = objectUrl;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(objectUrl);
}

interface ExportEditedAudioOptions {
  url: string;
  startPercent: number;
  endPercent: number;
  fadeInPercent: number;
  fadeOutPercent: number;
  fileName?: string;
}

export async function exportEditedAudioAsWav({
  url,
  startPercent,
  endPercent,
  fadeInPercent,
  fadeOutPercent,
  fileName = `edited-audio-${Date.now()}.wav`,
}: ExportEditedAudioOptions) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Could not fetch audio. Status: ${response.status}`);
  }

  const sourceAudioData = await response.arrayBuffer();
  const decodeContext = new AudioContext();

  try {
    const decodedAudio = await decodeContext.decodeAudioData(sourceAudioData);

    const duration = decodedAudio.duration;
    if (!Number.isFinite(duration) || duration <= 0) {
      throw new Error("Invalid audio duration");
    }

    const clampedStartPercent = clamp(startPercent, 0, 99);
    const clampedEndPercent = clamp(endPercent, clampedStartPercent + 1, 100);

    const startSeconds = (duration * clampedStartPercent) / 100;
    const endSeconds = (duration * clampedEndPercent) / 100;
    const segmentDuration = Math.max(0.01, endSeconds - startSeconds);

    const sampleRate = decodedAudio.sampleRate;
    const frameCount = Math.ceil(segmentDuration * sampleRate);
    const offlineContext = new OfflineAudioContext(
      decodedAudio.numberOfChannels,
      frameCount,
      sampleRate,
    );

    const sourceNode = offlineContext.createBufferSource();
    sourceNode.buffer = decodedAudio;

    const gainNode = offlineContext.createGain();

    sourceNode.connect(gainNode);
    gainNode.connect(offlineContext.destination);

    const safeFadeInPercent = clamp(fadeInPercent, 0, 100);
    const safeFadeOutPercent = clamp(fadeOutPercent, 0, 100);

    const fadeInSeconds = segmentDuration * (safeFadeInPercent / 100);
    const fadeOutSeconds = segmentDuration * (safeFadeOutPercent / 100);

    gainNode.gain.setValueAtTime(1, 0);

    if (fadeInSeconds > 0) {
      gainNode.gain.setValueAtTime(0, 0);
      gainNode.gain.linearRampToValueAtTime(1, fadeInSeconds);
    }

    if (fadeOutSeconds > 0) {
      const fadeOutStart = Math.max(0, segmentDuration - fadeOutSeconds);
      gainNode.gain.setValueAtTime(1, fadeOutStart);
      gainNode.gain.linearRampToValueAtTime(0, segmentDuration);
    }

    sourceNode.start(0, startSeconds, segmentDuration);

    const renderedBuffer = await offlineContext.startRendering();
    const wavBlob = audioBufferToWavBlob(renderedBuffer);

    downloadBlob(wavBlob, fileName);
  } finally {
    await decodeContext.close();
  }
}
