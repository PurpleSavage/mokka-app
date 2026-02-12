import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../modules/shared/auth/store-slice/auth.slice'
import audioReducer from '../modules/audio/audio-slice/audio-store.slice'
export const boundStore = configureStore({
  reducer: {
    auth:authReducer,
    audio:audioReducer
  },
});

export type RootState = ReturnType<typeof boundStore.getState>;
export type AppDispatch = typeof boundStore.dispatch;