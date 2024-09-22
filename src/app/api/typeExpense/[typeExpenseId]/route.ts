import db from "@/lib/db"
import { NextResponse } from "next/server"

export async function PATCH(
    req: Request,
    { params } : { params: {typeExpenseId: string}}
) {
    try {
        const typeExpenseId = parseInt(params.typeExpenseId);
        const values = await req.json()

        const typeExpense = await db.typeOfExpense.update({
            where: {
                id: typeExpenseId,
            },
            data: values,
        })

        return NextResponse.json(typeExpense)
    } catch (error) {
        console.log("[TYPE_EXPENSE ID]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function DELETE(req: Request, {params}: {params: {typeExpenseId: string}}) {
    try {
        const typeExpenseId = parseInt(params.typeExpenseId);

        const deletedTypeExpense = await db.typeOfExpense.delete({
            where: {
                id: typeExpenseId,
            }
        })

        return NextResponse.json(deletedTypeExpense);
    } catch (error) {
        console.log("[DELETE TYPE_EXPENSE ID]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}