
import React from 'react';
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useLanguage } from "@/context/LanguageContext";
import { getTransactionTranslation } from "@/pages/dashboard/transactions/i18n";
import { zhCN, zhTW, fr, es, enUS } from "date-fns/locale";

interface DateRangePickerProps {
  startDate: Date | undefined;
  endDate: Date | undefined;
  onStartDateChange: (date: Date | undefined) => void;
  onEndDateChange: (date: Date | undefined) => void;
  className?: string;
}

export function DateRangePicker({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  className
}: DateRangePickerProps) {
  const { language } = useLanguage();
  
  // Get appropriate locale for date-fns based on current language
  const getLocale = () => {
    switch (language) {
      case 'zh-CN':
        return zhCN;
      case 'zh-TW':
        return zhTW;
      case 'fr':
        return fr;
      case 'es':
        return es;
      default:
        return enUS;
    }
  };
  
  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !startDate && !endDate && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {startDate && endDate ? (
              <>
                {format(startDate, "PPP")} - {format(endDate, "PPP")}
              </>
            ) : (
              <span>{getTransactionTranslation("dateRange", language)}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-4" align="start">
          <div className="flex gap-4">
            <div className="space-y-2">
              <div className="text-sm font-medium mb-1">
                {getTransactionTranslation("startDate", language)}
              </div>
              <Calendar
                mode="single"
                selected={startDate}
                onSelect={onStartDateChange}
                initialFocus
                className={cn("p-3 pointer-events-auto bg-popover rounded-md border")}
                locale={getLocale()}
              />
            </div>
            <div className="space-y-2">
              <div className="text-sm font-medium mb-1">
                {getTransactionTranslation("endDate", language)}
              </div>
              <Calendar
                mode="single"
                selected={endDate}
                onSelect={onEndDateChange}
                disabled={(date) => date < (startDate || new Date())}
                initialFocus
                className={cn("p-3 pointer-events-auto bg-popover rounded-md border")}
                locale={getLocale()}
              />
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
