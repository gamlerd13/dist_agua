"use client"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useClientForm } from "./Hooks/useClientForm"
import { ClientEdit } from "@/interfaces/client"
import { Checkbox } from "@/components/ui/checkbox"
import { CustomCalendar } from "@/components/Calendario/CustomCalendar"
import { Separator } from "@/components/ui/separator"

export function ClientForm({ client }: { client: ClientEdit }) {
  const { form, onSubmit, locations } = useClientForm(client)

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-2 gap-3">
          <FormField
            control={form.control}
            name="nombres"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Nombre del cliente..."
                    type="text"
                    {...field}
                  />
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
                  <Input
                    placeholder="Apellidos del cliente..."
                    type="text"
                    {...field}
                  />
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
                {/* <CalendarioScrollable
                  selected={field.value ? new Date(field.value) : undefined}
                  onSelect={field.onChange}
                /> */}
                <CustomCalendar
                  selected={field.value ? new Date(field.value) : undefined}
                  onSelect={field.onChange}
                />
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
                  <Input
                    placeholder="Teléfono del cliente..."
                    type="text"
                    {...field}
                  />
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
                  <Input
                    placeholder="Dirección del cliente..."
                    type="text"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="rutaId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ruta</FormLabel>
                <Select
                  onValueChange={(value) => field.onChange(parseInt(value))}
                  defaultValue={field.value?.toString()}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar ruta" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {locations?.map((location) => (
                      <SelectItem
                        key={location.id}
                        value={location.id.toString()}
                      >
                        {location.name} - {location.distrito}
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
                  <Input
                    placeholder="Modelo de negocio..."
                    type="text"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="pedidoConcurrencia"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Concurrencia de Pedido</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="0"
                    {...field}
                    onChange={(e) => field.onChange(parseInt(e.target.value))}
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
                <FormLabel>¿Activo?</FormLabel>
                <p className="text-sm text-muted-foreground">
                  Marque esta casilla si el cliente está activo
                </p>
              </div>
            </FormItem>
          )}
        />

        <Button type="submit">Actualizar cliente</Button>
      </form>
    </Form>
  )
}
