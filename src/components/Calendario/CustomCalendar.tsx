"use client";

import { Calendar as CalendarIcon } from "lucide-react"
import { format } from "date-fns";
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area"
import { es } from "date-fns/locale"

interface CalendarioScrollableProps {
  selected: Date | undefined;
  onSelect: (date: Date | undefined) => void;
}

export function CustomCalendar({ selected, onSelect }: CalendarioScrollableProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [month, setMonth] = useState<Date>(selected || new Date());

  useEffect(() => {
    if (selected) {
      setMonth(new Date(selected.getFullYear(), selected.getMonth()));
    }
  }, [selected]);

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setMonth(new Date(date.getFullYear(), date.getMonth()));
      onSelect(date);
    }
    setIsOpen(false);
  };

  return (

    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full font-normal",
            !selected && "text-muted-foreground"
          )}
        >
          {selected ? format(selected, "PPP", { locale: es }) : <span>Selecciona una fecha</span>}
          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          captionLayout="dropdown-buttons"
          selected={selected}
          onSelect={handleDateSelect}
          onDayClick={() => setIsOpen(false)}
          fromYear={1950}
          toYear={new Date().getFullYear()}
          locale={es}
          month={month}
          onMonthChange={setMonth}
        />
      </PopoverContent>
    </Popover>
  );
}