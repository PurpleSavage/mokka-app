"use client";

import { useMemo, useState } from "react";
import { audioModels } from "../constants/audio-samples";

/**
 * Custom hook to manage the state and logic for auditing voice samples.
 * Handles search filtering functionality.
 */
export function useVoiceSamples() {
  const [searchName, setSearchName] = useState("");

  const filteredAudioModels = useMemo(
    () =>
      audioModels.filter((audio) =>
        audio.name.toLowerCase().includes(searchName.toLowerCase()),
      ),
    [searchName],
  );

  return {
    searchName,
    setSearchName,
    filteredAudioModels,
  };
}
