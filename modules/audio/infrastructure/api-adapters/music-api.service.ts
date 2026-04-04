import { HttpClientPort } from "@/modules/shared/common/application/ports/http-client.port";
import { MusicApiPort } from "../../application/api-ports/music-api.port";
import { MusicEntity } from "../../domain/entities/music.entity";

import { ResponseHttpQueue } from "@/modules/shared/common/application/dtos/responses/response-http-queue.dto";
import { FullMusicDto } from "../../application/dtos/requests/generate-music.dto";

export class MusicApiService implements MusicApiPort {
  constructor(private readonly httpService: HttpClientPort) {}
  async generateMusic(dto: FullMusicDto): Promise<ResponseHttpQueue> {
    const response = await this.httpService.post<ResponseHttpQueue>(
      `/v1/music/write/generations`,
      dto,
    );
    console.log("generador de musica respuesta", response);
    return response;
  }
  async listMusicHistory(userId: string): Promise<MusicEntity[]> {
    const response = await this.httpService.get<MusicEntity[]>(
      `/v1/music/read/musics/${userId}`,
    );
    return response;
  }
}
