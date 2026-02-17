import { AllSubStyles, TypeStyle} from "../enums/image-styles";

export interface ImageEntity{
    id: string,
    prompt: string,
    createDate:string,
    width:number,
    height:number,
    imageUrl:string,
    aspectRatio:string,
    size:string,
    style:TypeStyle,
    subStyle:AllSubStyles,
}