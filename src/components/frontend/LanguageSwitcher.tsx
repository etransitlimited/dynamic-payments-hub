
import React, { useEffect, useCallback } from "react";
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
import { useSafeTranslation } from "@/hooks/use-safe-translation";
import { dispatchLanguageChangeEvent } from "@/utils/translationHelpers";

// More concise language labels for mobile
const conciseLanguages: Record<LanguageCode, string> = {
  "en": "EN",
  "zh-CN": "简中",
  "zh-TW": "繁中",
  "fr": "FR",
  "es": "ES"
};

const FrontendLanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();
  const { setLanguage: setSafeLanguage } = useSafeTranslation();
  const isMobile = useIsMobile();

  const handleLanguageChange = useCallback((value: string) => {
    const newLang = value as LanguageCode;
    if (newLang !== language) {
      // Get current path directly from window.location to ensure accuracy
      const currentPath = window.location.pathname;
      console.log(`Switching language from ${language} to ${newLang} in FrontendLanguageSwitcher`);
      console.log(`Current path: ${currentPath}`);
      
      // 同步设置两个地方的语言
      setLanguage(newLang);
      setSafeLanguage(newLang);
      
      // 显式触发语言变更事件
      dispatchLanguageChangeEvent(newLang);
      
      // 保存当前路径以便语言切换后恢复
      localStorage.setItem('lastPath', currentPath);
    }
  }, [language, setLanguage, setSafeLanguage]);
  
  // Debug language state
  useEffect(() => {
    console.log("Current language in FrontendLanguageSwitcher:", language);
  }, [language]);

  return (
    <Select value={language} onValueChange={handleLanguageChange}>
      <SelectTrigger 
        className={`
          ${isMobile ? 'w-[100px]' : 'w-[150px]'} 
          bg-transparent 
          border-blue-400/50 
          text-white 
          hover:bg-white/10 
          hover:text-white
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
          bg-blue-950 
          border-blue-900/50 
          text-white 
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

export default FrontendLanguageSwitcher;
