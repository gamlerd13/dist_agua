import { z } from "zod";

export const formSchema = z.object({
  clientId: z.number(),
  saleDate: z.date(),
  totalRevenue: z.string(),
  status: z.string(),
  paymentMethod: z.string(),
  notes: z.string(),
})