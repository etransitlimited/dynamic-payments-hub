
import { useLocation } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';

export interface SEOProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  ogImage?: string;
  noindex?: boolean;
  keywords?: string[];
}

/**
 * Updates document metadata for SEO
 */
export function useSEO(props: SEOProps = {}) {
  const { pathname } = useLocation();
  const { language } = useLanguage();
  
  // Default base values
  const baseTitle = 'NovaCard';
  const baseDescription = 'Virtual Card Providers & Global Payment Solutions';
  const baseUrl = 'https://novacard.com';
  const defaultKeywords = ['virtual card providers', 'virtual card payments', 'virtual credit card', 'global payment solutions'];
  
  // Merge props with defaults and pathname-specific values
  const title = props.title || getDefaultTitleByPath(pathname);
  const description = props.description || getDefaultDescriptionByPath(pathname, language);
  const canonicalUrl = props.canonicalUrl || `${baseUrl}${pathname}`;
  const ogImage = props.ogImage || `${baseUrl}/og-image.png`;
  const keywords = props.keywords || getDefaultKeywordsByPath(pathname);
  
  // Update document metadata
  document.title = `${title} | ${baseTitle}`;
  
  // Update meta tags
  updateMetaTag('description', description);
  updateMetaTag('keywords', keywords.join(', '));
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
    updateMetaTag('robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
  }

  // Add structured data for better rich snippets
  addStructuredData(pathname);
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

// Get default title based on pathname with SEO keywords
function getDefaultTitleByPath(pathname: string): string {
  switch (pathname) {
    case '/':
      return 'Virtual Card Providers & Payment Solutions for Business';
    case '/virtual-card-providers':
      return 'Top-Rated Virtual Card Providers for Global Businesses';
    case '/virtual-card-payments':
      return 'Secure Virtual Card Payment Solutions & Processing';
    case '/login':
      return 'Login to Your Virtual Card Account';
    case '/register':
      return 'Create a Virtual Card Payment Account';
    default:
      return 'Virtual Credit Card Solutions & Providers';
  }
}

// Get default description based on pathname and language with SEO keywords
function getDefaultDescriptionByPath(pathname: string, language: string): string {
  // Base descriptions with SEO keywords
  const descriptions: Record<string, string> = {
    '/': 'NovaCard offers secure virtual card payments and virtual card provider services for businesses worldwide with multi-currency support across 60+ BIN ranges.',
    '/virtual-card-providers': 'Leading virtual card providers offering seamless payment solutions for global businesses. Multiple currency options with 60+ BIN ranges from Hong Kong, US, UK, and Europe.',
    '/virtual-card-payments': 'Secure, fast, and reliable virtual card payment processing with advanced encryption technology. Simplify payments with one-click transactions.',
    '/login': 'Login to your NovaCard account to manage your virtual card payments and provider services.',
    '/register': 'Create a NovaCard account to access global virtual card provider solutions for your business needs.',
  };
  
  // Return the appropriate description or a default one
  return descriptions[pathname] || 'Global virtual card providers and payment solutions for cross-border business transactions.';
}

// Get default keywords based on pathname
function getDefaultKeywordsByPath(pathname: string): string[] {
  const baseKeywords = ['virtual card providers', 'virtual card payments', 'virtual credit card'];
  
  switch (pathname) {
    case '/':
      return [...baseKeywords, 'global payment solutions', 'multi-currency credit cards'];
    case '/virtual-card-providers':
      return [...baseKeywords, 'top virtual card providers', 'business payment solutions', 'BIN ranges'];
    case '/virtual-card-payments':
      return [...baseKeywords, 'secure payment processing', 'encrypted payments', 'one-click transactions'];
    case '/login':
      return [...baseKeywords, 'account login', 'payment management'];
    case '/register':
      return [...baseKeywords, 'business account', 'payment solutions registration'];
    default:
      return baseKeywords;
  }
}

// Add structured data for rich snippets
function addStructuredData(pathname: string) {
  // Remove any existing structured data
  const existingScript = document.querySelector('script[type="application/ld+json"]');
  if (existingScript) {
    existingScript.remove();
  }
  
  let structuredData: any = null;
  
  // Create appropriate structured data based on the page
  if (pathname === '/') {
    structuredData = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "NovaCard",
      "url": "https://novacard.com",
      "logo": "https://novacard.com/logo.png",
      "description": "Global virtual card providers and payment solutions for businesses worldwide",
      "sameAs": [
        "https://twitter.com/novacard",
        "https://www.linkedin.com/company/novacard",
        "https://www.facebook.com/novacard"
      ]
    };
  } else if (pathname === '/virtual-card-providers' || pathname === '/virtual-card-payments') {
    structuredData = {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": pathname === '/virtual-card-providers' ? "Virtual Card Providers" : "Virtual Card Payments",
      "provider": {
        "@type": "Organization",
        "name": "NovaCard"
      },
      "description": pathname === '/virtual-card-providers' 
        ? "Leading virtual card provider services for global businesses with multi-currency support."
        : "Secure virtual card payment processing with advanced encryption technology.",
      "offers": {
        "@type": "Offer",
        "availability": "https://schema.org/InStock",
        "price": "0",
        "priceCurrency": "USD"
      }
    };
  }
  
  // Add structured data to the page if defined
  if (structuredData) {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify(structuredData);
    document.head.appendChild(script);
  }
}
