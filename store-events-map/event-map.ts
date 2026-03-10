import { socketAudioFailed, socketAudioReady, socketImageFailed, socketImageReady, socketImageRemixFailed, socketInfluencerFailed, socketInfluencerReady, socketInfluencerSceneFailed, socketInfluencerSceneReady, socketInfluencerSnapshotFailed, socketInfluencerSnapshotReady, socketTextFailed, socketTextReady, socketVideoFailed, socketVideoReady } from "@/store-events/notifications-events.event"
import { JobsNotificationsType } from "../modules/shared/notifications/domain/enums/jobs-notifications"
import { SocketErrorData, SocketReadyData } from "../modules/shared/notifications/domain/entities/response-notification"
import type { Action } from '@reduxjs/toolkit'
import { ImageEntity } from "@/modules/image/domain/entities/Image.entity"
import { VideoEntity } from "@/modules/video/domain/entities/video.entity"
import { TextEntity } from "@/modules/text/domain/entities/text.entity"
import { InfluencerSnapshotEntity } from "@/modules/influencers/domain/entities/influencer-snapshot.entity"
import { InfluencerSceneEntity } from "@/modules/influencers/domain/entities/influencer-scene.entity"
import { AudioEntity } from "@/modules/audio/domain/entities/audio.entity"
import { InfluencerEntity } from "@/modules/influencers/domain/entities/influencer.entity"


type SuccessActionCreator = (data: SocketReadyData<unknown>) => Action

export const SUCCESS_ACTIONS: Partial<Record<JobsNotificationsType, SuccessActionCreator>> = {
    [JobsNotificationsType.IMAGE]:               (data) => socketImageReady(data as SocketReadyData<ImageEntity>),
    [JobsNotificationsType.VIDEO]:               (data) => socketVideoReady(data as SocketReadyData<VideoEntity>),
    [JobsNotificationsType.AUDIO]:               (data) => socketAudioReady(data as SocketReadyData<AudioEntity>),
    [JobsNotificationsType.TEXT]:                (data) => socketTextReady(data as SocketReadyData<TextEntity>),
    [JobsNotificationsType.INFLUENCER]:          (data) => socketInfluencerReady(data as SocketReadyData<InfluencerEntity>),
    [JobsNotificationsType.INFLUENCER_SNAPSHOT]: (data) => socketInfluencerSnapshotReady(data as SocketReadyData<InfluencerSnapshotEntity>),
    [JobsNotificationsType.INFLUENCER_SCENE]:    (data) => socketInfluencerSceneReady(data as SocketReadyData<InfluencerSceneEntity>),
}

type ErrorActionCreator = (error: SocketErrorData) => Action

export const ERROR_ACTIONS: Partial<Record<JobsNotificationsType, ErrorActionCreator>> = {
    [JobsNotificationsType.IMAGE]:               (error) => socketImageFailed(error),
    [JobsNotificationsType.VIDEO]:               (error) => socketVideoFailed(error),
    [JobsNotificationsType.AUDIO]:               (error) => socketAudioFailed(error),
    [JobsNotificationsType.TEXT]:                (error) => socketTextFailed(error),
    [JobsNotificationsType.IMAGE_REMIX]:         (error) => socketImageRemixFailed(error),
    [JobsNotificationsType.INFLUENCER]:          (error) => socketInfluencerFailed(error),
    [JobsNotificationsType.INFLUENCER_SNAPSHOT]: (error) => socketInfluencerSnapshotFailed(error),
    [JobsNotificationsType.INFLUENCER_SCENE]:    (error) => socketInfluencerSceneFailed(error),
}