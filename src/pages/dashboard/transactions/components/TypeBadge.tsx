
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
    
    // First try to get wallet translation directly
    let translatedText = getDirectTranslation(`wallet.fundDetails.type${type.charAt(0).toUpperCase() + type.slice(1).toLowerCase()}`, languageRef.current);
    
    // If not found in wallet translations, fall back to transaction translations
    if (translatedText === `wallet.fundDetails.type${type.charAt(0).toUpperCase() + type.slice(1).toLowerCase()}`) {
      translatedText = getTransactionTranslation(
        type.toLowerCase(), 
        languageRef.current
      );
    }
    
    // Update text content directly
    if (badgeRef.current.textContent !== translatedText) {
      badgeRef.current.textContent = translatedText;
      badgeRef.current.setAttribute('data-language', languageRef.current);
      
      // Log updates to help with debugging
      console.info(`TypeBadge language updated to: ${languageRef.current} for type: ${type}, translation: ${translatedText}`);
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
  
  // Update text on first render
  useEffect(() => {
    updateBadgeText();
  }, [updateBadgeText]);
  
  const typeStyles = getTypeStyles(currentType);
  
  // Initial translation for first render
  let initialTranslation = getDirectTranslation(`wallet.fundDetails.type${type.charAt(0).toUpperCase() + type.slice(1).toLowerCase()}`, languageRef.current);
  
  // If not found in wallet translations, fall back to transaction translations
  if (initialTranslation === `wallet.fundDetails.type${type.charAt(0).toUpperCase() + type.slice(1).toLowerCase()}`) {
    initialTranslation = getTransactionTranslation(
      currentType.toLowerCase(),
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
