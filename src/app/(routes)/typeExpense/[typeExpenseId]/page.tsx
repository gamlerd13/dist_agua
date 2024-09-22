import db from "@/lib/db"
import { redirect } from "next/navigation"

import { Header } from "./components/Header"
import { TypeExpenseInformation } from "./components/TypeExpenseInformation"
import { FooterTypeExpense } from "./components/FooterTypeExpense"

export default async function TypeExpensePage({
  params,
}: {
  params: { typeExpenseId: string }
}) {
  const typeExpense = await db.typeOfExpense.findUnique({
    where: {
      id: parseInt(params.typeExpenseId),
    },
  })
  if (!typeExpense) {
    return redirect("/")
  }
  const normalizedTypeExpense = {
    ...typeExpense,
    unitOfMeasure: typeExpense.unitOfMeasure || "",
  }
  return (
    <div>
      <Header />
      <TypeExpenseInformation typeExpense={normalizedTypeExpense} />
      <FooterTypeExpense typeExpenseId={typeExpense.id} />
    </div>
  )
}
