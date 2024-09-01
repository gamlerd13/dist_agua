import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import axios from "axios"
import { z } from "zod"

import { toast } from "@/components/ui/use-toast"
import { TypeExpense } from "@/interfaces/typeExpense"
import { formSchema } from "./TypeExpenseForm.form"

export function useTypeExpenseForm(typeExpense: TypeExpense) {
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: typeExpense.description,
      hasUnitOfMeasure: typeExpense.hasUnitOfMeasure,
      unitOfMeasure: typeExpense.unitOfMeasure,
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/typeExpense/${typeExpense.id}`, values)
      toast({
        title: "Tipo de gasto actualizado!",
      })
      router.refresh()
    } catch (error) {
      toast({
        title: "Something went wrong",
        variant: "destructive",
      })
    }
  }

  return { form, onSubmit }
}
