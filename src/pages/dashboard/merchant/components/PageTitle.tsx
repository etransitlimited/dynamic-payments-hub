
import React from "react";
import TranslatedText from "@/components/translation/TranslatedText";
import { useSafeTranslation } from "@/hooks/use-safe-translation";

interface PageTitleProps {
  title: string;
  icon?: React.ReactNode;
  className?: string;
}

const PageTitle = ({ title, icon, className = "" }: PageTitleProps) => {
  const { t } = useSafeTranslation();
  
  // Check if the title is likely a translation key
  const isTranslationKey = title.includes('.') || title.includes('_');
  
  // Determine the appropriate translation key
  let translationKey: string;
  
  if (isTranslationKey) {
    translationKey = title;
  } else {
    // If it's a common root key like "accountManagement", "dashboard", etc.
    // We'll append ".title" to it
    translationKey = `${title}.title`;
  }
  
  return (
    <h1 className={`text-2xl md:text-3xl font-bold text-white mb-6 flex items-center gap-2 ${className}`}>
      {icon && <span className="text-purple-400">{icon}</span>}
      <TranslatedText 
        keyName={translationKey} 
        fallback={t(translationKey) || title} 
      />
    </h1>
  );
};

export default PageTitle;
