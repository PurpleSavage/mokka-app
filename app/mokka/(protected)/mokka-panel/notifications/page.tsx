import ListNotifications from "@/modules/shared/notifications/view/components/ListNotifications";

export default function NotificationsPage() {
  return (
    <div className="h-full w-full space-y-2">
      <div className="p-2 sapce-y-1 w-[60%] mx-auto">
        <h1 className="text-lg">Notifications</h1>
        <p className="text-gray-400">Stay on top of your activity — here you&apos;ll find all your unread notifications, including updates on your generated content, errors, and system alerts.</p>
      </div>
      <div className="space-y-2 w-[60%] h-full overflow-y-auto custom-scrollbar  mx-auto pb-28 px-2">
        <ListNotifications/>
      </div>
    </div>
  )
}
