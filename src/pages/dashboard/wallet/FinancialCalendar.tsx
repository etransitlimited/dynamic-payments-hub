
import React, { useState, useEffect, useMemo } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { usePageLanguage } from "@/hooks/use-page-language";
import PageLayout from "@/components/dashboard/PageLayout";
import { Calendar as CalendarIcon, ArrowUp, ArrowDown, ArrowLeft, Wallet, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import TranslatedText from "@/components/translation/TranslatedText";
import PageNavigation from "@/components/dashboard/PageNavigation";
import { useSafeTranslation } from "@/hooks/use-safe-translation";
import { addDays, format, addMonths, startOfMonth, endOfMonth, eachDayOfInterval } from "date-fns";
import { zhCN, zhTW, fr, es, enUS } from "date-fns/locale";

const FinancialCalendar: React.FC = () => {
  const { language } = useLanguage();
  const { t } = useSafeTranslation();
  const pageLanguage = usePageLanguage('wallet.financialTracking.calendar', 'Financial Calendar');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [viewType, setViewType] = useState<'month' | 'list'>('month');
  const [forceUpdateKey, setForceUpdateKey] = useState(`financial-calendar-${language}-${Date.now()}`);
  
  useEffect(() => {
    setForceUpdateKey(`financial-calendar-${language}-${Date.now()}`);
  }, [language]);
  
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
  
  const walletNavItems = [
    {
      path: "/dashboard/wallet",
      title: t("wallet.overview", "Overview"),
      subtitle: t("wallet.walletDashboardDesc", "Manage your deposits, transactions and fund details"),
      icon: <Wallet size={16} className="mr-2 text-blue-400" />,
    },
    {
      path: "/dashboard/wallet/financial-calendar",
      title: t("wallet.financialTracking.calendar", "Financial Calendar"),
      subtitle: t("wallet.financialTracking.calendarDesc", "Track scheduled payments and income"),
      icon: <CalendarIcon size={16} className="mr-2 text-green-400" />,
      isActive: true
    },
    {
      path: "/dashboard/wallet/financial-reports",
      title: t("wallet.financialTracking.reports", "Financial Reports"),
      subtitle: t("wallet.financialTracking.reportsDesc", "Generate financial statements and analysis"),
      icon: <FileText size={16} className="mr-2 text-indigo-400" />
    }
  ];
  
  const breadcrumbs = [
    {
      label: t("sidebar.dashboard", "Dashboard"),
      href: "/dashboard"
    },
    {
      label: t("wallet.walletManagement", "Wallet Management"),
      href: "/dashboard/wallet"
    },
    {
      label: t("wallet.financialTracking.calendar", "Financial Calendar")
    }
  ];
  
  const pageActions = (
    <Button
      variant="ghost"
      className="bg-purple-900/30 border border-purple-800/30 hover:bg-purple-800/50 text-white transition-all duration-300"
      onClick={() => window.history.back()}
    >
      <ArrowLeft size={16} className="mr-2" /> 
      <TranslatedText keyName="common.back" fallback="Back" />
    </Button>
  );
  
  // Use useMemo to recreate events when language changes
  const financialEvents = useMemo(() => [
    {
      id: 1,
      titleKey: "wallet.transactions.subscription",
      amount: -19.99,
      date: addDays(new Date(), 2),
      type: "expense",
      category: "entertainment"
    },
    {
      id: 2,
      titleKey: "wallet.transactions.clientPayment",
      amount: 450.00,
      date: addDays(new Date(), 5),
      type: "income",
      category: "work"
    },
    {
      id: 3,
      titleKey: "wallet.transactions.utilities",
      amount: -85.75,
      date: addDays(new Date(), 7),
      type: "expense",
      category: "utilities"
    },
    {
      id: 4,
      titleKey: "wallet.transactions.rent",
      amount: -1200.00,
      date: addDays(new Date(), 15),
      type: "expense",
      category: "housing"
    }
  ], []);
  
  const formatAmount = (amount: number) => {
    const currencyCode = language === 'zh-CN' || language === 'zh-TW' ? 'CNY' : 
                         language === 'fr' ? 'EUR' : 
                         language === 'es' ? 'EUR' : 'USD';
                         
    return new Intl.NumberFormat(language, {
      style: 'currency',
      currency: currencyCode,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(Math.abs(amount));
  };
  
  const monthDays = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth)
  });
  
  const prevMonth = () => setCurrentMonth(addMonths(currentMonth, -1));
  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  
  const getEventsForDay = (day: Date) => {
    return financialEvents.filter(event => 
      format(event.date, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd')
    );
  };
  
  const getDaysOfWeek = () => {
    if (language === 'zh-CN' || language === 'zh-TW') {
      return ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    } else if (language === 'es') {
      return ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    } else if (language === 'fr') {
      return ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
    } else {
      return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    }
  };
  
  const daysOfWeek = useMemo(() => getDaysOfWeek(), [language]);
  
  const formatDate = (date: Date) => {
    const locale = getLocale();
    
    if (language === 'zh-CN' || language === 'zh-TW') {
      return format(date, 'yyyy年MM月dd日', { locale });
    } else if (language === 'fr' || language === 'es') {
      return format(date, 'd MMM yyyy', { locale });
    } else {
      return format(date, 'MMM d, yyyy', { locale });
    }
  };
  
  const formatMonthYear = (date: Date) => {
    const locale = getLocale();
    
    if (language === 'zh-CN' || language === 'zh-TW') {
      return format(date, 'yyyy年MM月', { locale });
    } else {
      return format(date, 'MMMM yyyy', { locale });
    }
  };
  
  return (
    <PageLayout
      title={t("wallet.financialTracking.calendar", "Financial Calendar")}
      subtitle={t("wallet.financialTracking.calendarDesc", "Track scheduled payments and income")}
      breadcrumbs={breadcrumbs}
      actions={pageActions}
      key={forceUpdateKey}
    >
      <PageNavigation items={walletNavItems} className="mb-6" />
      
      <Card className="border-purple-900/30 bg-charcoal-light/50 backdrop-blur-md shadow-lg mb-6">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center">
            <CalendarIcon className="mr-2 h-5 w-5 text-purple-400" />
            {t("wallet.financialTracking.monthlySchedule", "Monthly Schedule")}
          </CardTitle>
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="sm"
              className={`${viewType === 'month' ? 'bg-purple-900/50' : ''}`}
              onClick={() => setViewType('month')}
            >
              {t("wallet.financialTracking.monthView", "Month View")}
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className={`${viewType === 'list' ? 'bg-purple-900/50' : ''}`}
              onClick={() => setViewType('list')}
            >
              {t("wallet.financialTracking.listView", "List View")}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <Button variant="outline" size="sm" onClick={prevMonth}>&lt;</Button>
            <h3 className="text-lg font-medium">
              {formatMonthYear(currentMonth)}
            </h3>
            <Button variant="outline" size="sm" onClick={nextMonth}>&gt;</Button>
          </div>
          
          {viewType === 'month' ? (
            <div className="grid grid-cols-7 gap-2">
              {daysOfWeek.map(day => (
                <div key={day} className="text-center text-gray-400 text-sm font-medium p-2">
                  {day}
                </div>
              ))}
              
              {monthDays.map(day => {
                const dayEvents = getEventsForDay(day);
                const hasEvents = dayEvents.length > 0;
                
                return (
                  <div 
                    key={day.toString()} 
                    className={`border rounded-md p-2 min-h-[80px] ${
                      hasEvents ? 'border-purple-600/40 bg-purple-900/20' : 'border-gray-700/30'
                    }`}
                  >
                    <div className="text-right text-sm mb-1">{format(day, 'd')}</div>
                    {hasEvents && (
                      <div className="space-y-1">
                        {dayEvents.map(event => (
                          <div 
                            key={event.id} 
                            className={`text-xs rounded px-1 py-0.5 ${
                              event.type === 'income' ? 'bg-green-900/40 text-green-300' : 'bg-red-900/40 text-red-300'
                            }`}
                          >
                            <TranslatedText keyName={event.titleKey} fallback={event.titleKey} />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="space-y-4" key={`list-${language}`}>
              {financialEvents.map(event => (
                <div 
                  key={`event-${event.id}-${language}`}
                  className="flex items-center justify-between p-3 rounded-lg bg-charcoal-dark/40 border border-purple-900/20"
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
                        <TranslatedText keyName={event.titleKey} fallback={event.titleKey} />
                      </p>
                      <p className="text-xs text-gray-400">
                        {formatDate(event.date)}
                      </p>
                    </div>
                  </div>
                  <div className={`text-sm font-medium ${event.type === 'income' ? 'text-green-400' : 'text-red-400'}`}>
                    {event.type === 'income' ? '+' : '-'}{formatAmount(event.amount)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </PageLayout>
  );
};

export default FinancialCalendar;
