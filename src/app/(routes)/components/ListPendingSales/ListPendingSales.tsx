import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DashboardData } from "@/interfaces/dashboard";

interface ListPendingSalesProps {
  ventasPendientes: DashboardData['ventasPendientes'];
}

export function ListPendingSales({ ventasPendientes }: ListPendingSalesProps) {

  const formatDate = (dateString: Date) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('es-PE', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }).format(date);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-PE", {
      style: "currency",
      currency: "PEN",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Ventas Pendientes (5 más antiguas)</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-center items-center">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Fecha</TableHead>
              <TableHead>Nombre y Apellidos</TableHead>
              <TableHead>Ruta</TableHead>
              <TableHead>Distrito</TableHead>
              <TableHead className="text-right">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ventasPendientes?.map((sale) => (
              <TableRow key={sale.id}>
                <TableCell>{formatDate(sale.saleDate)}</TableCell>
                <TableCell>{sale.apellidos}, {sale.nombres}</TableCell>
                <TableCell>{sale.nameRuta}</TableCell>
                <TableCell>{sale.nameDistrito}</TableCell>
                <TableCell className="text-right">{formatCurrency(sale.totalRevenue)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card >
  )
}