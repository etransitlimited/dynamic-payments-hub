
import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format, isSameDay } from "date-fns";
import { CalendarIcon, ArrowUp, ArrowDown } from "lucide-react";
import TranslatedText from "@/components/translation/TranslatedText";
import { useLanguage } from "@/context/LanguageContext";
import { usePageLanguage } from "@/hooks/use-page-language";
import PageLayout from "@/components/dashboard/PageLayout";

// Define the financial event types
type EventType = 'income' | 'expense';

interface FinancialEvent {
  id: number;
  title: string;
  amount: number;
  date: Date;
  type: EventType;
  category: string;
  description?: string;
}

const FinancialCalendarPage: React.FC = () => {
  const { t } = useLanguage();
  const { getTranslation } = usePageLanguage('wallet.financialTracking.calendar', 'Financial Calendar');
  const [date, setDate] = useState<Date>(new Date());
  const [view, setView] = useState<'month' | 'list'>('month');
  
  // Sample financial events - in a real application, this would come from an API
  const financialEvents: FinancialEvent[] = [
    {
      id: 1,
      title: "Monthly Salary",
      amount: 5000,
      date: new Date(new Date().getFullYear(), new Date().getMonth(), 15),
      type: "income",
      category: "Salary"
    },
    {
      id: 2,
      title: "Rent Payment",
      amount: 1500,
      date: new Date(new Date().getFullYear(), new Date().getMonth(), 5),
      type: "expense",
      category: "Housing"
    },
    {
      id: 3,
      title: "Utility Bills",
      amount: 200,
      date: new Date(new Date().getFullYear(), new Date().getMonth(), 10),
      type: "expense",
      category: "Utilities"
    },
    {
      id: 4,
      title: "Freelance Project",
      amount: 1200,
      date: new Date(new Date().getFullYear(), new Date().getMonth(), 22),
      type: "income",
      category: "Freelance"
    }
  ];
  
  // Filter events for the selected date
  const selectedDateEvents = financialEvents.filter(event => 
    isSameDay(event.date, date)
  );
  
  // Format currency amount
  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(Math.abs(amount));
  };
  
  return (
    <PageLayout
      title={getTranslation("wallet.financialTracking.calendar", "Financial Calendar")}
      subtitle={getTranslation("wallet.financialTracking.calendarDesc", "Track scheduled payments and income")}
      breadcrumbs={[
        {
          label: getTranslation("wallet.walletManagement", "Wallet Management"),
          href: "/dashboard/wallet"
        },
        {
          label: getTranslation("wallet.financialTracking.calendar", "Financial Calendar")
        }
      ]}
    >
      <div className="grid gap-4 md:grid-cols-[1fr_300px]">
        <div className="space-y-4">
          <Tabs defaultValue="month" className="w-full">
            <div className="flex items-center justify-between">
              <TabsList>
                <TabsTrigger value="month" onClick={() => setView('month')}>
                  <TranslatedText keyName="wallet.financialTracking.monthView" fallback="Month View" />
                </TabsTrigger>
                <TabsTrigger value="list" onClick={() => setView('list')}>
                  <TranslatedText keyName="wallet.financialTracking.listView" fallback="List View" />
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="month" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <CalendarIcon className="mr-2 h-5 w-5" />
                    <TranslatedText keyName="wallet.financialTracking.monthlySchedule" fallback="Monthly Schedule" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(newDate) => newDate && setDate(newDate)}
                    className="rounded-md border"
                    modifiers={{
                      income: financialEvents
                        .filter(event => event.type === 'income')
                        .map(event => event.date),
                      expense: financialEvents
                        .filter(event => event.type === 'expense')
                        .map(event => event.date)
                    }}
                    modifiersStyles={{
                      income: {
                        fontWeight: 'bold',
                        color: 'white',
                        backgroundColor: 'rgba(16, 185, 129, 0.2)'
                      },
                      expense: {
                        fontWeight: 'bold',
                        color: 'white',
                        backgroundColor: 'rgba(239, 68, 68, 0.2)'
                      }
                    }}
                  />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="list" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    <TranslatedText keyName="wallet.financialTracking.upcomingEvents" fallback="Upcoming Financial Events" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {financialEvents.sort((a, b) => a.date.getTime() - b.date.getTime()).map(event => (
                      <div 
                        key={event.id} 
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
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        <div>
          <Card className="border-purple-900/30 bg-gradient-to-br from-charcoal-light to-charcoal-dark shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg">
                <TranslatedText keyName="wallet.financialTracking.eventDetails" fallback="Event Details" />
                <span className="block text-sm font-normal text-gray-400 mt-1">
                  {format(date, 'MMMM d, yyyy')}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedDateEvents.length > 0 ? (
                <div className="space-y-4">
                  {selectedDateEvents.map(event => (
                    <div key={event.id} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium text-white">{event.title}</h3>
                        <Badge 
                          variant="outline" 
                          className={event.type === 'income' ? 'border-green-500 text-green-400' : 'border-red-500 text-red-400'}
                        >
                          {event.type === 'income' ? '+' : '-'}{formatAmount(event.amount)}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-400">
                        <TranslatedText keyName="wallet.financialTracking.category" fallback="Category" />: {event.category}
                      </p>
                      {event.description && (
                        <p className="text-sm text-gray-400">{event.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <p className="text-gray-400">
                    <TranslatedText keyName="wallet.financialTracking.noEvents" fallback="No events scheduled for this date" />
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default FinancialCalendarPage;
