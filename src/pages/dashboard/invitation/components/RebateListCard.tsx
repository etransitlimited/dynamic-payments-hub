
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import RebateSearch from "./RebateSearch";
import RebateTable from "./RebateTable";
import { RebateRecord } from "../types";
import RebateRules from "./RebateRules";
import { useLanguage } from "@/context/LanguageContext";

interface RebateListCardProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  currentRecords: RebateRecord[];
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
}

const RebateListCard: React.FC<RebateListCardProps> = ({
  searchQuery,
  setSearchQuery,
  currentRecords,
  currentPage,
  setCurrentPage,
  totalPages
}) => {
  const { t } = useLanguage();
  
  return (
    <Card className="overflow-hidden bg-[#061428]/90 border border-blue-900/40">
      <CardHeader className="bg-[#0A1A2F] border-b border-blue-900/40">
        <CardTitle className="text-white text-lg flex items-center">
          <span className="bg-blue-500 h-5 w-1 rounded-full mr-2"></span>
          {t("invitation.rebate.title")}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <RebateSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        
        <RebateTable
          records={currentRecords}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
        
        <RebateRules />
      </CardContent>
    </Card>
  );
};

export default RebateListCard;
