
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
  
  // Check if the title might be a common page title
  const isCommonPageTitle = !isTranslationKey && ['dashboard', 'accountManagement', 'userManagement', 'cardManagement', 'walletManagement', 'depositManagement', 'roleManagement'].includes(title);
  
  // Determine the appropriate way to display the title
  let translationKey: string;
  
  if (isTranslationKey) {
    translationKey = title;
  } else if (isCommonPageTitle) {
    translationKey = `pageTitle.${title}`;
  } else {
    translationKey = `accountManagement.${title}`;
  }
  
  // Try to get the fallback directly for better debugging
  const fallback = t(translationKey) || title;
  
  return (
    <h1 className={`text-2xl md:text-3xl font-bold text-white mb-6 flex items-center gap-2 ${className}`}>
      {icon && <span className="text-purple-400">{icon}</span>}
      <TranslatedText 
        keyName={translationKey} 
        fallback={fallback} 
      />
    </h1>
  );
};

export default PageTitle;
