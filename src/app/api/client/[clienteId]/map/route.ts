import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function PATCH(req: Request, { params }: { params: { clienteId: string } }) {
  try {
    const clienteId = parseInt(params.clienteId);
    const data = await req.json();

    const updatedData = {
      ...data,
    };

    const updatedCliente = await db.cliente.update({
      where: { id: clienteId },
      data: updatedData,
    });

    return NextResponse.json(updatedCliente);
  } catch (error) {
    console.error("Error updating client map:", error);
    return NextResponse.json({ error: "Error updating client map" }, { status: 500 });
  }
}

