"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { FormExportSaleProps } from "./FormExportSale.types"
import { exportSales } from "../HeaderSales/utils/exportSales"
import { CustomCalendar } from "@/components/Calendario/CustomCalendar"

const formSchema = z.object({
  clientId: z.number().int().optional(),
  startDate: z.date(),
  endDate: z.date(),
  status: z.string(),
})

export function FormExportSale(props: FormExportSaleProps) {
  const { setOpenModalExportSale, sale, client } = props

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      clientId: undefined,
      startDate: undefined,
      endDate: undefined,
      status: "undefined",
    },
    mode: "onChange",
  })

  const { isValid } = form.formState

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const filters = {
      startDate: values.startDate,
      endDate: values.endDate,
      clientId: values.clientId,
      status: values.status,
    }
    exportSales(sale, filters)
    setOpenModalExportSale(false)
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-2 gap-3">
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fecha de Inicio</FormLabel>
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
              name="endDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fecha de Fin</FormLabel>
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
              name="clientId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Apellidos y nombres del cliente</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(parseInt(value))}
                    defaultValue={field.value?.toString()}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona el cliente" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {client?.map((client) => (
                        <SelectItem
                          key={client.id}
                          value={client.id.toString()}
                        >
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
                      <SelectItem value="undefined">Todos</SelectItem>
                      <SelectItem value="completed">Completado</SelectItem>
                      <SelectItem value="pending">Pendiente</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" disabled={!isValid}>
            Filtrar ventas
          </Button>
        </form>
      </Form>
    </div>
  )
}
