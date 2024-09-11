"use client"

import { CustomCalendar } from "@/components/Calendario/CustomCalendar"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Sale } from "@/interfaces/sale"
import { useSaleForm } from "./Hooks/useSaleForm"

export function SaleForm({ sale }: { sale: Sale }) {
  const saleWithDateAndDecimal = {
    ...sale,
    total: sale.totalRevenue.toString(),
    date: new Date(sale.saleDate),
  }
  const { form, onSubmit, clients } = useSaleForm(saleWithDateAndDecimal)

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-2 gap-3">
          <FormField
            control={form.control}
            name="clientId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Apellidos y Nombres del Cliente</FormLabel>
                <Select
                  onValueChange={(value) => field.onChange(parseInt(value))}
                  defaultValue={field.value.toString()}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona al cliente" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {clients?.map((client) => (
                      <SelectItem key={client.id} value={client.id.toString()}>
                        {client.apellidos}, {client.nombres}
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
            name="saleDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fecha de venta</FormLabel>
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
            name="totalRevenue"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Total Recaudado S/.</FormLabel>
                <FormControl>
                  <Input placeholder="Total..." type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Estado de la Venta</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona el estado de la venta" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="completed">Completado</SelectItem>
                    <SelectItem value="pending">Pendiente</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Observación</FormLabel>
              <FormControl>
                <Input placeholder="Observación..." type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Actualizar venta</Button>
      </form>
    </Form>
  )
}
