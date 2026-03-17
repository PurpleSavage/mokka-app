import { TextEntity } from "../../domain/entities/text.entity"
import HistoryTextsSkeleton from "../skeletons/HistoryTextsSkeleton"
import TextCard from "./TextCard"

interface TextRowRenderWrapperProps{
    isPending:boolean
    error:string,
    textHistory: TextEntity[]
    cols: string
}

export default function TextRowRenderWrapper({isPending,error,textHistory,cols}:TextRowRenderWrapperProps) {

  if (isPending) return <div className="bg-slate-900/60"><HistoryTextsSkeleton size={4} /></div>

  if (error) return <p className="text-gray-400 text-sm p-4">{error}</p>

  if (textHistory.length === 0)  return <p className="text-gray-400 text-sm p-4">You don&apos;t have any generated texts yet</p>

  return (
    <div className="bg-table-bg/60 divide-y divide-table-bg/40">
      {textHistory.map((text) => (
        <TextCard key={text.id} text={text} cols={cols} />
      ))}
    </div>
  )
}
