
import React, { useEffect, useState } from "react";
import { useSafeTranslation } from "@/hooks/use-safe-translation";

interface TranslatedTextProps {
  keyName: string;
  fallback?: string;
  className?: string;
  values?: Record<string, string | number>;
}

/**
 * A component that handles translations and provides fallback for missing keys
 */
const TranslatedText: React.FC<TranslatedTextProps> = ({ 
  keyName, 
  fallback, 
  className,
  values 
}) => {
  const { t, language } = useSafeTranslation();
  const [translatedText, setTranslatedText] = useState<string>("");
  
  useEffect(() => {
    // Map common keys to their proper namespaces if needed
    let actualKey = keyName;
    
    // Map transaction related keys to the wallet namespace if needed
    if (keyName === "deposit" || keyName === "transactions.deposit") {
      actualKey = "wallet.fundDetails.typeDeposit";
    } else if (keyName === "withdrawal" || keyName === "transactions.withdrawal") {
      actualKey = "wallet.fundDetails.typeExpense";
    } else if (keyName === "transfer" || keyName === "transactions.transfer") {
      actualKey = "wallet.fundDetails.typeTransfer";
    }
    
    // Map status keys to wallet namespace
    if (keyName === "completed" || keyName === "transactions.statusCompleted") {
      actualKey = "wallet.depositRecords.statusCompleted";
    } else if (keyName === "pending" || keyName === "transactions.statusPending") {
      actualKey = "wallet.depositRecords.statusPending";
    } else if (keyName === "failed" || keyName === "transactions.statusFailed") {
      actualKey = "wallet.depositRecords.statusFailed";
    }
    
    // Always provide the fallback to the translation function
    let displayText = t(actualKey, fallback || keyName);
    
    // Handle variable replacement if values are provided
    if (values && typeof displayText === 'string') {
      Object.entries(values).forEach(([key, value]) => {
        const regex = new RegExp(`{{${key}}}`, 'g');
        displayText = displayText.replace(regex, String(value));
      });
    }
    
    setTranslatedText(displayText);
    
    // Log translation info in development
    if (process.env.NODE_ENV !== 'production') {
      if (displayText === fallback && fallback !== keyName) {
        console.log(`Translation fallback used for key: "${keyName}" (mapped to "${actualKey}") in language: "${language}"`);
      }
    }
  }, [keyName, fallback, t, language, values]);
  
  return <span className={className}>{translatedText}</span>;
};

export default TranslatedText;
