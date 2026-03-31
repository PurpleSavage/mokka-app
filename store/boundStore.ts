import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../modules/shared/auth/store-slice/auth.slice'
import audioReducer from '../modules/audio/audio-slice/audio-store.slice'
import textReducer from '../modules/text/text-slice/text-store.slice'
import modalsReducer from '../modules/shared/common/common-slice/modals-slice.store'
import imageReducer from '../modules/image/image-slice/image.slice'
import influencersReducer  from '../modules/influencers/influencer-slice/influencer-store.slice'
import commonReducer from '../modules/shared/common/common-slice/common-slice.slice'
import videoReducer from '@/modules/video/video-slice/video-store.slice'
import notificationsReducer from '@/modules/shared/notifications/notifications-slice/notification-slice.store'
import influencerProfileReducer from '@/modules/influencers/influencer-slice/influencer-profile.slice'
import render3DReducer from '@/modules/mockups/render-3d/render-3d-slice/render-3d.slice'

import { useDispatch } from "react-redux";
export const boundStore = configureStore({
  reducer: {
    auth:authReducer,
    audio:audioReducer,
    text:textReducer,
    modals:modalsReducer,
    image:imageReducer,
    influencers:influencersReducer,
    common:commonReducer,
    video:videoReducer,
    notifications:notificationsReducer,
    influencerProfile:influencerProfileReducer,
    render3D:render3DReducer
  },
});

export type RootState = ReturnType<typeof boundStore.getState>;
export type AppDispatch = typeof boundStore.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>()