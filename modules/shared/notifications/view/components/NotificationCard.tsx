'use client'

import { StatusQueue } from "@/modules/shared/common/domain/enums/status-queue"
import { NotificationEntity } from "../../domain/entities/notification.entity"
import { JobsNotificationsType } from "../../domain/enums/jobs-notifications"
import StatusIcon from "./StatusIcon"
import { LuAudioLines, LuCamera, LuFilm, LuImage, LuText, LuUser, LuVideo } from "react-icons/lu"
import { ApiErrorPlatform } from "@/modules/shared/common/infrastructure/errors/api-errors.error"
import { sileo } from "sileo"
import { rollbackNotification } from "../../notifications-slice/notification-slice.store"
import { readNotificationThunk } from "../../notifications-thunks/read-notification-thunk.thunk"
import { useAppDispatch } from "@/store/boundStore"


interface NotificationCardProps{
  notification:NotificationEntity
}
const statusConfig: Record<StatusQueue, { label: string; className: string }> = {
  [StatusQueue.COMPLETED]:  { label: 'Completed',  className: 'bg-green-500/10 text-green-400' },
  [StatusQueue.FAILED]:     { label: 'Failed',     className: 'bg-red-500/10 text-red-400' },
  [StatusQueue.PROCESSING]: { label: 'Processing', className: 'bg-blue-500/10 text-blue-400' },
}

const typeConfig: Record<JobsNotificationsType, { label: string; icon: React.ReactNode }> = {
  [JobsNotificationsType.IMAGE]:              { label: 'Image',             icon: <LuImage size={16} /> },
  [JobsNotificationsType.VIDEO]:              { label: 'Video',             icon: <LuVideo size={16} /> },
  [JobsNotificationsType.AUDIO]:              { label: 'Audio',             icon: <LuAudioLines size={16} /> },
  [JobsNotificationsType.TEXT]:               { label: 'Text',              icon: <LuText size={16} /> },
  [JobsNotificationsType.IMAGE_REMIX]:        { label: 'Image remix',       icon: <LuImage size={16} /> },
  [JobsNotificationsType.INFLUENCER]:         { label: 'Influencer',        icon: <LuUser size={16} /> },
  [JobsNotificationsType.INFLUENCER_SNAPSHOT]:{ label: 'Snapshot',          icon: <LuCamera size={16} /> },
  [JobsNotificationsType.INFLUENCER_SCENE]:   { label: 'Scene',             icon: <LuFilm size={16} /> },
}

export default function NotificationCard({ notification }: NotificationCardProps) {

  const status = statusConfig[notification.status] ?? statusConfig.completed

  const type = typeConfig[notification.notificationType]



  const appDispatch = useAppDispatch()

  const readNotification=async(notification:NotificationEntity)=>{
    try {
  
      await appDispatch(readNotificationThunk(notification)).unwrap();
    } catch (error) {
      console.log(error)
      appDispatch(rollbackNotification(notification));

      const errorMessage = error instanceof ApiErrorPlatform 
      ? error.message 
      : 'Something went wrong while marking the notification as read.';

      sileo.error({
        title: error instanceof ApiErrorPlatform ? error.errorType : 'Error',
        description: errorMessage
      });
    }
  }
   return (
    <div className={`
      relative flex flex-col gap-2 p-4 rounded-xl bg-table-body-bg
      border border-slate-600/30 transition-colors
      ${!notification.isRead ? 'border-l-2 border-l-blue-500' : ''}
    `}>
      {!notification.isRead && (
        <span className="absolute top-3 right-3 w-2 h-2 rounded-full bg-blue-500" />
      )}

      <div className="flex items-center gap-3">
        <StatusIcon status={notification.status} />
        <p className="grow text-sm font-medium text-white">{notification.title}</p>
        <span className="text-xs text-slate-500 whitespace-nowrap">
          {notification.createdAt}
        </span>
      </div>

      {notification.message && (
        <p className="text-xs text-slate-400 leading-relaxed pl-12">
          {notification.message}
        </p>
      )}

      <div className="flex items-center">
        <div className="flex items-center grow gap-2 pl-12">
          <span className={`text-xs px-2 py-0.5 rounded-md font-medium ${status.className}`}>
            {status.label}
          </span>
          {type && (
            <span className="text-xs px-2 py-0.5 rounded-md font-medium bg-blue-500/10 text-blue-400">
              {type.label}
            </span>
          )}
        </div>
        <button 
          type="button" 
          onClick={()=>readNotification(notification)}
          className="block text-xs cursor-pointer
         hover:text-gray-400"
        >Got it</button>
      </div>
    </div>
  )
}
