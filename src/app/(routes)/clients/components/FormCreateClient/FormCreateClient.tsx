'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Separator } from '@/components/ui/separator'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormCreateLocationProps } from '@/app/(routes)/locations/components/FormCreateLocation/FormCreateLocation.types'
import { FormCreateClientProps } from './FormCreateLocation.types'

const formSchema = z.object({
  nombres: z.string().nonempty('El nombre es requerido'),
  apellidos: z.string().nonempty('El apellido es requerido'),
  fechaCumple: z.string().nonempty('La fecha de cumpleaños es requerida'),
  telefono: z.string().nonempty('El teléfono es requerido'),
  direccion: z.string().nonempty('La dirección es requerida'),
  distritoId: z.number().int().positive('El distrito es requerido'),
  modeloNegocio: z.string().nonempty('El modelo de negocio es requerido'),
  coordenadaX: z.number().nonnegative('La coordenada X es requerida'),
  coordenadaY: z.number().nonnegative('La coordenada Y es requerida'),
  rutasId: z.number().int().positive('La ruta es requerida'),
  isActive: z.boolean().optional().default(true),
})

export function FormCreateClient(props: FormCreateClientProps) {

  const { setOpenModalCreate, createClient, districts } = props;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombres: '',
      apellidos: '',
      fechaCumple: '',
      telefono: '',
      direccion: '',
      distritoId: undefined,
      modeloNegocio: '',
      coordenadaX: 0,
      coordenadaY: 0,
      rutasId: 1,
      isActive: true,
    },
  })

  const { isValid } = form.formState

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    createClient(values);
    setOpenModalCreate(false);
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-2 gap-3">
            <FormField
              control={form.control}
              name="nombres"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombres</FormLabel>
                  <FormControl>
                    <Input placeholder="Nombres del cliente ..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="apellidos"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Apellidos</FormLabel>
                  <FormControl>
                    <Input placeholder="Apellidos del cliente ..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="fechaCumple"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fecha de Cumpleaños</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="telefono"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Teléfono</FormLabel>
                  <FormControl>
                    <Input placeholder="Teléfono del cliente ..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="direccion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dirección</FormLabel>
                  <FormControl>
                    <Input placeholder="Dirección del cliente ..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="distritoId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Distrito</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(parseInt(value))}
                    defaultValue={field.value?.toString()}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar distrito" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {districts?.map((district) => (
                        <SelectItem
                          key={district.id}
                          value={district.id.toString()}
                        >
                          {district.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="modeloNegocio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Modelo de Negocio</FormLabel>
                  <FormControl>
                    <Input placeholder="Modelo de negocio ..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="coordenadaX"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Coordenada X</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Coordenada X ..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="coordenadaY"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Coordenada Y</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Coordenada Y ..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rutasId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ruta</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="ID de la ruta ..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Separator />
          <FormField
            control={form.control}
            name="isActive"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4 shadow-sm">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>¿Está activo?</FormLabel>
                  <p className="text-sm text-muted-foreground">
                    Marque esta casilla si el cliente está activo.
                  </p>
                </div>
              </FormItem>
            )}
          />
          <Button type="submit" disabled={!isValid}>
            Crear cliente
          </Button>
        </form>
      </Form>
    </div>
  )
}
