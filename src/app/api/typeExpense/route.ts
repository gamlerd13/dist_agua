import db from "@/lib/db"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    try {
        const data = await req.json();

        const typeOfExpense = await db.typeOfExpense.create({
            data: {
                ...data,
            },
        });

        return NextResponse.json(typeOfExpense, { status: 201 });
    } catch (error) {
        console.log("[TYPE_OF_EXPENSE]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function GET() {
    try {
        const typeOfExpenses = await db.typeOfExpense.findMany();

        if (!typeOfExpenses) throw new Error("error");

        return NextResponse.json(typeOfExpenses, { status: 200 });
    } catch (error) {
        console.log("[TYPE_OF_EXPENSE]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}