import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function DELETE(req: Request, { params }: { params: { saleDetailId: string } }) {
  try {
    const saleDetailId = parseInt(params.saleDetailId);
    const deletedSaleDetail = await db.saleDetail.delete({
      where: { id: saleDetailId },
    });

    return NextResponse.json(deletedSaleDetail);
  } catch (error) {
    console.error("[DELETE SALE_DETAIL ID]", error);
    return new NextResponse("Error interno", { status: 500 });
  }
}