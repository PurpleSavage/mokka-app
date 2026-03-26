import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NotificationEntity } from "../domain/entities/notification.entity";

export interface NotificationsState{ 
  notificationsList:NotificationEntity[],
}
const initialState:NotificationsState={
  notificationsList:[],
}

export const notificationsSlice = createSlice({
  initialState,
  name: 'notifications',
  reducers: {
    addNotification:(state,action:PayloadAction<NotificationEntity>)=>{
      state.notificationsList = [action.payload,...state.notificationsList]
    },
    setNotifications:(state,action:PayloadAction<NotificationEntity[]>)=>{
      state.notificationsList=action.payload
    },
    deleteNotification: (state, action: PayloadAction<{ notificationId: string }>) => {
      state.notificationsList = state.notificationsList.filter(
        (n) => n.id !== action.payload.notificationId
      );
    },
   
    rollbackNotification: (state, action: PayloadAction<NotificationEntity>) => {
     
      state.notificationsList = [action.payload, ...state.notificationsList];
    }
  }
});
export const {
  addNotification,
  setNotifications,
  deleteNotification,
  rollbackNotification
} = notificationsSlice.actions;

export default notificationsSlice.reducer;