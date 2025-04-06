
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

/**
 * Format date based on the current language with better error handling
 * @param dateString Date string to format
 * @param language Current language code
 * @returns Formatted date string
 */
export const formatLocalizedDate = (dateString: string, language: LanguageCode): string => {
  try {
    const date = new Date(dateString);
    
    // Validate date
    if (isNaN(date.getTime())) {
      console.error(`Invalid date: ${dateString}`);
      return dateString;
    }
    
    const locale = getLocaleForLanguage(language);
    
    // Try with specified format
    try {
      return new Intl.DateTimeFormat(locale, { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      }).format(date);
    } catch (localeError) {
      console.warn(`Error with locale ${locale}, trying simpler format:`, localeError);
      // Try with simpler format
      try {
        return new Intl.DateTimeFormat(locale).format(date);
      } catch (error) {
        // Last resort fallback
        console.error(`Error formatting date: ${dateString}`, error);
        return date.toISOString().split('T')[0];
      }
    }
  } catch (error) {
    console.error(`Error formatting date: ${dateString}`, error);
    return dateString;
  }
};

/**
 * Format time based on the current language with better error handling
 * @param dateString Date string to format
 * @param language Current language code
 * @returns Formatted time string
 */
export const formatLocalizedTime = (dateString: string, language: LanguageCode): string => {
  try {
    const date = new Date(dateString);
    
    // Validate date
    if (isNaN(date.getTime())) {
      console.error(`Invalid date: ${dateString}`);
      return dateString;
    }
    
    const locale = getLocaleForLanguage(language);
    
    // Try with specified format
    try {
      return new Intl.DateTimeFormat(locale, {
        hour: '2-digit',
        minute: '2-digit'
      }).format(date);
    } catch (localeError) {
      console.warn(`Error with locale ${locale} for time, trying simpler format:`, localeError);
      // Try with simpler format
      try {
        return new Intl.DateTimeFormat(locale, { 
          hour: 'numeric', 
          minute: 'numeric' 
        }).format(date);
      } catch (error) {
        // Last resort fallback
        console.error(`Error formatting time: ${dateString}`, error);
        return date.toISOString().split('T')[1].substring(0, 5);
      }
    }
  } catch (error) {
    console.error(`Error formatting time: ${dateString}`, error);
    return dateString;
  }
};

/**
 * Format date and time based on the current language with better error handling
 * @param dateString Date string to format
 * @param language Current language code
 * @returns Formatted date and time string
 */
export const formatLocalizedDateTime = (dateString: string, language: LanguageCode): string => {
  try {
    const date = new Date(dateString);
    
    // Validate date
    if (isNaN(date.getTime())) {
      console.error(`Invalid date: ${dateString}`);
      return dateString;
    }
    
    const locale = getLocaleForLanguage(language);
    
    // Try with specified format using Intl API directly
    try {
      return new Intl.DateTimeFormat(locale, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }).format(date);
    } catch (localeError) {
      console.warn(`Error with locale ${locale} for datetime, trying simpler format:`, localeError);
      // Try with simpler format
      try {
        return new Intl.DateTimeFormat(locale, {
          dateStyle: 'short',
          timeStyle: 'short'
        }).format(date);
      } catch (error) {
        // Last resort fallback
        console.error(`Error formatting datetime: ${dateString}`, error);
        return date.toISOString().replace('T', ' ').substring(0, 16);
      }
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
