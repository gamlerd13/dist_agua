"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { FormCreateProductProps } from "./FormCreateProduct.types"
import { Separator } from "@/components/ui/separator"

const formSchema = z.object({
  name: z.string().nonempty("El nombre del producto es requerido"),
  litros: z.string().nonempty("Los litros del producto son requeridos"),
  isReturnable: z.boolean(),
  botlePrice: z.string().transform((value) => (value ? value : "0")),
  contentPrice: z
    .string()
    .nonempty("El precio del contenido es requerido")
    .transform((value) => Number(value)),
})

export function FormCreateProduct(props: FormCreateProductProps) {
  const { setOpenModalCreate, createProduct } = props

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      litros: "",
      isReturnable: false,
      botlePrice: "0",
      contentPrice: 0,
    },
    mode: "onChange",
  })

  const { isValid } = form.formState

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    createProduct(values)
    setOpenModalCreate(false)
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-2 gap-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre del producto</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Nombre del producto ..."
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
              name="litros"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Litros del producto</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Litros del producto ..."
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
              name="botlePrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Precio de la botella</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Precio de la botella ..."
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
              name="contentPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Precio del contenido</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Precio del contenido ..."
                      type="number"
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
            name="isReturnable"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4 shadow-sm">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>¿Es retornable?</FormLabel>
                  <p className="text-sm text-muted-foreground">
                    Marque esta casilla si el producto es retornable
                  </p>
                </div>
              </FormItem>
            )}
          />
          <Button type="submit" disabled={!isValid}>
            Crear producto
          </Button>
        </form>
      </Form>
    </div>
  )
}
