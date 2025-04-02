
import { useLanguage } from "@/context/LanguageContext";
import { getTranslation } from "@/utils/translationUtils";
import { LanguageCode } from "@/utils/languageUtils";

/**
 * A hook that provides translations with a fallback mechanism
 * when components might be rendered outside the LanguageProvider context
 */
export const useSafeTranslation = () => {
  // Try to get the language context
  try {
    const languageContext = useLanguage();
    
    // If we have a valid context, return its translation function
    if (languageContext && typeof languageContext.t === 'function') {
      return {
        t: (key: string, fallback?: string) => {
          if (!key) return fallback || '';
          
          try {
            // Map common transaction keys to consistent namespaces
            let actualKey = key;
            
            // Handle transaction type keys
            if (key === "deposit" || key === "transactions.deposit") {
              actualKey = "wallet.fundDetails.typeDeposit";
            } else if (key === "withdrawal" || key === "transactions.withdrawal") {
              actualKey = "wallet.fundDetails.typeExpense";
            } else if (key === "transfer" || key === "transactions.transfer") {
              actualKey = "wallet.fundDetails.typeTransfer";
            }
            
            // Handle status keys
            else if (key === "completed" || key === "transactions.statusCompleted") {
              actualKey = "wallet.depositRecords.statusCompleted";
            } else if (key === "pending" || key === "transactions.statusPending") {
              actualKey = "wallet.depositRecords.statusPending";
            } else if (key === "failed" || key === "transactions.statusFailed") {
              actualKey = "wallet.depositRecords.statusFailed";
            }
            
            // Get translation directly from utils to bypass context issues
            const translation = getTranslation(actualKey, languageContext.language);
            
            // If translation equals key, it means the key was not found
            if (translation === actualKey && fallback) {
              if (process.env.NODE_ENV !== 'production') {
                console.log(`Translation fallback used for key: "${key}" (mapped to "${actualKey}") in language: "${languageContext.language}"`);
              }
              return fallback;
            }
            
            return translation;
          } catch (error) {
            console.warn(`Translation error for key "${key}"`, error);
            return fallback || key;
          }
        },
        language: languageContext.language,
        setLanguage: languageContext.setLanguage
      };
    }
  } catch (error) {
    console.warn("LanguageContext not available, using fallback mechanism");
  }
  
  // Fallback to a direct translation function if context is missing
  return {
    t: (key: string, fallback?: string) => {
      if (!key) return fallback || '';
      
      try {
        // Map common transaction keys for the fallback mechanism too
        let actualKey = key;
        
        // Handle transaction type keys
        if (key === "deposit" || key === "transactions.deposit") {
          actualKey = "wallet.fundDetails.typeDeposit";
        } else if (key === "withdrawal" || key === "transactions.withdrawal") {
          actualKey = "wallet.fundDetails.typeExpense";
        } else if (key === "transfer" || key === "transactions.transfer") {
          actualKey = "wallet.fundDetails.typeTransfer";
        }
        
        // Handle status keys
        else if (key === "completed" || key === "transactions.statusCompleted") {
          actualKey = "wallet.depositRecords.statusCompleted";
        } else if (key === "pending" || key === "transactions.statusPending") {
          actualKey = "wallet.depositRecords.statusPending";
        } else if (key === "failed" || key === "transactions.statusFailed") {
          actualKey = "wallet.depositRecords.statusFailed";
        }
        
        const translation = getTranslation(actualKey, 'en');
        return translation === actualKey && fallback ? fallback : translation;
      } catch (error) {
        console.warn(`Fallback translation error for key "${key}"`, error);
        return fallback || key;
      }
    },
    language: 'en' as LanguageCode,
    setLanguage: (_: LanguageCode) => console.warn("Language setter not available in fallback mode")
  };
};
