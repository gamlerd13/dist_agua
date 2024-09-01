"use client"

import { HeaderExpenses } from "./components/HeaderExpenses"
import { ListExpenses } from "./components/ListExpenses"

export default function ExpensesPage() {
  return (
    <div>
      <HeaderExpenses />
      <ListExpenses />
    </div>
  )
}
