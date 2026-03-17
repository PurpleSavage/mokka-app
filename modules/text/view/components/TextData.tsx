import { DateFormatter } from "@/modules/shared/common/view/utils/date-formatter.util"
import { colorsFormat, colorsLength, colorsPromoting, colorsTone } from "../../constants/text-generator-options"
import { TextEntity } from "../../domain/entities/text.entity"

interface TextDataProps{
  text:TextEntity
}
export default function TextData({ text }: TextDataProps) {
  const badges = [
    { label: text.promotionType, colors: colorsPromoting.get(text.promotionType) },
    { label: text.toneType, colors: colorsTone.get(text.toneType) },
    { label: text.textLength, colors: colorsLength.get(text.textLength) },
    { label: text.textFormat, colors: colorsFormat.get(text.textFormat) },
  ]

  return (
    <div className="space-y-5">
      {/* Title + date */}
      <div className="flex items-start justify-between gap-4">
        <h2 className="text-xl font-bold text-white leading-tight">{text.title}</h2>
        <p className="text-xs text-slate-500 whitespace-nowrap mt-1">
          {DateFormatter.formatShort(text.createDate)}
        </p>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-2">
        {badges.map(({ label, colors }) => (
          <span key={label} className={`text-xs px-3 py-1 rounded-full font-medium ${colors?.bg} ${colors?.text}`}>
            {label}
          </span>
        ))}
      </div>

      {/* Context */}
      <div className="space-y-1">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Context</p>
        <p className="text-sm text-slate-300 leading-relaxed">{text.context}</p>
      </div>

      {/* Improved context */}
      <div className="space-y-1">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Improved context</p>
        <div className="rounded-lg bg-white/5 border border-white/10 p-3">
          <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">{text.improvedContext}</p>
        </div>
      </div>
    </div>
  )
}