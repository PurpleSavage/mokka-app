import { ResponseHttpQueue } from "@/modules/shared/common/application/dtos/responses/response-http-queue.dto";
import { MusicEntity } from "../../domain/entities/music.entity";
import { FullMusicDto } from "../dtos/requests/generate-music.dto";

export interface MusicApiPort {
  generateMusic(dto: FullMusicDto): Promise<ResponseHttpQueue>;
  listMusicHistory(userId: string): Promise<MusicEntity[]>;
}
