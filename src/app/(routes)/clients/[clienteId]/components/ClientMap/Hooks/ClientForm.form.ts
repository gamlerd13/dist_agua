import { z } from "zod";

export const formSchema = z.object({
  coordenadaX: z.string(),
  coordenadaY: z.string(),
});
