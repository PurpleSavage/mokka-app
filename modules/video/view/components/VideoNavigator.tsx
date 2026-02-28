"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function VideoNavigator() {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;
  return (
    <ul className=" py-4 flex items-center gap-4">
      <li>
        <Link
          href="/mokka/mokka-panel/video"
          className={`${isActive("/mokka/mokka-panel/video") ? "underline underline-offset-8" : ""}`}
        >
          Video generator
        </Link>
      </li>
      <li>
        <Link
          href="/mokka/mokka-panel/video/history-videos"
          className={`${isActive("/mokka/mokka-panel/video/history-videos") ? "underline underline-offset-8" : ""}`}
        >
          History videos
        </Link>
      </li>
    </ul>
  );
}
