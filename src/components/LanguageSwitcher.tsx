
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

  // Simplified language mapping
  const languages = {
    "en": { code: "EN", name: t("language.en") },
    "zh-CN": { code: "简", name: t("language.zh-CN") },
    "zh-TW": { code: "繁", name: t("language.zh-TW") }
  };

  return (
    <Select value={language} onValueChange={(value) => setLanguage(value as "en" | "zh-CN" | "zh-TW")}>
      <SelectTrigger className="w-[80px] bg-transparent border-blue-400/30 text-blue-100 hover:bg-blue-900/40 hover:text-blue-50">
        <Globe className="w-4 h-4 mr-2" />
        <SelectValue placeholder={languages[language].code} />
      </SelectTrigger>
      <SelectContent className="bg-[#0F2643] border-blue-900/50 text-blue-100">
        {Object.entries(languages).map(([code, { name }]) => (
          <SelectItem key={code} value={code} className="hover:bg-blue-800/30">
            {name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default LanguageSwitcher;
