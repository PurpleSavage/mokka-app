import { ReactNode } from "react"

interface MasonryContainerProps{
    children:ReactNode
}

export default function MasonryContainer({children}:MasonryContainerProps) {
  return (
    <div className="columns-2 md:columns-3 lg:columns-4 gap-1 ">
        {children}
    </div>
  )
}
