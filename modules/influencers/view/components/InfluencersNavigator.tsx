'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function InfluencersNavigator() {
    const pathname = usePathname()
    const isActive = (path: string) => pathname === path
    return (
        <ul className=" py-4 flex items-center gap-4">
            <li>
            <Link
                href="/mokka/mokka-panel/influencers" 
                className={`${isActive("/mokka/mokka-panel/influencers") ? "underline underline-offset-8":""}`}
            >Influencers</Link>
            </li>
            <li>
            <Link 
                href="/mokka/mokka-panel/influencers/history" 
                className={`${isActive("/mokka/mokka-panel/influencers/history")? "underline underline-offset-8":""}`}
            >History</Link>
            </li>
        </ul>
    )
  
}
