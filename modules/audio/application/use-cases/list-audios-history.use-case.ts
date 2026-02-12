import { AudioApiPort } from "../api-ports/audio-api.port";

export class ListAudiosHistory{
    constructor(private readonly audioService:AudioApiPort){}
    execute(userId:string){
        return this.audioService.listAudioHistory(userId)
    }
}
