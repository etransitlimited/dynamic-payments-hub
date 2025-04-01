
import React, { useState } from "react";
import PageTitle from "../cards/components/PageTitle";
import SearchBox from "./components/SearchBox";
import FundDetailsTable from "./components/FundDetailsTable";
import { motion } from "framer-motion";
import TranslatedText from "@/components/translation/TranslatedText";
import TranslationWrapper from "@/components/translation/TranslationWrapper";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight, Filter, ArrowDownToLine, BarChart3 } from "lucide-react";
import { Progress } from "@/components/ui/progress";

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
      icon: <BarChart3 size={18} />
    },
    { 
      title: "wallet.fundDetails.totalAmount", 
      value: "$147,592", 
      percentage: 84,
      icon: <ArrowDownToLine size={18} />
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
          {/* Fix: Use a string title instead of a React element */}
          <PageTitle title="wallet.fundDetails.title" />
        </div>
        
        {/* Stats Row */}
        <motion.div 
          variants={itemVariants}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {stats.map((stat, index) => (
            <Card 
              key={index} 
              className="bg-gradient-to-br from-[#2e1065] to-[#4c1d95] border-purple-900/30 shadow-lg overflow-hidden"
            >
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
                    <span className="text-neon-green">{stat.percentage}%</span>
                  </div>
                  <Progress value={stat.percentage} className="h-2" />
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>
        
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
        
        <motion.div variants={itemVariants}>
          <FundDetailsTable />
        </motion.div>
        
        <motion.div variants={itemVariants} className="flex items-center justify-center">
          <a href="#" className="inline-flex items-center text-blue-300 hover:text-blue-200 text-sm">
            <TranslatedText keyName="wallet.fundDetails.viewAllRecords" fallback="View All Transaction Records" />
            <ChevronRight size={16} className="ml-1" />
          </a>
        </motion.div>
      </motion.div>
    </TranslationWrapper>
  );
};

export default FundDetails;
