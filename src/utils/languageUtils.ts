
// Available languages with their display names
export const languages = {
  "en": "English",
  "zh-CN": "简体中文",
  "zh-TW": "繁體中文",
  "fr": "Français",
  "es": "Español",
  "de": "Deutsch"
};

// Get display name for a language code
export const getLanguageDisplayName = (code: keyof typeof languages): string => {
  return languages[code] || code;
};

// Type for language codes
export type LanguageCode = keyof typeof languages;
