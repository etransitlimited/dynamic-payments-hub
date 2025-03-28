
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { DollarSign } from "lucide-react";
import RebateSearch from "./RebateSearch";
import RebateTable from "./RebateTable";
import RebateRules from "./RebateRules";

interface RebateRecord {
  id: string;
  invitee: string;
  type: string;
  amount: number;
  rebate: number;
  datetime: string;
}

interface RebateListCardProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  currentRecords: RebateRecord[];
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
}

const RebateListCard = ({
  searchQuery,
  setSearchQuery,
  currentRecords,
  currentPage,
  setCurrentPage,
  totalPages
}: RebateListCardProps) => {
  return (
    <Card className="bg-gradient-to-br from-blue-900 to-blue-950 border-blue-900/50 shadow-lg shadow-blue-900/10 hover:shadow-[0_0_15px_rgba(0,243,255,0.15)] transition-all duration-300 overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
      <CardHeader className="relative z-10 pb-3">
        <CardTitle className="text-white flex items-center text-xl">
          <span className="bg-green-500/20 p-2 rounded-full mr-2">
            <DollarSign size={18} className="text-green-400" />
          </span>
          返点记录
        </CardTitle>
        <CardDescription className="text-blue-200/80">查询您的邀请返点记录</CardDescription>
      </CardHeader>
      <CardContent className="relative z-10">
        <RebateSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        
        <RebateTable
          currentRecords={currentRecords}
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
