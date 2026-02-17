import { RootState } from "@/store/boundStore"
import { useSelector } from "react-redux"

export const useIdSession =()=>{
    const id= useSelector((state:RootState)=>state.auth.idSession)
    return {id}
}