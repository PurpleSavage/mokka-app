import { SharedImageEntity } from "../../domain/entities/shared-image.entity";
import { TypeStyle, FuturisticSubStyle } from "../../domain/enums/image-styles";


export const communityImagesMock: SharedImageEntity[] = [
  {
    id: "sh-101",
    remixes: 12,
    downloads: 45,
    sharedBy: {
      id: "u-99",
      email: "jpzurita@mokka.ai"
    },
    image: {
      id: "img-001",
      prompt: "A futuristic cyberpunk city in the Andes mountains, synthwave colors, 8k",
      createDate: "2026-03-18T10:00:00Z",
      width: 1024,
      height: 1024,
      imageUrl: "https://r2.mokka.ai/generated/cyberpunk-andes.png",
      aspectRatio: "1:1",
      size: "1024x1024",
      style: TypeStyle.CGI_3D,
      subStyle: FuturisticSubStyle.CYBERPUNK 
    }
  },
  {
    id: "sh-102",
    remixes: 5,
    downloads: 120,
    sharedBy: "698d6877ab4f4ed42250d68d", // Caso donde solo llega el ID
    image: "https://r2.mokka.ai/generated/minimalist-trap-aesthetic.png" // Caso donde solo llega el string
  }
];