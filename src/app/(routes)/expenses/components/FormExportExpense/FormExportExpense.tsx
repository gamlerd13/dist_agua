import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { FormExportExpenseProps } from "./FormExportExpense.types";
import { exportExpenses } from "../HeaderExpenses/utils/exportExpense";
import { CustomCalendar } from "@/components/Calendario/CustomCalendar";

const formSchema = z.object({
  startDate: z.date(),
  endDate: z.date(),
  expenseType: z.string(),
});

export function FormExportExpense({ setOpenModalExportExpense, expenses, typeExpense }: FormExportExpenseProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      startDate: undefined,
      endDate: undefined,
      expenseType: "all",  // Valor por defecto para todos los tipos de gasto
    },
    mode: "onChange",
  });

  const { isValid } = form.formState;

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const filters = {
      startDate: values.startDate,
      endDate: values.endDate,
      expenseType: values.expenseType,
    };
    exportExpenses(expenses, filters);
    setOpenModalExportExpense(false);
  };

  return (
    <Form {...form} >
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8" >
        <div className="grid grid-cols-2 gap-3" >
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fecha de Inicio </FormLabel>
                < CustomCalendar
                  selected={field.value ? new Date(field.value) : undefined}
                  onSelect={field.onChange}
                />
                <FormMessage />
              </FormItem>
            )
            }
          />
          < FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fecha de Fin </FormLabel>
                < CustomCalendar
                  selected={field.value ? new Date(field.value) : undefined}
                  onSelect={field.onChange}
                />
                <FormMessage />
              </FormItem>
            )}
          />
          {/*< FormField
            control={form.control}
            name="expenseType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo de Gasto </FormLabel>
                < Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona el tipo de gasto" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="all" > Todos los tipos de gasto </SelectItem>
                    {
                      typeExpense?.map((typeExpense) => (
                        <SelectItem
                          key={typeExpense.id}
                          value={typeExpense.id.toString()}
                        >
                          {typeExpense.description}
                        </SelectItem>
                      ))
                    }
                  </SelectContent>
                </Select>
                < FormMessage />
              </FormItem>
            )}
          />*/}
        </div>
        < Button type="submit" disabled={!isValid}>
          Exportar gastos
        </Button>
      </form>
    </Form>
  );
}
