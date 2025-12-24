import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../modules/shared/auth/store-slice/auth.slice'
export const boundStore = configureStore({
  reducer: {
    auth:authReducer
  },
});

export type RootState = ReturnType<typeof boundStore.getState>;
export type AppDispatch = typeof boundStore.dispatch;