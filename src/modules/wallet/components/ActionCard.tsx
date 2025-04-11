
import React, { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { LanguageCode } from "@/utils/languageUtils";
import { getWalletTranslation } from "../i18n";

interface ActionCardProps {
  title: string;
  description: string;
  path: string;
  icon: React.ReactNode;
  instanceId: string;
  language: LanguageCode;
}

/**
 * Wallet Action Card Component with isolated translations
 */
const ActionCard: React.FC<ActionCardProps> = ({ 
  title, 
  description, 
  path, 
  icon, 
  instanceId, 
  language 
}) => {
  const [updateKey, setUpdateKey] = useState(`card-${title}-${language}-${Date.now()}`);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLSpanElement>(null);
  const langRef = useRef<LanguageCode>(language);
  
  // Update translations when component mounts or language changes
  useEffect(() => {
    const updateTranslations = () => {
      if (titleRef.current) {
        titleRef.current.textContent = getWalletTranslation(title, language);
      }
      
      if (descRef.current) {
        descRef.current.textContent = getWalletTranslation(description, language);
      }
      
      if (buttonRef.current) {
        buttonRef.current.textContent = getWalletTranslation("common.gotoPage", language);
      }
    };
    
    updateTranslations();
    
    // Force re-render with new key when language changes
    if (language !== langRef.current) {
      langRef.current = language;
      setUpdateKey(`card-${title}-${language}-${Date.now()}`);
    }
    
    // Listen for language change events
    const handleLanguageChange = (e: Event) => {
      const customEvent = e as CustomEvent;
      const { language: newLanguage } = customEvent.detail || {};
      
      if (newLanguage && langRef.current !== newLanguage) {
        console.log(`ActionCard ${instanceId} updating language to ${newLanguage}`);
        langRef.current = newLanguage as LanguageCode;
        updateTranslations();
        setUpdateKey(`card-${title}-${newLanguage}-${Date.now()}`);
      }
    };
    
    window.addEventListener('app:languageChange', handleLanguageChange);
    document.addEventListener('languageChanged', handleLanguageChange);
    
    return () => {
      window.removeEventListener('app:languageChange', handleLanguageChange);
      document.removeEventListener('languageChanged', handleLanguageChange);
    };
  }, [title, description, language, instanceId]);
  
  // Get initial translated values
  const initialTitle = getWalletTranslation(title, language);
  const initialDesc = getWalletTranslation(description, language);
  const buttonText = getWalletTranslation("common.gotoPage", language);
  
  return (
    <Card 
      key={updateKey}
      className="border-purple-900/30 bg-gradient-to-br from-charcoal-light to-charcoal-dark hover:shadow-purple-900/10 transition-all duration-300 hover:-translate-y-1"
      data-lang={language}
      data-instance={instanceId}
    >
      <CardHeader>
        <div className="w-12 h-12 rounded-lg bg-purple-900/40 flex items-center justify-center mb-4">
          {icon}
        </div>
        <CardTitle ref={titleRef}>
          {initialTitle}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p ref={descRef} className="text-gray-400">
          {initialDesc}
        </p>
        <Button className="w-full bg-purple-700 hover:bg-purple-800" asChild>
          <Link to={path}>
            <span ref={buttonRef}>{buttonText}</span>
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default React.memo(ActionCard);
