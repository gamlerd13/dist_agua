import { z } from "zod";

export const formSchema = z.object({
  description: z.string(),
  hasUnitOfMeasure: z.boolean(),
  unitOfMeasure: z.string(),
})