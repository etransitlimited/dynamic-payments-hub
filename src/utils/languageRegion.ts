
import { LanguageCode } from './languageUtils';

/**
 * Maps language codes to their primary geographical regions
 */
export const languageRegions: Record<LanguageCode, string> = {
  'en': 'US',    // English - United States
  'zh-CN': 'CN', // Simplified Chinese - China
  'zh-TW': 'TW', // Traditional Chinese - Taiwan
  'fr': 'FR',    // French - France
  'es': 'ES'     // Spanish - Spain
};

/**
 * Maps language codes to their domain extensions
 */
export const languageDomains: Record<LanguageCode, string> = {
  'en': 'com',
  'zh-CN': 'cn',
  'zh-TW': 'tw',
  'fr': 'fr',
  'es': 'es'
};

/**
 * Maps language codes to search engine URLs
 */
export const searchEngines: Record<LanguageCode, string> = {
  'en': 'google.com',
  'zh-CN': 'baidu.com',
  'zh-TW': 'google.com.tw',
  'fr': 'google.fr',
  'es': 'google.es'
};

/**
 * Returns the appropriate region code for a language
 * @param language The language code
 * @returns The ISO region code
 */
export function getRegionForLanguage(language: LanguageCode): string {
  return languageRegions[language] || 'US';
}

/**
 * Returns the appropriate domain extension for a language
 * @param language The language code
 * @returns The domain extension
 */
export function getDomainForLanguage(language: LanguageCode): string {
  return languageDomains[language] || 'com';
}

/**
 * Returns the appropriate search engine URL for a language
 * @param language The language code
 * @returns The search engine domain
 */
export function getSearchEngineForLanguage(language: LanguageCode): string {
  return searchEngines[language] || 'google.com';
}

/**
 * Returns the applicable geo.region meta tag content for schema.org
 * @param language The language code
 * @returns Formatted geo.region code
 */
export function getGeoRegionCode(language: LanguageCode): string {
  const region = languageRegions[language];
  
  switch (region) {
    case 'US':
      return 'US-CA'; // United States, California
    case 'CN':
      return 'CN-11'; // China, Beijing
    case 'TW':
      return 'TW-TPE'; // Taiwan, Taipei
    case 'FR':
      return 'FR-75'; // France, Paris
    case 'ES':
      return 'ES-M'; // Spain, Madrid
    default:
      return 'US-CA'; // Default to California
  }
}

/**
 * Returns the local placename for geo.placename meta tag
 * @param language The language code
 * @returns City name in the appropriate region
 */
export function getGeoPlacename(language: LanguageCode): string {
  switch (language) {
    case 'zh-CN':
      return '北京'; // Beijing
    case 'zh-TW':
      return '台北'; // Taipei
    case 'fr':
      return 'Paris';
    case 'es':
      return 'Madrid';
    default:
      return 'San Francisco';
  }
}
