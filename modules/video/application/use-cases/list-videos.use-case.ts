import { VideoPort } from "../ports/video.port";

export class ListVideosUseCase{
    constructor(private readonly videoService:VideoPort){}
    execute(user:string){
        return this.videoService.listVideos(user)
    }
}