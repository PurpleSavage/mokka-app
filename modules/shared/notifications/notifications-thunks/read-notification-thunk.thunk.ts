import { createAsyncThunk } from '@reduxjs/toolkit';

import { NotificationEntity } from '../domain/entities/notification.entity';
import { deleteNotification, rollbackNotification } from '../notifications-slice/notification-slice.store';
import { notificationsDI } from '../di/notifications-container.dt';
import { ReadNotificationResponseDto } from '../application/dtos/responses/read-notification-response.dto';
import { ApiErrorPlatform } from '../../common/infrastructure/errors/api-errors.error';

export const readNotificationThunk = createAsyncThunk<
  ReadNotificationResponseDto, 
  NotificationEntity,         
  { rejectValue: ApiErrorPlatform } 
>(
  'notifications/read',
  async (notification, { dispatch, rejectWithValue }) => {
    // 1. Borrado optimista
    dispatch(deleteNotification({ notificationId: notification.id }));

    try {
      const response = await notificationsDI.readNotification(notification.id);
      return response; 
    } catch (error) {
      // 2. Rollback centralizado (Solo aquí)
      dispatch(rollbackNotification(notification));
      
      // 3. Tipamos el error para el reject
      return rejectWithValue(error as ApiErrorPlatform);
    }
  }
);