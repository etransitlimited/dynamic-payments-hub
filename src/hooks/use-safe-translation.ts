
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
            // If translations for 'cards.activationTasks.*' are accessed directly, return them
            if (key.startsWith('cards.activationTasks.')) {
              const translation = getTranslation(key, languageContext.language);
              if (translation !== key || !fallback) return translation;
              return fallback;
            }
            
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
              actualKey = "cards.activationTasks.statusCompleted";
            } else if (key === "pending" || key === "transactions.statusPending") {
              actualKey = "cards.activationTasks.statusPending";
            } else if (key === "failed" || key === "transactions.statusFailed") {
              actualKey = "cards.activationTasks.statusFailed";
            } else if (key === "rejected" || key === "transactions.statusRejected") {
              actualKey = "cards.activationTasks.statusRejected";
            }
            
            // Check direct access to common keys
            if (key.startsWith('common.')) {
              const translation = getTranslation(key, languageContext.language);
              if (translation !== key || !fallback) return translation;
              return fallback;
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
        // Check for cards.activationTasks.* keys first
        if (key.startsWith('cards.activationTasks.')) {
          const translation = getTranslation(key, 'en');
          if (translation !== key || !fallback) return translation;
          return fallback;
        }
        
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
        
        // Handle status keys - now using cards namespace
        else if (key === "completed" || key === "transactions.statusCompleted") {
          actualKey = "cards.activationTasks.statusCompleted";
        } else if (key === "pending" || key === "transactions.statusPending") {
          actualKey = "cards.activationTasks.statusPending";
        } else if (key === "failed" || key === "transactions.statusFailed") {
          actualKey = "cards.activationTasks.statusFailed";
        } else if (key === "rejected" || key === "transactions.statusRejected") {
          actualKey = "cards.activationTasks.statusRejected";
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
