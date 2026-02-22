import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../modules/shared/auth/store-slice/auth.slice'
import audioReducer from '../modules/audio/audio-slice/audio-store.slice'
import textReducer from '../modules/text/text-slice/text-store.slice'
import modalsReducer from '../modules/shared/common/common-slice/modals-slice.store'
import imageReducer from '../modules/image/image-slice/image.slice'
import influencersReducer  from '../modules/influencers/influencer-slice/influencer-store.di'
import commonReducer from '../modules/shared/common/common-slice/common-slice.slice'
export const boundStore = configureStore({
  reducer: {
    auth:authReducer,
    audio:audioReducer,
    text:textReducer,
    modals:modalsReducer,
    image:imageReducer,
    influencers:influencersReducer,
    common:commonReducer
  },
});

export type RootState = ReturnType<typeof boundStore.getState>;
export type AppDispatch = typeof boundStore.dispatch;