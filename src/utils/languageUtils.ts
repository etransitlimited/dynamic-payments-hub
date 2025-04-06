
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
 * Format date based on the current language
 * @param dateString Date string to format
 * @param language Current language code
 * @returns Formatted date string
 */
export const formatLocalizedDate = (dateString: string, language: LanguageCode): string => {
  try {
    const date = new Date(dateString);
    const locale = getLocaleForLanguage(language);
    
    return date.toLocaleDateString(locale, { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  } catch (error) {
    console.error(`Error formatting date: ${dateString}`, error);
    return dateString;
  }
};
