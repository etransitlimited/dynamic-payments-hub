
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
  const isTranslationKey = title.includes('.');
  
  // Determine the appropriate way to display the title
  const displayTitle = isTranslationKey ? (
    <TranslatedText keyName={title} fallback={t(title) || title} />
  ) : (
    // If not a translation key, try common location or use as-is
    <TranslatedText 
      keyName={`accountManagement.${title}`} 
      fallback={t(`accountManagement.${title}`) || title} 
    />
  );
  
  return (
    <h1 className={`text-2xl md:text-3xl font-bold text-white mb-6 flex items-center gap-2 ${className}`}>
      {icon && <span className="text-purple-400">{icon}</span>}
      {displayTitle}
    </h1>
  );
};

export default PageTitle;
