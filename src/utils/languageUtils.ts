
// Available languages with their display names
export const languages = {
  "en": "English",
  "zh-CN": "简体中文",
  "zh-TW": "繁體中文",
  "fr": "Français",
  "es": "Español"
};

// Get display name for a language code
export const getLanguageDisplayName = (code: keyof typeof languages): string => {
  return languages[code] || code;
};

// Type for language codes
export type LanguageCode = keyof typeof languages;

/**
 * Get appropriate locale string for a language code for date formatting
 * @param language The language code
 * @returns Appropriate locale string for the language
 */
export const getLocaleForLanguage = (language: LanguageCode): string => {
  switch (language) {
    case 'zh-CN':
      return 'zh-Hans-CN';
    case 'zh-TW':
      return 'zh-Hant-TW';
    case 'fr':
      return 'fr-FR';
    case 'es':
      return 'es-ES';
    default:
      return 'en-US';
  }
};

// Cache for formatted dates to prevent flickering
const dateFormatCache: Record<string, string> = {};

/**
 * Format date based on the current language with better error handling and caching
 * @param dateString Date string to format
 * @param language Current language code
 * @returns Formatted date string
 */
export const formatLocalizedDate = (dateString: string, language: LanguageCode): string => {
  const cacheKey = `date-${dateString}-${language}`;
  
  // Return from cache if available
  if (dateFormatCache[cacheKey]) {
    return dateFormatCache[cacheKey];
  }
  
  try {
    const date = new Date(dateString);
    
    // Validate date
    if (isNaN(date.getTime())) {
      console.error(`Invalid date: ${dateString}`);
      return dateString;
    }
    
    const locale = getLocaleForLanguage(language);
    
    // Use a more stable approach with manual fallbacks
    try {
      const formatted = new Intl.DateTimeFormat(locale, { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      }).format(date);
      
      // Cache the result
      dateFormatCache[cacheKey] = formatted;
      return formatted;
    } catch (localeError) {
      console.warn(`Error with locale ${locale}, using fallback format`);
      
      // Use language-specific date formats as fallback
      let formatted = '';
      if (language === 'zh-CN' || language === 'zh-TW') {
        formatted = `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
      } else {
        formatted = date.toISOString().split('T')[0];
      }
      
      // Cache the result
      dateFormatCache[cacheKey] = formatted;
      return formatted;
    }
  } catch (error) {
    console.error(`Error formatting date: ${dateString}`, error);
    return dateString;
  }
};

// Cache for formatted times
const timeFormatCache: Record<string, string> = {};

/**
 * Format time based on the current language with better error handling and caching
 * @param dateString Date string to format
 * @param language Current language code
 * @returns Formatted time string
 */
export const formatLocalizedTime = (dateString: string, language: LanguageCode): string => {
  const cacheKey = `time-${dateString}-${language}`;
  
  // Return from cache if available
  if (timeFormatCache[cacheKey]) {
    return timeFormatCache[cacheKey];
  }
  
  try {
    const date = new Date(dateString);
    
    // Validate date
    if (isNaN(date.getTime())) {
      console.error(`Invalid date for time: ${dateString}`);
      return dateString;
    }
    
    const locale = getLocaleForLanguage(language);
    
    // Use a more stable approach with manual fallbacks
    try {
      const formatted = new Intl.DateTimeFormat(locale, {
        hour: '2-digit',
        minute: '2-digit'
      }).format(date);
      
      // Cache the result
      timeFormatCache[cacheKey] = formatted;
      return formatted;
    } catch (localeError) {
      console.warn(`Error with locale ${locale} for time, using fallback format`);
      
      // Format hours and minutes with leading zeros
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      
      const formatted = `${hours}:${minutes}`;
      
      // Cache the result
      timeFormatCache[cacheKey] = formatted;
      return formatted;
    }
  } catch (error) {
    console.error(`Error formatting time: ${dateString}`, error);
    return dateString;
  }
};

// Cache for formatted date-times
const dateTimeFormatCache: Record<string, string> = {};

/**
 * Format date and time based on the current language with better error handling and caching
 * @param dateString Date string to format
 * @param language Current language code
 * @returns Formatted date and time string
 */
export const formatLocalizedDateTime = (dateString: string, language: LanguageCode): string => {
  const cacheKey = `datetime-${dateString}-${language}`;
  
  // Return from cache if available
  if (dateTimeFormatCache[cacheKey]) {
    return dateTimeFormatCache[cacheKey];
  }
  
  try {
    const date = new Date(dateString);
    
    // Validate date
    if (isNaN(date.getTime())) {
      console.error(`Invalid datetime: ${dateString}`);
      return dateString;
    }
    
    const locale = getLocaleForLanguage(language);
    
    // Try with language-specific formatting
    try {
      // Create stable formats that don't change between renders
      const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: locale !== 'zh-Hans-CN' && locale !== 'zh-Hant-TW'
      };
      
      const formatted = new Intl.DateTimeFormat(locale, options).format(date);
      
      // Cache the result
      dateTimeFormatCache[cacheKey] = formatted;
      return formatted;
    } catch (localeError) {
      console.warn(`Error with locale ${locale} for datetime, using fallback format`);
      
      // Format date components with leading zeros
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      
      let formatted = '';
      // Use language-specific date/time formats as fallback
      if (language === 'zh-CN' || language === 'zh-TW') {
        formatted = `${year}年${month}月${day}日 ${hours}:${minutes}`;
      } else if (language === 'fr') {
        formatted = `${day}/${month}/${year} ${hours}:${minutes}`;
      } else if (language === 'es') {
        formatted = `${day}/${month}/${year} ${hours}:${minutes}`;
      } else {
        formatted = `${year}-${month}-${day} ${hours}:${minutes}`;
      }
      
      // Cache the result
      dateTimeFormatCache[cacheKey] = formatted;
      return formatted;
    }
  } catch (error) {
    console.error(`Error formatting datetime: ${dateString}`, error);
    return dateString;
  }
};

/**
 * Determine if a language is RTL (Right-to-Left)
 * @param language The language code to check
 * @returns Boolean indicating if language is RTL
 */
export const isRTLLanguage = (language: LanguageCode): boolean => {
  // Currently we don't have any RTL languages, but adding this for future
  const rtlLanguages: LanguageCode[] = [];
  return rtlLanguages.includes(language);
};

// Clear format caches when window is about to unload
if (typeof window !== 'undefined') {
  window.addEventListener('beforeunload', () => {
    // Clear all caches
    Object.keys(dateFormatCache).forEach(key => delete dateFormatCache[key]);
    Object.keys(timeFormatCache).forEach(key => delete timeFormatCache[key]);
    Object.keys(dateTimeFormatCache).forEach(key => delete dateTimeFormatCache[key]);
  });
}
