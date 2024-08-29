// api/clientes/route.ts
import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET() {
  try {
    const clientes = await db.cliente.findMany({
      include: {
        distrito: true,
        rutas: true,
      }
    });

    if (!clientes) throw new Error("No se encontraron clientes");

    const clientesConDetalles = clientes.map(cliente => ({
      id: cliente.id,
      nombres: cliente.nombres,
      apellidos: cliente.apellidos,
      fechaCumple: cliente.fechaCumple,
      telefono: cliente.telefono,
      direccion: cliente.direccion,
      distrito: cliente.distrito.name,
      modeloNegocio: cliente.modeloNegocio,
      coordenadaX: cliente.coordenadaX,
      coordenadaY: cliente.coordenadaY,
      isActive: cliente.isActive,
      createdAt: cliente.createdAt,
      updatedAt: cliente.updatedAt,
    }));
    console.log("CD:", clientesConDetalles)
    return NextResponse.json(clientesConDetalles, { status: 200 });
  } catch (error) {
    console.error("Error fetching clients:", error);
    return NextResponse.json({ error: "Error fetching clients" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const fechaCumple = new Date(data.fechaCumple).toISOString();

    const newCliente = await db.cliente.create({
      data: {
        ...data,
        fechaCumple,
      },
    });
    return NextResponse.json(newCliente, { status: 201 });
  } catch (error) {
    console.error("Error creating client:", error);
    return NextResponse.json({ error: "Error creating client" }, { status: 500 });
  }
}
