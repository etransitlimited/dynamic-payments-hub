
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
  const { language } = useSafeTranslation();
  
  // Enhanced button text sizing for different languages
  const getButtonTextSize = () => {
    if (language === 'fr') {
      return 'text-[8px] xs:text-[9px] sm:text-xs'; // French needs smaller text
    } else if (language === 'es') {
      return 'text-[9px] xs:text-[10px] sm:text-xs'; // Spanish needs slightly smaller text
    } else if (['zh-CN', 'zh-TW'].includes(language)) {
      return 'text-xs sm:text-sm'; // Chinese can be normal size
    }
    return 'text-xs sm:text-sm'; // Default for English
  };
  
  // Enhanced button padding based on language
  const getButtonPadding = () => {
    if (language === 'fr') {
      return 'px-0.5 sm:px-1 md:px-1.5 py-1 sm:py-1.5'; // French needs tighter padding
    } else if (language === 'es') {
      return 'px-1 sm:px-1.5 md:px-2 py-1 sm:py-1.5'; // Spanish needs moderate padding
    } else if (['zh-CN', 'zh-TW'].includes(language)) {
      return 'px-2.5 sm:px-3.5 py-1 sm:py-1.5'; // Chinese can have more padding (shorter text)
    }
    return 'px-2 sm:px-3 py-1 sm:py-1.5'; // Default for English
  };
  
  // Adjusted icon margin based on language
  const getIconMargin = () => {
    if (language === 'fr') {
      return 'mr-0.5 sm:mr-1'; // Tighter margin for French
    } else if (language === 'es') {
      return 'mr-1 sm:mr-1.5'; // Moderate margin for Spanish
    } else if (['zh-CN', 'zh-TW'].includes(language)) {
      return 'mr-1.5 sm:mr-2.5'; // More margin for Chinese (shorter text)
    }
    return 'mr-1.5 sm:mr-2'; // Default for English
  };

  // Get language-specific placeholder
  const getSearchPlaceholder = () => {
    if (language === 'fr') return "Rechercher des transactions...";
    if (language === 'es') return "Buscar transacciones...";
    if (language === 'zh-CN') return "搜索交易...";
    if (language === 'zh-TW') return "搜索交易...";
    return "Search transactions...";
  };
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Button width adjustment for different languages
  const getButtonWidth = () => {
    if (language === 'fr' || language === 'es') {
      return 'min-w-[60px] sm:min-w-[70px]'; // Wider buttons for French/Spanish
    }
    return '';  // Default width for other languages
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
                placeholder={getSearchPlaceholder()}
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
                className={`${getButtonTextSize()} ${getButtonPadding()} ${getButtonWidth()} bg-charcoal-dark/40 border-purple-900/30 text-purple-200 hover:bg-purple-900/20 hover:text-neon-green hover:border-purple-500/50 transition-all flex-1 sm:flex-auto flex items-center justify-center`}
              >
                <Filter className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${getIconMargin()} flex-shrink-0`} />
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
                className={`${getButtonTextSize()} ${getButtonPadding()} ${getButtonWidth()} bg-charcoal-dark/40 border-purple-900/30 text-purple-200 hover:bg-purple-900/20 hover:text-neon-green hover:border-purple-500/50 transition-all flex-1 sm:flex-auto flex items-center justify-center`}
              >
                <Calendar className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${getIconMargin()} flex-shrink-0`} />
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
