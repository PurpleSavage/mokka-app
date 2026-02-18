import { AgeRange } from "../domain/enums/valid-age-range";
import { BodyShape } from "../domain/enums/valid-body-shape";
import { EyeColor } from "../domain/enums/valid-eye-color";
import { FaceType } from "../domain/enums/valid-face-type";
import { Gender } from "../domain/enums/valid-gender";
import { HairColor } from "../domain/enums/valid-hair-color";
import { HairType } from "../domain/enums/valid-hair-typ";
import { LipsType } from "../domain/enums/valid-lips-type";
import { SkinColor } from "../domain/enums/valid-skin-color";
import { enumToOptions } from "../domain/services/transform-to-option";

export const genderOptions = enumToOptions(Gender)

export const ageRangeOptions = enumToOptions(AgeRange)

export const bodyShapeOptions = enumToOptions(BodyShape)

export const skinColorOptions = enumToOptions(SkinColor)

export const eyeColorOptions = enumToOptions(EyeColor)

export const hairTypeOptions = enumToOptions(HairType)

export const faceTypeOptions = enumToOptions(FaceType)

export const lipsTypeOptions = enumToOptions(LipsType)

export const hairColorOptions = enumToOptions(HairColor)