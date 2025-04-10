
import React, { useState, useEffect, useRef, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar as CalendarIcon, DollarSign, ArrowUp, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";
import TranslatedText from "@/components/translation/TranslatedText";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useSafeTranslation } from "@/hooks/use-safe-translation";
import { zhCN, zhTW, fr, es, enUS } from "date-fns/locale";
import { getDirectTranslation } from "@/utils/translationHelpers";
import { LanguageCode } from "@/utils/languageUtils";

const FinancialCalendarWidget: React.FC = () => {
  const { language } = useLanguage();
  const { t } = useSafeTranslation();
  const navigate = useNavigate();
  const currentDate = new Date();
  const instanceId = useRef(`fin-calendar-${Math.random().toString(36).substring(2, 9)}`);
  const [forceUpdateKey, setForceUpdateKey] = useState(`calendar-widget-${language}-${Date.now()}-${instanceId.current}`);
  
  // Update component when language changes
  useEffect(() => {
    console.log(`FinancialCalendarWidget: Language changed to ${language}, updating component...`);
    setForceUpdateKey(`calendar-widget-${language}-${Date.now()}-${instanceId.current}`);
    
    // Force additional update after a short delay to ensure translations are applied
    const timer = setTimeout(() => {
      setForceUpdateKey(`calendar-widget-${language}-${Date.now()}-delayed-${instanceId.current}`);
    }, 100);
    
    return () => clearTimeout(timer);
  }, [language]);
  
  // Cache translated values for consistent rendering
  const translateWithCache = useCallback((key: string, fallback: string): string => {
    return getDirectTranslation(key, language as LanguageCode, fallback);
  }, [language]);
  
  // Get appropriate locale for date-fns based on current language
  const getLocale = useCallback(() => {
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
  }, [language]);
  
  // Format date according to current language
  const formatDate = useCallback((date: Date) => {
    const locale = getLocale();
    
    if (language === 'zh-CN' || language === 'zh-TW') {
      return format(date, 'yyyy年MM月dd日', { locale });
    } else if (language === 'fr' || language === 'es') {
      return format(date, 'd MMM yyyy', { locale });
    } else {
      return format(date, 'MMM d, yyyy', { locale });
    }
  }, [language, getLocale]);
  
  // Sample upcoming financial events - in a real app this would come from an API
  const upcomingEvents = React.useMemo(() => [
    { 
      id: 1, 
      titleKey: "wallet.transactions.subscription", 
      amount: -19.99, 
      date: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 2), 
      type: "expense" 
    },
    { 
      id: 2, 
      titleKey: "wallet.transactions.clientPayment", 
      amount: 450.00, 
      date: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 5), 
      type: "income" 
    },
    { 
      id: 3, 
      titleKey: "wallet.transactions.utilities", 
      amount: -85.75, 
      date: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 7), 
      type: "expense" 
    }
  ], [currentDate]);
  
  const formatAmount = useCallback((amount: number) => {
    const currencyCode = language === 'zh-CN' || language === 'zh-TW' ? 'CNY' : 
                          language === 'fr' ? 'EUR' : 
                          language === 'es' ? 'EUR' : 'USD';
                         
    return new Intl.NumberFormat(language, {
      style: 'currency',
      currency: currencyCode,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(Math.abs(amount));
  }, [language]);
  
  return (
    <Card 
      className="border-purple-900/30 bg-gradient-to-br from-charcoal-light to-charcoal-dark shadow-lg hover:shadow-purple-900/10 transition-shadow" 
      key={forceUpdateKey}
      data-instance-id={instanceId.current}
      data-language={language}
    >
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-white text-lg flex items-center">
          <span className="bg-purple-900/30 p-2 rounded-lg mr-3">
            <CalendarIcon className="h-4 w-4 text-purple-400" />
          </span>
          <TranslatedText 
            keyName="wallet.financialTracking.upcomingPayments" 
            fallback="Upcoming Financial Events" 
          />
        </CardTitle>
        <Button 
          variant="link" 
          size="sm" 
          className="text-purple-400"
          onClick={() => navigate("/dashboard/wallet/financial-calendar")}
        >
          <TranslatedText 
            keyName="wallet.financialTracking.viewCalendar" 
            fallback="View Calendar" 
          />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {upcomingEvents.length > 0 ? (
            upcomingEvents.map(event => {
              // Get the translated event title directly to ensure it's always up-to-date
              const translatedTitle = translateWithCache(event.titleKey, event.titleKey.split('.').pop() || event.titleKey);
              
              return (
                <div 
                  key={`widget-event-${event.id}-${language}-${instanceId.current}`} 
                  className="flex items-center justify-between p-3 rounded-lg bg-charcoal-dark/40 border border-purple-900/20"
                  data-key={event.titleKey}
                >
                  <div className="flex items-center">
                    <div className={`p-2 rounded-lg mr-3 ${event.type === 'income' ? 'bg-green-900/40' : 'bg-red-900/40'}`}>
                      {event.type === 'income' ? (
                        <ArrowUp className="h-4 w-4 text-green-400" />
                      ) : (
                        <ArrowDown className="h-4 w-4 text-red-400" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">
                        <TranslatedText 
                          keyName={event.titleKey} 
                          fallback={event.titleKey.split('.').pop() || event.titleKey} 
                        />
                      </p>
                      <p className="text-xs text-gray-400">{formatDate(event.date)}</p>
                    </div>
                  </div>
                  <div className={`text-sm font-medium ${event.type === 'income' ? 'text-green-400' : 'text-red-400'}`}>
                    {event.type === 'income' ? '+' : '-'}{formatAmount(event.amount)}
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-gray-400 text-center py-4">
              <TranslatedText 
                keyName="wallet.financialTracking.noUpcomingEvents" 
                fallback="No upcoming financial events." 
              />
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default FinancialCalendarWidget;
