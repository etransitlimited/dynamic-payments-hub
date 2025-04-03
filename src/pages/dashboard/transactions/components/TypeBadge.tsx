
import React from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import TranslatedText from "@/components/translation/TranslatedText";
import { useSafeTranslation } from "@/hooks/use-safe-translation";

interface TypeBadgeProps {
  type: string;
}

const TypeBadge: React.FC<TypeBadgeProps> = ({ type }) => {
  const isMobile = useIsMobile();
  const { language, t } = useSafeTranslation();

  const getTypeTranslationKey = (type: string) => {
    const lowerType = type.toLowerCase();
    
    // Try different key patterns in order of preference
    const possibleKeys = [
      // Direct translations from transactions namespace
      `transactions.${lowerType}`,
      
      // Wallet-specific transaction types 
      `wallet.fundDetails.type${lowerType.charAt(0).toUpperCase() + lowerType.slice(1)}`,
      
      // Common/fallback keys
      `common.${lowerType}`
    ];
    
    // Find first key that has a translation
    for (const key of possibleKeys) {
      const translation = t(key, '', {});
      if (translation && translation !== key) {
        return key;
      }
    }
    
    // Use the first key (transactions namespace) as default
    return possibleKeys[0];
  };

  // Enhanced min-width calculation based on language and device
  const getMinWidth = () => {
    if (language === 'fr') {
      return isMobile ? "min-w-[100px]" : "min-w-[120px]"; // French needs more space
    } else if (language === 'es') {
      return isMobile ? "min-w-[90px]" : "min-w-[110px]"; // Spanish needs moderate space
    } else if (['zh-CN', 'zh-TW'].includes(language)) {
      return isMobile ? "min-w-[70px]" : "min-w-[80px]"; // Chinese languages need less space
    }
    return isMobile ? "min-w-[85px]" : "min-w-[100px]"; // Default for English
  };

  const getBgColor = (type: string) => {
    const lowerType = type.toLowerCase();
    if (lowerType === "deposit") return "bg-green-900/60 text-green-200 border-green-500/30";
    if (lowerType === "withdrawal") return "bg-red-900/60 text-red-200 border-red-500/30";
    if (lowerType === "transfer") return "bg-blue-900/60 text-blue-200 border-blue-500/30";
    if (lowerType === "payment") return "bg-purple-900/60 text-purple-200 border-purple-500/30";
    if (lowerType === "card") return "bg-purple-900/60 text-purple-200 border-purple-500/30";
    if (lowerType === "activation") return "bg-cyan-900/60 text-cyan-200 border-cyan-500/30";
    if (lowerType === "exchange") return "bg-yellow-900/60 text-yellow-200 border-yellow-500/30";
    if (lowerType === "expense") return "bg-orange-900/60 text-orange-200 border-orange-500/30";
    return "bg-blue-900/60 text-blue-200 border-blue-500/30"; // default
  };

  const typeKey = getTypeTranslationKey(type);
  const typeFallback = type.charAt(0).toUpperCase() + type.slice(1);

  // Fixed spacing for different languages
  const getPaddingClasses = () => {
    if (language === 'fr') {
      return "px-1.5 py-1"; // Tighter padding for French (longer text)
    } else if (['zh-CN', 'zh-TW'].includes(language)) {
      return "px-3 py-1"; // More padding for Chinese (shorter text)
    }
    return "px-2 py-1"; // Default padding
  };

  return (
    <span 
      className={`${getPaddingClasses()} rounded-full text-xs font-medium border ${
        getBgColor(type)
      } ${getMinWidth()} inline-flex justify-center items-center`}
      data-language={language}
      data-key={typeKey}
    >
      <TranslatedText 
        keyName={typeKey} 
        fallback={typeFallback} 
        truncate 
        maxLines={1} 
        key={`${type}-${language}-${Date.now()}`}
      />
    </span>
  );
};

export default React.memo(TypeBadge);
