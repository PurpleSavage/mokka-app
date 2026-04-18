import { ReactNode } from "react"

interface RowProps{
    children: ReactNode,
    label:string
}
export default function Row({children,label}:RowProps) {
  return (
    <div className="flex items-center justify-between py-1.5 gap-2">
      <span className="text-sm">{label}</span>
      {children}
    </div>
  )
}
