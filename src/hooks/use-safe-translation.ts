
import { useLanguage } from "@/context/LanguageContext";
import { getTranslation, formatTranslation } from "@/utils/translationUtils";
import { LanguageCode } from "@/utils/languageUtils";

/**
 * 提供带有回退机制的翻译的钩子
 * 当组件可能在LanguageProvider上下文之外渲染时使用
 */
export const useSafeTranslation = () => {
  // 尝试获取语言上下文
  try {
    const languageContext = useLanguage();
    
    // 如果我们有有效的上下文，返回其翻译函数
    if (languageContext && typeof languageContext.t === 'function') {
      return {
        t: (key: string, fallback?: string, values?: Record<string, string | number>) => {
          if (!key) return fallback || '';
          
          try {
            // 首先尝试获取直接翻译
            let translation = getTranslation(key, languageContext.language);
            
            // 如果经过所有尝试后，我们仍然以键作为翻译，并且提供了回退
            if (translation === key && fallback !== undefined) {
              return values ? formatTranslation(fallback, values) : fallback;
            }
            
            // 如果需要，使用值格式化翻译
            if (values && Object.keys(values).length > 0) {
              if (process.env.NODE_ENV !== 'production') {
                console.log(`Formatting translation for "${key}" with values:`, values);
                console.log("Before formatting:", translation);
              }
              
              const formatted = formatTranslation(translation, values);
              
              if (process.env.NODE_ENV !== 'production') {
                console.log("After formatting:", formatted);
              }
              
              return formatted;
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
    console.warn("LanguageContext not available, using fallback mechanism", error);
  }
  
  // 如果上下文缺失，回退到直接翻译函数
  return {
    t: (key: string, fallback?: string, values?: Record<string, string | number>) => {
      if (!key) return fallback || '';
      
      try {
        // 获取浏览器语言或默认为英语
        const browserLang = navigator.language;
        let detectedLang: LanguageCode = 'en';
        
        if (browserLang.startsWith('zh')) {
          detectedLang = browserLang.includes('TW') ? 'zh-TW' : 'zh-CN';
        } else if (browserLang.startsWith('fr')) {
          detectedLang = 'fr';
        } else if (browserLang.startsWith('es')) {
          detectedLang = 'es';
        }
        
        // 尝试获取直接翻译
        const translation = getTranslation(key, detectedLang);
        
        // 如果需要，使用变量格式化翻译
        if (values && Object.keys(values).length > 0) {
          const formatted = formatTranslation(translation, values);
          return formatted;
        }
        
        // 如果翻译与键相同且提供了回退，返回回退
        if (translation === key && fallback !== undefined) {
          return values ? formatTranslation(fallback, values) : fallback;
        }
        
        return translation;
      } catch (error) {
        console.warn(`Fallback translation error for key "${key}"`, error);
        return fallback || key;
      }
    },
    language: localStorage.getItem('language') as LanguageCode || 'en',
    setLanguage: (newLang: LanguageCode) => {
      localStorage.setItem('language', newLang);
      window.location.reload();
    }
  };
};
