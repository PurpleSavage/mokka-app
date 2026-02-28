import { VideoAspectRatio } from "../domain/enums/video-aspect-ratio";
import { enumToOptions } from "../domain/services/transform-to-option";

export const videoAspectRatioOptions = enumToOptions(VideoAspectRatio)