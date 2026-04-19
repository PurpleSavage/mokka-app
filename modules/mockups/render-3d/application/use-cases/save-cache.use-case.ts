import { ObjectFileCache } from "../../infrastructure/cache/Object-file-cache";

export class SaveFileCacheUseCase{
    constructor(private readonly fileCahe: ObjectFileCache){}

    execute(file:File){
        this.fileCahe.setDecalFile(file)
    }
}