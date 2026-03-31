type GenreOption =
  | "Pop"
  | "Rock"
  | "Hip-Hop"
  | "Electronic"
  | "Ambient"
  | "Lo-fi"
  | "Cinematic"
  | "Reggaeton"
  | "Other";
type DurationOption = "15s" | "30s" | "60s" | "120s";
type LyricsOption = "Auto" | "Custom" | "Instrumental";
type DurationMapping = Record<string, number>;

const GENRE_OPTIONS: GenreOption[] = [
  "Pop",
  "Rock",
  "Hip-Hop",
  "Electronic",
  "Ambient",
  "Lo-fi",
  "Cinematic",
  "Reggaeton",
  "Other",
];

const DURATION_OPTIONS: DurationOption[] = ["15s", "30s", "60s", "120s"];

const LYRICS_OPTIONS: LyricsOption[] = ["Auto", "Custom", "Instrumental"];

const DURATION_MAPPING: DurationMapping = {
  "15s": 15000,
  "30s": 30000,
  "60s": 60000,
  "120s": 120000,
};

export { GENRE_OPTIONS, DURATION_OPTIONS, LYRICS_OPTIONS, DURATION_MAPPING };
