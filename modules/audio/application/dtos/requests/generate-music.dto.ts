import { z } from "zod";

export const generateMusicSchema = z.object({
  prompt: z
    .string()
    .min(3, { message: "El prompt debe ser más descriptivo (mínimo 3 caracteres)" })
    .max(5000, { message: "El prompt es demasiado largo" }),
  bpm: z
    .number()
    .min(40, { message: "El BPM mínimo permitido es 40" })
    .max(220, { message: "El BPM máximo permitido es 220" }),
  genre: z
    .string()
    .min(1, { message: "Debes seleccionar un género musical" }),
  durationMs: z
    .number()
    .min(3000, { message: "La duración mínima es de 3 segundos (3000ms)" })
    .max(600000, { message: "La duración máxima permitida por ElevenLabs es de 10 minutos" }),
  forceInstrumental: z.boolean(),
});

export type GenerateMusicDto = z.infer<typeof generateMusicSchema>;

export type FullMusicDto = GenerateMusicDto & {
  user: string;
};
