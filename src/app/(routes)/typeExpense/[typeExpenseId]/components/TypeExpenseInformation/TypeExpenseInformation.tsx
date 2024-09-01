import { TypeExpenseForm } from "../TypeExpenseForm"
import { TypeExpenseInformationProps } from "./TypeExpenseInformation.types"

export function TypeExpenseInformation(props: TypeExpenseInformationProps) {
  const { typeExpense } = props
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-10 mt-2">
      <div className="rounded-lg bg-background shadow-md hover:shadow-lg p-4">
        <div>
          <TypeExpenseForm typeExpense={typeExpense} />
        </div>
      </div>
    </div>
  )
}
