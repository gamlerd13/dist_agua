import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, PackageCheck, Wallet } from 'lucide-react';

interface KPIIndicatorProps {
  activeClients: number | null | undefined;
  pendingSales: number | null | undefined;
  totalExpenses: number | null | undefined;
}

export function KPIIndicator({ activeClients, pendingSales, totalExpenses }: KPIIndicatorProps) {

  return (
    <Card className="md:col-span-1 lg:col-span-1">
      <CardHeader>
        <CardTitle>Indicadores KPI</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="flex flex-col justify-between h-full gap-4">
          <div className="flex flex-col items-center text-center">
            <Users className="h-8 w-8 text-blue-500 mb-2" />
            <p className="text-sm font-medium text-muted-foreground">Clientes Activos</p>
            <p className="text-2xl font-bold">
              {((activeClients !== null && activeClients !== undefined) ? activeClients : 0)}
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <PackageCheck className="h-8 w-8 text-green-500 mb-2" />
            <p className="text-sm font-medium text-muted-foreground">Pedidos Pendientes</p>
            <p className="text-2xl font-bold">
              {((pendingSales !== null && pendingSales !== undefined) ? pendingSales : 0)}
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <Wallet className="h-8 w-8 text-red-500 mb-2" />
            <p className="text-sm font-medium text-muted-foreground">Gastos del Mes</p>
            <p className="text-2xl font-bold">
              S/ {((totalExpenses !== null && totalExpenses !== undefined) ? totalExpenses.toLocaleString('es-PE', { minimumFractionDigits: 2 }) : 0)}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}