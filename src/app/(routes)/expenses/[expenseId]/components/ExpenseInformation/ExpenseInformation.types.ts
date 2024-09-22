export type ExpenseInformationProps = {
  expense: {
    id: number,
    description: string,
    date: Date,
    typeOfExpenseId: number,
    amount: number,
    price: number,
    total: string,
    observation: string,
  };
}