
import React, { useEffect, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Globe } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { languages, LanguageCode } from "@/utils/languageUtils";

// More concise language labels for mobile
const conciseLanguages: Record<LanguageCode, string> = {
  "en": "EN",
  "zh-CN": "简中",
  "zh-TW": "繁中",
  "fr": "FR",
  "es": "ES"
};

const DashboardLanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();
  const isMobile = useIsMobile();
  const previousLanguage = useRef(language);
  const isChangingRef = useRef(false);

  const handleLanguageChange = (value: string) => {
    if (isChangingRef.current) return; // Prevent concurrent changes
    
    const newLang = value as LanguageCode;
    if (newLang !== language) {
      isChangingRef.current = true;
      // Get current path directly from window.location to ensure accuracy
      const currentPath = window.location.pathname;
      console.log(`Switching language from ${language} to ${newLang} in DashboardLanguageSwitcher`);
      console.log(`Current path: ${currentPath}`);
      
      // Set language without any navigation logic
      setLanguage(newLang);
      
      // Release the lock after a short delay
      setTimeout(() => {
        isChangingRef.current = false;
      }, 300);
    }
  };
  
  // Debug language state
  useEffect(() => {
    if (previousLanguage.current !== language) {
      console.log("Language changed in DashboardLanguageSwitcher:", 
        previousLanguage.current, "->", language);
      previousLanguage.current = language;
    }
  }, [language]);

  return (
    <Select value={language} onValueChange={handleLanguageChange}>
      <SelectTrigger 
        className={`
          ${isMobile ? 'w-[100px]' : 'w-[150px]'} 
          bg-transparent 
          border-blue-400/30 
          text-blue-100 
          hover:bg-blue-900/40 
          hover:text-blue-50
          flex items-center
          gap-2
          z-50
        `}
        data-language={language}
      >
        <Globe className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'}`} />
        <SelectValue placeholder={isMobile ? conciseLanguages[language as LanguageCode] : languages[language as LanguageCode]} />
      </SelectTrigger>
      <SelectContent 
        className="
          bg-[#0F2643] 
          border-blue-900/50 
          text-blue-100 
          min-w-[120px]
          z-50
        "
      >
        {Object.entries(isMobile ? conciseLanguages : languages).map(([code, label]) => (
          <SelectItem key={code} value={code} className="hover:bg-blue-800/30">
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default DashboardLanguageSwitcher;
