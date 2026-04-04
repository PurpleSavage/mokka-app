export interface MusicEntity {
  id: string;
  prompt: string;
  songUrl: string;
  createDate: Date;
  bpm: number;
  genreMusic: string;
  durationMs: number;
}
