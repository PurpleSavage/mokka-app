'use client'
import { useHistoryTexts } from "../custom-hooks/useHistoryTexts"
import { FaHistory } from "react-icons/fa";
import TextRowRenderWrapper from "./TextRowRenderWrapper";
import { useSelector } from "react-redux";
import { RootState } from "@/store/boundStore";
import ModalLookDataWrapper, { ModalsId } from "@/modules/shared/common/view/wrappers/ModalLookDataWrapper";
import TextData from "./TextData";

const cols = "grid-cols-[2fr_2fr_1fr_1fr_1fr_1fr_100px_60px]"
export default function HistoryTexts() {
  const {isPending,error,textHistory}=useHistoryTexts()
  const textDataToView = useSelector((state:RootState)=>state.text.textDataToView)
    
  return (
    <div className="mt-8 space-y-5">
      <div className="flex items-center gap-2">
        <FaHistory size={25} color="white" />
        <p className="text-2xl font-medium text-white">Text history</p>
      </div>
      <ModalLookDataWrapper 
        size="max-w-[60%]" 
        modalId={ModalsId.TEXT_VIEW}
      >
        {textDataToView && <TextData text={textDataToView}/>}
      </ModalLookDataWrapper>
      <div className="rounded-xl overflow-hidden border border-table-bg/50">
        {/* Header */}
        <div className={`grid ${cols} gap-4 px-4 py-3 bg-table-bg`}>
          {["Title", "Generated Text", "Promotion", "Tone", "Length", "Format", "Date", ""].map((h) => (
              <p key={h} className="text-xs font-semibold text-slate-400 uppercase tracking-wider text-center first:text-left">
                  {h}
              </p>
          ))}
        </div>

        {/* Rows */}
        <TextRowRenderWrapper
          isPending={isPending}
          error={error}
          textHistory={textHistory}
          cols={cols}
        />
      </div>
    </div>
  )
}
