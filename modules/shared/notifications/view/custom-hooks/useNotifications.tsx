import { useEffect } from "react"
import { socketDI } from "../../di/socket-container.di"
import { sileo } from "sileo"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/store/boundStore"
import { addNotification } from "../../notifications-slice/notification-slice.store"
import { ERROR_ACTIONS, SUCCESS_ACTIONS } from "../../../../../store-events-map/event-map"
import { ERROR_TITLES, SUCCESS_TITLES } from "../constants/titles-notifications"
import { buildErrorNotification, buildSuccessNotification } from "../utils/builders/builders-notifications-data"
import { useIdSession } from "@/modules/shared/auth/view/custom-hooks/useIdSession"

export const useNotifications = () => {
    const dispatch = useDispatch()
    const notificationsList = useSelector((state:RootState)=>state.notifications.notificationsList)
    const {id}=useIdSession()
    useEffect(() => {
        if(!id) return 
        socketDI.connect(id)
        socketDI.listenAllNotifications(
            (eventName, data) => {
                const action = SUCCESS_ACTIONS[eventName]
                if (action) dispatch(action(data))

                dispatch(addNotification(buildSuccessNotification(data, eventName)))
                sileo.success({
                    title: SUCCESS_TITLES[eventName],
                    description: data.message
                })
            },
            (eventName, error) => {
                const action = ERROR_ACTIONS[eventName]
                if (action) dispatch(action(error))

                dispatch(addNotification(buildErrorNotification(error, eventName)))
                sileo.error({
                    title: ERROR_TITLES[eventName],
                    description: error.details
                })
            }
        )
        return () => socketDI.disconnect(id)
    }, [dispatch,id])
    return {
        notificationsList
    }
}