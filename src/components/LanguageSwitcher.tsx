
import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Globe, Check } from "lucide-react";

const LanguageSwitcher = () => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="bg-transparent border-blue-400/30 text-blue-100 hover:bg-blue-900/40 hover:text-blue-50">
          <Globe className="w-4 h-4 mr-2" />
          {t(`language.${language}`)}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-[#0F2643] border-blue-900/50 text-blue-100">
        <DropdownMenuItem 
          onClick={() => setLanguage("zh-CN")}
          className={`${language === "zh-CN" ? "bg-blue-900/40" : ""} hover:bg-blue-800/30 flex justify-between items-center`}
        >
          {t("language.zh-CN")}
          {language === "zh-CN" && <Check className="w-4 h-4 ml-2 text-cyan-400" />}
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setLanguage("zh-TW")}
          className={`${language === "zh-TW" ? "bg-blue-900/40" : ""} hover:bg-blue-800/30 flex justify-between items-center`}
        >
          {t("language.zh-TW")}
          {language === "zh-TW" && <Check className="w-4 h-4 ml-2 text-cyan-400" />}
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setLanguage("en")}
          className={`${language === "en" ? "bg-blue-900/40" : ""} hover:bg-blue-800/30 flex justify-between items-center`}
        >
          {t("language.en")}
          {language === "en" && <Check className="w-4 h-4 ml-2 text-cyan-400" />}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
