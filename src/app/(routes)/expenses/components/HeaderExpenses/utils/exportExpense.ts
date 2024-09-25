import { toast } from '@/components/ui/use-toast';
import { ExpenseTypeExpense } from '@/interfaces/expense';
import ExcelJS from 'exceljs';

const formatDate = (dateDate: Date): string => {
  const date = new Date(dateDate)
  return new Intl.DateTimeFormat("es-PE", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date)
}

export const exportExpenses = async (
  expenses: ExpenseTypeExpense[] | null,
  filters: { startDate: Date; endDate: Date; expenseType?: string }
) => {
  if (!expenses || expenses.length === 0) {
    toast({ title: 'No hay datos de gastos para exportar', variant: 'destructive' });
    return;
  }

  const { startDate, endDate, expenseType } = filters;

  const filteredExpenses = expenses.filter((expense) => {

    const expenseDate = new Date(expense.date);
    const isWithinDateRange = expenseDate >= startDate && expenseDate <= endDate;
    const matchesExpenseType = expenseType === "all" || (expenseType ? expense.typeOfExpenseId === parseInt(expenseType) : true);
    return isWithinDateRange && matchesExpenseType;
  });
  console.log(filteredExpenses);

  if (filteredExpenses.length === 0) {
    toast({ title: 'No hay datos de gastos que coincidan con los filtros.', variant: 'destructive' });
    return;
  }

  const sortedExpenses = [...filteredExpenses].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Datos de Gastos');

  const columns: Partial<ExcelJS.Column>[] = [
    { header: 'Fecha', key: 'fecha', width: 16 },
    { header: 'Descripción', key: 'descripcion', width: 40 },
    { header: 'Tipo de Gasto', key: 'tipoGasto', width: 25 },
    { header: 'Cantidad', key: 'cantidad', width: 15 },
    { header: 'Precio', key: 'precio', width: 15 },
    { header: 'Total', key: 'total', width: 15 },
    { header: 'Observaciones', key: 'observaciones', width: 40 },
  ];

  worksheet.columns = columns;

  sortedExpenses.forEach((item) => {
    console.log(item);
    const row = worksheet.addRow({
      fecha: formatDate(item.date),
      descripcion: item.description,
      tipoGasto: item.typeOfExpense || '',
      cantidad: Number(item.amount),
      precio: Number(item.price),
      total: Number(item.total),
      observaciones: item.observation || '',
    });

    ['fecha', 'cantidad', 'precio', 'total'].forEach((key) => {
      row.getCell(key).alignment = { vertical: 'middle', horizontal: 'center' };
    });

    row.getCell('precio').numFmt = '"S/."#,##0.00';
    row.getCell('total').numFmt = '"S/."#,##0.00';

    row.eachCell({ includeEmpty: true }, (cell: any) => {
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
    });
  });

  const headerRow = worksheet.getRow(1);
  headerRow.font = { bold: true };
  headerRow.alignment = { vertical: 'middle', horizontal: 'center' };

  const totalRow = worksheet.addRow(['', '', '', '', '', '']);
  totalRow.font = { bold: true };
  const totalCell = totalRow.getCell(6);
  totalCell.numFmt = '"S/."#,##0.00';
  totalCell.value = { formula: `SUM(F2:F${sortedExpenses.length + 1})` };
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
  link.download = 'datos_gastos.xlsx';
  link.click();

  window.URL.revokeObjectURL(link.href);
};
