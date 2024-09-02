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
import { FormCreateExpenseProps } from "./FormCreateExpense.types"
import { useState, useEffect } from "react"

const formSchema = z.object({
  description: z.string(),
  typeOfExpenseId: z.number().int(),
  amount: z
    .string()
    .nonempty("La cantidad es requerida")
    .transform((value) => Number(value)),
  price: z
    .string()
    .nonempty("El precio es requerido")
    .transform((value) => Number(value)),
  total: z.string(),
  observation: z.string(),
})

export function FormCreateExpense(props: FormCreateExpenseProps) {
  const { setOpenModalCreate, createExpense, typeExpense } = props

  const [unitOfMeasure, setUnitOfMeasure] = useState<string | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
      typeOfExpenseId: undefined,
      amount: 0,
      price: 0,
      total: "0",
      observation: "",
    },
    mode: "onChange",
  })

  const { isValid } = form.formState

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    createExpense(values)
    setOpenModalCreate(false)
  }

  const handleSelectChange = (value: string) => {
    const selectedType = typeExpense?.find(
      (expense) => expense.id.toString() === value
    )
    setUnitOfMeasure(selectedType?.unitOfMeasure || null)
    form.setValue("typeOfExpenseId", parseInt(value))
    if (selectedType) {
      form.setValue("description", selectedType.description)
    }
  }

  useEffect(() => {
    const amount = form.watch("amount")
    const price = form.watch("price")
    const total = amount * price
    form.setValue("total", total.toString())
  }, [form.watch("amount"), form.watch("price")])

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-2 gap-3">
            <FormField
              control={form.control}
              name="typeOfExpenseId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de gasto</FormLabel>
                  <Select
                    onValueChange={handleSelectChange}
                    defaultValue={field.value?.toString()}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona el tipo de gasto" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {typeExpense?.map((typeExpense) => (
                        <SelectItem
                          key={typeExpense.id}
                          value={typeExpense.id.toString()}
                        >
                          {typeExpense.description}
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
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripción del gasto</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Descripción del gasto ..."
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
              name="amount"
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
            <FormItem>
              <FormLabel>Unidad de medida</FormLabel>
              <FormControl>
                <Input value={unitOfMeasure || ""} type="text" disabled />
              </FormControl>
            </FormItem>
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Precio S/.</FormLabel>
                  <FormControl>
                    <Input placeholder="Precio ..." type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="total"
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
            name="observation"
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
          <Button type="submit" disabled={!isValid}>
            Crear gasto
          </Button>
        </form>
      </Form>
    </div>
  )
}
