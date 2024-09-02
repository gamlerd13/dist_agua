import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import axios from "axios";
import { z } from "zod";

import { toast } from "@/components/ui/use-toast";

import useTypeExpense from "../../../../Hooks/useTypeExpense"
import { ExpenseEdit } from "@/interfaces/expense";
import { formSchema } from "./ExpenseForm.form";

export function useExpenseForm(expense: ExpenseEdit) {
  const router = useRouter();
  const { typeExpense: typeExpenses } = useTypeExpense();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: expense.description,
      date: expense.date,
      typeOfExpenseId: expense.typeOfExpenseId,
      amount: parseFloat(expense.amount).toString(),
      price: parseFloat(expense.price).toString(),
      total: parseFloat(expense.total).toString(),
      observation: expense.observation,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/expense/${expense.id}`, values);
      toast({
        title: "Gasto actualizado!",
      });
      router.refresh();
    } catch (error) {
      toast({
        title: "Something went wrong",
        variant: "destructive",
      });
    }
  };

  return { form, onSubmit, typeExpenses };
}
