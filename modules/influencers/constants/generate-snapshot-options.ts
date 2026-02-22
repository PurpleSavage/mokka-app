import { AspectRatioImage } from "@/modules/shared/common/domain/enums/aspect-ratio-image";
import { enumToOptions } from "../domain/services/transform-to-option";
import { OutfitType } from "../domain/enums/valid-outfits";
import { Environment } from "../domain/enums/valid-enviroment";

export const aspectRatioOptions = enumToOptions(AspectRatioImage)
export const outfitOptions = enumToOptions(OutfitType)
export const enviromentsOptions= enumToOptions(Environment)