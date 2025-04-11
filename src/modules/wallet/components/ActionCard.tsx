
import React, { useEffect, useRef, useState } from "react";
import { LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { LanguageCode } from "@/utils/languageUtils";
import { getDirectTranslation } from "@/utils/translationHelpers";

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
 * This component handles its own translations directly for better language change support
 */
const ActionCard: React.FC<ActionCardProps> = ({ 
  title, 
  description, 
  path, 
  icon, 
  instanceId, 
  language 
}) => {
  // Use ref for tracking language updates
  const langRef = useRef<LanguageCode>(language);
  const [updateKey, setUpdateKey] = useState(`card-${title}-${language}-${Date.now()}`);
  const titleRef = useRef<HTMLElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLElement>(null);
  
  // Get translations directly
  const getTranslatedText = (key: string, fallback: string): string => {
    return getDirectTranslation(key, language, fallback);
  };
  
  // Update DOM elements with translations
  const updateTextContent = () => {
    try {
      // Update title
      if (titleRef.current) {
        titleRef.current.textContent = getTranslatedText(title, title.split('.').pop() || title);
      }
      
      // Update description
      if (descRef.current) {
        descRef.current.textContent = getTranslatedText(description, description.split('.').pop() || description);
      }
      
      // Update button text
      if (buttonRef.current) {
        buttonRef.current.textContent = getTranslatedText("common.gotoPage", "Go to Page");
      }
    } catch (error) {
      console.error(`ActionCard translation update error:`, error);
    }
  };
  
  // Update component when language changes
  useEffect(() => {
    if (language !== langRef.current) {
      langRef.current = language;
      setUpdateKey(`card-${title}-${language}-${Date.now()}`);
      // Once component re-renders, update text content
      setTimeout(updateTextContent, 0);
    }
  }, [language, title]);
  
  // Update translations after initial render
  useEffect(() => {
    updateTextContent();
    
    // Listen for language change events for more responsive updates
    const handleLanguageChange = (e: Event) => {
      const customEvent = e as CustomEvent;
      const { language: newLanguage } = customEvent.detail || {};
      
      if (newLanguage && langRef.current !== newLanguage) {
        langRef.current = newLanguage as LanguageCode;
        updateTextContent();
      }
    };
    
    window.addEventListener('app:languageChange', handleLanguageChange);
    document.addEventListener('languageChanged', handleLanguageChange);
    
    return () => {
      window.removeEventListener('app:languageChange', handleLanguageChange);
      document.removeEventListener('languageChanged', handleLanguageChange);
    };
  }, [title, description]);
  
  // Get initial translated values for first render
  const initialTitle = getTranslatedText(title, title.split('.').pop() || title);
  const initialDesc = getTranslatedText(description, description.split('.').pop() || description);
  const gotoPageText = getTranslatedText("common.gotoPage", "Go to Page");
  
  return (
    <Card 
      key={updateKey}
      className="border-purple-900/30 bg-gradient-to-br from-charcoal-light to-charcoal-dark hover:shadow-purple-900/10 transition-all duration-300 hover:-translate-y-1"
      data-lang={language}
      data-title={title}
      data-instance={instanceId}
    >
      <CardHeader>
        <div className="w-12 h-12 rounded-lg bg-purple-900/40 flex items-center justify-center mb-4">
          {icon}
        </div>
        <CardTitle ref={titleRef as React.RefObject<HTMLHeadingElement>}>
          {initialTitle}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p ref={descRef} className="text-gray-400">
          {initialDesc}
        </p>
        <Button className="w-full bg-purple-700 hover:bg-purple-800" asChild>
          <Link to={path}>
            <span ref={buttonRef as React.RefObject<HTMLSpanElement>}>{gotoPageText}</span>
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default React.memo(ActionCard);
