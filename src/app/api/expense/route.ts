import db from "@/lib/db"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    try {
        const data = await req.json();

        const expense = await db.expense.create({
            data: {
                ...data,
            },
        });

        return NextResponse.json(expense, { status: 201 });
    } catch (error) {
        console.log("[EXPENSE]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function GET() {
    try {
        const expense = await db.expense.findMany({
            include: {
              typeOfExpense: true
            }
          });

        if (!expense) throw new Error("error");

        const expenseTypeExpense = expense.map((expense) => ({
            id: expense.id,
            description: expense.description,
            date: expense.date,
            amount: expense.amount,
            price: expense.price,
            total: expense.total,
            observation: expense.observation,
            typeOfExpense: expense.typeOfExpense.description,
            unitOfMeasure: expense.typeOfExpense.unitOfMeasure,
          }))

        return NextResponse.json(expenseTypeExpense, { status: 200 });
    } catch (error) {
        console.log("[EXPENSE]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}