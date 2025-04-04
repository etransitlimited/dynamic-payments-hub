
import React, { useState, useEffect } from "react";
import { usePageLanguage } from "@/hooks/use-page-language";
import PersonalInfoCard from "./components/PersonalInfoCard";
import CardInfoCard from "./components/CardInfoCard";
import ApplicationGuideCard from "./components/ApplicationGuideCard";
import TranslatedText from "@/components/translation/TranslatedText";
import { Button } from "@/components/ui/button";
import PageLayout from "@/components/dashboard/PageLayout";

const CardApplicationPage: React.FC = () => {
  const { language, forceUpdateKey, getTranslation } = usePageLanguage("cards.apply.title", "Apply for a Card");
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
    <PageLayout
      animationKey={`application-${language}-${forceUpdateKey}`}
      title={
        <TranslatedText 
          keyName="cards.apply.title" 
          fallback={getTranslation("cards.apply.title", "Apply for Card")} 
        />
      }
      subtitle={
        <TranslatedText 
          keyName="cards.apply.subtitle" 
          fallback={getTranslation("cards.apply.subtitle", "Complete the form to apply for a new card")} 
        />
      }
    >
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
            >
              {getTranslation("common.cancel", "Cancel")}
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
    </PageLayout>
  );
};

export default CardApplicationPage;
