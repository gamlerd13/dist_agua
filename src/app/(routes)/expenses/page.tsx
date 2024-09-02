"use client"

import { HeaderExpenses } from "./components/HeaderExpenses"
import { ListExpenses } from "./components/ListExpenses"
import useExpense from "./components/Hooks/useExpense"
import useTypeExpense from "./Hooks/useTypeExpense"

export default function ExpensesPage() {
  const { expense, createExpense } = useExpense()
  const { typeExpense } = useTypeExpense()

  return (
    <div>
      <HeaderExpenses createExpense={createExpense} typeExpense={typeExpense} />
      <ListExpenses expense={expense} />
    </div>
  )
}
