
import translations from "@/translations";
import { LanguageCode } from '@/utils/languageUtils';

// Translation function with improved error handling and fallbacks
export const getTranslation = (key: string, language: LanguageCode): string => {
  try {
    // Check if the provided language exists
    if (!translations[language]) {
      console.warn(`Language "${language}" is not supported. Falling back to English.`);
      language = 'en';
    }

    // For empty keys, return an empty string
    if (!key) {
      return '';
    }
    
    console.log(`Getting translation for key: "${key}" in language: "${language}"`);
    
    // Handle common action buttons directly to avoid nesting issues
    if (key === 'common.search' || key === 'search') {
      if (language === 'en') return 'Search';
      if (language === 'fr') return 'Rechercher';
      if (language === 'es') return 'Buscar';
      if (language === 'zh-CN') return '搜索';
      if (language === 'zh-TW') return '搜尋';
      return 'Search'; // Fallback
    }
    
    if (key === 'common.filter' || key === 'filter') {
      if (language === 'en') return 'Filter';
      if (language === 'fr') return 'Filtrer';
      if (language === 'es') return 'Filtrar';
      if (language === 'zh-CN') return '筛选';
      if (language === 'zh-TW') return '篩選';
      return 'Filter'; // Fallback
    }
    
    if (key === 'common.export' || key === 'export') {
      if (language === 'en') return 'Export';
      if (language === 'fr') return 'Exporter';
      if (language === 'es') return 'Exportar';
      if (language === 'zh-CN') return '导出';
      if (language === 'zh-TW') return '導出';
      return 'Export'; // Fallback
    }
    
    if (key === 'common.refresh' || key === 'refresh') {
      if (language === 'en') return 'Refresh';
      if (language === 'fr') return 'Actualiser';
      if (language === 'es') return 'Actualizar';
      if (language === 'zh-CN') return '刷新';
      if (language === 'zh-TW') return '重新整理';
      return 'Refresh'; // Fallback
    }
    
    // Special handling for common.XXX keys that are sometimes passed without the "common." prefix
    if (!key.includes('.') && ['search', 'filter', 'export', 'refresh'].includes(key)) {
      const commonKey = 'common.' + key;
      console.log(`Converting simple key "${key}" to "${commonKey}"`);
      key = commonKey;
    }
    
    // Handle nested objects by using dot notation in the key (e.g., "hero.title")
    if (key.includes('.')) {
      const parts = key.split('.');
      let value: any = translations[language];
      
      // Navigate through the nested objects
      for (const part of parts) {
        if (value && typeof value === 'object' && part in value) {
          value = value[part];
        } else {
          // Try fallback to English if current language is not English
          if (language !== 'en') {
            let fallbackValue: any = translations['en'];
            let fallbackFound = true;
            
            for (const fallbackPart of parts) {
              if (fallbackValue && typeof fallbackValue === 'object' && fallbackPart in fallbackValue) {
                fallbackValue = fallbackValue[fallbackPart];
              } else {
                fallbackFound = false;
                break;
              }
            }
            
            if (fallbackFound && (typeof fallbackValue === 'string' || typeof fallbackValue === 'number')) {
              console.warn(`Using English fallback for key: "${key}" in language: "${language}"`);
              return String(fallbackValue);
            }
          }
          
          console.warn(`Translation key not found: "${key}" in language "${language}". Key parts: ${JSON.stringify(parts)}. Current value: ${JSON.stringify(value)}`);
          return key; // Key not found, return the key itself
        }
      }
      
      // Check if we got a string or number at the end
      if (typeof value === 'string' || typeof value === 'number') {
        return String(value);
      } else if (value === undefined || value === null) {
        console.warn(`Translation value is undefined or null for key: "${key}" in language "${language}"`);
        return key;
      } else if (typeof value === 'object') {
        console.warn(`Translation key "${key}" in language "${language}" points to an object, not a string. Value: ${JSON.stringify(value)}`);
        return key;
      } else {
        return String(value); // Try to convert to string
      }
    } else {
      // Check direct access to top-level keys for better debugging
      if (translations[language] && key in translations[language]) {
        const value = translations[language][key];
        if (typeof value === 'string' || typeof value === 'number') {
          return String(value);
        } else {
          console.warn(`Top-level key "${key}" exists but is not a string in language "${language}". Type: ${typeof value}`);
        }
      }
      
      // Try English fallback for non-English languages
      if (language !== 'en' && translations['en'] && key in translations['en']) {
        console.warn(`Using English fallback for top-level key: "${key}" in language: "${language}"`);
        const value = translations['en'][key];
        if (typeof value === 'string' || typeof value === 'number') {
          return String(value);
        }
      }
      
      // Check if it might be a nested key without dots (rare case)
      const commonKey = 'common.' + key;
      const parts = commonKey.split('.');
      let commonValue: any = translations[language];
      let foundInCommon = true;
      
      for (const part of parts) {
        if (commonValue && typeof commonValue === 'object' && part in commonValue) {
          commonValue = commonValue[part];
        } else {
          foundInCommon = false;
          break;
        }
      }
      
      if (foundInCommon && (typeof commonValue === 'string' || typeof commonValue === 'number')) {
        console.log(`Found key "${key}" in common namespace for language "${language}"`);
        return String(commonValue);
      }
      
      // If all fails, return the key
      console.warn(`Top-level translation key not found: "${key}" in language "${language}". Available keys: ${Object.keys(translations[language]).join(', ')}`);
      return key;
    }
  } catch (error) {
    console.error(`Error accessing translation key "${key}":`, error);
    return key; // Return the key itself as fallback
  }
};
