import db from "@/lib/db"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    try {
        const data = await req.json();
    
        const product = await db.product.create({
          data: {
            ...data,
          },
        });
    
        return NextResponse.json(product, {status:201});
      } catch (error) {
        console.log("[PRODUCT]", error);
        return new NextResponse("Internal Error", { status: 500 });
      }
}

export async function GET() {
  try {  
      const product = await db.product.findMany();

      if(!product) throw new Error("error")

      return NextResponse.json(product, {status:200});
  } catch (error) {
    console.log("[PRODUCT]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}