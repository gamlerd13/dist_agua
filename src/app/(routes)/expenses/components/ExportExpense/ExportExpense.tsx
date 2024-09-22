"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import axios from 'axios'
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export default function ExportExpense() {
  const [isOpen, setIsOpen] = useState(false);
  const [resumeType, setResumeType] = useState<string | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleExport = async () => {
    if (!selectedYear) return;

    setLoading(true);
    try {
      const response = await axios.post("/api/expense/export", {
        year: parseInt(selectedYear!),
        month: resumeType === "month" ? months.indexOf(selectedMonth!) + 1 : undefined,
      },
        {
          responseType: "blob", // Importante para manejar archivos binarios
        }
      );
      if (response.status === 200) {
        const blob = new Blob([response.data]);
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `reporte_${selectedMonth || "año"}_${selectedYear}.xlsx`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url)
      } else {
        console.error("Failed to export the file");
      }
    } catch (error) {
      console.error("Error during export:", error);
    } finally {
      setLoading(false);
      setIsOpen(false);
      setResumeType(null);
      setSelectedMonth(null);
      setSelectedYear(null);
    }
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear - i);
  const months = Array.from({ length: 12 }, (_, i) =>
    format(new Date(0, i), 'LLLL', { locale: es })
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Exportar</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Exportar</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="resume-type" className="text-right">
              Reporte
            </Label>
            <Select onValueChange={(value: "month" | "year") => setResumeType(value)}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Seleccionar tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="month">Mensual</SelectItem>
                <SelectItem value="year">Anual</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {resumeType === "month" && (
            <>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="month" className="text-right">
                  Mes
                </Label>
                <Select onValueChange={setSelectedMonth}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Seleccionar" />
                  </SelectTrigger>
                  <SelectContent>
                    {months.map((month, index) => (
                      <SelectItem key={index} value={month}>
                        {month}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="year" className="text-right">
                  Año
                </Label>
                <Select onValueChange={setSelectedYear}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Seleccionar año" />
                  </SelectTrigger>
                  <SelectContent>
                    {years.map((year) => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </>
          )}
          {resumeType === "year" && (
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="year" className="text-right">
                Year
              </Label>
              <Select onValueChange={setSelectedYear}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent>
                  {years.map((year) => (
                    <SelectItem key={year} value={year.toString()}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
        <Button
          onClick={handleExport}
          disabled={
            !resumeType ||
            (resumeType === "month" && (!selectedMonth || !selectedYear)) ||
            (resumeType === "year" && !selectedYear) ||
            loading
          }
        >
          {loading ? "Exporting..." : "Export"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
