"use client";

import { usePathname } from "next/navigation";

type HeaderCopy = {
  title: string;
  description: string;
};

function resolveHeaderCopy(pathname: string): HeaderCopy {
  if (pathname.startsWith("/mokka/mokka-panel/audio/voices")) {
    return {
      title: "Voices library",
      description:
        "Explore and preview the voices available for your text. Choose a voice, check out its style, and then use it in the audio generator.",
    };
  }

  if (pathname.startsWith("/mokka/mokka-panel/audio/music")) {
    return {
      title: "Music generator",
      description:
        "Create music from text. Describe genre, energy and instruments, generate the result and review your history to re-download each track.",
    };
  }

  if (pathname.startsWith("/mokka/mokka-panel/audio/editor")) {
    return {
      title: "Audio editor",
      description:
        "Fine-tune your generated audio in one place. Preview the waveform, adjust editing controls, and export your final version.",
    };
  }

  return {
    title: "Audio generator",
    description:
      "Generate audio clips from a prompt and a selected voice. Configure the model and parameters, create the audio, and save it from the history when you like the result.",
  };
}

export default function AudioHeader() {
  const pathname = usePathname();
  const copy = resolveHeaderCopy(pathname);

  return (
    <header className="rounded-lg py-3">
      <h1 className="text-white text-2xl font-semibold">{copy.title}</h1>
      <p className="text-slate-300 text-sm mt-1">{copy.description}</p>
    </header>
  );
}
