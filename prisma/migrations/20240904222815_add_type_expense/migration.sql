-- CreateTable
CREATE TABLE "TypeOfExpense" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "hasUnitOfMeasure" BOOLEAN NOT NULL,
    "unitOfMeasure" TEXT,

    CONSTRAINT "TypeOfExpense_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Expense" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "typeOfExpenseId" INTEGER NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "total" DECIMAL(65,30) NOT NULL,
    "observation" TEXT NOT NULL,

    CONSTRAINT "Expense_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_typeOfExpenseId_fkey" FOREIGN KEY ("typeOfExpenseId") REFERENCES "TypeOfExpense"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
