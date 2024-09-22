import db from "@/lib/db"
import { NextResponse } from "next/server"

export async function PATCH(
    req: Request,
    { params } : { params: {saleId: string}}
) {
    try {
        const saleId = parseInt(params.saleId);
        const values = await req.json()

        const updatedData = {
            ...values,
            clientId: Number(values.clientId),
          };

        const sale = await db.sale.update({
            where: {
                id: saleId,
            },
            data: updatedData,
        })

        return NextResponse.json(sale)
    } catch (error) {
        console.log("[SALE ID]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function DELETE(req: Request, {params}: {params: {saleId: string}}) {
    try {
        const saleId = parseInt(params.saleId);

        const deletedsale = await db.sale.delete({
            where: {
                id: saleId,
            }
        })

        return NextResponse.json(deletedsale);
    } catch (error) {
        console.log("[DELETE SALE ID]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}