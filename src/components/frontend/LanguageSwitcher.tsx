
import React, { useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { dispatchLanguageChangeEvent } from "@/utils/translationHelpers";
import { LanguageCode } from "@/utils/languageUtils";

const FrontendLanguageSwitcher: React.FC = () => {
  const { language, setLanguage, isLoading } = useLanguage();

  // Language options with their labels
  const languageOptions = [
    { value: "en", label: "English" },
    { value: "fr", label: "Français" },
    { value: "es", label: "Español" },
    { value: "zh-CN", label: "简体中文" },
    { value: "zh-TW", label: "繁體中文" },
  ];

  const handleLanguageChange = (value: string) => {
    // Set language in context
    setLanguage(value as LanguageCode);
    
    // Dispatch language change events for isolated components
    dispatchLanguageChangeEvent(value as LanguageCode);
    
    // Store in localStorage for persistence
    try {
      localStorage.setItem("language", value);
    } catch (error) {
      console.error("Failed to save language preference:", error);
    }
    
    // Update HTML lang attribute
    document.documentElement.lang = value;
    document.documentElement.setAttribute('data-language', value);
    
    // Log language change for debugging
    console.log(`Language changed to: ${value}`);
  };

  // Update HTML lang attribute when component mounts
  useEffect(() => {
    if (language) {
      document.documentElement.lang = language;
      document.documentElement.setAttribute('data-language', language);
    }
  }, [language]);

  if (isLoading) {
    return (
      <div className="h-10 w-[120px] bg-charcoal-dark/60 rounded-md animate-pulse"></div>
    );
  }

  return (
    <Select
      value={language}
      onValueChange={handleLanguageChange}
      defaultValue={language}
    >
      <SelectTrigger className="w-[120px] bg-charcoal-dark/60 border-slate-700 text-white">
        <SelectValue placeholder="Language" />
      </SelectTrigger>
      <SelectContent className="bg-charcoal-dark border-slate-700">
        {languageOptions.map((option) => (
          <SelectItem
            key={option.value}
            value={option.value}
            className="text-white hover:bg-slate-700"
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default FrontendLanguageSwitcher;
