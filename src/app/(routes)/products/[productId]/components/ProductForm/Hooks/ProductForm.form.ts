import { z } from "zod";

export const formSchema = z.object({
  name: z.string(),
  litros: z.string(),
  isReturnable: z.boolean(),
  botlePrice: z.string(),
  contentPrice: z.string(),
})