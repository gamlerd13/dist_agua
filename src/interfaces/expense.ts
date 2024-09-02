export interface ExpenseMain{
  id?: number,
  description: string,
  date: Date,
  typeOfExpenseId: number,
  amount: number,
  price: number,
  total: string,
  observation: string,
}

export interface ExpenseUnitOfMeasureMain{
  id: number,
  description: string,
  date: Date,
  typeOfExpenseId: number,
  amount: number,
  price: number,
  total: string,
  observation: string,
  unitOfMeasure?: string
}

export type ExpensePost = Omit<ExpenseMain, 'id' | 'date'>
export type Expense = Required<ExpenseMain>

export interface ExpenseEdit{
  id: number,
  description: string,
  date: Date,
  typeOfExpenseId: number,
  amount: string,
  price: string,
  total: string,
  observation: string,
}

export interface ExpenseTypeExpense{
  id: number,
  description: string,
  date: Date,
  typeOfExpense: string,
  amount: number,
  price: number,
  total: string,
  observation: string,
}