import { ExpenseForm } from "../ExpenseForm"
import { ExpenseInformationProps } from "./ExpenseInformation.types"

export function ExpenseInformation(props: ExpenseInformationProps) {
  const { expense } = props
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-10 mt-2">
      <div className="rounded-lg bg-background shadow-md hover:shadow-lg p-4">
        <ExpenseForm expense={expense} />
      </div>
    </div>
  )
}
