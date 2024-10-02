import { NextResponse } from 'next/server';
import db from "@/lib/db"

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const ventasPendientesRaw = await db.sale.findMany({
      where: { status: 'pending' },
      orderBy: { saleDate: 'asc' },
      take: 5,
      include: {
        client: {
          select: {
            nombres: true,
            apellidos: true,
            ruta: {
              select: {
                name: true,
                distrito: {
                  select: {
                    name: true
                  }
                }
              }
            }
          }
        }
      }
    });

    const clientesActivos = await db.cliente.count({
      where: { isActive: true },
    });

    const pedidosPendientes = await db.sale.count({
      where: { status: 'pending' },
      orderBy: { saleDate: 'asc' },
    });

    const fechaInicioMes = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    const gastosMesActual = await db.expense.aggregate({
      _sum: { total: true },
      where: { date: { gte: fechaInicioMes } },
    });

    const gastosPorCategoria = await db.typeOfExpense.findMany({
      include: {
        expense: {
          where: { date: { gte: fechaInicioMes } },
          select: {
            total: true,
          },
        },
      },
    });

    const totalGastosPorCategoria = gastosPorCategoria.map((categoria) => {
      const total = categoria.expense.reduce((acc, curr) => acc + Number(curr.total), 0);
      return {
        categoria: categoria.description,
        total,
      };
    }).filter((categoria) => categoria.total > 0);

    const ventasPendientes = ventasPendientesRaw.map((expense) => ({
      id: expense.id,
      saleDate: expense.saleDate,
      totalRevenue: expense.totalRevenue,
      status: expense.status,
      nombres: expense.client.nombres,
      apellidos: expense.client.apellidos,
      nameRuta: expense.client.ruta.name,
      nameDistrito: expense.client.ruta.distrito.name,
    }))

    return NextResponse.json({
      ventasPendientes,
      clientesActivos,
      pedidosPendientes: pedidosPendientes,
      gastoTotalDelMes: gastosMesActual._sum.total,
      gastosPorCategoria: totalGastosPorCategoria,
    }, { status: 200 });
  } catch (error) {
    console.error("Error fetching data: ", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
