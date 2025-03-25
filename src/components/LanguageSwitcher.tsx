
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

const LanguageSwitcher = () => {
  const { language, setLanguage, t } = useLanguage();

  // Define language mapping with improved names
  const languageInfo = {
    "en": { short: "EN", full: "English" },
    "zh-CN": { short: "简", full: "简体中文" },
    "zh-TW": { short: "繁", full: "繁體中文" }
  };

  return (
    <Select value={language} onValueChange={(value) => setLanguage(value as "en" | "zh-CN" | "zh-TW")}>
      <SelectTrigger className="w-[80px] bg-transparent border-blue-400/30 text-blue-100 hover:bg-blue-900/40 hover:text-blue-50">
        <Globe className="w-4 h-4 mr-2" />
        <SelectValue placeholder={languageInfo[language].short} />
      </SelectTrigger>
      <SelectContent className="bg-[#0F2643] border-blue-900/50 text-blue-100">
        <SelectItem value="en" className="hover:bg-blue-800/30">
          {languageInfo["en"].full}
        </SelectItem>
        <SelectItem value="zh-CN" className="hover:bg-blue-800/30">
          {languageInfo["zh-CN"].full}
        </SelectItem>
        <SelectItem value="zh-TW" className="hover:bg-blue-800/30">
          {languageInfo["zh-TW"].full}
        </SelectItem>
      </SelectContent>
    </Select>
  );
};

export default LanguageSwitcher;
