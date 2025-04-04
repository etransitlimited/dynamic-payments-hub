
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUp, Wallet, DollarSign } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useLanguage } from "@/context/LanguageContext";
import { formatUSD } from "@/utils/currencyUtils";
import TranslatedText from "@/components/translation/TranslatedText";

/**
 * WalletStats component
 * Shows key wallet statistics on the dashboard
 */
const WalletStats = () => {
  const { t } = useLanguage();
  
  // Example data - in a real app this would come from an API
  const walletData = {
    monthlyDeposit: 5250,
    totalBalance: 12450.75,
    lastTransaction: {
      amount: 750,
      date: "2 days ago"
    }
  };

  const statVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 * i,
        duration: 0.5
      }
    })
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Monthly Deposit */}
      <motion.div 
        custom={1}
        variants={statVariants}
        initial="hidden"
        animate="visible"
      >
        <Card className="border-purple-900/30 bg-gradient-to-br from-charcoal-light to-charcoal-dark shadow-lg hover:shadow-purple-900/10 transition-shadow">
          <CardContent className="p-4 flex items-center space-x-4">
            <div className="p-3 bg-green-900/40 rounded-lg">
              <ArrowUp className="h-5 w-5 text-green-400" />
            </div>
            <div className="space-y-1">
              <p className="text-sm text-purple-200/80">
                <TranslatedText keyName="wallet.deposit.monthlyDeposit" fallback="Monthly Deposit" />
              </p>
              <p className="text-xl font-semibold text-white">{formatUSD(walletData.monthlyDeposit)}</p>
              <div className="flex items-center text-xs text-green-400">
                <TranslatedText keyName="wallet.deposit.monthlyIncrease" fallback="15.2% increase from last month" />
              </div>
              <Progress value={75} className="h-1 mt-2" />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Total Balance */}
      <motion.div 
        custom={2}
        variants={statVariants}
        initial="hidden"
        animate="visible"
      >
        <Card className="border-purple-900/30 bg-gradient-to-br from-charcoal-light to-charcoal-dark shadow-lg hover:shadow-purple-900/10 transition-shadow">
          <CardContent className="p-4 flex items-center space-x-4">
            <div className="p-3 bg-purple-900/40 rounded-lg">
              <Wallet className="h-5 w-5 text-purple-400" />
            </div>
            <div className="space-y-1">
              <p className="text-sm text-purple-200/80">
                <TranslatedText keyName="wallet.totalBalance" fallback="Total Balance" />
              </p>
              <p className="text-xl font-semibold text-white">{formatUSD(walletData.totalBalance)}</p>
              <div className="flex items-center text-xs text-purple-300">
                <TranslatedText keyName="wallet.deposit.since" fallback="Since" /> Jan 2023
              </div>
              <Progress value={90} className="h-1 mt-2" />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Last Transaction */}
      <motion.div 
        custom={3}
        variants={statVariants}
        initial="hidden"
        animate="visible"
      >
        <Card className="border-purple-900/30 bg-gradient-to-br from-charcoal-light to-charcoal-dark shadow-lg hover:shadow-purple-900/10 transition-shadow">
          <CardContent className="p-4 flex items-center space-x-4">
            <div className="p-3 bg-blue-900/40 rounded-lg">
              <DollarSign className="h-5 w-5 text-blue-400" />
            </div>
            <div className="space-y-1">
              <p className="text-sm text-purple-200/80">
                <TranslatedText keyName="wallet.deposit.lastDeposit" fallback="Last Deposit" />
              </p>
              <p className="text-xl font-semibold text-white">{formatUSD(walletData.lastTransaction.amount)}</p>
              <div className="flex items-center text-xs text-blue-300">
                <TranslatedText keyName="wallet.deposit.daysAgo" fallback={walletData.lastTransaction.date} />
              </div>
              <Progress value={40} className="h-1 mt-2" />
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default WalletStats;
