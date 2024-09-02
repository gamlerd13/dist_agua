"use client"

import { useEffect } from "react"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { Calendar as CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
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
import { cn } from "@/lib/utils"
import { Expense } from "@/interfaces/expense"
import { useExpenseForm } from "./Hooks/useExpenseForm"

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

  useEffect(() => {
    const amount = parseFloat(form.watch("amount")) || 0
    const price = parseFloat(form.watch("price")) || 0
    const total = amount * price
    form.setValue("total", total.toString())
  }, [form.watch("amount"), form.watch("price")])

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
                <FormLabel>Fecha</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP", { locale: es })
                        ) : (
                          <span>Selecciona una fecha</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                      locale={es}
                    />
                  </PopoverContent>
                </Popover>
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
