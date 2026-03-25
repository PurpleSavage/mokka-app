import ListNotifications from "@/modules/shared/notifications/view/components/ListNotifications";

export default function NotificationsPage() {
  return (
    <div className="h-full w-full overflow-y-auto custom-scrollbar">
      <div className="space-y-4 w-[50%] h-full mx-auto">
        <ListNotifications/>
      </div>
    </div>
  )
}
