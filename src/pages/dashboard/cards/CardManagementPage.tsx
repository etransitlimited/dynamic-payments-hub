
import React, { useState, useEffect, useCallback } from "react";
import { usePageLanguage } from "@/hooks/use-page-language";
import TranslatedText from "@/components/translation/TranslatedText";
import CardManagementFilters from "./components/card-management/CardManagementFilters";
import CardManagementResults from "./components/card-management/CardManagementResults";
import CardManagementHeader from "./components/card-management/CardManagementHeader";
import CardManagementStats from "./components/card-management/CardManagementStats";
import PageLayout from "@/components/dashboard/PageLayout";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Plus, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSafeTranslation } from "@/hooks/use-safe-translation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const CardManagementPage: React.FC = () => {
  const { t } = useSafeTranslation();
  const { language, forceUpdateKey } = usePageLanguage("cards.management.title", "卡片管理");
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const navigate = useNavigate();
  
  // Mock data for card stats
  const [cardStats, setCardStats] = useState({
    total: 148,
    active: 98,
    pending: 32,
    expired: 18
  });
  
  // Reduce loading time to minimize flickering
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Animation variants
  const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, transition: { duration: 0.1 } }
  };

  const handleApplyCard = useCallback(() => {
    navigate("/dashboard/cards/apply");
  }, [navigate]);
  
  return (
    <PageLayout
      animationKey={`card-management-${language}`}
      title={<TranslatedText keyName="cards.management.title" />}
      subtitle={<TranslatedText keyName="cards.management.subtitle" />}
      actions={
        <div className="flex flex-wrap gap-2">
          <Button 
            variant="outline" 
            className="flex items-center gap-2 bg-blue-950/40 border-blue-800/30 hover:bg-blue-800/30"
            onClick={handleApplyCard}
          >
            <Plus className="h-4 w-4" />
            <span><TranslatedText keyName="cards.management.applyNewCard" /></span>
          </Button>
          <Button 
            variant="outline" 
            className="flex items-center gap-2 bg-blue-950/40 border-blue-800/30 hover:bg-blue-800/30"
          >
            <Download className="h-4 w-4" />
            <span><TranslatedText keyName="cards.management.exportData" /></span>
          </Button>
        </div>
      }
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={`card-management-content-${language}-${activeTab}`}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={pageVariants}
          className="space-y-6"
        >
          {/* Card Statistics Section */}
          <CardManagementStats 
            cardStats={cardStats} 
            isLoading={isLoading} 
          />
          
          {/* Filters and Search */}
          <CardManagementFilters 
            searchTerm={searchTerm} 
            setSearchTerm={setSearchTerm}
            isLoading={isLoading}
          />
          
          {/* Tabs for card status */}
          <Tabs 
            defaultValue="all" 
            className="w-full"
            value={activeTab}
            onValueChange={setActiveTab}
          >
            <TabsList className="bg-blue-950/40 border border-blue-800/30 mb-4">
              <TabsTrigger value="all" className="data-[state=active]:bg-blue-700/50">
                <TranslatedText keyName="cards.management.allCards" fallback="All Cards" />
              </TabsTrigger>
              <TabsTrigger value="active" className="data-[state=active]:bg-blue-700/50">
                <TranslatedText keyName="cards.management.activeCards" fallback="Active" />
              </TabsTrigger>
              <TabsTrigger value="pending" className="data-[state=active]:bg-blue-700/50">
                <TranslatedText keyName="cards.management.pendingCards" fallback="Pending" />
              </TabsTrigger>
              <TabsTrigger value="expired" className="data-[state=active]:bg-blue-700/50">
                <TranslatedText keyName="cards.management.expiredCards" fallback="Expired" />
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-0">
              <CardManagementResults status="all" isLoading={isLoading} />
            </TabsContent>
            
            <TabsContent value="active" className="mt-0">
              <CardManagementResults status="active" isLoading={isLoading} />
            </TabsContent>
            
            <TabsContent value="pending" className="mt-0">
              <CardManagementResults status="pending" isLoading={isLoading} />
            </TabsContent>
            
            <TabsContent value="expired" className="mt-0">
              <CardManagementResults status="expired" isLoading={isLoading} />
            </TabsContent>
          </Tabs>
        </motion.div>
      </AnimatePresence>
    </PageLayout>
  );
};

export default CardManagementPage;
