
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import TranslatedText from "@/components/translation/TranslatedText";
import { Progress } from "@/components/ui/progress";

const TransactionPageHeader: React.FC = () => {
  // Progress value
  const progressValue = 92;

  return (
    <motion.div 
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { type: "spring", stiffness: 100, damping: 15 }
        }
      }} 
      className="mb-6"
    >
      <Card className="border-purple-900/30 bg-gradient-to-br from-charcoal-light/50 to-charcoal-dark/50 backdrop-blur-md overflow-hidden shadow-lg relative group transition-all duration-300 hover:shadow-[0_0_30px_rgba(142,45,226,0.25)] rounded-xl">
        <div className="absolute inset-0 bg-grid-white/[0.03] [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/0 via-purple-600/5 to-purple-600/0 opacity-0 group-hover:opacity-30 blur-2xl transition-all duration-500"></div>
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 via-neon-green to-purple-600"></div>
        <CardContent className="p-4 md:p-6 relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                <TranslatedText keyName="transactions.title" fallback="Transactions" />
              </h1>
              <p className="text-blue-300 mt-2">
                <TranslatedText keyName="transactions.subtitle" fallback="View and manage all transactions on the platform" />
              </p>
              
              {/* Progress indicator */}
              <div className="mt-4 w-full md:w-80">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-400">System Load</span>
                  <span className="text-neon-green">{progressValue}%</span>
                </div>
                <Progress value={progressValue} glowColor="rgba(242, 252, 226, 0.5)" className="h-2" />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-xs text-purple-300 bg-purple-900/30 rounded-full px-3 py-1 flex items-center border border-purple-800/30">
                <span className="inline-block w-2 h-2 rounded-full bg-neon-green mr-2 animate-pulse"></span>
                <TranslatedText keyName="transactions.last24Hours" fallback="Last 24 hours transactions" />
              </span>
              <div className="h-8 w-8 rounded-full bg-neon-green/10 flex items-center justify-center transition-transform group-hover:rotate-45 duration-300 animate-glow">
                <ArrowUpRight size={16} className="text-neon-green" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TransactionPageHeader;
