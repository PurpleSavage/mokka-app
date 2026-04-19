export class ObjectFileCache{
    decalFile:File | null = null 
    constructor(){}
    setDecalFile(data:File){
        this.decalFile=data
    }
    getDecalFile(){
        return this.decalFile
    }
}