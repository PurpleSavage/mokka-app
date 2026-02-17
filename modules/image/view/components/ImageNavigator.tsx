
'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
export default function ImageNavigator() {
  const pathname = usePathname()
      const isActive = (path: string) => pathname === path
    return (
      <ul className=" py-4 flex items-center gap-4">
          <li>
            <Link 
              href="/mokka/mokka-panel/images" 
              className={`${isActive("/mokka/mokka-panel/images") ? "underline underline-offset-8":""}`}
            >Image generator</Link>
          </li>
          <li>
            <Link 
              href="/mokka/mokka-panel/images/gallery" 
              className={`${isActive("/mokka/mokka-panel/images/gallery")? "underline underline-offset-8":""}`}
            >Gallery</Link>
          </li>
      </ul>
    )
}
