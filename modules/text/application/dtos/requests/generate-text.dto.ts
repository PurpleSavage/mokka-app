import { z } from "zod";
import { FormatText, LengthText, ToneText } from "../../../domain/enums/options-text";

export  const generateTextSchema = z.object({
  context: z.string().min(10, "Context must be at least 10 characters long"),
  promotionType: z.string().min(1, "Please select what you are promoting"),
  title: z.string().min(2, "Title is too short"),
  toneType: z.enum(ToneText, { 
    message: "Select a valid tone" 
  }),
  textLength: z.enum(LengthText, { 
    message: "Select a length" 
  }),
  textFormat: z.enum(FormatText, { 
    message: "Select a format" 
  }),
});

export type GenerateTextDto = z.infer<typeof generateTextSchema>