"use client"

import { useEffect } from "react"
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
import { Expense } from "@/interfaces/expense"
import { useExpenseForm } from "./Hooks/useExpenseForm"
import { useWatch } from "react-hook-form"

export function ExpenseForm({ expense }: { expense: Expense }) {
  const expenseWithDateAndDecimal = {
    ...expense,
    amount: expense.amount.toString(),
    price: expense.price.toString(),
    total: expense.total.toString(),
    date: new Date(expense.date),
  }
  const { form, onSubmit, typeExpenses } = useExpenseForm(
    expenseWithDateAndDecimal
  )
  const amount = useWatch({
    control: form.control,
    name: "amount",
  });

  const price = useWatch({
    control: form.control,
    name: "price",
  });

  useEffect(() => {
    const total = parseFloat(amount) * parseFloat(price);
    form.setValue("total", total.toString());
  }, [amount, price, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-2 gap-3">
          <FormField
            control={form.control}
            name="typeOfExpenseId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo de gasto - Unidad de medida</FormLabel>
                <Select
                  onValueChange={(value) => field.onChange(parseInt(value))}
                  defaultValue={field.value.toString()}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona el tipo de gasto" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {typeExpenses?.map((typeExpense) => (
                      <SelectItem
                        key={typeExpense.id}
                        value={typeExpense.id.toString()}
                      >
                        {typeExpense.description}
                        {typeExpense.unitOfMeasure
                          ? ` - ${typeExpense.unitOfMeasure}`
                          : ""}
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
                    placeholder="Descripción del gasto..."
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
                  <Input placeholder="Cantidad..." type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Precio S/.</FormLabel>
                <FormControl>
                  <Input placeholder="Precio..." type="number" {...field} />
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
                  <Input placeholder="Total..." type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fecha de gasto</FormLabel>
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
        </div>
        <FormField
          control={form.control}
          name="observation"
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
        <Button type="submit">Actualizar gasto</Button>
      </form>
    </Form>
  )
}
