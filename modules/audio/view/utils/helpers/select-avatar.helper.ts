
import { audioAvatars } from "../../constants/avatars"

export const selectAvatar =(idModel:string)=>{
    const audio = audioAvatars.find((audio)=>audio.idSample===idModel)
    return audio?.urlImage
}