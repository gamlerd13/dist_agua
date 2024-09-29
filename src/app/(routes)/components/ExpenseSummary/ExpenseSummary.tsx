import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChartComponent } from "@/components/PieChartComponent"

interface ExpenseSummaryProps {
  expensesPerCategory: any;
}

export function ExpenseSummary({ expensesPerCategory }: ExpenseSummaryProps) {
  return (
    <Card className="md:col-span-2 lg:col-span-2">
      <CardHeader>
        <CardTitle>Resumen de Gastos del Mes</CardTitle>
      </CardHeader>
      <CardContent className="h-[400px] flex items-center justify-center">
        <PieChartComponent expensesPerCategory={expensesPerCategory} />
      </CardContent>
    </Card>
  )
}