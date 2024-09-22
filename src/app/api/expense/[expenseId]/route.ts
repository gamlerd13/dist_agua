import db from "@/lib/db"
import { NextResponse } from "next/server"

export async function PATCH(
    req: Request,
    { params } : { params: {expenseId: string}}
) {
    try {
        const expenseId = parseInt(params.expenseId);
        const values = await req.json()

        const updatedData = {
            ...values,
            typeOfExpenseId: Number(values.typeOfExpenseId),
          };

        const expense = await db.expense.update({
            where: {
                id: expenseId,
            },
            data: updatedData,
        })

        return NextResponse.json(expense)
    } catch (error) {
        console.log("[EXPENSE ID]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function DELETE(req: Request, {params}: {params: {expenseId: string}}) {
    try {
        const expenseId = parseInt(params.expenseId);

        const deletedExpense = await db.expense.delete({
            where: {
                id: expenseId,
            }
        })

        return NextResponse.json(deletedExpense);
    } catch (error) {
        console.log("[DELETE EXPENSE ID]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}