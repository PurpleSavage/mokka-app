"use client";

import { useState } from "react";
import AudiosHistory from "@/modules/audio/view/components/AudiosHistory";
import VoiceSettings from "@/modules/audio/view/components/VoiceSettings";
import VoiceGenerated from "@/modules/audio/view/components/VoiceGenerated";

export default function AudioGeneratorPage() {
  const [previewPrompt, setPreviewPrompt] = useState("");

  return (
    <div className="h-full flex flex-col gap-2">
      <div className="grow min-h-0">
        <VoiceGenerated prompt={previewPrompt} />
      </div>
      <VoiceSettings onPreviewChange={(prompt) => setPreviewPrompt(prompt)} />
      <AudiosHistory />
    </div>
  );
}
