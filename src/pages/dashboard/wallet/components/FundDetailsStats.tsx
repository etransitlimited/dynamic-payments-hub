
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { CircleOff, CircleDollarSign, BarChart3 } from "lucide-react";
import { LanguageCode } from "@/utils/languageUtils";
import { getFundDetailsTranslation } from "../i18n";

interface FundDetailsStatsProps {
  totalTransactions: number;
  totalAmount: number;
  averageAmount: number;
  isLoading?: boolean;
}

const FundDetailsStats: React.FC<FundDetailsStatsProps> = ({
  totalTransactions,
  totalAmount,
  averageAmount,
  isLoading = false
}) => {
  // Get current language
  const language = document.documentElement.lang as LanguageCode || 'en';
  
  // Function to get direct translations from our dedicated translation files
  const getTranslation = (key: string): string => {
    return getFundDetailsTranslation(key, language);
  };

  // Format numbers based on language
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat(language, {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Total Transactions */}
      <Card className="bg-gradient-to-br from-charcoal-light to-charcoal-dark border-purple-900/30 shadow-md">
        <CardContent className="p-4 flex items-center">
          <div className="bg-purple-900/30 p-3 rounded-lg mr-3">
            <CircleOff className="h-6 w-6 text-purple-400" />
          </div>
          <div>
            <p className="text-sm text-purple-200/70">{getTranslation('totalTransactions')}</p>
            <p className="text-xl font-bold text-white">
              {isLoading ? "..." : totalTransactions}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Total Amount */}
      <Card className="bg-gradient-to-br from-charcoal-light to-charcoal-dark border-purple-900/30 shadow-md">
        <CardContent className="p-4 flex items-center">
          <div className="bg-purple-900/30 p-3 rounded-lg mr-3">
            <CircleDollarSign className="h-6 w-6 text-purple-400" />
          </div>
          <div>
            <p className="text-sm text-purple-200/70">{getTranslation('totalAmount')}</p>
            <p className="text-xl font-bold text-white">
              {isLoading ? "..." : formatCurrency(totalAmount)}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Average Amount */}
      <Card className="bg-gradient-to-br from-charcoal-light to-charcoal-dark border-purple-900/30 shadow-md">
        <CardContent className="p-4 flex items-center">
          <div className="bg-purple-900/30 p-3 rounded-lg mr-3">
            <BarChart3 className="h-6 w-6 text-purple-400" />
          </div>
          <div>
            <p className="text-sm text-purple-200/70">{getTranslation('averageAmount')}</p>
            <p className="text-xl font-bold text-white">
              {isLoading ? "..." : formatCurrency(averageAmount)}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FundDetailsStats;
