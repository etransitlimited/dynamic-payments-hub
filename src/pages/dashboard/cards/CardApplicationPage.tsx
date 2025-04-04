
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { usePageLanguage } from "@/hooks/use-page-language";
import PageTitle from "./components/PageTitle";
import PersonalInfoCard from "./components/PersonalInfoCard";
import CardInfoCard from "./components/CardInfoCard";
import ApplicationGuideCard from "./components/ApplicationGuideCard";
import TranslatedText from "@/components/translation/TranslatedText";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, CheckCircle, ArrowRightCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CardApplicationPage: React.FC = () => {
  const { language, forceUpdateKey, getTranslation } = usePageLanguage("cards.apply.title", "Apply for a Card");
  const navigate = useNavigate();
  const [birthdate, setBirthdate] = useState<Date | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  
  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      setBirthdate(date);
    } else {
      setBirthdate(undefined);
    }
  };
  
  // Log language changes for debugging
  useEffect(() => {
    console.log(`CardApplicationPage language: ${language}, forceUpdateKey: ${forceUpdateKey}`);
  }, [language, forceUpdateKey]);
  
  return (
    <motion.div
      key={`application-${language}-${forceUpdateKey}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
      data-language={language}
    >
      <PageTitle>
        <TranslatedText 
          keyName="cards.apply.title" 
          fallback={getTranslation("cards.apply.title", "Apply for Card")} 
        />
        <p className="text-sm text-gray-400 mt-1">
          <TranslatedText 
            keyName="cards.apply.subtitle" 
            fallback={getTranslation("cards.apply.subtitle", "Complete the form to apply for a new card")} 
          />
        </p>
      </PageTitle>
      
      {/* Card Management Navigation */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">
        <Card className="border-blue-800/40 bg-blue-950/30 hover:bg-blue-900/30 transition-colors cursor-pointer"
              onClick={() => navigate('/dashboard/cards/search')}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center text-blue-100">
              <CreditCard className="h-4 w-4 mr-2 text-blue-400" />
              {getTranslation("cards.search.title", "Card Search")}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 pb-2 flex justify-between items-center">
            <span className="text-xs text-blue-300">{getTranslation("cards.search.cardSearchResults", "Manage your cards")}</span>
            <ArrowRightCircle className="h-4 w-4 text-blue-400" />
          </CardContent>
        </Card>
        
        <Card className="border-purple-800/40 bg-purple-950/30 hover:bg-purple-900/30 transition-colors cursor-pointer">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center text-purple-100">
              <CheckCircle className="h-4 w-4 mr-2 text-purple-400" />
              {getTranslation("cards.apply.title", "Apply for Card")}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 pb-2 flex justify-between items-center">
            <span className="text-xs text-purple-300">{getTranslation("cards.apply.subtitle", "Complete application form")}</span>
          </CardContent>
        </Card>
        
        <Card className="border-green-800/40 bg-green-950/30 hover:bg-green-900/30 transition-colors cursor-pointer"
              onClick={() => navigate('/dashboard/cards/activation')}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center text-green-100">
              <CreditCard className="h-4 w-4 mr-2 text-green-400" />
              {getTranslation("cards.activationTasks.title", "Card Activation Tasks")}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 pb-2 flex justify-between items-center">
            <span className="text-xs text-green-300">{getTranslation("cards.activationTasks.manageCardTasks", "Manage activation tasks")}</span>
            <ArrowRightCircle className="h-4 w-4 text-green-400" />
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <PersonalInfoCard 
            birthdate={birthdate}
            setBirthdate={handleDateChange}
          />
          <CardInfoCard />
          
          <div className="flex justify-between mt-4">
            <Button 
              variant="outline" 
              className="text-sm bg-purple-900/30 border-purple-800/30 hover:bg-purple-800/50 text-purple-200"
              onClick={() => navigate('/dashboard/account/management')}
            >
              {getTranslation("accountManagement.accountManagement", "Account Management")}
            </Button>
            
            <Button 
              className="text-sm bg-green-700 hover:bg-green-600 text-white"
            >
              {getTranslation("cards.apply.submitApplication", "Submit Application")}
            </Button>
          </div>
        </div>
        <div className="lg:col-span-1">
          <ApplicationGuideCard />
        </div>
      </div>
    </motion.div>
  );
};

export default CardApplicationPage;
