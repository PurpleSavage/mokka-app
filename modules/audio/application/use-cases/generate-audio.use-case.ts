import { AudioApiPort } from "../api-ports/audio-api.port";
import { GenerateAudioDto } from "../dtos/requests/generate-audio.dto";

export class GenerateAudioUseCase{
    constructor(private readonly audioService:AudioApiPort){}
    execute(dto: GenerateAudioDto){
        return this.audioService.generateAudio(dto)
    }
}