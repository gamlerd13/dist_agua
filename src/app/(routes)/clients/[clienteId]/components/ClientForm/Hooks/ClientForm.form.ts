import { z } from "zod";

export const formSchema = z.object({
  nombres: z.string(),
  apellidos: z.string(),
  telefono: z.string(),
  direccion: z.string(),
  fechaCumple: z.string(),
  coordenadaX: z.number(),
  coordenadaY: z.number(),
  modeloNegocio: z.string(),
  isActive: z.boolean(),
  distritoId: z.number(),
});
