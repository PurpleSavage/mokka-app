import { TextEntity } from "../../domain/entities/text.entity"
import HistoryTextsSkeleton from "../skeletons/HistoryTextsSkeleton"
import TextCard from "./TextCard"

interface TextRowRenderWrapperProps{
    isPending:boolean
    error:string,
    textHistory: TextEntity[]
}

export default function TextRowRenderWrapper({isPending,error,textHistory}:TextRowRenderWrapperProps) {
    if(isPending){
            return <HistoryTextsSkeleton size={4}/>
        }
        if(error){
            return (
                <p className="text-gray-400 text-lg font-medium">{error}</p>
            )
        }
        if(textHistory.length===0){
            return (
                <p className="text-gray-400 text-lg font-medium">You don’t have any generated texts  yet</p>
            )
        }
  return (
    <div className="">
          {
           textHistory.map((text)=>(
                <TextCard key={text.id} text={text}/>
            ))
          }
    </div>
  )
}
