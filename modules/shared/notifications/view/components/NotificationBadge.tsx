"use client";
import Link from "next/link";
import { IoNotificationsOutline } from "react-icons/io5";
import { useNotifications } from "../custom-hooks/useNotifications";

interface NotificationBadgeProps{
    baseStyles:string,
    isActive: (path: string) => boolean
    activeStyles:string,
    inactiveStyles:string
}
export default function NotificationBadge(
    {baseStyles,isActive,activeStyles,inactiveStyles}
    :NotificationBadgeProps
) {
  const {notificationsList}=useNotifications()
  return (
    <Link
      href="/mokka/mokka-panel/notifications"
      className={`${baseStyles} 
            ${isActive("/mokka/mokka-panel/notifications") ? activeStyles : inactiveStyles}`}
    >
      <div className="relative">
        <div
          className="-top-1 absolute -right-1 size-4 rounded-full bg-red-500
               text-white flex items-center justify-center text-xs"
        >
          {notificationsList.length}
        </div>
        <IoNotificationsOutline size={20} />
      </div>
      Notifications
    </Link>
  );
}
