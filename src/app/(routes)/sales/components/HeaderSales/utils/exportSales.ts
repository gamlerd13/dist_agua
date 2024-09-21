import { toast } from '@/components/ui/use-toast';
import ExcelJS from 'exceljs';

interface SaleData {
  saleDate: string,
  clientId: number,
  clientNames: string,
  clientSurnames: string,
  route: string,
  district: string,
  totalRevenue: number,
  paymentMethod: string,
  status: string,
  notes?: string,
  businessModel: string,
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat("es-PE", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date)
}

export const exportSales = async (
  sales: SaleData[] | null, 
  filters: { startDate: Date; endDate: Date; clientId?: number; status?: string }
) => {
  if (!sales || sales.length === 0) {
    toast({ title: "No hay datos de ventas para exportar", variant: "destructive", });
    return;
  }

  const { startDate, endDate, clientId, status } = filters;

  const filteredSales = sales.filter((sale) => {
    const saleDate = new Date(sale.saleDate);
    const isWithinDateRange = saleDate >= startDate && saleDate <= endDate;

    const matchesClient = clientId ? sale.clientId === clientId : true;
    const matchesStatus = status !== 'undefined' ? sale.status === status : true;

    return isWithinDateRange && matchesClient && matchesStatus;
  });

  if (filteredSales.length === 0) {    
    toast({ title: "No hay datos de ventas que coincidan con los filtros.", variant: "destructive", });
    return;
  }

  const sortedSales = [...filteredSales].sort((a, b) => new Date(b.saleDate).getTime() - new Date(a.saleDate).getTime());

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Datos de Ventas');

  const columns: Partial<ExcelJS.Column>[] = [
    { header: 'ID', key: 'id', width: 5 },
    { header: 'Fecha', key: 'fecha', width: 16 },
    { header: 'Cliente', key: 'cliente', width: 40 },
    { header: 'Modelo de negocio', key: 'modeloNegocio', width: 25 },
    { header: 'Ruta', key: 'ruta', width: 30 },
    { header: 'Total', key: 'total', width: 18},    
    { header: 'Método de Pago', key: 'metodoPago', width: 20 },
    { header: 'Estado', key: 'estado', width: 15 },
    { header: 'Observaciones', key: 'observaciones', width: 40 },
  ];

  worksheet.columns = columns;

  sortedSales.forEach((item, index) => {
    let estado = '';
    let estadoColor = '';
    if (item.status === 'completed') {
      estado = 'Completado';
      estadoColor = '008000';
    } else if (item.status === 'pending') {
      estado = 'Pendiente';
      estadoColor = 'FF0000';
    }

    const row = worksheet.addRow({
      id: index + 1,
      fecha: formatDate(item.saleDate),
      cliente: `${item.clientSurnames}, ${item.clientNames}`,
      modeloNegocio: item.businessModel || "",
      ruta: `${item.route} - ${item.district}`,
      total: null,
      metodoPago: item.paymentMethod,
      estado: estado,
      observaciones: item.notes || "",
    });

    const totalCell = row.getCell('total');
    totalCell.value = Number(item.totalRevenue);
    totalCell.numFmt = '"S/."#,##0.00';

    row.eachCell({ includeEmpty: true }, (cell) => {
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
    });

    const estadoCell = row.getCell('estado');
    estadoCell.font = { color: { argb: estadoColor }, bold: true };

    ['id', 'fecha', 'ruta', 'metodoPago', 'estado'].forEach(key => {
      row.getCell(key).alignment = { vertical: 'middle', horizontal: 'center' };
    });
  });

  const headerRow = worksheet.getRow(1);
  headerRow.font = { bold: true };
  headerRow.alignment = { vertical: 'middle', horizontal: 'center' };

  const totalRow = worksheet.addRow(['', '', '', '', '', '']);
  totalRow.font = { bold: true };
  const totalCell = totalRow.getCell(6);
  totalCell.numFmt = '"S/."#,##0.00';
  totalCell.value = { formula: `SUM(F2:F${sortedSales.length + 1})` };
  totalCell.alignment = { horizontal: 'right' };
  
  totalCell.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FFFF00' },
  };
  
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.download = 'datos_ventas.xlsx';
  link.click();

  window.URL.revokeObjectURL(link.href);
};