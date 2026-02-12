export interface GenerateAudioDto{
    idModel:string,
    prompt:string,
    idUser:string,
    nameModelAudio:string,
    speed:number,
    stability:number,
    similarity:number,
    exaggeration:number,
    useSpeakerBoost:boolean   
}