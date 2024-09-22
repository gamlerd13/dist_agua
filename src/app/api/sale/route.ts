import db from "@/lib/db"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    try {
        const data = await req.json();

        const sale = await db.sale.create({
            data: {
                ...data,
            },
        });

        return NextResponse.json(sale, { status: 201 });
    } catch (error) {
        console.log("[SALE]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function GET() {
    try {
        const sale = await db.sale.findMany({
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
          });

        if (!sale) throw new Error("error");

        const saleClient = sale.map((sale) => ({
            id: sale.id,
            saleDate: sale.saleDate,
            totalRevenue: sale.totalRevenue,
            status: sale.status,
            paymentMethod: sale.paymentMethod,
            notes: sale.notes,
            clientSurnames: sale.client.apellidos,
            clientNames: sale.client.nombres,
            route: sale.client.ruta.name,
            district: sale.client.ruta.distrito.name,
          }))

        return NextResponse.json(saleClient, { status: 200 });
    } catch (error) {
        console.log("[SALE]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}