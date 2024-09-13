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