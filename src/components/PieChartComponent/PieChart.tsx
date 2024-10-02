'use client'

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

interface ExpenseSummaryProps {
  expensesPerCategory: any;
}

export function PieChartComponent({ expensesPerCategory }: ExpenseSummaryProps) {

  return (
    <ResponsiveContainer width="100%" height="100%">
      < PieChart >
        <Pie
          data={expensesPerCategory}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={150}
          fill="#8884d8"
          dataKey="total"
          label={({ categoria, percent }) => `${categoria} ${(percent * 100).toFixed(0)}%`}
        >
          {expensesPerCategory?.map((entry: any, index: number) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value: number, name: string, props: any) => [`S/ ${value.toLocaleString('es-PE')}`, props.payload.categoria]} />
        <Legend
          formatter={(value: string, entry: any) => entry.payload.categoria}
          layout="vertical"
          align="right"
          verticalAlign="middle" />
      </PieChart >
    </ResponsiveContainer>
  )
}
