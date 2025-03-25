
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

  // 定义简短的语言映射
  const languageShortNames = {
    "en": "EN",
    "zh-CN": "简",
    "zh-TW": "繁"
  };

  return (
    <Select value={language} onValueChange={(value) => setLanguage(value as "en" | "zh-CN" | "zh-TW")}>
      <SelectTrigger className="w-[80px] bg-transparent border-blue-400/30 text-blue-100 hover:bg-blue-900/40 hover:text-blue-50">
        <Globe className="w-4 h-4 mr-2" />
        <SelectValue placeholder={languageShortNames[language]} />
      </SelectTrigger>
      <SelectContent className="bg-[#0F2643] border-blue-900/50 text-blue-100">
        <SelectItem value="en" className="hover:bg-blue-800/30">
          {languageShortNames["en"]}
        </SelectItem>
        <SelectItem value="zh-CN" className="hover:bg-blue-800/30">
          {languageShortNames["zh-CN"]}
        </SelectItem>
        <SelectItem value="zh-TW" className="hover:bg-blue-800/30">
          {languageShortNames["zh-TW"]}
        </SelectItem>
      </SelectContent>
    </Select>
  );
};

export default LanguageSwitcher;
