import { ReactNode } from "react"

interface TooltipComponentProps{
    children:ReactNode,
    text:string
}
export default function TooltipComponent({text,children}:TooltipComponentProps) {
  return (
    <div className="relative group inline-block">
            {children}
        <span className="
          absolute top-full left-1/2 -translate-x-1/2 mt-1     
                bg-table-head-bg text-white text-xs px-2 py-1 rounded
                whitespace-nowrap pointer-events-none
                opacity-0 scale-90
                group-hover:opacity-100 group-hover:scale-100
                transition-all duration-200
        ">
                {text}
        </span>
    </div>
  )
}
