import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function PATCH(req: Request, { params }: { params: { clienteId: string } }) {
  try {


    const clienteId = parseInt(params.clienteId);
    console.log("clienteAPI:", clienteId)
    const data = await req.json();

    const updatedData = {
      ...data,
      fechaCumple: new Date(data.fechaCumple),
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
        ruta: true,
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
