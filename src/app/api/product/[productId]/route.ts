import db from "@/lib/db"
import { NextResponse } from "next/server"

export async function PATCH(
    req: Request,
    { params } : { params: {productId: string}}
) {
    try {
        const productId = parseInt(params.productId);
        const values = await req.json()

        const product = await db.product.update({
            where: {
                id: productId,
            },
            data: values,
        })

        return NextResponse.json(product)
    } catch (error) {
        console.log("[PRODUCT ID]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function DELETE(req: Request, {params}: {params: {productId: string}}) {
    try {
        const productId = parseInt(params.productId);

        const deletedProduct = await db.product.delete({
            where: {
                id: productId,
            }
        })

        return NextResponse.json(deletedProduct);
    } catch (error) {
        console.log("[DELETE PRODUCT ID]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}