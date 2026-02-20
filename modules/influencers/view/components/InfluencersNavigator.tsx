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
                    href="/mokka/mokka-panel/influencers/scenes-history" 
                    className={`${isActive("/mokka/mokka-panel/influencers/scenes-history")? "underline underline-offset-8":""}`}
                >Scenes</Link>
            </li>
            <li>
                <Link 
                    href="/mokka/mokka-panel/influencers/snapshots-history" 
                    className={`${isActive("/mokka/mokka-panel/influencers/snapshots-history")? "underline underline-offset-8":""}`}
                >Snapshots</Link>
            </li>
        </ul>
    )
  
}
