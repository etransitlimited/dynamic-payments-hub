
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
import { Search, Filter, Download, RefreshCw, CreditCard, Eye, BadgeCheck, ActivitySquare, Clock, AlertTriangle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import PageTitle from "./components/PageTitle";
import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import TranslatedText from "@/components/translation/TranslatedText";
import CardBase from "@/components/cards/CardBase";

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

  const renderRadialProgress = (value: number, max: number, color: string) => {
    const percentage = (value / max) * 100;
    return (
      <div className="relative h-24 w-24 mx-auto">
        {/* Background circle */}
        <div className="absolute inset-0 rounded-full bg-charcoal-dark/60 border border-purple-900/20"></div>
        
        {/* Progress circle with gradient */}
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100">
          <circle 
            cx="50" 
            cy="50" 
            r="40" 
            fill="none" 
            stroke="rgba(30, 30, 45, 0.6)" 
            strokeWidth="8"
          />
          <circle 
            cx="50" 
            cy="50" 
            r="40" 
            fill="none" 
            stroke={color} 
            strokeWidth="8"
            strokeDasharray="251.2"
            strokeDashoffset={251.2 - (percentage * 251.2 / 100)}
            strokeLinecap="round"
            transform="rotate(-90 50 50)"
            className="drop-shadow-[0_0_3px_rgba(255,255,255,0.3)]"
          />
        </svg>
        
        {/* Inner content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl font-bold text-white">{value}</div>
            <div className="text-xs text-white/70">/ {max}</div>
          </div>
        </div>
      </div>
    );
  };

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
        <Card className="border-purple-900/30 bg-gradient-to-br from-charcoal-light to-charcoal-dark shadow-lg shadow-purple-900/10 overflow-hidden relative group transition-all duration-300 hover:shadow-purple-600/20 hover:-translate-y-1">
          <div className="absolute inset-0 bg-grid-white/[0.02] [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
          <div className="absolute top-0 right-0 w-24 h-24 bg-purple-600/20 rounded-full blur-xl group-hover:bg-purple-600/30 transition-all duration-500"></div>
          
          <CardHeader className="pb-0 relative z-10">
            <CardTitle className="text-lg text-white flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-purple-400" />
              <TranslatedText 
                keyName="cards.search.totalCards" 
                fallback="Total Cards" 
              />
            </CardTitle>
          </CardHeader>
          <CardContent className="relative z-10 pt-4">
            {renderRadialProgress(cardStats.total, cardStats.total, 'url(#purpleGradient)')}
            <svg width="0" height="0" className="absolute">
              <linearGradient id="purpleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8B5CF6" />
                <stop offset="100%" stopColor="#6D28D9" />
              </linearGradient>
            </svg>
          </CardContent>
        </Card>
        
        <Card className="border-purple-900/30 bg-gradient-to-br from-charcoal-light to-charcoal-dark shadow-lg shadow-purple-900/10 overflow-hidden relative group transition-all duration-300 hover:shadow-green-600/20 hover:-translate-y-1">
          <div className="absolute inset-0 bg-grid-white/[0.02] [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
          <div className="absolute top-0 right-0 w-24 h-24 bg-green-600/20 rounded-full blur-xl group-hover:bg-green-600/30 transition-all duration-500"></div>
          
          <CardHeader className="pb-0 relative z-10">
            <CardTitle className="text-lg text-white flex items-center gap-2">
              <BadgeCheck className="h-5 w-5 text-emerald-400" />
              <TranslatedText 
                keyName="cards.search.activeCards" 
                fallback="Active Cards" 
              />
            </CardTitle>
          </CardHeader>
          <CardContent className="relative z-10 pt-4">
            {renderRadialProgress(cardStats.active, cardStats.total, 'url(#greenGradient)')}
            <svg width="0" height="0" className="absolute">
              <linearGradient id="greenGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10B981" />
                <stop offset="100%" stopColor="#059669" />
              </linearGradient>
            </svg>
          </CardContent>
        </Card>
        
        <Card className="border-purple-900/30 bg-gradient-to-br from-charcoal-light to-charcoal-dark shadow-lg shadow-purple-900/10 overflow-hidden relative group transition-all duration-300 hover:shadow-amber-600/20 hover:-translate-y-1">
          <div className="absolute inset-0 bg-grid-white/[0.02] [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-600/20 rounded-full blur-xl group-hover:bg-amber-600/30 transition-all duration-500"></div>
          
          <CardHeader className="pb-0 relative z-10">
            <CardTitle className="text-lg text-white flex items-center gap-2">
              <Clock className="h-5 w-5 text-amber-400" />
              <TranslatedText 
                keyName="cards.search.pendingCards" 
                fallback="Pending Cards" 
              />
            </CardTitle>
          </CardHeader>
          <CardContent className="relative z-10 pt-4">
            {renderRadialProgress(cardStats.pending, cardStats.total, 'url(#amberGradient)')}
            <svg width="0" height="0" className="absolute">
              <linearGradient id="amberGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F59E0B" />
                <stop offset="100%" stopColor="#D97706" />
              </linearGradient>
            </svg>
          </CardContent>
        </Card>
        
        <Card className="border-purple-900/30 bg-gradient-to-br from-charcoal-light to-charcoal-dark shadow-lg shadow-purple-900/10 overflow-hidden relative group transition-all duration-300 hover:shadow-red-600/20 hover:-translate-y-1">
          <div className="absolute inset-0 bg-grid-white/[0.02] [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
          <div className="absolute top-0 right-0 w-24 h-24 bg-red-600/20 rounded-full blur-xl group-hover:bg-red-600/30 transition-all duration-500"></div>
          
          <CardHeader className="pb-0 relative z-10">
            <CardTitle className="text-lg text-white flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-400" />
              <TranslatedText 
                keyName="cards.search.expiredCards" 
                fallback="Expired Cards" 
              />
            </CardTitle>
          </CardHeader>
          <CardContent className="relative z-10 pt-4">
            {renderRadialProgress(cardStats.expired, cardStats.total, 'url(#redGradient)')}
            <svg width="0" height="0" className="absolute">
              <linearGradient id="redGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#EF4444" />
                <stop offset="100%" stopColor="#DC2626" />
              </linearGradient>
            </svg>
          </CardContent>
        </Card>
      </motion.div>
      
      {/* Search Section */}
      <motion.div 
        variants={itemVariants}
        className="w-full bg-gradient-to-br from-purple-900/40 to-charcoal-dark rounded-xl border border-purple-900/30 overflow-hidden relative shadow-lg shadow-purple-900/10 hover:shadow-purple-600/20 transition-all duration-300"
      >
        <div className="absolute inset-0 bg-grid-white/[0.02] [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
        <div className="absolute top-0 right-0 w-40 h-40 bg-purple-600/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
        
        <CardHeader className="pb-3 relative z-10 bg-purple-950/30 border-b border-purple-800/30">
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
      
      {/* Results Section */}
      <motion.div 
        variants={itemVariants}
        className="w-full bg-gradient-to-br from-purple-900/40 to-charcoal-dark rounded-xl border border-purple-900/30 overflow-hidden relative shadow-lg shadow-purple-900/10 hover:shadow-purple-600/10 transition-all duration-300"
      >
        <div className="absolute inset-0 bg-grid-white/[0.02] [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-purple-800/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4"></div>
        
        <CardHeader className="pb-3 relative z-10 bg-purple-950/30 border-b border-purple-800/30">
          <CardTitle className="text-white flex items-center mb-1.5">
            <span className="bg-purple-500/30 p-2 rounded-full mr-2">
              <ActivitySquare size={18} className="text-purple-300" />
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
