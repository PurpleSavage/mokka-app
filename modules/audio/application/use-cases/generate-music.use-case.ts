import { MusicApiPort } from "../api-ports/music-api.port";
import { FullMusicDto } from "../dtos/requests/generate-music.dto";

export class GenerateMusicUseCase {
  constructor(private readonly musicService: MusicApiPort) {}
  execute(dto: FullMusicDto) {
    return this.musicService.generateMusic(dto);
  }
}
