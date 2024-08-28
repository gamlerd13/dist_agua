// api/clientes/[clienteId]/route.ts
import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function PATCH(req: Request, { params }: { params: { clienteId: string } }) {
  try {


    const clienteId = parseInt(params.clienteId);
    console.log("clienteAPI:", clienteId)
    const data = await req.json();

    // Asegúrate de que los datos sean del tipo correcto
    const updatedData = {
      ...data,
      coordenadaX: parseFloat(data.coordenadaX),
      coordenadaY: parseFloat(data.coordenadaY),
      fechaCumple: new Date(data.fechaCumple), // Convierte a Date
    };

    const updatedCliente = await db.cliente.update({
      where: { id: clienteId },
      data: updatedData,
    });

    return NextResponse.json(updatedCliente);
  } catch (error) {
    console.error("Error updating client:", error);
    return NextResponse.json({ error: "Error updating client" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { clienteId: string } }) {
  try {
    console.log("delete: ", params.clienteId)
    const clienteId = parseInt(params.clienteId);

    // No se actualiza el cliente sino que se elimina, por lo que usaremos delete en lugar de update
    const deletedCliente = await db.cliente.delete({
      where: { id: clienteId },
    });

    return NextResponse.json(deletedCliente);
  } catch (error) {
    console.error("Error deleting client:", error);
    return NextResponse.json({ error: "Error deleting client" }, { status: 500 });
  }
}

export async function GET(req: Request, { params }: { params: { clienteId: string } }) {
  try {
    const clienteId = parseInt(params.clienteId);
    const cliente = await db.cliente.findUnique({
      where: { id: clienteId },
      include: {
        distrito: true,
        rutas: true,
        visitas: true,
      }
    });

    if (!cliente) {
      return NextResponse.json({ error: "Client not found" }, { status: 404 });
    }

    return NextResponse.json(cliente);
  } catch (error) {
    console.error("Error fetching client details:", error);
    return NextResponse.json({ error: "Error fetching client details" }, { status: 500 });
  }
}
