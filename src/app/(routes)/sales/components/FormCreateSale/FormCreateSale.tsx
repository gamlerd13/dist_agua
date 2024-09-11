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
import { Input } from "@/components/ui/input"

import { FormCreateSaleProps } from "./FormCreateSale.types"
import { useState } from "react"

const formSchema = z.object({
  clientId: z.number().int(),
  totalRevenue: z.string(),
  status: z.string(),
  paymentMethod: z.string(),
  notes: z.string().default(""),
})

export function FormCreateSale(props: FormCreateSaleProps) {
  const { setOpenModalCreate, createSale, client } = props

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      clientId: undefined,
      totalRevenue: "0",
      status: "pending",
      paymentMethod: "undefined",
      notes: "",
    },
    mode: "onChange",
  })

  const isClientSelected = form.watch("clientId") !== undefined

  const [routeDistrict, setRouteDistrict] = useState({
    route: "",
    district: "",
  })

  const handleClientChange = (clientId: number) => {
    const selectedClient = client?.find((c) => c.id === clientId)
    if (selectedClient) {
      setRouteDistrict({
        route: selectedClient.ruta,
        district: selectedClient.distrito,
      })
      form.setValue("clientId", clientId)
    }
  }

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    createSale(values)
    setOpenModalCreate(false)
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-2 gap-3">
            <FormField
              control={form.control}
              name="clientId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Apellidos y nombres del cliente</FormLabel>
                  <Select
                    onValueChange={(value) =>
                      handleClientChange(parseInt(value))
                    }
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
            <FormItem>
              <FormLabel>Ruta - Distrito</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  disabled
                  value={`${routeDistrict.route} - ${routeDistrict.district}`}
                />
              </FormControl>
            </FormItem>
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
            <FormField
              control={form.control}
              name="paymentMethod"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Método de pago</FormLabel>
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
                      <SelectItem value="undefined">Por definir</SelectItem>
                      <SelectItem value="cash">Efectivo</SelectItem>
                      <SelectItem value="yape">YAPE</SelectItem>
                      <SelectItem value="izipay">IZIPAY</SelectItem>
                      <SelectItem value="plin">PLIN</SelectItem>
                      <SelectItem value="credit">Crédito</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="totalRevenue"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Total S/.</FormLabel>
                  <FormControl>
                    <Input placeholder="Total ..." type="number" {...field} />
                  </FormControl>
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
                  <Input placeholder="Observación ..." type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={!isClientSelected}>
            Crear venta
          </Button>
        </form>
      </Form>
    </div>
  )
}
