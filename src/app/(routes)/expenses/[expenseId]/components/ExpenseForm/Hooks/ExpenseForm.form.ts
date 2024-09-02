import { z } from "zod";

export const formSchema = z.object({
  description: z.string(),
  date: z.date(),
  typeOfExpenseId: z.number(),
  amount: z.string(),
  price: z.string(),
  total: z.string(),
  observation: z.string(),
})