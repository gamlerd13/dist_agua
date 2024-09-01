export interface TypeExpenseMain{
  id?: number,
  description: string,
  hasUnitOfMeasure: boolean,
  unitOfMeasure?: string,
}

export type TypeExpensePost = Omit<TypeExpenseMain, 'id'>
export type TypeExpense = Required<TypeExpenseMain>