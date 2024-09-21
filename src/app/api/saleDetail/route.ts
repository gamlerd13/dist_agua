import db from "@/lib/db"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    try {
        const data = await req.json();
        console.log(data)
        const saleDetail = await db.saleDetail.create({
            data: {
                ...data,
            },
        });

        return NextResponse.json(saleDetail, { status: 201 });
    } catch (error) {
        console.log("[SALE_DETAIL]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function GET() {
    try {
        const saleDetail = await db.saleDetail.findMany({
            include: {
                sale: {
                    include: {
                        client: {
                            include: {
                                ruta: {
                                    include: {
                                        distrito: true
                                    }
                                }
                            }
                        }
                    }
                },
                product: true
            }
          });

        if (!saleDetail) throw new Error("error");

        const saleDetailSale = saleDetail.map((saleDetail) => ({
            id: saleDetail.id,
            idSale: saleDetail.saleId,
            date: saleDetail.sale.saleDate,
            clientId: saleDetail.sale.clientId,
            clientSurnames: saleDetail.sale.client.apellidos,
            clientNames: saleDetail.sale.client.nombres,
            route: saleDetail.sale.client.ruta.name,
            district: saleDetail.sale.client.ruta.distrito.name,
            status: saleDetail.sale.status,
            product: saleDetail.product.name,
            litros: saleDetail.product.litros,
            contentPrice: saleDetail.product.contentPrice,
            botlePrice: saleDetail.product.botlePrice,
            isReturnable: saleDetail.product.isReturnable,
            includeBottlePrice: saleDetail.includeBottlePrice,
            quantity: saleDetail.quantity,
            revenue: saleDetail.revenue,
          }))

        return NextResponse.json(saleDetailSale, { status: 200 });
    } catch (error) {
        console.log("[SALE_DETAIL]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}