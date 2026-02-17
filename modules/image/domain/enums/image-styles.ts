export enum TypeStyle {
  DIGITAL_ART = "digitalArt",
  PHOTOGRAPHY = "photography",
  ILLUSTRATION = "illustration",
  PAINTING = "painting",
  CGI_3D = "cgi3D",
  FUTURISTIC = "futuristic",
}

// 2. Sub-estilos por categoría
export enum DigitalArtSubStyle {
  CONCEPT_ART = "Concept art",
  MATTE_PAINTING = "Matte painting",
  PIXEL_ART = "Pixel art",
  LOW_POLY = "Low poly",
  ISOMETRIC_ART = "Isometric art",
  LINE_ART = "Line art",
}

export enum PhotographySubStyle {
  REALISTIC = "Realistic / hyperrealistic",
  CINEMATIC = "Cinematic photography",
  PORTRAIT = "Portrait photography",
  MACRO = "Macro photography",
  AERIAL = "Aerial / drone photography",
}

export enum IllustrationSubStyle {
  ANIME = "Anime / manga",
  COMIC_BOOK = "Comic book",
  CARTOON = "Cartoon",
  CHILDRENS_BOOK = "Children’s book illustration",
  SKETCH = "Sketch / pencil drawing",
  WATERCOLOR = "Watercolor illustration",
}

export enum PaintingSubStyle {
  OIL_PAINTING = "Oil painting",
  IMPRESSIONISM = "Impressionism",
  CUBISM = "Cubism",
  SURREALISM = "Surrealism",
  POP_ART = "Pop art",
  INK_WASH = "Ink wash painting",
}

export enum CGI3DSubStyle {
  UNREAL_ENGINE = "Unreal Engine render",
  BLENDER = "Blender render",
  CLAYMATION = "Claymation",
  VOXEL_ART = "Voxel art",
}

export enum FuturisticSubStyle {
  CYBERPUNK = "Cyberpunk",
  STEAMPUNK = "Steampunk",
  SYNTHWAVE = "Synthwave / Retrowave",
  SCIFI = "Futuristic sci-fi",
  POST_APOCALYPTIC = "Post-apocalyptic",
}
// 3. Relación Style → SubStyle
export type TypeSubStyleMap = {
  digitalArt: DigitalArtSubStyle;
  photography: PhotographySubStyle;
  illustration: IllustrationSubStyle;
  painting: PaintingSubStyle;
  cgi3D: CGI3DSubStyle;
  futuristic: FuturisticSubStyle;
};

export type AllSubStyles = 
  | DigitalArtSubStyle 
  | PhotographySubStyle 
  | IllustrationSubStyle 
  | PaintingSubStyle 
  | CGI3DSubStyle 
  | FuturisticSubStyle;