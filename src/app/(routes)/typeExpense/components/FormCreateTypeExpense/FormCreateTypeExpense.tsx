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
import { Separator } from "@/components/ui/separator"
import { FormCreateTypeExpenseProps } from "./FormCreateTypeExpense.types"

const formSchema = z.object({
  description: z.string().nonempty("El nombre del tipo de gasto es requerido"),
  hasUnitOfMeasure: z.boolean(),
  unitOfMeasure: z.string().optional(),
})

export function FormCreateTypeExpense(props: FormCreateTypeExpenseProps) {
  const { setOpenModalCreate, createTypeExpense } = props

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
      hasUnitOfMeasure: false,
      unitOfMeasure: "",
    },
    mode: "onChange",
  })

  const { isValid } = form.formState
  const hasUnitOfMeasure = form.watch("hasUnitOfMeasure")

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    createTypeExpense(values)
    setOpenModalCreate(false)
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-2 gap-3">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre del tipo de gasto</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Nombre del tipo de gasto ..."
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
              name="unitOfMeasure"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Unidad de medida</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Nombre de la unidad de medida ..."
                      type="text"
                      {...field}
                      disabled={!hasUnitOfMeasure} // Habilitar o deshabilitar según el valor de hasUnitOfMeasure
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
            name="hasUnitOfMeasure"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4 shadow-sm">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>¿Tiene unidad de medida?</FormLabel>
                  <p className="text-sm text-muted-foreground">
                    Marque esta casilla si el tipo de gasto tiene una unidad de
                    medida
                  </p>
                </div>
              </FormItem>
            )}
          />
          <Button type="submit" disabled={!isValid}>
            Crear tipo de gasto
          </Button>
        </form>
      </Form>
    </div>
  )
}
