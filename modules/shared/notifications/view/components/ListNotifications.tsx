'use client'

import { useListNotifications } from "../custom-hooks/useListNotifiations"
import NotificationSkeletonList from "../skeletons/NotificationSkeletonList"
import NotificationCard from "./NotificationCard"

export default function ListNotifications() {
    const {error,notificationsList,isPending}=useListNotifications()
    if(isPending){
        return (
            <NotificationSkeletonList size={10}/>
        )
    }
    if(error){
        return(
            <div className="w-full flex items-center justify-center p-6">
                <p className="text-red-500">{error}</p>
            </div>
        )
    }
    if(notificationsList.length===0){
        return(
            <div className="w-full flex items-center justify-center p-6">
                <p className="text-gray-400">You have no notifications yet</p>
            </div>
        )
    }
    return (
        <>
            {
                notificationsList.map((notification)=>(
                    <NotificationCard notification={notification} key={notification.id}/>
                ))
            }
        </>
    )
}
