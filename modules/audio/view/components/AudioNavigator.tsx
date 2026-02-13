'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function AudioNavigator() {
  const pathname = usePathname()
  const isActive = (path: string) => pathname === path
  return (
    <ul className=" py-4 flex items-center gap-4">
        <li>
          <Link 
            href="/mokka/mokka-panel/audio" 
            className={`${isActive("/mokka/mokka-panel/audio") ? "underline underline-offset-8":""}`}
          >Audio generator</Link>
        </li>
        <li>
          <Link 
            href="/mokka/mokka-panel/audio/music" 
            className={`${isActive("/mokka/mokka-panel/audio/music")? "underline underline-offset-8":""}`}
          >Music generator</Link>
        </li>
    </ul>
  )
}
