
import React, { useState } from 'react';
import TranslatedText from '@/components/translation/TranslatedText';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useSafeTranslation } from "@/hooks/use-safe-translation";
import { DateRangePicker } from "@/components/date-range/DateRangePicker";

interface CardManagementFiltersProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  isLoading?: boolean;
}

const CardManagementFilters: React.FC<CardManagementFiltersProps> = ({ 
  searchTerm, 
  setSearchTerm,
  isLoading = false
}) => {
  const { t } = useSafeTranslation();
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchTerm);
    console.log("Date range:", { startDate, endDate });
  };

  if (isLoading) {
    return (
      <div className="animate-pulse">
        <Card className="overflow-hidden border border-blue-800/20 bg-gradient-to-br from-blue-950/40 to-indigo-950/30 p-6">
          <div className="h-10 bg-blue-900/30 rounded-md w-full mb-4"></div>
          <div className="flex gap-2">
            <div className="h-10 bg-blue-900/30 rounded-md w-3/4"></div>
            <div className="h-10 bg-blue-900/30 rounded-md w-1/4"></div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <Card className="overflow-hidden border border-blue-800/20 bg-gradient-to-br from-blue-950/40 to-indigo-950/30">
      <div className="p-6 space-y-4">
        <form onSubmit={handleSearch}>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Search Input */}
            <div className="relative md:col-span-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder={t("cards.management.searchPlaceholder")}
                className="pl-10 bg-blue-950/50 border-blue-800/50 text-white placeholder-blue-300/40"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Date Range Picker */}
            <div className="md:col-span-4">
              <DateRangePicker
                startDate={startDate}
                endDate={endDate}
                onStartDateChange={setStartDate}
                onEndDateChange={setEndDate}
              />
            </div>

            {/* Card Type Filter */}
            <div className="md:col-span-2">
              <Select>
                <SelectTrigger className="bg-blue-950/50 border-blue-800/50 text-white">
                  <SelectValue placeholder={t("cards.management.cardType")} />
                </SelectTrigger>
                <SelectContent className="bg-blue-950 border-blue-800/50 text-white">
                  <SelectItem value="all">{t("cards.management.allTypes")}</SelectItem>
                  <SelectItem value="standard">{t("cards.management.standardCard")}</SelectItem>
                  <SelectItem value="gold">{t("cards.management.goldCard")}</SelectItem>
                  <SelectItem value="platinum">{t("cards.management.platinumCard")}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Search Button */}
            <div className="md:col-span-2">
              <Button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700 transition-colors"
              >
                <Search className="h-4 w-4 mr-2" />
                <TranslatedText keyName="common.search" fallback="Search" />
              </Button>
            </div>
          </div>
        </form>
      </div>
    </Card>
  );
};

export default CardManagementFilters;
