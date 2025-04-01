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
import { Search, Filter, Download, RefreshCw, CreditCard } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import PageTitle from "./components/PageTitle";
import { motion } from "framer-motion";

const CardSearch = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { t, language } = useLanguage();

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
    // Log translations for debugging
    console.log("Common translations:", {
      search: t("common.search"),
      filter: t("common.filter"),
      export: t("common.export"),
      refresh: t("common.refresh")
    });
  }, [language, t]);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="container mx-auto px-4"
    >
      <PageTitle title={t("cards.search.title")} />
      
      <motion.div variants={itemVariants}>
        <Card className="bg-gradient-to-r from-[rgb(142,45,226)] to-[rgb(74,0,224)] border-purple-900/50 shadow-lg shadow-purple-900/10 hover:shadow-[0_0_15px_rgba(142,45,226,0.15)] transition-all duration-300 overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
          <CardHeader className="pb-3 relative z-10 bg-purple-950/60">
            <CardTitle className="text-white flex items-center mb-1.5">
              <span className="bg-purple-500/30 p-2 rounded-full mr-2">
                <Search size={18} className="text-purple-300" />
              </span>
              {t("cards.search.searchCriteria")}
            </CardTitle>
            <CardDescription className="text-purple-200">
              {t("cards.search.enterCardInfo")}
            </CardDescription>
          </CardHeader>
          <CardContent className="relative z-10 bg-purple-950/40 py-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-purple-400 pointer-events-none" />
                <Input 
                  placeholder={t("cards.search.cardNumberOrHolder")}
                  className="pl-10 bg-purple-950/70 border-purple-700/50 text-white placeholder-purple-300/70 focus:ring-purple-500/50 focus:border-purple-500/50 hover:bg-purple-900/70 transition-colors"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button className="gap-2 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white shadow-md shadow-purple-600/30 border border-purple-500/30">
                <Search className="h-4 w-4" />
                {t("common.search")}
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
      
      <motion.div variants={itemVariants} className="mt-6">
        <Card className="bg-gradient-to-r from-[rgb(142,45,226)] to-[rgb(74,0,224)] border-purple-900/50 shadow-lg shadow-purple-900/10 hover:shadow-[0_0_15px_rgba(142,45,226,0.15)] transition-all duration-300 overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
          <CardHeader className="pb-3 relative z-10 bg-purple-950/60">
            <CardTitle className="text-white flex items-center mb-1.5">
              <span className="bg-purple-500/30 p-2 rounded-full mr-2">
                <CreditCard size={18} className="text-purple-300" />
              </span>
              {t("cards.search.cardList")}
            </CardTitle>
            <CardDescription className="text-purple-200">
              {t("cards.search.searchResults")}
            </CardDescription>
          </CardHeader>
          <CardContent className="relative z-10 bg-purple-950/40 py-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div className="flex gap-2">
                <Button variant="outline" className="gap-2 border-purple-600/60 text-white hover:bg-purple-800/50 transition-colors">
                  <Filter className="h-4 w-4" />
                  {t("common.filter")}
                </Button>
                <Button variant="outline" className="gap-2 border-purple-600/60 text-white hover:bg-purple-800/50 transition-colors">
                  <Download className="h-4 w-4" />
                  {t("common.export")}
                </Button>
                <Button variant="outline" className="gap-2 border-purple-600/60 text-white hover:bg-purple-800/50 transition-colors">
                  <RefreshCw className="h-4 w-4" />
                  {t("common.refresh")}
                </Button>
              </div>
            </div>
            
            <div className="rounded-md border border-purple-700/50 overflow-hidden shadow-inner shadow-purple-950/50">
              <Table>
                <TableCaption className="text-purple-300/50">{t("cards.search.cardSearchResults")}</TableCaption>
                <TableHeader>
                  <TableRow className="border-purple-700/50 bg-purple-900/40">
                    <TableHead className="text-white font-medium">{t("cards.search.cardNumber")}</TableHead>
                    <TableHead className="text-white font-medium">{t("cards.search.cardHolder")}</TableHead>
                    <TableHead className="text-white font-medium">{t("cards.search.issueDate")}</TableHead>
                    <TableHead className="text-white font-medium">{t("cards.search.status")}</TableHead>
                    <TableHead className="text-white font-medium">{t("cards.search.balance")}</TableHead>
                    <TableHead className="text-white font-medium">{t("cards.search.actions")}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow className="border-purple-700/50 hover:bg-purple-800/50 transition-colors duration-200">
                    <TableCell className="font-medium text-white">5678 **** **** 1234</TableCell>
                    <TableCell className="text-white">John Smith</TableCell>
                    <TableCell className="text-white">2023-10-15</TableCell>
                    <TableCell>
                      <span className="inline-block px-2 py-1 text-xs rounded-full bg-emerald-600/20 text-emerald-300 border border-emerald-500/20">
                        {t("cards.search.statusActive")}
                      </span>
                    </TableCell>
                    <TableCell className="text-white">¥1,234.56</TableCell>
                    <TableCell>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="border-purple-600/60 text-white hover:bg-purple-800/50 transition-colors"
                      >
                        {t("cards.search.details")}
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow className="border-purple-700/50 hover:bg-purple-800/50 transition-colors duration-200">
                    <TableCell className="font-medium text-white">4321 **** **** 5678</TableCell>
                    <TableCell className="text-white">Maria Garcia</TableCell>
                    <TableCell className="text-white">2023-09-22</TableCell>
                    <TableCell>
                      <span className="inline-block px-2 py-1 text-xs rounded-full bg-amber-600/20 text-amber-300 border border-amber-500/20">
                        {t("cards.search.statusPending")}
                      </span>
                    </TableCell>
                    <TableCell className="text-white">¥0.00</TableCell>
                    <TableCell>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="border-purple-600/60 text-white hover:bg-purple-800/50 transition-colors"
                      >
                        {t("cards.search.details")}
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default CardSearch;
