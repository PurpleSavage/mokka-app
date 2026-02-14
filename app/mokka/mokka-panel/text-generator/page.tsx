'use client'
import HistoryTexts from "@/modules/text/view/components/HistoryTexts"
import TextGenerator from "@/modules/text/view/components/TextGenerator"



export default function TextGeneratorPage() {
   
  return (
    <div className="p-5 overflow-y-auto  h-screen custom-scrollbar">
      <TextGenerator/>
      <HistoryTexts/>
    </div>
  )
}
