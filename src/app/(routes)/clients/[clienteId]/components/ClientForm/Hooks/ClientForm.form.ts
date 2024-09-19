import { z } from "zod";

export const formSchema = z.object({
  nombres: z.string().nonempty('El nombre es requerido'),
  apellidos: z.string().nonempty('El apellido es requerido'),
  telefono: z.string().nonempty('El teléfono es requerido'),
  direccion: z.string().nonempty('La dirección es requerida'),
  fechaCumple: z.date(),
  modeloNegocio: z.string().nonempty('El modelo de negocio es requerido'),
  rutaId: z.number().int(),
  pedidoConcurrencia: z
  .string()
  .transform((val) => Number(val)),
  isActive: z.boolean(),
});
