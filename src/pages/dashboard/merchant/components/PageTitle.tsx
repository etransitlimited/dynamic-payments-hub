
import React from "react";
import TranslatedText from "@/components/translation/TranslatedText";
import { useSafeTranslation } from "@/hooks/use-safe-translation";

interface PageTitleProps {
  title: string | React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

const PageTitle = ({ title, icon, className = "" }: PageTitleProps) => {
  const { t } = useSafeTranslation();
  
  // If title is already a ReactNode (like a TranslatedText component), return it directly
  if (React.isValidElement(title)) {
    return (
      <h1 className={`text-2xl md:text-3xl font-bold text-white mb-6 flex items-center gap-2 ${className}`}>
        {icon && <span className="text-purple-400">{icon}</span>}
        {title}
      </h1>
    );
  }
  
  // Handle string title - determine if it's a translation key
  const titleString = title as string;
  const isTranslationKey = titleString.includes('.') || titleString.includes('_');
  
  // Determine the appropriate translation key
  let translationKey: string;
  
  if (isTranslationKey) {
    translationKey = titleString;
  } else {
    // If it's a common root key like "accountManagement", "dashboard", etc.
    // We'll append ".title" to it
    translationKey = `${titleString}.title`;
  }
  
  return (
    <h1 className={`text-2xl md:text-3xl font-bold text-white mb-6 flex items-center gap-2 ${className}`}>
      {icon && <span className="text-purple-400">{icon}</span>}
      <TranslatedText 
        keyName={translationKey} 
        fallback={t(translationKey) || titleString} 
      />
    </h1>
  );
};

export default PageTitle;
