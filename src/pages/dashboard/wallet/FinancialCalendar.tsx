
import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { usePageLanguage } from "@/hooks/use-page-language";
import PageLayout from "@/components/dashboard/PageLayout";
import { Calendar, Wallet, ArrowLeft, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import TranslatedText from "@/components/translation/TranslatedText";
import PageNavigation from "@/components/dashboard/PageNavigation";
import { useSafeTranslation } from "@/hooks/use-safe-translation";
import { addDays, format, addMonths, startOfMonth, endOfMonth, eachDayOfInterval } from "date-fns";

const FinancialCalendar: React.FC = () => {
  const { language } = useLanguage();
  const { t } = useSafeTranslation();
  const pageLanguage = usePageLanguage('wallet.financialTracking.calendar', 'Financial Calendar');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [viewType, setViewType] = useState<'month' | 'list'>('month');
  
  // Navigation links for wallet section
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
      icon: <Calendar size={16} className="mr-2 text-green-400" />,
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
  
  // Sample financial events
  const financialEvents = [
    {
      id: 1,
      title: "Monthly Subscription",
      amount: -19.99,
      date: addDays(new Date(), 2),
      type: "expense",
      category: "entertainment"
    },
    {
      id: 2,
      title: "Client Payment",
      amount: 450.00,
      date: addDays(new Date(), 5),
      type: "income",
      category: "work"
    },
    {
      id: 3,
      title: "Utility Bill",
      amount: -85.75,
      date: addDays(new Date(), 7),
      type: "expense",
      category: "utilities"
    },
    {
      id: 4,
      title: "Rent Payment",
      amount: -1200.00,
      date: addDays(new Date(), 15),
      type: "expense",
      category: "housing"
    }
  ];
  
  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(Math.abs(amount));
  };
  
  // Get the days for the current month
  const monthDays = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth)
  });
  
  // Navigation for months
  const prevMonth = () => setCurrentMonth(addMonths(currentMonth, -1));
  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  
  // Get events for a specific day
  const getEventsForDay = (day: Date) => {
    return financialEvents.filter(event => 
      format(event.date, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd')
    );
  };
  
  return (
    <PageLayout
      title={t("wallet.financialTracking.calendar", "Financial Calendar")}
      subtitle={t("wallet.financialTracking.calendarDesc", "Track scheduled payments and income")}
      breadcrumbs={breadcrumbs}
      actions={pageActions}
    >
      <PageNavigation items={walletNavItems} className="mb-6" />
      
      <Card className="border-purple-900/30 bg-charcoal-light/50 backdrop-blur-md shadow-lg mb-6">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center">
            <Calendar className="mr-2 h-5 w-5 text-purple-400" />
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
            <h3 className="text-lg font-medium">{format(currentMonth, 'MMMM yyyy')}</h3>
            <Button variant="outline" size="sm" onClick={nextMonth}>&gt;</Button>
          </div>
          
          {viewType === 'month' ? (
            <div className="grid grid-cols-7 gap-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
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
                            {event.title}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="space-y-4">
              {financialEvents.map(event => (
                <div 
                  key={event.id} 
                  className="flex items-center justify-between p-3 rounded-lg bg-charcoal-dark/40 border border-purple-900/20"
                >
                  <div className="flex items-center">
                    <div className={`p-2 rounded-lg mr-3 ${event.type === 'income' ? 'bg-green-900/40' : 'bg-red-900/40'}`}>
                      {event.type === 'income' ? (
                        <ArrowUpCircle className="h-4 w-4 text-green-400" />
                      ) : (
                        <ArrowDownCircle className="h-4 w-4 text-red-400" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{event.title}</p>
                      <p className="text-xs text-gray-400">{format(event.date, 'MMM dd, yyyy')}</p>
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
