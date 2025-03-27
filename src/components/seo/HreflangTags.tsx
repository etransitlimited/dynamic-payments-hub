import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { LanguageCode } from '@/utils/languageUtils';

/**
 * Component that dynamically inserts hreflang tags in the document head
 * based on the current route and language
 */
const HreflangTags = () => {
  const { pathname, search } = useLocation();
  const { language } = useLanguage();
  
  useEffect(() => {
    // Remove any existing hreflang tags
    document.querySelectorAll('link[rel="alternate"][hreflang]').forEach(el => el.remove());
    
    // Base URL without query parameters
    const baseUrl = window.location.origin;
    
    // Get current query parameters
    const queryParams = new URLSearchParams(search);
    
    // Remove the language parameter if it exists
    queryParams.delete('lang');
    
    // Other query parameters (without lang)
    const otherParams = queryParams.toString() ? `&${queryParams.toString()}` : '';
    
    // Create hreflang tags for each supported language
    const languages: LanguageCode[] = ['en', 'zh-CN', 'zh-TW', 'fr', 'es'];
    
    languages.forEach(lang => {
      const link = document.createElement('link');
      link.setAttribute('rel', 'alternate');
      link.setAttribute('hreflang', lang);
      
      // For English (default), don't add the lang parameter
      if (lang === 'en') {
        link.setAttribute('href', `${baseUrl}${pathname}${otherParams ? `?${otherParams}` : ''}`);
      } else {
        // For other languages, add the lang parameter
        link.setAttribute('href', `${baseUrl}${pathname}?lang=${lang}${otherParams}`);
      }
      
      document.head.appendChild(link);
    });
    
    // Add x-default hreflang (points to English version)
    const defaultLink = document.createElement('link');
    defaultLink.setAttribute('rel', 'alternate');
    defaultLink.setAttribute('hreflang', 'x-default');
    defaultLink.setAttribute('href', `${baseUrl}${pathname}${otherParams ? `?${otherParams}` : ''}`);
    document.head.appendChild(defaultLink);
    
    return () => {
      // Cleanup hreflang tags when component unmounts
      document.querySelectorAll('link[rel="alternate"][hreflang]').forEach(el => el.remove());
    };
  }, [pathname, search, language]);
  
  // This component doesn't render anything visible
  return null;
};

export default HreflangTags;
