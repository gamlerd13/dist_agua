export interface DashboardData {
  ventasPendientes: VentaPendiente[] | undefined;
  clientesActivos: number;
  pedidosPendientes: number;
  gastoTotalDelMes: number;
  gastosPorCategoria: { categoria: string; total: number }[];
}

interface VentaPendiente {
  id: number;
  saleDate: Date;
  totalRevenue: number;
  status: 'completed' | 'pending';
  nombres: string;
  apellidos: string;
  nameRuta: string;
  nameDistrito: string;
};