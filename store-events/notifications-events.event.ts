import { VideoEntity } from "@/modules/video/domain/entities/video.entity"
import { createAction } from "@reduxjs/toolkit"
import { SocketErrorData, SocketReadyData } from "../modules/shared/notifications/domain/entities/response-notification"
import { ImageEntity } from "@/modules/image/domain/entities/Image.entity"
import { TextEntity } from "@/modules/text/domain/entities/text.entity"
import { InfluencerSnapshotEntity } from "@/modules/influencers/domain/entities/influencer-snapshot.entity"
import { InfluencerSceneEntity } from "@/modules/influencers/domain/entities/influencer-scene.entity"
import { AudioEntity } from "@/modules/audio/domain/entities/audio.entity"
import { InfluencerEntity } from "@/modules/influencers/domain/entities/influencer.entity"

export const socketVideoReady = createAction<SocketReadyData<VideoEntity>>('socket/videoReady')
export const socketImageReady = createAction<SocketReadyData<ImageEntity>>('socket/imageReady')
export const socketAudioReady = createAction<SocketReadyData<AudioEntity>>('socket/audioReady')
export const socketTextReady = createAction<SocketReadyData<TextEntity>>('socket/textReady')
//export const socketImageRemixReady = createAction<SocketReadyData<VideoEntity>>('socket/imageRemixReady')
export const socketInfluencerReady = createAction<SocketReadyData<InfluencerEntity>>('socket/influencerReady')
export const socketInfluencerSnapshotReady = createAction<SocketReadyData<InfluencerSnapshotEntity>>('socket/influencerSnapshotReady')
export const socketInfluencerSceneReady = createAction<SocketReadyData<InfluencerSceneEntity>>('socket/influencerSceneReady')



//Errores
export const socketVideoFailed = createAction<SocketErrorData>('socket/videoFailed')
export const socketImageFailed = createAction<SocketErrorData>('socket/imageFailed')
export const socketAudioFailed = createAction<SocketErrorData>('socket/audioFailed')
export const socketTextFailed = createAction<SocketErrorData>('socket/textFailed')
export const socketImageRemixFailed = createAction<SocketErrorData>('socket/imageRemixFailed')
export const socketInfluencerFailed = createAction<SocketErrorData>('socket/influencerFailed')
export const socketInfluencerSnapshotFailed = createAction<SocketErrorData>('socket/influencerSnapshotFailed')
export const socketInfluencerSceneFailed = createAction<SocketErrorData>('socket/influencerSceneFailed')