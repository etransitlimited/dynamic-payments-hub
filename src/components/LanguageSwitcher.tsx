
import React from "react";
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

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();
  const isMobile = useIsMobile();

  // Simplified language codes
  const languages = {
    "en": "EN",
    "zh-CN": "简",
    "zh-TW": "繁"
  };

  return (
    <Select value={language} onValueChange={(value) => setLanguage(value as "en" | "zh-CN" | "zh-TW")}>
      <SelectTrigger className={`${isMobile ? 'w-[60px] px-2' : 'w-[70px]'} bg-transparent border-blue-400/30 text-blue-100 hover:bg-blue-900/40 hover:text-blue-50`}>
        <Globe className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'} mr-1`} />
        <SelectValue placeholder={languages[language]} />
      </SelectTrigger>
      <SelectContent className="bg-[#0F2643] border-blue-900/50 text-blue-100">
        {Object.entries(languages).map(([code, label]) => (
          <SelectItem key={code} value={code} className="hover:bg-blue-800/30">
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default LanguageSwitcher;
