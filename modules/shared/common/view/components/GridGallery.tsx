import { ReactNode } from "react"

interface GridGalleryProps{
    columns:number,
    children:ReactNode
}

export default function GridGallery({columns,children}:GridGalleryProps) {
  return (
    <div 
        className={`grid gap-2`}
        style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
    >{children}</div>
  )
}
