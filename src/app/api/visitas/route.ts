// api/visitas/route.ts
import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const newVisita = await db.visita.create({
      data,
    });
    return NextResponse.json(newVisita, { status: 201 });
  } catch (error) {
    console.error("Error creating visit:", error);
    return NextResponse.json({ error: "Error creating visit" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const visitas = await db.visita.findMany({
      include: {
        cliente: true,
      }
    });
    return NextResponse.json(visitas);
  } catch (error) {
    console.error("Error fetching visits:", error);
    return NextResponse.json({ error: "Error fetching visits" }, { status: 500 });
  }
}
