import { audioModels } from "@/modules/audio/view/constants/audio-samples";
import { z } from "zod";


// Extraemos los IDs y Nombres para que Zod valide contra los datos reales
const audioIds = audioModels.map(m => m.idSample) as [string, ...string[]];
const audioNames = audioModels.map(m => m.name) as [string, ...string[]];

export const generateAudioSchema = z.object({
  idModel: z.enum(audioIds, { message: "Please select a valid voice model"},),
  prompt: z.string().min(1, "The prompt cannot be empty").max(5000, "Prompt is too long"),
  nameModelAudio: z.enum(audioNames, {message: "Invalid voice name"}),
  speed: z.number().min(0).max(200, "Speed must be between 0 and 200"),
  stability: z.number().min(0).max(100, "Stability must be between 0 and 100"),
  similarity: z.number().min(0).max(100, "Similarity must be between 0 and 100"),
  exaggeration: z.number().min(0).max(100, "Exaggeration must be between 0 and 100"),
  useSpeakerBoost: z.boolean(),
});

export type GenerateAudioDto = z.infer<typeof generateAudioSchema>
export type FullAudioDto = GenerateAudioDto & {
    user: string; 
}