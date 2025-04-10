
import React, { useState, useEffect, useRef, useCallback } from "react";
import { useSafeTranslation } from "@/hooks/use-safe-translation";
import { getTransactionTranslation } from "../i18n";
import { getDirectTranslation } from "@/utils/translationHelpers";
import { LanguageCode } from "@/utils/languageUtils";

type TransactionType = "deposit" | "withdrawal" | "transfer" | "payment" | "exchange" | "card" | "expense" | "activation";

interface TypeBadgeProps {
  type: string;
}

const TypeBadge: React.FC<TypeBadgeProps> = ({ type }) => {
  const { language, refreshCounter } = useSafeTranslation();
  const [currentType, setCurrentType] = useState<string>(type);
  const badgeRef = useRef<HTMLSpanElement>(null);
  const languageRef = useRef<LanguageCode>(language as LanguageCode);
  const instanceId = useRef(`type-badge-${Math.random().toString(36).substring(2, 9)}`);
  
  // Get the appropriate color and background for each transaction type
  const getTypeStyles = useCallback((transactionType: string) => {
    switch (transactionType.toLowerCase()) {
      case 'deposit':
        return {
          bg: 'bg-emerald-500/20',
          text: 'text-emerald-400',
          border: 'border-emerald-500/30'
        };
      case 'withdrawal':
        return {
          bg: 'bg-amber-500/20',
          text: 'text-amber-400',
          border: 'border-amber-500/30'
        };
      case 'transfer':
        return {
          bg: 'bg-blue-500/20',
          text: 'text-blue-400',
          border: 'border-blue-500/30'
        };
      case 'payment':
        return {
          bg: 'bg-red-500/20',
          text: 'text-red-400',
          border: 'border-red-500/30'
        };
      case 'exchange':
        return {
          bg: 'bg-indigo-500/20',
          text: 'text-indigo-400',
          border: 'border-indigo-500/30'
        };
      case 'expense':
        return {
          bg: 'bg-rose-500/20',
          text: 'text-rose-400',
          border: 'border-rose-500/30'
        };
      case 'card':
        return {
          bg: 'bg-purple-500/20',
          text: 'text-purple-400',
          border: 'border-purple-500/30'
        };
      case 'activation':
        return {
          bg: 'bg-teal-500/20',
          text: 'text-teal-400',
          border: 'border-teal-500/30'
        };
      default:
        return {
          bg: 'bg-gray-500/20',
          text: 'text-gray-400',
          border: 'border-gray-500/30'
        };
    }
  }, []);
  
  // Update badge text without re-rendering
  const updateBadgeText = useCallback(() => {
    if (!badgeRef.current || !type) return;
    
    // Multi-layered translation lookup strategy
    
    // 1. Look in wallet.fundDetails.transactionTypes first (most specific)
    let translatedText = getDirectTranslation(
      `wallet.fundDetails.transactionTypes.${type.toLowerCase()}`, 
      languageRef.current
    );
    
    // 2. If not found, try wallet.transactions section
    if (translatedText === `wallet.fundDetails.transactionTypes.${type.toLowerCase()}`) {
      translatedText = getDirectTranslation(
        `wallet.transactions.${type.toLowerCase()}`, 
        languageRef.current
      );
    }
    
    // 3. If not found, try transactions section with the "type" prefix
    if (translatedText === `wallet.transactions.${type.toLowerCase()}`) {
      const typeKey = `type${type.charAt(0).toUpperCase()}${type.slice(1)}`;
      translatedText = getDirectTranslation(
        `transactions.${typeKey}`, 
        languageRef.current
      );
    }
    
    // 4. If still not found, try direct transaction type
    if (translatedText === `transactions.type${type.charAt(0).toUpperCase()}${type.slice(1)}`) {
      translatedText = getTransactionTranslation(
        `type${type.charAt(0).toUpperCase()}${type.slice(1)}`, 
        languageRef.current
      );
    }
    
    // 5. If still not found, use capitalize the type as fallback
    if (translatedText.includes(type.toLowerCase())) {
      translatedText = type.charAt(0).toUpperCase() + type.slice(1);
    }
    
    // Update text content directly
    if (badgeRef.current.textContent !== translatedText) {
      badgeRef.current.textContent = translatedText;
      badgeRef.current.setAttribute('data-language', languageRef.current);
      
      // Log updates to help with debugging
      console.info(`TypeBadge updated to: ${translatedText} for type: ${type}, language: ${languageRef.current}`);
    }
  }, [type]);
  
  // Set up language change tracking
  useEffect(() => {
    if (language !== languageRef.current) {
      languageRef.current = language as LanguageCode;
      updateBadgeText();
    }
    
    if (type !== currentType) {
      setCurrentType(type);
    }
  }, [language, type, currentType, updateBadgeText, refreshCounter]);
  
  // Handle language change events
  useEffect(() => {
    const handleLanguageChange = (e: Event) => {
      const customEvent = e as CustomEvent;
      const { language: newLanguage } = customEvent.detail || {};
      
      if (newLanguage && languageRef.current !== newLanguage) {
        languageRef.current = newLanguage as LanguageCode;
        updateBadgeText();
      }
    };
    
    window.addEventListener('app:languageChange', handleLanguageChange);
    document.addEventListener('languageChanged', handleLanguageChange);
    
    return () => {
      window.removeEventListener('app:languageChange', handleLanguageChange);
      document.removeEventListener('languageChanged', handleLanguageChange);
    };
  }, [updateBadgeText]);
  
  // Update text on first render and when language changes
  useEffect(() => {
    updateBadgeText();
  }, [updateBadgeText, language, refreshCounter]);
  
  const typeStyles = getTypeStyles(currentType);
  
  // Initial translation for first render using our multi-layered approach
  let initialTranslation = getDirectTranslation(
    `wallet.fundDetails.transactionTypes.${type.toLowerCase()}`, 
    languageRef.current
  );
  
  if (initialTranslation === `wallet.fundDetails.transactionTypes.${type.toLowerCase()}`) {
    initialTranslation = getDirectTranslation(
      `wallet.transactions.${type.toLowerCase()}`, 
      languageRef.current
    );
  }
  
  if (initialTranslation === `wallet.transactions.${type.toLowerCase()}`) {
    const typeKey = `type${type.charAt(0).toUpperCase()}${type.slice(1)}`;
    initialTranslation = getDirectTranslation(
      `transactions.${typeKey}`, 
      languageRef.current
    );
  }
  
  if (initialTranslation === `transactions.type${type.charAt(0).toUpperCase()}${type.slice(1)}`) {
    initialTranslation = getTransactionTranslation(
      `type${type.charAt(0).toUpperCase()}${type.slice(1)}`,
      languageRef.current
    );
  }
  
  return (
    <span
      ref={badgeRef}
      className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${typeStyles.bg} ${typeStyles.text} border ${typeStyles.border}`}
      data-type={currentType.toLowerCase()}
      data-language={languageRef.current}
      data-instance={instanceId.current}
    >
      {initialTranslation}
    </span>
  );
};

export default React.memo(TypeBadge);
