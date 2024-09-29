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
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { useTypeExpenseForm } from "./Hooks/useTypeExpenseForm"
import { TypeExpense } from "@/interfaces/typeExpense"
import { useEffect } from "react"
import { useWatch } from "react-hook-form"

export function TypeExpenseForm({ typeExpense }: { typeExpense: TypeExpense }) {
  const { form, onSubmit } = useTypeExpenseForm(typeExpense)

  const hasUnitOfMeasure = useWatch({
    control: form.control,
    name: "hasUnitOfMeasure",
  });

  useEffect(() => {
    if (!hasUnitOfMeasure) {
      form.setValue("unitOfMeasure", "");
    }
  }, [hasUnitOfMeasure, form]);

  return (
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
                    disabled={!form.watch("hasUnitOfMeasure")}
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
        <Button type="submit">Actualizar tipo de gasto</Button>
      </form>
    </Form>
  )
}
