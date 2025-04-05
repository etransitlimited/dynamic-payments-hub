
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar as CalendarIcon, DollarSign, ArrowUp, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";
import TranslatedText from "@/components/translation/TranslatedText";
import { format } from "date-fns";

const FinancialCalendar: React.FC = () => {
  const { t } = useLanguage();
  const currentDate = new Date();
  
  // Sample upcoming financial events - in a real app this would come from an API
  const upcomingEvents = [
    { 
      id: 1, 
      title: "Monthly Subscription", 
      amount: -19.99, 
      date: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 2), 
      type: "expense" 
    },
    { 
      id: 2, 
      title: "Client Payment", 
      amount: 450.00, 
      date: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 5), 
      type: "income" 
    },
    { 
      id: 3, 
      title: "Utility Bill", 
      amount: -85.75, 
      date: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 7), 
      type: "expense" 
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
  
  return (
    <Card className="border-purple-900/30 bg-gradient-to-br from-charcoal-light to-charcoal-dark shadow-lg hover:shadow-purple-900/10 transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-white text-lg flex items-center">
          <span className="bg-purple-900/30 p-2 rounded-lg mr-3">
            <CalendarIcon className="h-4 w-4 text-purple-400" />
          </span>
          <TranslatedText keyName="wallet.financialTracking.upcomingPayments" fallback="Upcoming Financial Events" />
        </CardTitle>
        <Button 
          variant="link" 
          size="sm" 
          className="text-purple-400"
          onClick={() => navigate("/dashboard/wallet/financial-calendar")}
        >
          <TranslatedText keyName="wallet.financialTracking.viewCalendar" fallback="View Calendar" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {upcomingEvents.length > 0 ? (
            upcomingEvents.map(event => (
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
            ))
          ) : (
            <p className="text-gray-400 text-center py-4">
              <TranslatedText keyName="wallet.financialTracking.noUpcomingEvents" fallback="No upcoming financial events." />
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default FinancialCalendar;
