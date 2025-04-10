
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, CreditCard, Upload, UserPlus, ArrowDownCircle, ArrowUpCircle, FileBarChart, Calendar, FileText } from "lucide-react";
import { motion } from "framer-motion";
import TranslatedText from "@/components/translation/TranslatedText";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CardHeader, CardTitle } from "@/components/ui/card";

interface QuickActionsProps {
  title: React.ReactNode;
}

const QuickActions: React.FC<QuickActionsProps> = ({
  title,
}) => {
  return (
    <Card className="border-purple-900/30 bg-gradient-to-br from-charcoal-light to-charcoal-dark shadow-lg hover:shadow-purple-900/10 transition-shadow">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-3">
        <Button variant="outline" className="w-full justify-start" asChild>
          <Link to="/dashboard/cards/apply">
            <CreditCard className="mr-2 h-4 w-4 text-blue-400" />
            <TranslatedText keyName="dashboard.applyCard" fallback="Apply Card" />
          </Link>
        </Button>
        <Button variant="outline" className="w-full justify-start" asChild>
          <Link to="/dashboard/invitation/management">
            <UserPlus className="mr-2 h-4 w-4 text-green-400" />
            <TranslatedText keyName="dashboard.inviteUsers" fallback="Invite Users" />
          </Link>
        </Button>
        <Button variant="outline" className="w-full justify-start" asChild>
          <Link to="/dashboard/transactions">
            <AlertCircle className="mr-2 h-4 w-4 text-amber-400" />
            <TranslatedText keyName="dashboard.transactions" fallback="Transactions" />
          </Link>
        </Button>
        <Button variant="outline" className="w-full justify-start" asChild>
          <Link to="/dashboard/analytics">
            <Upload className="mr-2 h-4 w-4 text-purple-400" />
            <TranslatedText keyName="dashboard.analytics" fallback="Analytics" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

// Create a specialized wallet quick actions component
interface WalletQuickActionsProps {
  title: React.ReactNode;
  depositText?: React.ReactNode;
  withdrawText?: React.ReactNode;
  fundDetailsText?: React.ReactNode;
  financialCalendarText?: React.ReactNode;
  financialReportsText?: React.ReactNode;
}

export const WalletQuickActions: React.FC<WalletQuickActionsProps> = ({
  title,
  depositText = <TranslatedText keyName="wallet.deposit" fallback="Deposit" />,
  withdrawText = <TranslatedText keyName="wallet.withdraw" fallback="Withdraw" />,
  fundDetailsText = <TranslatedText keyName="wallet.fundDetails" fallback="Fund Details" />,
  financialCalendarText = <TranslatedText keyName="wallet.financialCalendar" fallback="Financial Calendar" />,
  financialReportsText = <TranslatedText keyName="wallet.financialReports" fallback="Financial Reports" />,
}) => {
  return (
    <Card className="border-purple-900/30 bg-gradient-to-br from-charcoal-light to-charcoal-dark shadow-lg hover:shadow-purple-900/10 transition-shadow">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-3">
        <Button variant="outline" className="w-full justify-start" asChild>
          <Link to="/dashboard/wallet/deposit">
            <ArrowDownCircle className="mr-2 h-4 w-4 text-green-400" />
            {depositText}
          </Link>
        </Button>
        <Button variant="outline" className="w-full justify-start" asChild>
          <Link to="/dashboard/wallet/withdraw">
            <ArrowUpCircle className="mr-2 h-4 w-4 text-amber-400" />
            {withdrawText}
          </Link>
        </Button>
        <Button variant="outline" className="w-full justify-start" asChild>
          <Link to="/dashboard/wallet/fund-details">
            <FileBarChart className="mr-2 h-4 w-4 text-blue-400" />
            {fundDetailsText}
          </Link>
        </Button>
        <Button variant="outline" className="w-full justify-start" asChild>
          <Link to="/dashboard/wallet/financial-calendar">
            <Calendar className="mr-2 h-4 w-4 text-purple-400" />
            {financialCalendarText}
          </Link>
        </Button>
        <Button variant="outline" className="w-full justify-start col-span-2" asChild>
          <Link to="/dashboard/wallet/financial-reports">
            <FileText className="mr-2 h-4 w-4 text-indigo-400" />
            {financialReportsText}
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
