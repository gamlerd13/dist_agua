import db from "@/lib/db"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    try {
        const data = await req.json();
    
        const location = await db.rutas.create({
          data: {
            ...data,
          },
        });
    
        return NextResponse.json(location, {status:201});
      } catch (error) {
        console.log("[LOCATION]", error);
        return new NextResponse("Internal Error", { status: 500 });
      }
}

export async function GET() {
  try {  
      const location = await db.rutas.findMany({
        include: {
          distrito: true
        }
      });

      if(!location) throw new Error("error")

      const locationDistrict = location.map((ruta) => ({
        id: ruta.id,
        name: ruta.name,
        distrito: ruta.distrito.name
      }))

      return NextResponse.json(locationDistrict, {status:200});
  } catch (error) {
    console.log("[LOCATION]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}