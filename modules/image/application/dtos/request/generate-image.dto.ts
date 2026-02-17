import { StylesArray } from "@/modules/image/view/cosntants/style-options";
import { z } from "zod";


const stylesValid = StylesArray.map(s=>s.title) as [string, ...string[]];
const substyleValid = StylesArray.map((sb)=>sb.subStyles.map(m=>m.title)).flat(2)
export const generateImageSchema = z.object({
  prompt: z.string().min(3, "El prompt es demasiado corto"),
  width: z.number(),
  height: z.number(),
  aspectRatio: z.enum(["1:1", "16:9", "9:16"]),
  style: z.enum(stylesValid,{ message: "Please select a valid style"}), 
  subStyle:z.enum(substyleValid,{ message: "Please select a valid sub style"})
});

export type GenerateImageDto = z.infer<typeof generateImageSchema>;