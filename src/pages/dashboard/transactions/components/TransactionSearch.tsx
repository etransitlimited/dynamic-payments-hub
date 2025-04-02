
import React from "react";
import { Search, Filter, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useSafeTranslation } from "@/hooks/use-safe-translation";
import TranslatedText from "@/components/translation/TranslatedText";

export interface TransactionSearchProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  onFilterClick: () => void;
  onDateFilterClick: () => void;
}

const TransactionSearch: React.FC<TransactionSearchProps> = ({
  searchQuery,
  setSearchQuery,
  onFilterClick,
  onDateFilterClick
}) => {
  const { t, language } = useSafeTranslation();
  
  // Adjust button text size based on language
  const getButtonTextSize = () => {
    if (['fr', 'es'].includes(language)) {
      return 'text-[9px] sm:text-xs';
    } else if (language === 'zh-CN') {
      return 'text-xs';
    }
    return 'text-sm';
  };
  
  // Adjust button padding based on language
  const getButtonPadding = () => {
    if (['fr', 'es'].includes(language)) {
      return 'px-1.5 sm:px-2.5 py-1 sm:py-1.5';
    } else if (language === 'zh-CN') {
      return 'px-2 sm:px-3 py-1 sm:py-1.5';
    }
    return 'px-2 sm:px-3 py-1 sm:py-1.5';
  };
  
  // Adjust icon margin based on language
  const getIconMargin = () => {
    if (['fr', 'es'].includes(language)) {
      return 'mr-0.5 sm:mr-1.5';
    }
    return 'mr-1 sm:mr-2';
  };
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="border-purple-900/30 bg-gradient-to-br from-charcoal-light/50 to-charcoal-dark/50 backdrop-blur-md overflow-hidden shadow-md relative group hover:shadow-purple-900/30 transition-all duration-300">
        <div className="absolute inset-0 bg-grid-white/[0.03] [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
        <CardContent className="p-3 sm:p-4 relative z-10">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-purple-400" />
              <Input
                type="text"
                placeholder={t("transactions.searchTransactions", "Search transactions")}
                className="pl-10 bg-charcoal-dark/40 border-purple-900/20 text-white w-full focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
            <div className="flex gap-2 flex-wrap sm:flex-nowrap">
              <Button 
                onClick={onFilterClick}
                variant="outline" 
                size="sm"
                className={`${getButtonTextSize()} ${getButtonPadding()} bg-charcoal-dark/40 border-purple-900/30 text-purple-200 hover:bg-purple-900/20 hover:text-neon-green hover:border-purple-500/50 transition-all flex-1 sm:flex-auto`}
              >
                <Filter className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${getIconMargin()}`} />
                <TranslatedText 
                  keyName="transactions.filter" 
                  fallback="Filter" 
                  truncate
                  maxLines={1}
                />
              </Button>
              <Button 
                onClick={onDateFilterClick}
                variant="outline"
                size="sm"
                className={`${getButtonTextSize()} ${getButtonPadding()} bg-charcoal-dark/40 border-purple-900/30 text-purple-200 hover:bg-purple-900/20 hover:text-neon-green hover:border-purple-500/50 transition-all flex-1 sm:flex-auto`}
              >
                <Calendar className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${getIconMargin()}`} />
                <TranslatedText 
                  keyName="transactions.dateRange" 
                  fallback="Date Range" 
                  truncate
                  maxLines={1}
                />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TransactionSearch;
