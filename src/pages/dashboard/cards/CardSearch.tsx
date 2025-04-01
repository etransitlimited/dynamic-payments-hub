
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Filter, Download, RefreshCw, CreditCard, Eye, BadgeCheck } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import PageTitle from "./components/PageTitle";
import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import TranslatedText from "@/components/translation/TranslatedText";

const CardSearch = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { language } = useLanguage();
  const [cardStats, setCardStats] = useState({
    total: 35,
    active: 28,
    pending: 5,
    expired: 2
  });

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

  useEffect(() => {
    console.log("CardSearch rendering with language:", language);
  }, [language]);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="container mx-auto px-4 py-6 space-y-6"
    >
      <div className="w-full">
        <PageTitle title={<TranslatedText keyName="cards.search.title" fallback="Card Search" />} />
      </div>
      
      {/* Card Stats */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-purple-900/30 bg-gradient-to-br from-charcoal-light to-charcoal-dark shadow-lg shadow-purple-900/10 overflow-hidden relative">
          <div className="absolute inset-0 bg-grid-white/[0.02] [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
          <div className="absolute top-0 right-0 w-20 h-20 bg-purple-600/20 rounded-full blur-xl"></div>
          
          <CardHeader className="pb-2 relative z-10">
            <CardTitle className="text-lg text-white flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-purple-400" />
              <TranslatedText keyName="cards.search.totalCards" fallback="Total Cards" />
            </CardTitle>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-3xl font-bold text-white mb-2">{cardStats.total}</div>
            <Progress value={100} className="h-2" />
          </CardContent>
        </Card>
        
        <Card className="border-purple-900/30 bg-gradient-to-br from-charcoal-light to-charcoal-dark shadow-lg shadow-purple-900/10 overflow-hidden relative">
          <div className="absolute inset-0 bg-grid-white/[0.02] [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
          <div className="absolute top-0 right-0 w-20 h-20 bg-green-600/20 rounded-full blur-xl"></div>
          
          <CardHeader className="pb-2 relative z-10">
            <CardTitle className="text-lg text-white flex items-center gap-2">
              <BadgeCheck className="h-5 w-5 text-emerald-400" />
              <TranslatedText keyName="cards.search.activeCards" fallback="Active Cards" />
            </CardTitle>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-3xl font-bold text-white mb-2">{cardStats.active}</div>
            <Progress value={(cardStats.active / cardStats.total) * 100} className="h-2" indicatorClassName="bg-gradient-to-r from-emerald-600 to-emerald-400" />
          </CardContent>
        </Card>
        
        <Card className="border-purple-900/30 bg-gradient-to-br from-charcoal-light to-charcoal-dark shadow-lg shadow-purple-900/10 overflow-hidden relative">
          <div className="absolute inset-0 bg-grid-white/[0.02] [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
          <div className="absolute top-0 right-0 w-20 h-20 bg-amber-600/20 rounded-full blur-xl"></div>
          
          <CardHeader className="pb-2 relative z-10">
            <CardTitle className="text-lg text-white flex items-center gap-2">
              <RefreshCw className="h-5 w-5 text-amber-400" />
              <TranslatedText keyName="cards.search.pendingCards" fallback="Pending Cards" />
            </CardTitle>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-3xl font-bold text-white mb-2">{cardStats.pending}</div>
            <Progress value={(cardStats.pending / cardStats.total) * 100} className="h-2" indicatorClassName="bg-gradient-to-r from-amber-600 to-amber-400" />
          </CardContent>
        </Card>
        
        <Card className="border-purple-900/30 bg-gradient-to-br from-charcoal-light to-charcoal-dark shadow-lg shadow-purple-900/10 overflow-hidden relative">
          <div className="absolute inset-0 bg-grid-white/[0.02] [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
          <div className="absolute top-0 right-0 w-20 h-20 bg-red-600/20 rounded-full blur-xl"></div>
          
          <CardHeader className="pb-2 relative z-10">
            <CardTitle className="text-lg text-white flex items-center gap-2">
              <RefreshCw className="h-5 w-5 text-red-400" />
              <TranslatedText keyName="cards.search.expiredCards" fallback="Expired Cards" />
            </CardTitle>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-3xl font-bold text-white mb-2">{cardStats.expired}</div>
            <Progress value={(cardStats.expired / cardStats.total) * 100} className="h-2" indicatorClassName="bg-gradient-to-r from-red-600 to-red-400" />
          </CardContent>
        </Card>
      </motion.div>
      
      <motion.div 
        variants={itemVariants}
        className="w-full bg-gradient-to-br from-purple-900/40 to-charcoal-dark rounded-xl border border-purple-900/30 overflow-hidden relative"
      >
        <div className="absolute inset-0 bg-grid-white/[0.02] [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
        <div className="absolute top-0 right-0 w-40 h-40 bg-purple-600/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
        
        <CardHeader className="pb-3 relative z-10 bg-purple-950/30">
          <CardTitle className="text-white flex items-center mb-1.5">
            <span className="bg-purple-500/30 p-2 rounded-full mr-2">
              <Search size={18} className="text-purple-300" />
            </span>
            <TranslatedText keyName="cards.search.searchCriteria" fallback="Search Criteria" />
          </CardTitle>
          <CardDescription className="text-purple-200">
            <TranslatedText keyName="cards.search.enterCardInfo" fallback="Enter card number or cardholder name to search" />
          </CardDescription>
        </CardHeader>
        <CardContent className="relative z-10 bg-purple-950/20 py-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-purple-400 pointer-events-none" />
              <Input 
                placeholder={language === 'zh-TW' ? '卡號或持卡人' : language === 'zh-CN' ? '卡号或持卡人' : 'Card Number or Holder'}
                className="pl-10 bg-purple-950/70 border-purple-700/50 text-white placeholder-purple-300/70 focus:ring-purple-500/50 focus:border-purple-500/50 hover:bg-purple-900/70 transition-colors"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button className="gap-2 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white shadow-md shadow-purple-600/30 border border-purple-500/30">
              <Search className="h-4 w-4" />
              <TranslatedText keyName="common.search" fallback="Search" />
            </Button>
          </div>
        </CardContent>
      </motion.div>
      
      <motion.div 
        variants={itemVariants}
        className="w-full bg-gradient-to-br from-purple-900/40 to-charcoal-dark rounded-xl border border-purple-900/30 overflow-hidden relative"
      >
        <div className="absolute inset-0 bg-grid-white/[0.02] [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-purple-800/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4"></div>
        
        <CardHeader className="pb-3 relative z-10 bg-purple-950/30">
          <CardTitle className="text-white flex items-center mb-1.5">
            <span className="bg-purple-500/30 p-2 rounded-full mr-2">
              <CreditCard size={18} className="text-purple-300" />
            </span>
            <TranslatedText keyName="cards.search.cardList" fallback="Card List" />
          </CardTitle>
          <CardDescription className="text-purple-200">
            <TranslatedText keyName="cards.search.searchResults" fallback="Search Results" />
          </CardDescription>
        </CardHeader>
        <CardContent className="relative z-10 bg-purple-950/20 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div className="flex gap-2 flex-wrap">
              <Button variant="outline" className="gap-2 border-purple-600/60 text-white hover:bg-purple-800/50 transition-colors">
                <Filter className="h-4 w-4" />
                <TranslatedText keyName="common.filter" fallback="Filter" />
              </Button>
              <Button variant="outline" className="gap-2 border-purple-600/60 text-white hover:bg-purple-800/50 transition-colors">
                <Download className="h-4 w-4" />
                <TranslatedText keyName="common.export" fallback="Export" />
              </Button>
              <Button variant="outline" className="gap-2 border-purple-600/60 text-white hover:bg-purple-800/50 transition-colors">
                <RefreshCw className="h-4 w-4" />
                <TranslatedText keyName="common.refresh" fallback="Refresh" />
              </Button>
            </div>
          </div>
          
          <div className="rounded-md border border-purple-700/50 overflow-hidden shadow-inner shadow-purple-950/50">
            <Table>
              <TableCaption className="text-purple-300/50">
                <TranslatedText keyName="cards.search.cardSearchResults" fallback="Card Search Results" />
              </TableCaption>
              <TableHeader>
                <TableRow className="border-purple-700/50 bg-purple-900/40">
                  <TableHead className="text-white font-medium">
                    <TranslatedText keyName="cards.search.cardNumber" fallback="Card Number" />
                  </TableHead>
                  <TableHead className="text-white font-medium">
                    <TranslatedText keyName="cards.search.cardHolder" fallback="Card Holder" />
                  </TableHead>
                  <TableHead className="text-white font-medium">
                    <TranslatedText keyName="cards.search.issueDate" fallback="Issue Date" />
                  </TableHead>
                  <TableHead className="text-white font-medium">
                    <TranslatedText keyName="cards.search.status" fallback="Status" />
                  </TableHead>
                  <TableHead className="text-white font-medium">
                    <TranslatedText keyName="cards.search.balance" fallback="Balance" />
                  </TableHead>
                  <TableHead className="text-white font-medium">
                    <TranslatedText keyName="cards.search.actions" fallback="Actions" />
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow className="border-purple-700/50 hover:bg-purple-800/50 transition-colors duration-200">
                  <TableCell className="font-medium text-white">5678 **** **** 1234</TableCell>
                  <TableCell className="text-white">John Smith</TableCell>
                  <TableCell className="text-white">2023-10-15</TableCell>
                  <TableCell>
                    <span className="inline-block px-2 py-1 text-xs rounded-full bg-emerald-600/20 text-emerald-300 border border-emerald-500/20">
                      <TranslatedText keyName="cards.search.statusActive" fallback="Active" />
                    </span>
                  </TableCell>
                  <TableCell className="text-white">¥1,234.56</TableCell>
                  <TableCell>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="border-purple-600/60 text-white hover:bg-purple-800/50 transition-colors gap-1"
                    >
                      <Eye size={14} />
                      <TranslatedText keyName="cards.search.details" fallback="Details" />
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow className="border-purple-700/50 hover:bg-purple-800/50 transition-colors duration-200">
                  <TableCell className="font-medium text-white">4321 **** **** 5678</TableCell>
                  <TableCell className="text-white">Maria Garcia</TableCell>
                  <TableCell className="text-white">2023-09-22</TableCell>
                  <TableCell>
                    <span className="inline-block px-2 py-1 text-xs rounded-full bg-amber-600/20 text-amber-300 border border-amber-500/20">
                      <TranslatedText keyName="cards.search.statusPending" fallback="Pending" />
                    </span>
                  </TableCell>
                  <TableCell className="text-white">¥0.00</TableCell>
                  <TableCell>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="border-purple-600/60 text-white hover:bg-purple-800/50 transition-colors gap-1"
                    >
                      <Eye size={14} />
                      <TranslatedText keyName="cards.search.details" fallback="Details" />
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </motion.div>
    </motion.div>
  );
};

export default CardSearch;
