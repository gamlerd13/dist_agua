import { useState } from "react"
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react"
import { format, addYears, subYears, addMonths, subMonths } from "date-fns"
import { es } from "date-fns/locale"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface CalendarioScrollableProps {
  selected: Date | undefined;
  onSelect: (date: Date | undefined) => void;
}

export default function CalendarioScrollable({ selected, onSelect }: CalendarioScrollableProps) {
  const [month, setMonth] = useState<Date>(new Date())

  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: currentYear - 1949 }, (_, i) => currentYear - i)
  const months = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ]

  const handleYearChange = (year: string) => {
    setMonth(new Date(parseInt(year), month.getMonth()))
  }

  const handleMonthChange = (monthIndex: string) => {
    setMonth(new Date(month.getFullYear(), parseInt(monthIndex)))
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !selected && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {selected ? format(selected, "PPP", { locale: es }) : <span>Selecciona una fecha</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="center">
        <div className="flex items-center justify-between space-x-2 p-3 border-b">
          <Button
            variant="outline"
            size="icon"
            className="h-7 w-7"
            onClick={() => setMonth(subYears(month, 1))}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Select onValueChange={handleYearChange} value={month.getFullYear().toString()}>
            <SelectTrigger className="w-[95px]">
              <SelectValue>{month.getFullYear()}</SelectValue>
            </SelectTrigger>
            <SelectContent className="max-h-[200px] overflow-y-auto">
              {years.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            size="icon"
            className="h-7 w-7"
            onClick={() => setMonth(addYears(month, 1))}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center justify-between space-x-2 p-3 border-b">
          <Button
            variant="outline"
            size="icon"
            className="h-7 w-7"
            onClick={() => setMonth(subMonths(month, 1))}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Select onValueChange={handleMonthChange} value={month.getMonth().toString()}>
            <SelectTrigger className="w-[130px]">
              <SelectValue>{months[month.getMonth()]}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              {months.map((monthName, index) => (
                <SelectItem key={monthName} value={index.toString()}>
                  {monthName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            size="icon"
            className="h-7 w-7"
            onClick={() => setMonth(addMonths(month, 1))}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <Calendar
          mode="single"
          selected={selected}
          onSelect={onSelect}
          month={month}
          onMonthChange={setMonth}
          className="rounded-md border-none"
          locale={es}
        />
      </PopoverContent>
    </Popover>
  )
}