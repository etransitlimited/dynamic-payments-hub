
import { useLocation } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';

export interface SEOProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  ogImage?: string;
  noindex?: boolean;
}

/**
 * Updates document metadata for SEO
 */
export function useSEO(props: SEOProps = {}) {
  const { pathname } = useLocation();
  const { language } = useLanguage();
  
  // Default base values
  const baseTitle = 'NovaCard';
  const baseDescription = 'Global Payment Solutions';
  const baseUrl = 'https://novacard.com';
  
  // Merge props with defaults and pathname-specific values
  const title = props.title || getDefaultTitleByPath(pathname);
  const description = props.description || getDefaultDescriptionByPath(pathname, language);
  const canonicalUrl = props.canonicalUrl || `${baseUrl}${pathname}`;
  const ogImage = props.ogImage || `${baseUrl}/og-image.png`;
  
  // Update document metadata
  document.title = `${title} | ${baseTitle}`;
  
  // Update meta tags
  updateMetaTag('description', description);
  updateMetaTag('og:title', title);
  updateMetaTag('og:description', description);
  updateMetaTag('og:url', canonicalUrl);
  updateMetaTag('og:image', ogImage);
  updateMetaTag('twitter:title', title);
  updateMetaTag('twitter:description', description);
  
  // Update canonical link
  let canonicalLink = document.querySelector('link[rel="canonical"]');
  if (!canonicalLink) {
    canonicalLink = document.createElement('link');
    canonicalLink.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalLink);
  }
  canonicalLink.setAttribute('href', canonicalUrl);
  
  // Handle noindex if specified
  if (props.noindex) {
    updateMetaTag('robots', 'noindex, nofollow');
  } else {
    updateMetaTag('robots', 'index, follow');
  }
}

// Helper to update or create meta tags
function updateMetaTag(name: string, content: string) {
  let meta: HTMLMetaElement | null = null;
  
  // Check if the tag exists with name attribute
  meta = document.querySelector(`meta[name="${name}"]`);
  if (!meta) {
    // Check if it exists with property attribute (for Open Graph)
    meta = document.querySelector(`meta[property="${name}"]`);
  }
  
  if (!meta) {
    // Create new meta tag if it doesn't exist
    meta = document.createElement('meta');
    if (name.startsWith('og:') || name.startsWith('twitter:')) {
      meta.setAttribute('property', name);
    } else {
      meta.setAttribute('name', name);
    }
    document.head.appendChild(meta);
  }
  
  meta.setAttribute('content', content);
}

// Get default title based on pathname
function getDefaultTitleByPath(pathname: string): string {
  switch (pathname) {
    case '/':
      return 'Global Payment Solutions for Business';
    case '/login':
      return 'Login to Your Account';
    case '/register':
      return 'Create an Account';
    default:
      return 'Virtual Credit Card Solutions';
  }
}

// Get default description based on pathname and language
function getDefaultDescriptionByPath(pathname: string, language: string): string {
  // Base descriptions in English
  const descriptions: Record<string, string> = {
    '/': 'Secure, fast, and reliable payment processing for businesses worldwide with virtual credit cards and multi-currency support.',
    '/login': 'Login to your NovaCard account to manage your virtual credit cards and payment solutions.',
    '/register': 'Create a NovaCard account to access global payment solutions for your business needs.',
  };
  
  // Return the appropriate description or a default one
  return descriptions[pathname] || 'Global virtual credit card solutions for cross-border business payments.';
}
