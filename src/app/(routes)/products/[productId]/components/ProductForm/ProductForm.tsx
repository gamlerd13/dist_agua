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
import { Product, ProductEdit } from "@/interfaces/product"
import { useProductForm } from "./Hooks/useProductForm"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"

export function ProductForm({ product }: { product: Product }) {
  const productWithDecimal = {
    ...product,
    botlePrice: product.botlePrice.toString(),
    contentPrice: product.contentPrice.toString(),
  }
  const { form, onSubmit } = useProductForm(productWithDecimal)

  return (
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
        <Button type="submit">Actualizar producto</Button>
      </form>
    </Form>
  )
}
