'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function CommunityNavigator() {
  const pathname = usePathname()
    const isActive = (path: string) => pathname === path
    return (
      <ul className=" py-4 flex items-center gap-4 px-4">
          <li>
            <Link 
              href="/mokka/mokka-panel/community" 
              className={`${isActive("/mokka/mokka-panel/community") ? "underline underline-offset-8":""}`}
            >Images</Link>
          </li>
          <li>
            <Link 
              href="/mokka/mokka-panel/community/community-influencers" 
              className={`${isActive("/mokka/mokka-panel/community/gallery")? "underline underline-offset-8":""}`}
            >Influencers</Link>
          </li>
          <li>
            <Link 
              href="/mokka/mokka-panel/community/community-scenes" 
              className={`${isActive("/mokka/mokka-panel/community/gallery")? "underline underline-offset-8":""}`}
            >Influencers</Link>
          </li>
          <li>
            <Link 
              href="/mokka/mokka-panel/community/community-videos" 
              className={`${isActive("/mokka/mokka-panel/community/gallery")? "underline underline-offset-8":""}`}
            >Influencers</Link>
          </li>
      </ul>
    )
}
