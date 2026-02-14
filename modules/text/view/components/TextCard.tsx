
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { useDispatch } from "react-redux";
import { TextEntity } from "../../domain/entities/text.entity";
import { lookTextData } from "../../text-slice/text-store.slice";
import { colorsFormat, colorsLength, colorsPromoting, colorsTone } from "../../constants/text-generator-options";

export interface TextCardProps{
    text:TextEntity
}
function TextCard({text}:TextCardProps) {
    const dispatch = useDispatch()
    const onClickOpenTextDataModal =()=>{
        document.body.style.overflow = "hidden"

        dispatch(lookTextData(text))
        // dispatch(animateModal({
        //     isOpen:true
        // }))
    }
  return (
    <div key={text.id} className="grid gap-2 grid-cols-[repeat(5,1fr)_10%] py-2 border-b border-slate-600/50 ">
        <div className="flex items-center">
            <p className="text-base text-white">{text.title}</p>
        </div>
        <div className="flex items-center justify-center">
            <p className={`text-base ${colorsPromoting.get(text.promotionType)?.bg} 
             ${colorsPromoting.get(text.promotionType)?.text} px-2 rounded-lg `}>{text.promotionType}</p>
        </div>
        <div className="flex items-center justify-center">
            <p className={`text-base px-2 rounded-lg
                ${colorsTone.get(text.toneType)?.text} ${colorsTone.get(text.toneType)?.bg}`}
            >{text.toneType}</p>
        </div>
        <div className="flex items-center justify-center">
            <p className={`text-base px-2 rounded-lg
                ${colorsLength.get(text.textLength)?.text} ${colorsLength.get(text.textLength)?.bg}`}
            >{text.textLength}</p>
        </div>
        <div className="flex items-center justify-center">
            <p className={`text-base px-2 rounded-lg
                ${colorsFormat.get(text.textFormat)?.text} ${colorsFormat.get(text.textFormat)?.bg}`}
            >{text.textFormat}</p>
        </div>
        <div className="flex items-center justify-center">
            <button className="cursor-pointer text-white hover:text-gray-500"
            onClick={()=>onClickOpenTextDataModal()}
            ><MdOutlineRemoveRedEye size={18}/></button>
        </div>
    </div>
  )
}

export default TextCard