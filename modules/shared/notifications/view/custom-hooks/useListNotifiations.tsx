import { useIdSession } from "@/modules/shared/auth/view/custom-hooks/useIdSession"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { notificationsDI } from "../../di/notifications-container.dt"
import { setNotifications } from "../../notifications-slice/notification-slice.store"
import { ApiErrorPlatform } from "@/modules/shared/common/infrastructure/errors/api-errors.error"
import { sileo } from "sileo"
import { RootState } from "@/store/boundStore"


export const useListNotifications=()=>{
    const [isPending,setIsPending]=useState(true)
    const [error,setError]=useState('')
    const {id}=useIdSession()
    const notificationsList = useSelector((state:RootState)=>state.notifications.notificationsList)
    const dispatch = useDispatch()
    const notificationsSize= notificationsList.length
    useEffect(()=>{
        if(!id) return
        if(notificationsSize>0){
            setIsPending(false)
            return
        }
        const getNotifications=async()=>{
            try {
                setIsPending(true)
                const notifications = await notificationsDI.listNotifications(id)
                dispatch(setNotifications(notifications))
            } catch (error) {
                if(error instanceof ApiErrorPlatform){
                    setError(error.message)
                    sileo.error({
                        title:error.errorType,
                        description:error.message
                    })
                }else{
                    sileo.error({
                        title:'Unknown error',
                        description:'An unknown error has just occurred'
                    })
                }
            }finally{
                setIsPending(false)
            }
        }
        getNotifications()
    },[id,dispatch,notificationsSize])
    return{
        isPending,
        error,
        notificationsList
    }
}