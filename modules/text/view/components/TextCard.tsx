
import { useDispatch } from "react-redux";
import { TextEntity } from "../../domain/entities/text.entity";
import { lookTextData } from "../../text-slice/text-store.slice";
import { colorsFormat, colorsLength, colorsPromoting, colorsTone } from "../../constants/text-generator-options";
import { DateFormatter } from "@/modules/shared/common/view/utils/date-formatter.util";
import { PiEye } from "react-icons/pi";
import { openModalWrapper } from "@/modules/shared/common/common-slice/modals-slice.store";
import { ModalsId } from "@/modules/shared/common/view/wrappers/ModalLookDataWrapper";
export interface TextCardProps{
    text:TextEntity
    cols: string
}
export default function TextCard({ text, cols }: TextCardProps) {
  const dispatch = useDispatch()

  const onClickOpenTextDataModal = () => {
    document.body.style.overflow = "hidden"
    dispatch(lookTextData(text))
     dispatch(openModalWrapper({ title: text.title, modalId: ModalsId.TEXT_VIEW }))
  }
    return (
    <div className={`grid ${cols} gap-4 px-4 py-3 hover:bg-table-bg/40 transition-colors`}>
      
      <p className="text-sm text-white truncate flex items-center">{text.title}</p>

      <p className="text-sm text-slate-400 truncate flex items-center">{text.improvedContext}</p>

      <div className="flex items-center justify-center">
        <span className={`text-xs px-2 py-1 rounded-md font-medium ${colorsPromoting.get(text.promotionType)?.bg} ${colorsPromoting.get(text.promotionType)?.text}`}>
          {text.promotionType}
        </span>
      </div>

      <div className="flex items-center justify-center">
        <span className={`text-xs px-2 py-1 rounded-md font-medium ${colorsTone.get(text.toneType)?.bg} ${colorsTone.get(text.toneType)?.text}`}>
          {text.toneType}
        </span>
      </div>

      <div className="flex items-center justify-center">
        <span className={`text-xs px-2 py-1 rounded-md font-medium ${colorsLength.get(text.textLength)?.bg} ${colorsLength.get(text.textLength)?.text}`}>
          {text.textLength}
        </span>
      </div>

      <div className="flex items-center justify-center">
        <span className={`text-xs px-2 py-1 rounded-md font-medium ${colorsFormat.get(text.textFormat)?.bg} ${colorsFormat.get(text.textFormat)?.text}`}>
          {text.textFormat}
        </span>
      </div>

      <div className="flex items-center justify-center">
        <p className="text-xs text-slate-400">{DateFormatter.formatShort(text.createDate)}</p>
      </div>

      <div className="flex items-center justify-center">
        <button onClick={onClickOpenTextDataModal} className="text-slate-400 hover:text-white transition-colors cursor-pointer">
          <PiEye size={18} />
        </button>
      </div>

    </div>
  )
}