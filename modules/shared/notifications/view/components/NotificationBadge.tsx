"use client";
import Link from "next/link";
import { IoNotificationsOutline } from "react-icons/io5";
import { useNotifications } from "../custom-hooks/useNotifications";
import { useListNotifications } from "../custom-hooks/useListNotifiations";

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
  useNotifications() // This hook is responsible for connecting to the socket and listening for notifications, it also dispatches the notifications to the store and shows sileo notifications
  const { notificationsList } = useListNotifications()  
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
