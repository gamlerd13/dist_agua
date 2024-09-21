import { toast } from '@/components/ui/use-toast';
import ExcelJS from 'exceljs';

interface SaleDetailData{
  id: number,
  idSale: string,
  date: string,
  clientId: number,
  clientSurnames: string,
  clientNames: string,
  route: string,
  district: string,
  status: string,
  product: string,
  litros: string,
  contentPrice: string,
  botlePrice: string,
  isReturnable: boolean,
  includeBottlePrice: boolean,
  quantity: string,
  revenue: string,
}


const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat("es-PE", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date)
}

export const exportSalesDetails = async (
  salesDetails: SaleDetailData[] | null,
  filters: { startDate: Date; endDate: Date; clientId?: number; status?: string }
) => {
  if (!salesDetails || salesDetails.length === 0) {
    toast({ title: "No hay datos de detalles de ventas para exportar", variant: "destructive", });
    return;
  }

  const { startDate, endDate, clientId, status } = filters;

  const filteredSalesDetail = salesDetails.filter((saleDetail) => {
    const saleDetailDate = new Date(saleDetail.date);
    const isWithinDateRange = saleDetailDate >= startDate && saleDetailDate <= endDate;

    const matchesClient = clientId ? saleDetail.clientId === clientId : true;
    const matchesStatus = status !== 'undefined' ? saleDetail.status === status : true;

    return isWithinDateRange && matchesClient && matchesStatus;
  });

  if (filteredSalesDetail.length === 0) {    
    toast({ title: "No hay datos de detalles de ventas que coincidan con los filtros.", variant: "destructive", });
    return;
  }

  const sortedSalesDetails = [...filteredSalesDetail].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Datos de Detalles de Ventas');

  const columns: Partial<ExcelJS.Column>[] = [
    { header: 'ID', key: 'id', width: 5 },
    { header: 'Fecha', key: 'fecha', width: 16 },
    { header: 'Cliente', key: 'cliente', width: 40 },
    { header: 'Ruta', key: 'ruta', width: 30 },
    { header: 'Producto', key: 'producto', width: 25 },
    { header: 'Precio de contenido', key: 'precioContenido', width: 21 },
    { header: 'Precio de botella', key: 'precioBotella', width: 21 },
    { header: 'Es retornable?', key: 'esRetornable', width: 18 },
    { header: 'Incluye precio de botella?', key: 'incluyePrecioBotella', width: 27 },
    { header: 'Cantidad', key: 'cantidad', width: 15 },
    { header: 'Total', key: 'total', width: 16},    
    { header: 'Estado', key: 'estado', width: 15 },
  ];

  worksheet.columns = columns;

  sortedSalesDetails.forEach((item, index) => {
    let estado = '';
    let estadoColor = '';
    if (item.status === 'completed') {
      estado = 'Completado';
      estadoColor = '008000';
    } else if (item.status === 'pending') {
      estado = 'Pendiente';
      estadoColor = 'FF0000';
    }

    let esRetornable = '';
    let esRetornableColor = '';
    if (item.isReturnable === true) {
      esRetornable = 'Sí';
      esRetornableColor = '008000';
    } else if (item.isReturnable === false) {
      esRetornable = 'No';
      esRetornableColor = 'FF0000';
    }

    let incluyePrecioBotella = '';
    let incluyePrecioBotellaColor = '';
    if (item.includeBottlePrice === true) {
      incluyePrecioBotella = 'Sí';
      incluyePrecioBotellaColor = '008000';
    } else if (item.includeBottlePrice === false) {
      incluyePrecioBotella = 'No';
      incluyePrecioBotellaColor = 'FF0000';
    }

    const row = worksheet.addRow({
      id: index + 1,
      fecha: formatDate(item.date),
      cliente: `${item.clientSurnames}, ${item.clientNames}`,
      ruta: `${item.route} - ${item.district}`,
      producto: `${item.product} - ${item.litros}L`,
      precioContenido: null,
      precioBotella: null,
      esRetornable: esRetornable,
      incluyePrecioBotella: incluyePrecioBotella,
      cantidad: item.quantity,
      total: null,
      estado: estado,
    });

    const totalCell = row.getCell('total');
    const precioContenidoCell = row.getCell('precioContenido');
    const precioBotellaCell = row.getCell('precioBotella');
    totalCell.value = Number(item.revenue);
    precioContenidoCell.value = Number(item.contentPrice);
    precioBotellaCell.value = Number(item.botlePrice);
    totalCell.numFmt = '"S/."#,##0.00';
    precioContenidoCell.numFmt = '"S/."#,##0.00';
    precioBotellaCell.numFmt = '"S/."#,##0.00';

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
    const incluyePrecioBotellaCell = row.getCell('incluyePrecioBotella');
    incluyePrecioBotellaCell.font = { color: { argb: incluyePrecioBotellaColor }, bold: true };
    const esRetornableCell = row.getCell('esRetornable');
    esRetornableCell.font = { color: { argb: esRetornableColor }, bold: true };

    ['id', 'fecha', 'ruta', 'esRetornable', 'incluyePrecioBotella','cantidad', 'estado','incluyePrecioBotella','esRetornable'].forEach(key => {
      row.getCell(key).alignment = { vertical: 'middle', horizontal: 'center' };
    });
  });

  const headerRow = worksheet.getRow(1);
  headerRow.font = { bold: true };
  headerRow.alignment = { vertical: 'middle', horizontal: 'center' };

  const totalRow = worksheet.addRow(['', '', '', '', '', '', '', '', '', '', '']);
  totalRow.font = { bold: true };
  const totalCell = totalRow.getCell(11);
  totalCell.numFmt = '"S/."#,##0.00';
  totalCell.value = { formula: `SUM(K2:K${sortedSalesDetails.length + 1})` };
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
  link.download = 'datos_detalles_ventas.xlsx';
  link.click();

  window.URL.revokeObjectURL(link.href);
};
