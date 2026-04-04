import { VideoEntity } from "@/modules/video/domain/entities/video.entity";
import { createAction } from "@reduxjs/toolkit";
import { ImageEntity } from "@/modules/image/domain/entities/Image.entity";
import { TextEntity } from "@/modules/text/domain/entities/text.entity";
import { InfluencerSnapshotEntity } from "@/modules/influencers/domain/entities/influencer-snapshot.entity";
import { InfluencerSceneEntity } from "@/modules/influencers/domain/entities/influencer-scene.entity";
import { AudioEntity } from "@/modules/audio/domain/entities/audio.entity";
import { InfluencerEntity } from "@/modules/influencers/domain/entities/influencer.entity";
import { SocketReadyResponseDto } from "@/modules/shared/common/application/dtos/responses/socket-response-ready.dto";
import { SocketResponseError } from "@/modules/shared/common/application/dtos/responses/socket-response-error.dto";
import { MusicEntity } from "@/modules/audio/domain/entities/music.entity";

export const socketVideoReady =
  createAction<SocketReadyResponseDto<VideoEntity>>("socket/videoReady");
export const socketImageReady =
  createAction<SocketReadyResponseDto<ImageEntity>>("socket/imageReady");
export const socketAudioReady =
  createAction<SocketReadyResponseDto<AudioEntity>>("socket/audioReady");
export const socketTextReady =
  createAction<SocketReadyResponseDto<TextEntity>>("socket/textReady");
//export const socketImageRemixReady = createAction<SocketReadyData<VideoEntity>>('socket/imageRemixReady')
export const socketInfluencerReady = createAction<
  SocketReadyResponseDto<InfluencerEntity>
>("socket/influencerReady");
export const socketInfluencerSnapshotReady = createAction<
  SocketReadyResponseDto<InfluencerSnapshotEntity>
>("socket/influencerSnapshotReady");
export const socketInfluencerSceneReady = createAction<
  SocketReadyResponseDto<InfluencerSceneEntity>
>("socket/influencerSceneReady");
export const socketMusicReady =
  createAction<SocketReadyResponseDto<MusicEntity>>("socket/musicReady");

//Errores
export const socketVideoFailed =
  createAction<SocketResponseError>("socket/videoFailed");
export const socketImageFailed =
  createAction<SocketResponseError>("socket/imageFailed");
export const socketAudioFailed =
  createAction<SocketResponseError>("socket/audioFailed");
export const socketTextFailed =
  createAction<SocketResponseError>("socket/textFailed");
export const socketImageRemixFailed = createAction<SocketResponseError>(
  "socket/imageRemixFailed",
);
export const socketInfluencerFailed = createAction<SocketResponseError>(
  "socket/influencerFailed",
);
export const socketInfluencerSnapshotFailed = createAction<SocketResponseError>(
  "socket/influencerSnapshotFailed",
);
export const socketInfluencerSceneFailed = createAction<SocketResponseError>(
  "socket/influencerSceneFailed",
);
export const socketMusicFailed =
  createAction<SocketResponseError>("socket/musicFailed");
