"use client"

import { HeaderTypeExpense } from "./components/HeaderTypeExpense"
import { ListTypeExpense } from "./components/ListTypeExpense"

import useTypeExpense from "./components/Hooks/useTypeExpense"

export default function TypeExpensePage() {
  const { typeExpense, createTypeExpense } = useTypeExpense()
  return (
    <div>
      <HeaderTypeExpense createTypeExpense={createTypeExpense} />
      <ListTypeExpense typeExpense={typeExpense} />
    </div>
  )
}
