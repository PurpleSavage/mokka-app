export interface ModelNodeResponse{
    id: string,
    nameMesh: string,
    label: string,
    isEditable: boolean,
    materialDefault: string,
    transform: {
      position: [number,number,number];
      rotation: [number,number,number];
      scale: [number,number,number];
    },
    decalConfig?: {
      standardPosition: [number,number,number];
      maxScale: [number,number,number];
      aspectRatio: string;
    },
}