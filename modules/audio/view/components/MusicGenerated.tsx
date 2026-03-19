"use client";

interface MusicGeneratedProps {
  prompt: string;
  genre: string;
}

export default function MusicGenerated({ prompt, genre }: MusicGeneratedProps) {
  const hasPrompt = prompt.trim().length > 0;

  return (
    <section
      className="h-full flex flex-col rounded-lg p-6 bg-radial-[at_25%_25%] from-black to-pink-900 to-75%"
    >
      <div className="flex items-center justify-between gap-2">
        <p className="text-white/75 text-sm">Live preview</p>
        <span className="rounded-full px-3 py-1 text-xs font-medium bg-white/15 text-white capitalize">
          {genre || "No genre"}
        </span>
      </div>

      <div className="flex-1 flex items-center justify-center px-4 text-center">
        <p className="text-4xl font-bold italic text-white/95 leading-tight">
          {hasPrompt ? prompt : "Write a prompt to generate music"}
        </p>
      </div>
    </section>
  );
}
