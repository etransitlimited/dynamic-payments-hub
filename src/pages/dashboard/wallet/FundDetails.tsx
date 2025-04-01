
import React, { useState } from "react";
import PageTitle from "../cards/components/PageTitle";
import SearchBox from "./components/SearchBox";
import FundDetailsTable from "./components/FundDetailsTable";
import { motion } from "framer-motion";
import TranslatedText from "@/components/translation/TranslatedText";
import TranslationWrapper from "@/components/translation/TranslationWrapper";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight, Download, BarChart3, ArrowDownToLine, CircleGauge } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import InformationBox from "./components/InformationBox";

const FundDetails = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Additional search logic would go here
    console.log("Searching for:", query);
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 }
    }
  };

  // Example stats data
  const stats = [
    { 
      title: "wallet.fundDetails.totalTransactions", 
      value: "2,845", 
      percentage: 72,
      icon: <BarChart3 size={20} />
    },
    { 
      title: "wallet.fundDetails.totalAmount", 
      value: "$147,592", 
      percentage: 84,
      icon: <ArrowDownToLine size={20} />
    },
    { 
      title: "wallet.fundDetails.averageAmount", 
      value: "$512.20", 
      percentage: 65,
      icon: <CircleGauge size={20} />
    }
  ];
  
  // Example recent transactions data - Fixed the 'type' property to use literal types
  const recentTransactions = [
    {
      id: "TRX-3924",
      type: "Deposit" as "Deposit", // Explicitly typed as the literal "Deposit"
      amount: "+$1,200.00",
      balance: "15,243.50",
      date: "2023-06-15 09:45:22",
      note: "Monthly investment"
    },
    {
      id: "TRX-3923",
      type: "Expense" as "Expense", // Explicitly typed as the literal "Expense"
      amount: "-$350.75",
      balance: "14,043.50",
      date: "2023-06-14 15:22:10",
      note: "Software subscription"
    },
    {
      id: "TRX-3922",
      type: "Transfer" as "Transfer", // Explicitly typed as the literal "Transfer"
      amount: "-$2,500.00",
      balance: "14,394.25",
      date: "2023-06-12 11:30:15",
      note: "Transfer to savings account"
    }
  ];
  
  return (
    <TranslationWrapper>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible" 
        className="container px-4 mx-auto py-6 space-y-6"
      >
        <div className="w-full">
          <PageTitle title="wallet.fundDetails.title" />
        </div>
        
        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {stats.map((stat, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <Card className="bg-gradient-to-br from-[#2e1065] to-[#4c1d95] border-purple-900/30 shadow-lg hover:shadow-purple-900/20 transition-all duration-300 overflow-hidden">
                <div className="absolute inset-0 bg-grid-white/[0.02] [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
                <CardContent className="p-5 relative z-10">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-sm font-medium text-blue-100/70 mb-1">
                        <TranslatedText keyName={stat.title} fallback="Stat" />
                      </h3>
                      <p className="text-2xl font-bold text-white">{stat.value}</p>
                    </div>
                    <div className="bg-purple-900/40 p-2 rounded-lg text-purple-400">
                      {stat.icon}
                    </div>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-blue-100/70">
                        <TranslatedText keyName="common.progress" fallback="Progress" />
                      </span>
                      <span className="text-[#F2FCE2]">{stat.percentage}%</span>
                    </div>
                    <Progress 
                      value={stat.percentage} 
                      className="h-2"
                      indicatorClassName="bg-gradient-to-r from-purple-600 via-purple-500 to-[#F2FCE2]/70" 
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        
        {/* Search Section */}
        <motion.div 
          variants={itemVariants}
          className="w-full bg-gradient-to-br from-purple-900/40 to-charcoal-dark rounded-xl border border-purple-900/30 overflow-hidden relative"
        >
          <div className="absolute inset-0 bg-grid-white/[0.02] [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
          <div className="absolute top-0 right-0 w-40 h-40 bg-purple-600/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-purple-800/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4"></div>
          
          <div className="relative z-10 p-6">
            <SearchBox 
              onSearch={handleSearch}
              onDateFilter={() => console.log("Date filter clicked")}
              initialSearchQuery={searchQuery}
            />
          </div>
        </motion.div>
        
        {/* Quick Export Button */}
        <motion.div variants={itemVariants} className="flex justify-end">
          <Button 
            variant="outline" 
            className="bg-purple-900/30 border-purple-500/30 text-purple-200 hover:bg-purple-800/40 transition-all duration-300"
          >
            <Download size={16} className="mr-2" />
            <TranslatedText keyName="common.exportReport" fallback="Export Report" />
          </Button>
        </motion.div>
        
        {/* Recent Transactions */}
        <motion.div variants={itemVariants}>
          <Card className="border-blue-900/20 bg-gradient-to-br from-charcoal-light/70 to-charcoal-dark/70 backdrop-blur-sm shadow-lg overflow-hidden">
            <div className="absolute inset-0 bg-grid-white/[0.02] [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
            <CardContent className="p-6 relative z-10">
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
                <span className="w-2 h-6 bg-[#F2FCE2]/70 rounded-full mr-3"></span>
                <TranslatedText keyName="wallet.fundDetails.recentTransactions" fallback="Recent Transactions" />
              </h2>
              
              <div className="space-y-4">
                {recentTransactions.map((transaction) => (
                  <div 
                    key={transaction.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between bg-charcoal-dark/60 backdrop-blur-sm rounded-lg p-4 border border-purple-900/10 hover:border-purple-600/30 transition-all duration-300"
                  >
                    <div className="mb-2 sm:mb-0">
                      <div className="flex items-center mb-1">
                        <span className="text-sm font-medium text-blue-200">
                          {transaction.id}
                        </span>
                        <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${
                          transaction.type === "Deposit" ? "bg-green-600/20 text-green-300" :
                          transaction.type === "Expense" ? "bg-red-600/20 text-red-300" :
                          "bg-blue-600/20 text-blue-300"
                        }`}>
                          <TranslatedText 
                            keyName={`wallet.fundDetails.type${transaction.type}`} 
                            fallback={transaction.type} 
                          />
                        </span>
                      </div>
                      <p className="text-sm text-gray-400">{transaction.note}</p>
                    </div>
                    <div className="flex items-center justify-between sm:space-x-6">
                      <div className="text-right">
                        <p className={`font-medium text-base ${
                          transaction.amount.startsWith("+") ? "text-green-300" : "text-red-300"
                        }`}>
                          {transaction.amount}
                        </p>
                        <p className="text-sm text-gray-400">{transaction.date}</p>
                      </div>
                      <Button variant="ghost" size="sm" className="text-blue-200 hover:text-blue-100 hover:bg-blue-900/20">
                        <ChevronRight size={16} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              
              <InformationBox />
            </CardContent>
          </Card>
        </motion.div>
        
        {/* Main Transactions Table */}
        <motion.div variants={itemVariants}>
          <FundDetailsTable transactions={recentTransactions} />
        </motion.div>
        
        <motion.div variants={itemVariants} className="flex items-center justify-center">
          <a href="#" className="inline-flex items-center text-blue-300 hover:text-blue-200 text-sm group">
            <TranslatedText keyName="wallet.fundDetails.viewAllRecords" fallback="View All Transaction Records" />
            <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </motion.div>
    </TranslationWrapper>
  );
};

export default FundDetails;
