
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
            // Map common keys for consistency across the app
            const statusKeys: Record<string, string> = {
              "completed": "cards.activationTasks.statusCompleted",
              "pending": "cards.activationTasks.statusPending",
              "failed": "cards.activationTasks.statusFailed",
              "rejected": "cards.activationTasks.statusRejected",
              "active": "invitation.rebate.status.active",
              "inactive": "cards.search.statusInactive",
              "expired": "cards.search.statusExpired",
              "blocked": "cards.search.statusBlocked"
            };
            
            const typeKeys: Record<string, string> = {
              "deposit": "wallet.fundDetails.typeDeposit",
              "withdrawal": "wallet.fundDetails.typeExpense",
              "transfer": "wallet.fundDetails.typeTransfer",
              "payment": "transactions.payment",
              "exchange": "common.exchange",
              "expense": "common.expense"
            };
            
            const commonKeys: Record<string, string> = {
              "id": "common.id",
              "name": "common.name",
              "date": "common.date",
              "time": "common.time",
              "amount": "common.amount",
              "status": "common.status",
              "type": "common.type",
              "actions": "common.actions",
              "details": "common.details",
              "showing": "common.showing",
              "of": "common.of",
              "records": "common.records",
              "all": "common.all",
              "search": "common.search",
              "filter": "common.filter",
              "export": "common.export",
              "inviteeList": "invitation.inviteeList"
            };
            
            // Check if the key is a simple status key
            if (statusKeys[key.toLowerCase()]) {
              const mappedKey = statusKeys[key.toLowerCase()];
              const translation = getTranslation(mappedKey, languageContext.language);
              if (translation !== mappedKey || !fallback) return translation;
              return fallback;
            }
            
            // Check if the key is a simple type key
            if (typeKeys[key.toLowerCase()]) {
              const mappedKey = typeKeys[key.toLowerCase()];
              const translation = getTranslation(mappedKey, languageContext.language);
              if (translation !== mappedKey || !fallback) return translation;
              return fallback;
            }
            
            // Check if the key is a common key
            if (commonKeys[key.toLowerCase()]) {
              const mappedKey = commonKeys[key.toLowerCase()];
              const translation = getTranslation(mappedKey, languageContext.language);
              if (translation !== mappedKey || !fallback) return translation;
              return fallback;
            }
            
            // If key is 'cards.activationTasks.*' or other namespaced keys, get direct translation
            if (key.includes('.')) {
              const translation = getTranslation(key, languageContext.language);
              if (translation !== key || !fallback) return translation;
              return fallback;
            }
            
            // Handle inviteeList special case (used in multiple places)
            if (key === "inviteeList") {
              const translation = getTranslation("invitation.inviteeList", languageContext.language);
              if (translation !== "invitation.inviteeList" || !fallback) return translation;
              return fallback;
            }
            
            // Try to get a direct translation as last resort
            const translation = getTranslation(key, languageContext.language);
            
            // Return fallback if translation is the same as key and fallback is provided
            if (translation === key && fallback !== null && fallback !== undefined) {
              return fallback;
            }
            
            return translation;
          } catch (error) {
            console.warn(`Translation error for key "${key}"`, error);
            return fallback !== undefined ? fallback : key;
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
        // Map common keys for fallback use
        const statusKeys: Record<string, string> = {
          "completed": "cards.activationTasks.statusCompleted",
          "pending": "cards.activationTasks.statusPending",
          "failed": "cards.activationTasks.statusFailed",
          "rejected": "cards.activationTasks.statusRejected",
          "active": "invitation.rebate.status.active",
          "inactive": "cards.search.statusInactive",
          "expired": "cards.search.statusExpired",
          "blocked": "cards.search.statusBlocked"
        };
        
        const typeKeys: Record<string, string> = {
          "deposit": "wallet.fundDetails.typeDeposit",
          "withdrawal": "wallet.fundDetails.typeExpense",
          "transfer": "wallet.fundDetails.typeTransfer",
          "payment": "transactions.payment",
          "exchange": "common.exchange",
          "expense": "common.expense"
        };
        
        // Check if key has simple mapping
        if (statusKeys[key.toLowerCase()]) {
          const mappedKey = statusKeys[key.toLowerCase()];
          const translation = getTranslation(mappedKey, 'en');
          if (translation !== mappedKey || !fallback) return translation;
          return fallback;
        }
        
        if (typeKeys[key.toLowerCase()]) {
          const mappedKey = typeKeys[key.toLowerCase()];
          const translation = getTranslation(mappedKey, 'en');
          if (translation !== mappedKey || !fallback) return translation;
          return fallback;
        }
        
        // For full namespaced keys, get direct translation
        if (key.includes('.')) {
          const translation = getTranslation(key, 'en');
          if (translation !== key || !fallback) return translation;
          return fallback;
        }
        
        // Handle inviteeList special case
        if (key === "inviteeList") {
          const translation = getTranslation("invitation.inviteeList", 'en');
          if (translation !== "invitation.inviteeList" || !fallback) return translation;
          return fallback;
        }
        
        // Try direct translation as fallback
        const translation = getTranslation(key, 'en');
        return translation === key && fallback !== undefined ? fallback : translation;
      } catch (error) {
        console.warn(`Fallback translation error for key "${key}"`, error);
        return fallback !== undefined ? fallback : key;
      }
    },
    language: 'en' as LanguageCode,
    setLanguage: (_: LanguageCode) => console.warn("Language setter not available in fallback mode")
  };
};
