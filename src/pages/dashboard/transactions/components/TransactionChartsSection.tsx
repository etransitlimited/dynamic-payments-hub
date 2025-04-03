import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart } from "lucide-react";
import { motion } from "framer-motion";
import TransactionTypeChart from "./TransactionTypeChart";
import TransactionCharts from "./TransactionCharts";
import { useSafeTranslation } from "@/hooks/use-safe-translation";
import { getTransactionTranslation } from "../i18n";

const TransactionChartsSection: React.FC = () => {
  const { language, refreshCounter } = useSafeTranslation();
  const [uniqueKey, setUniqueKey] = useState(`charts-section-${language}-${Date.now()}`);
  
  // Force refresh when language changes
  useEffect(() => {
    console.log(`TransactionChartsSection language updated to: ${language}`);
    setUniqueKey(`charts-section-${language}-${Date.now()}-${refreshCounter}`);
  }, [language, refreshCounter]);
  
  // Get translations directly to guarantee update
  const title = getTransactionTranslation("transactionStatistics", language);
  const subtitle = getTransactionTranslation("transactionAnalytics", language);
  const typeChartTitle = getTransactionTranslation("transactionsByType", language);
  const viewDetailsText = getTransactionTranslation("viewDetails", language);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.1,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  return (
    <motion.div 
      key={uniqueKey}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full"
      data-language={language}
    >
      <Card className="bg-gradient-to-br from-background/80 to-background border-border/30 overflow-hidden backdrop-blur-md">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-xl font-semibold">{title}</CardTitle>
              <CardDescription className="text-muted-foreground mt-1">
                {subtitle}
              </CardDescription>
            </div>
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
              {viewDetailsText}
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="p-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
            {/* Transaction Type Chart */}
            <motion.div variants={itemVariants} className="md:col-span-1">
              <div className="bg-background/50 rounded-lg p-4 border border-border/30 backdrop-blur">
                <h3 className="text-sm font-medium mb-3">{typeChartTitle}</h3>
                <div className="h-[250px]">
                  <TransactionTypeChart />
                </div>
              </div>
            </motion.div>
            
            {/* Other transaction charts */}
            <motion.div variants={itemVariants} className="md:col-span-2">
              <div className="bg-background/50 rounded-lg p-4 border border-border/30 backdrop-blur">
                <TransactionCharts />
              </div>
            </motion.div>
          </div>
        </CardContent>
        
        <CardFooter className="border-t border-border/30 bg-background/80 py-2 px-6">
          <div className="flex items-center text-xs text-muted-foreground">
            <BarChart className="h-3 w-3 mr-1" />
            <span>Analytics</span>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default TransactionChartsSection;
