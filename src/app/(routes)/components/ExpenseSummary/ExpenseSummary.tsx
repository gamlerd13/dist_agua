import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChartComponent } from "@/components/PieChartComponent"
import { PiggyBank } from 'lucide-react'

interface ExpenseSummaryProps {
  expensesPerCategory: any;
}

export function ExpenseSummary({ expensesPerCategory }: ExpenseSummaryProps) {
  const [hasExpenses, setHasExpenses] = useState(false)

  useEffect(() => {
    setHasExpenses(expensesPerCategory && expensesPerCategory.length > 0)
  }, [expensesPerCategory])

  return (
    <Card className="md:col-span-2 lg:col-span-2">
      <CardHeader>
        <CardTitle>Resumen de Gastos del Mes</CardTitle>
      </CardHeader>
      <CardContent className="h-[400px] flex items-center justify-center">
        {hasExpenses ? (
          <PieChartComponent expensesPerCategory={expensesPerCategory} />
        ) : (
          <div className="flex flex-col items-center justify-center p-6 rounded-lg shadow-md">
            <PiggyBank className="w-16 h-16 mb-4" />
            <h2 className="text-2xl font-semibold text-center mb-2">
              Aún no se han realizado gastos este mes
            </h2>
          </div>
        )}
      </CardContent>
    </Card>
  )
}