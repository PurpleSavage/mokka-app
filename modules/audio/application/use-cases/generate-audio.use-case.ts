import { AudioApiPort } from "../api-ports/audio-api.port";
import { FullAudioDto} from "../dtos/requests/generate-audio.dto";

export class GenerateAudioUseCase{
    constructor(private readonly audioService:AudioApiPort){}
    execute(dto: FullAudioDto){
        return this.audioService.generateAudio(dto)
    }
}