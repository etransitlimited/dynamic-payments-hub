
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import CardSearchHeader from "./components/CardSearchHeader";
import CardSearchResults from "./components/CardSearchResults";
import CardSearchPagination from "./components/CardSearchPagination";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Card } from "@/components/ui/card";
import TranslatedText from "@/components/translation/TranslatedText";
import { usePageLanguage } from "@/hooks/use-page-language";

const CardSearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { language, forceUpdateKey } = usePageLanguage("cards.search.title", "Card Search");
  
  // Animation variants
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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search logic would go here
    console.log("Searching for:", searchTerm);
  };

  return (
    <motion.div
      key={forceUpdateKey}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="container px-4 mx-auto py-6 space-y-6"
      data-language={language}
    >
      <motion.div variants={itemVariants}>
        <CardSearchHeader />
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card className="overflow-hidden border border-blue-800/20 bg-gradient-to-br from-blue-950/40 to-indigo-950/30 p-6">
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="search-term" className="text-sm font-medium text-white">
                <TranslatedText 
                  keyName="cards.search.enterCardInfo" 
                  fallback="Enter card number or cardholder information to search" 
                />
              </label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="search-term"
                    placeholder={
                      // Get placeholder text from translation
                      getTranslatedPlaceholder("cards.search.cardNumberOrHolder", "Card Number / Cardholder Name / Phone")
                    }
                    className="pl-10 bg-blue-950/50 border-blue-800/50 text-white placeholder-blue-300/40"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button 
                  type="submit" 
                  className="bg-blue-600 hover:bg-blue-700 transition-colors"
                >
                  <Search className="h-4 w-4 mr-2" />
                  <TranslatedText keyName="common.search" fallback="Search" />
                </Button>
              </div>
            </div>
          </form>
        </Card>
      </motion.div>

      <motion.div variants={itemVariants}>
        <h2 className="text-xl font-semibold text-white mb-4">
          <TranslatedText keyName="cards.search.searchResults" fallback="Search Results" />
        </h2>
        <CardSearchResults />
      </motion.div>

      <motion.div variants={itemVariants}>
        <CardSearchPagination />
      </motion.div>
    </motion.div>
  );
};

// Helper function to get translated text for input placeholders
const getTranslatedPlaceholder = (key: string, fallback: string): string => {
  // For placeholders, we need a string, not a React element
  // This is a workaround since we can't directly use TranslatedText in placeholders
  const language = document.documentElement.getAttribute('lang') || 'en';
  
  try {
    // Try to get translation from the translations object based on language
    // This is a simplified version - in a real app you might want to import your translation helpers
    const translations: any = {
      'en': "Card Number / Cardholder Name / Phone",
      'zh-CN': "卡号 / 持卡人姓名 / 电话",
      'zh-TW': "卡號 / 持卡人姓名 / 電話",
      'fr': "Numéro de Carte / Nom du Titulaire / Téléphone",
      'es': "Número de Tarjeta / Nombre del Titular / Teléfono"
    };
    
    return translations[language] || fallback;
  } catch (error) {
    console.error("Error getting placeholder translation:", error);
    return fallback;
  }
};

export default CardSearch;
