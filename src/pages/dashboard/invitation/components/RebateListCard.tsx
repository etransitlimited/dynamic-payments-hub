
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
    <Card className="overflow-hidden bg-gradient-to-r from-[rgb(142,45,226)] to-[rgb(74,0,224)] border-purple-900/50 shadow-lg shadow-purple-900/10">
      <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
      <CardHeader className="relative z-10 bg-purple-950/30 border-b border-purple-900/40 px-6 py-4">
        <CardTitle className="text-white text-lg flex items-center">
          <span className="bg-purple-500 h-5 w-1 rounded-full mr-2"></span>
          {t("invitation.rebate.title")}
        </CardTitle>
      </CardHeader>
      <CardContent className="relative z-10 p-6">
        <div className="space-y-4">
          <RebateSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          
          <div className="mt-4">
            <RebateTable
              records={currentRecords}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={totalPages}
            />
          </div>
          
          <div className="mt-6">
            <RebateRules />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RebateListCard;
