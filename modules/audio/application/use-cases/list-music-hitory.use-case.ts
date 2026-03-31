import { MusicApiPort } from "../api-ports/music-api.port";

export class ListMusicHistory {
  constructor(private readonly musicService: MusicApiPort) {}
  execute(userId: string) {
    return this.musicService.listMusicHistory(userId);
  }
}
