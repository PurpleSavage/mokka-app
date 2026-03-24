"use client";

import { useState } from "react";
import MusicGenerated from "@/modules/audio/view/components/MusicGenerated";
import MusicHistory from "@/modules/audio/view/components/MusicHistory";
import MusicTextArea from "@/modules/audio/view/components/MusicTextArea";
import MusicGeneratingAnimatedList from "@/modules/audio/view/components/MusicGeneratingAnimatedList";

export default function MusicPage() {
  const [previewPrompt, setPreviewPrompt] = useState("");
  const [previewGenre, setPreviewGenre] = useState("");

  return (
    <div className="h-full flex flex-col gap-2">
      <div className="grow min-h-0">
        <MusicGeneratingAnimatedList/>
        {/* <MusicGenerated prompt={previewPrompt} genre={previewGenre} /> */}
      </div>
      <MusicTextArea
        onPreviewChange={({ prompt, genre }) => {
          setPreviewPrompt(prompt);
          setPreviewGenre(genre);
        }}
      />
      <MusicHistory />
    </div>
  );
}
