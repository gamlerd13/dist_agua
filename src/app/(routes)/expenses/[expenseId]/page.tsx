import db from "@/lib/db"
import { redirect } from "next/navigation"
import { Header } from "./components/Header"
import { ExpenseInformation } from "./components/ExpenseInformation"
import { FooterExpense } from "./components/FooterExpense"

export default async function ExpenseIdPage({
  params,
}: {
  params: { expenseId: string }
}) {
  const expense = await db.expense.findUnique({
    where: {
      id: parseInt(params.expenseId),
    },
  })

  if (!expense) {
    return redirect("/")
  }

  const expenseInformation = {
    ...expense,
    amount: expense.amount.toNumber(),
    price: expense.price.toNumber(),
    total: expense.total.toString(),
  }

  return (
    <div>
      <Header />
      <ExpenseInformation expense={expenseInformation} />
      <FooterExpense expenseId={expense.id} />
    </div>
  )
}
