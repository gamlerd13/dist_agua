import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const saleId = searchParams.get("saleId");
    if (!saleId) {
        return new NextResponse("Sale ID is required", { status: 400 });
    }

    try {
        const saleDetail = await db.saleDetail.findMany({
            where: {
                saleId: parseInt(saleId),
            },
            include: {
                product: true,
            },
        });

        const saleDetailSale = saleDetail.map((detail) => ({
            id: detail.id,
            sale: detail.saleId,
            name: detail.product.name,
            litros: detail.product.litros,
            botlePrice: detail.product.botlePrice,
            contentPrice: detail.product.contentPrice,
            includeBottlePrice: detail.includeBottlePrice,
            quantity: detail.quantity,
            revenue: detail.revenue,
        }));

        return NextResponse.json(saleDetailSale, { status: 200 });
    } catch (error) {
        console.log("[SALE_DETAIL]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
