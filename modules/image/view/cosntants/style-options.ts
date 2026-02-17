import { CGI3DSubStyle, DigitalArtSubStyle, FuturisticSubStyle, IllustrationSubStyle, PaintingSubStyle, PhotographySubStyle, TypeStyle, TypeSubStyleMap } from "../../domain/enums/image-styles";

export interface SubStyle<T> {
  id: string;
  title: T; // El título ahora es un valor del Enum específico
}

export interface Style<T extends TypeStyle> {
  id: T; // El id ahora es un valor del Enum TypeStyle
  title: string;
  subStyles: SubStyle<TypeSubStyleMap[T]>[]; // Mapeo automático de sub-estilos
  bg: string;
  border: string;
  hover: string;
}

export const Styles: { [K in TypeStyle]: Style<K> } = {
  [TypeStyle.DIGITAL_ART]: {
    id: TypeStyle.DIGITAL_ART,
    title: "Digital Art",
    bg: "bg-blue-600",
    border: "border-blue-600",
    hover: "hover:border-blue-600",
    subStyles: Object.values(DigitalArtSubStyle).map((val, i) => ({ id: `${i+1}`, title: val })),
  },
  [TypeStyle.PHOTOGRAPHY]: {
    id: TypeStyle.PHOTOGRAPHY,
    title: "Photography",
    bg: "bg-green-600",
    border: "border-green-600",
    hover: "hover:border-green-600",
    subStyles: Object.values(PhotographySubStyle).map((val, i) => ({ id: `${i+7}`, title: val })),
  },
  [TypeStyle.ILLUSTRATION]: {
    id: TypeStyle.ILLUSTRATION,
    title: "Illustration",
    bg: "bg-pink-500",
    border: "border-pink-500",
    hover: "hover:border-pink-500",
    subStyles: Object.values(IllustrationSubStyle).map((val, i) => ({ id: `${i+12}`, title: val })),
  },
  [TypeStyle.PAINTING]: {
    id: TypeStyle.PAINTING,
    title: "Painting",
    bg: "bg-yellow-500",
    border: "border-yellow-500",
    hover: "hover:border-yellow-500",
    subStyles: Object.values(PaintingSubStyle).map((val, i) => ({ id: `${i+18}`, title: val })),
  },
  [TypeStyle.CGI_3D]: {
    id: TypeStyle.CGI_3D,
    title: "Cgi 3D",
    bg: "bg-purple-600",
    border: "border-purple-600",
    hover: "hover:border-purple-600",
    subStyles: Object.values(CGI3DSubStyle).map((val, i) => ({ id: `${i+24}`, title: val })),
  },
  [TypeStyle.FUTURISTIC]: {
    id: TypeStyle.FUTURISTIC,
    title: "Futuristic",
    bg: "bg-cyan-600",
    border: "border-cyan-600",
    hover: "hover:border-cyan-600",
    subStyles: Object.values(FuturisticSubStyle).map((val, i) => ({ id: `${i+28}`, title: val })),
  },
};


export const StylesArray = Object.values(Styles);