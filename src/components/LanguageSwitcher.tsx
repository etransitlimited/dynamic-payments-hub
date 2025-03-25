
import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

const LanguageSwitcher = () => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="bg-transparent border-blue-400/30 text-blue-100 hover:bg-blue-900/40 hover:text-blue-50">
          <Globe className="w-4 h-4 mr-2" />
          {t("language")}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-[#0F2643] border-blue-900/50 text-blue-100">
        <DropdownMenuItem 
          onClick={() => setLanguage("zh-CN")}
          className={`${language === "zh-CN" ? "bg-blue-900/40" : ""} hover:bg-blue-800/30`}
        >
          {t("language.zh-CN")}
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setLanguage("zh-TW")}
          className={`${language === "zh-TW" ? "bg-blue-900/40" : ""} hover:bg-blue-800/30`}
        >
          {t("language.zh-TW")}
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setLanguage("en")}
          className={`${language === "en" ? "bg-blue-900/40" : ""} hover:bg-blue-800/30`}
        >
          {t("language.en")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
