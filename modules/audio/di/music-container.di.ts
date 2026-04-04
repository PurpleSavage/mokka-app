import { MusicApiService } from "../infrastructure/api-adapters/music-api.service";
import { httpClient } from "@/modules/shared/common/infrastructure/adapters/http-service.adapter";
import { GenerateMusicUseCase } from "../application/use-cases/generate-music.use-case";
import { ListMusicHistory } from "../application/use-cases/list-music-hitory.use-case";
import { FullMusicDto } from "../application/dtos/requests/generate-music.dto";

const musicService = new MusicApiService(httpClient);
const useCases = {
  generateMusic: new GenerateMusicUseCase(musicService),
  listMusicHistory: new ListMusicHistory(musicService),
};
export const musicDi = {
  generateMusic: (dto: FullMusicDto) => useCases.generateMusic.execute(dto),
  listMusicHistory: (userId: string) =>
    useCases.listMusicHistory.execute(userId),
};
