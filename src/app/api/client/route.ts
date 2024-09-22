import db from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const fechaCumple = new Date(data.fechaCumple).toISOString();
    const coordenadaX = 0
    const coordenadaY = 0
    const newCliente = await db.cliente.create({
      data: {
        ...data,
        fechaCumple,
        coordenadaX,
        coordenadaY,
      },
    });
    return NextResponse.json(newCliente, { status: 201 });
  } catch (error) {
    console.error("Error creating client:", error);
    return NextResponse.json({ error: "Error creating client" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const clients = await db.cliente.findMany({
      include: {
        ruta: {
          include: {
            distrito: true
          }
        }
      }
    });

    if (!clients) throw new Error("error")

    const clientLocation = clients.map(client => ({
      id: client.id,
      nombres: client.nombres,
      apellidos: client.apellidos,
      fechaCumple: client.fechaCumple,
      telefono: client.telefono,
      direccion: client.direccion,
      modeloNegocio: client.modeloNegocio,
      coordenadaX: client.coordenadaX,
      coordenadaY: client.coordenadaY,
      rutaId: client.rutaId,
      ruta: client.ruta.name,
      distrito: client.ruta.distrito.name,
      pedidoConcurrencia: client.pedidoConcurrencia,
      isActive: client.isActive,
    }));
    return NextResponse.json(clientLocation, { status: 200 });
  } catch (error) {
    console.error("Error fetching clients:", error);
    return NextResponse.json({ error: "Error fetching clients" }, { status: 500 });
  }
}
