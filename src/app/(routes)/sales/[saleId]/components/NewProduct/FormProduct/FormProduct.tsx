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

import { useState, useEffect } from "react"
import { FormCreateSaleDetailProps } from "./FormProduct.types"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"

const formSchema = z.object({
  saleId: z.number().int(),
  productId: z.number().int(),
  includeBottlePrice: z.boolean(),
  quantity: z
    .string()
    .nonempty("La cantidad es requerida")
    .transform((value) => Number(value)),
  revenue: z.string(),
})

export function FormProduct(props: FormCreateSaleDetailProps) {
  const { setOpen, createSaleDetail, product, saleId } = props

  const [selectedContentPrice, setSelectedContentPrice] = useState<string>("")
  const [selectedBotlePrice, setSelectedBotlePrice] = useState<string>("")
  const [revenue, setRevenue] = useState<string>("0")

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      saleId: saleId,
      productId: undefined,
      includeBottlePrice: true,
      quantity: 0,
      revenue: "0",
    },
    mode: "onChange",
  })
  const { isValid } = form.formState

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    createSaleDetail(values)
    setOpen(false)
  }

  const handleProductSelect = (productId: number) => {
    const selectedProduct = product?.find((p) => p.id === productId)
    if (selectedProduct) {
      setSelectedContentPrice(selectedProduct.contentPrice.toString())
      setSelectedBotlePrice(selectedProduct.botlePrice.toString())
      form.setValue("productId", productId)
    }
  }

  useEffect(() => {
    const quantity = Number(form.watch("quantity"))
    const includeBottlePrice = form.watch("includeBottlePrice")
    const contentPrice = parseFloat(selectedContentPrice) || 0
    const botlePrice = parseFloat(selectedBotlePrice) || 0

    let total = 0
    if (!isNaN(quantity) && quantity > 0) {
      if (includeBottlePrice) {
        total = quantity * (contentPrice + botlePrice)
      } else {
        total = quantity * contentPrice
      }
    }

    setRevenue(total.toString())
    form.setValue("revenue", total.toString())
  }, [
    form.watch("quantity"),
    form.watch("includeBottlePrice"),
    selectedContentPrice,
    selectedBotlePrice,
  ])

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-2 gap-3">
            <FormField
              control={form.control}
              name="productId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Producto</FormLabel>
                  <Select
                    onValueChange={(value) =>
                      handleProductSelect(parseInt(value))
                    }
                    defaultValue={field.value?.toString()}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona el producto" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {product?.map((product) => (
                        <SelectItem
                          key={product.id}
                          value={product.id.toString()}
                        >
                          {product.name} - {product.litros}L
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormItem>
              <FormLabel>Precio del contenido</FormLabel>
              <FormControl>
                <Input type="text" disabled value={selectedContentPrice} />
              </FormControl>
            </FormItem>
            <FormItem>
              <FormLabel>Precio de la botella</FormLabel>
              <FormControl>
                <Input type="text" disabled value={selectedBotlePrice} />
              </FormControl>
            </FormItem>
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cantidad</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Cantidad ..."
                      type="number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="revenue"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Total S/.</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Total ..."
                      type="number"
                      {...field}
                      value={revenue.toString()}
                      disabled
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
            name="includeBottlePrice"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4 shadow-sm">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    ¿Se va a considerar el precio de la botella?
                  </FormLabel>
                  <p className="text-sm text-muted-foreground">
                    Marque esta casilla si el precio de la botella será
                    considerada
                  </p>
                </div>
              </FormItem>
            )}
          />
          <Button type="submit" disabled={!isValid}>
            Añadir producto
          </Button>
        </form>
      </Form>
    </div>
  )
}
