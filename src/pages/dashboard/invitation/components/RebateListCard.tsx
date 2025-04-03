
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import RebateSearch from "./RebateSearch";
import RebateTable from "./RebateTable";
import { RebateRecord } from "../types";
import RebateRules from "./RebateRules";
import { BarChart, Sparkles } from "lucide-react";
import { useRebateTranslation } from "../hooks/useRebateTranslation";

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
  const { t, language } = useRebateTranslation();
  
  // Force re-render when language changes
  const [componentKey, setComponentKey] = React.useState<string>(`rebate-card-${language}`);
  
  React.useEffect(() => {
    setComponentKey(`rebate-card-${language}-${Date.now()}`);
    console.log(`RebateListCard language changed to: ${language}`);
  }, [language]);

  return (
    <div className="w-full rounded-xl overflow-hidden" key={componentKey} data-language={language}>
      <Card className="w-full bg-gradient-to-br from-charcoal-light to-charcoal-dark border-purple-900/20 shadow-lg hover:shadow-purple-900/10 transition-all duration-300">
        <div className="absolute inset-0 bg-grid-white/[0.03] [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px] rounded-xl"></div>
        
        {/* Purple accent top bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 via-purple-500 to-purple-700"></div>
        
        <CardHeader className="relative z-10 bg-purple-900/10 border-b border-purple-900/20 px-6 py-4">
          <CardTitle className="text-white text-lg flex items-center">
            <BarChart className="h-5 w-5 mr-2 text-neon-purple" />
            {t("title")}
            <div className="ml-auto text-sm text-purple-200/70 font-normal flex items-center">
              <Sparkles className="h-4 w-4 mr-1 text-neon-green" />
              {t("subtitle")}
            </div>
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
    </div>
  );
};

export default RebateListCard;
