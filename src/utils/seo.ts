import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { LanguageCode } from '@/utils/languageUtils';

export interface SEOProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  ogImage?: string;
  noindex?: boolean;
  keywords?: string[];
  region?: string;
}

/**
 * Updates document metadata for SEO
 */
export function useSEO(props: SEOProps = {}) {
  const { pathname } = useLocation();
  const { language } = useLanguage();
  
  useEffect(() => {
    // Default base values
    const baseTitle = 'NovaCard';
    const baseDescription = 'Virtual Card Providers & Global Payment Solutions';
    const baseUrl = 'https://novacard.com';
    const defaultKeywords = ['virtual card providers', 'virtual card payments', 'virtual credit card', 'global payment solutions'];
    
    // Merge props with defaults and pathname-specific values
    const title = props.title || getDefaultTitleByPath(pathname, language);
    const description = props.description || getDefaultDescriptionByPath(pathname, language);
    const canonicalUrl = props.canonicalUrl || getCanonicalUrl(pathname, language);
    const ogImage = props.ogImage || `${baseUrl}/og-image.png`;
    const keywords = props.keywords || getDefaultKeywordsByPath(pathname, language);
    const region = props.region || getRegionByLanguage(language);
    
    // Update document metadata
    document.title = `${title} | ${baseTitle}`;
    
    // Update meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords.join(', '));
    updateMetaTag('og:title', title);
    updateMetaTag('og:description', description);
    updateMetaTag('og:url', canonicalUrl);
    updateMetaTag('og:image', ogImage);
    updateMetaTag('og:locale', getLocale(language));
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
    
    // Handle region-specific meta tags
    updateMetaTag('geo.region', getGeoRegion(language));
    updateMetaTag('geo.position', getGeoPosition(language));
    
    // Handle noindex if specified
    if (props.noindex) {
      updateMetaTag('robots', 'noindex, nofollow');
    } else {
      updateMetaTag('robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    }

    // Add structured data for better rich snippets
    addStructuredData(pathname, language);
  }, [pathname, language, props]);
  
  return null;
}

// Helper function to get the canonical URL based on path and language
function getCanonicalUrl(pathname: string, language: LanguageCode): string {
  const baseUrl = 'https://novacard.com';
  
  // If default language (English), no need for language parameter
  if (language === 'en') {
    return `${baseUrl}${pathname}`;
  }
  
  // For other languages, add the language parameter
  return `${baseUrl}${pathname}?lang=${language}`;
}

// Helper function to convert language code to locale format for og:locale
function getLocale(language: LanguageCode): string {
  switch (language) {
    case 'zh-CN':
      return 'zh_CN';
    case 'zh-TW':
      return 'zh_TW';
    case 'fr':
      return 'fr_FR';
    case 'es':
      return 'es_ES';
    default:
      return 'en_US';
  }
}

// Helper function to get appropriate region based on language
function getRegionByLanguage(language: LanguageCode): string {
  switch (language) {
    case 'zh-CN':
      return 'CN';
    case 'zh-TW':
      return 'TW';
    case 'fr':
      return 'FR';
    case 'es':
      return 'ES';
    default:
      return 'US';
  }
}

// Helper function to get geo.region meta tag value
function getGeoRegion(language: LanguageCode): string {
  switch (language) {
    case 'zh-CN':
      return 'CN';
    case 'zh-TW':
      return 'TW';
    case 'fr':
      return 'FR';
    case 'es':
      return 'ES';
    default:
      return 'US-CA';
  }
}

// Helper function to get geo.position meta tag value
function getGeoPosition(language: LanguageCode): string {
  switch (language) {
    case 'zh-CN':
      return '39.9042;116.4074'; // Beijing
    case 'zh-TW':
      return '25.0330;121.5654'; // Taipei
    case 'fr':
      return '48.8566;2.3522'; // Paris
    case 'es':
      return '40.4168;-3.7038'; // Madrid
    default:
      return '37.7749;-122.4194'; // San Francisco
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

// Get default title based on pathname and language with SEO keywords
function getDefaultTitleByPath(pathname: string, language: LanguageCode): string {
  const regionalTitles: Record<LanguageCode, Record<string, string>> = {
    'en': {
      '/': 'Virtual Card Providers & Payment Solutions for Business',
      '/virtual-card-providers': 'Top-Rated Virtual Card Providers for Global Businesses',
      '/virtual-card-payments': 'Secure Virtual Card Payment Solutions & Processing',
      '/login': 'Login to Your Virtual Card Account',
      '/register': 'Create a Virtual Card Payment Account'
    },
    'zh-CN': {
      '/': '全球虚拟卡提供商和支付解决方案',
      '/virtual-card-providers': '优质虚拟信用卡提供商服务',
      '/virtual-card-payments': '安全的虚拟卡支付解决方案',
      '/login': '登录您的虚拟卡账户',
      '/register': '创建虚拟卡支付账户'
    },
    'zh-TW': {
      '/': '全球虛擬卡提供商和支付解決方案',
      '/virtual-card-providers': '優質虛擬信用卡提供商服務',
      '/virtual-card-payments': '安全的虛擬卡支付解決方案',
      '/login': '登錄您的虛擬卡賬戶',
      '/register': '創建虛擬卡支付賬戶'
    },
    'fr': {
      '/': 'Fournisseurs de Cartes Virtuelles et Solutions de Paiement',
      '/virtual-card-providers': 'Les Meilleurs Fournisseurs de Cartes Virtuelles',
      '/virtual-card-payments': 'Solutions de Paiement par Carte Virtuelle Sécurisées',
      '/login': 'Connexion à Votre Compte de Carte Virtuelle',
      '/register': 'Créer un Compte de Paiement par Carte Virtuelle'
    },
    'es': {
      '/': 'Proveedores de Tarjetas Virtuales y Soluciones de Pago',
      '/virtual-card-providers': 'Los Mejores Proveedores de Tarjetas Virtuales',
      '/virtual-card-payments': 'Soluciones de Pago con Tarjeta Virtual Seguras',
      '/login': 'Iniciar Sesión en Su Cuenta de Tarjeta Virtual',
      '/register': 'Crear una Cuenta de Pago con Tarjeta Virtual'
    }
  };
  
  return regionalTitles[language]?.[pathname] || regionalTitles['en'][pathname] || 'Virtual Credit Card Solutions & Providers';
}

// Get default description based on pathname and language with SEO keywords
function getDefaultDescriptionByPath(pathname: string, language: LanguageCode): string {
  const regionalDescriptions: Record<LanguageCode, Record<string, string>> = {
    'en': {
      '/': 'NovaCard offers secure virtual card payments and virtual card provider services for businesses worldwide with multi-currency support across 60+ BIN ranges.',
      '/virtual-card-providers': 'Leading virtual card providers offering seamless payment solutions for global businesses. Multiple currency options with 60+ BIN ranges from Hong Kong, US, UK, and Europe.',
      '/virtual-card-payments': 'Secure, fast, and reliable virtual card payment processing with advanced encryption technology. Simplify payments with one-click transactions.',
      '/login': 'Login to your NovaCard account to manage your virtual card payments and provider services.',
      '/register': 'Create a NovaCard account to access global virtual card provider solutions for your business needs.'
    },
    'zh-CN': {
      '/': 'NovaCard提供安全的虚拟卡支付和虚拟卡提供商服务，支持全球企业，跨越60多个BIN范围的多币种支持。',
      '/virtual-card-providers': '领先的虚拟卡提供商，为全球企业提供无缝支付解决方案。香港、美国、英国和欧洲的60多个BIN范围的多种货币选择。',
      '/virtual-card-payments': '安全、快速、可靠的虚拟卡支付处理，采用先进的加密技术。通过一键交易简化支付。',
      '/login': '登录您的NovaCard账户，管理您的虚拟卡支付和提供商服务。',
      '/register': '创建NovaCard账户，获取满足您业务需求的全球虚拟卡提供商解决方案。'
    },
    'zh-TW': {
      '/': 'NovaCard提供安全的虛擬卡支付和虛擬卡提供商服務，支持全球企業，跨越60多個BIN範圍的多幣種支持。',
      '/virtual-card-providers': '領先的虛擬卡提供商，為全球企業提供無縫支付解決方案。香港、美國、英國和歐洲的60多個BIN範圍的多種貨幣選擇。',
      '/virtual-card-payments': '安全、快速、可靠的虛擬卡支付處理，採用先進的加密技術。通過一鍵交易簡化支付。',
      '/login': '登錄您的虛擬卡賬戶，管理您的虛擬卡支付和提供商服務。',
      '/register': '創建NovaCard賬戶，獲取滿足您業務需求的全球虛擬卡提供商解決方案。'
    },
    'fr': {
      '/': 'NovaCard offre des services de paiement par carte virtuelle sécurisés et des services de fournisseur de carte virtuelle pour les entreprises du monde entier avec un support multi-devises sur plus de 60 plages de BIN.',
      '/virtual-card-providers': 'Les principaux fournisseurs de cartes virtuelles offrant des solutions de paiement transparentes pour les entreprises mondiales. Options de devises multiples avec plus de 60 plages de BIN de Hong Kong, États-Unis, Royaume-Uni et Europe.',
      '/virtual-card-payments': 'Traitement des paiements par carte virtuelle sécurisé, rapide et fiable avec une technologie de cryptage avancée. Simplifiez les paiements avec des transactions en un clic.',
      '/login': 'Connectez-vous à votre compte NovaCard pour gérer vos paiements par carte virtuelle et vos services de fournisseur.',
      '/register': 'Créez un compte NovaCard pour accéder aux solutions de fournisseur de carte virtuelle mondiale pour vos besoins professionnels.'
    },
    'es': {
      '/': 'NovaCard ofrece pagos con tarjeta virtual seguros y servicios de proveedor de tarjeta virtual para empresas de todo el mundo con soporte multimoneda en más de 60 rangos BIN.',
      '/virtual-card-providers': 'Los principales proveedores de tarjetas virtuales que ofrecen soluciones de pago sin problemas para empresas globales. Opciones de múltiples monedas con más de 60 rangos BIN de Hong Kong, EE. UU., Reino Unido y Europa.',
      '/virtual-card-payments': 'Procesamiento de pagos con tarjeta virtual seguro, rápido y confiable con tecnología de encriptación avanzada. Simplifique los pagos con transacciones de un solo clic.',
      '/login': 'Inicie sesión en su cuenta NovaCard para administrar sus pagos con tarjeta virtual y servicios de proveedor.',
      '/register': 'Cree una cuenta NovaCard para acceder a soluciones de proveedor de tarjeta virtual global para sus necesidades comerciales.'
    }
  };
  
  return regionalDescriptions[language]?.[pathname] || regionalDescriptions['en'][pathname] || 'Global virtual card providers and payment solutions for cross-border business transactions.';
}

// Get default keywords based on pathname and language
function getDefaultKeywordsByPath(pathname: string, language: LanguageCode): string[] {
  const baseKeywords = ['virtual card providers', 'virtual card payments', 'virtual credit card'];
  
  // Language-specific keywords to include
  const languageKeywords: Record<LanguageCode, string[]> = {
    'en': [],
    'zh-CN': ['虚拟卡提供商', '虚拟卡支付', '虚拟信用卡', '支付解决方案'],
    'zh-TW': ['虛擬卡提供商', '虛擬卡支付', '虛擬信用卡', '支付解決方案'],
    'fr': ['fournisseurs de cartes virtuelles', 'paiements par carte virtuelle', 'carte de crédit virtuelle', 'solutions de paiement'],
    'es': ['proveedores de tarjetas virtuales', 'pagos con tarjeta virtual', 'tarjeta de crédito virtual', 'soluciones de pago']
  };
  
  // Path-specific keywords
  const pathKeywords: Record<string, string[]> = {
    '/': ['global payment solutions', 'multi-currency credit cards'],
    '/virtual-card-providers': ['top virtual card providers', 'business payment solutions', 'BIN ranges'],
    '/virtual-card-payments': ['secure payment processing', 'encrypted payments', 'one-click transactions'],
    '/login': ['account login', 'payment management'],
    '/register': ['business account', 'payment solutions registration']
  };
  
  return [...baseKeywords, ...(languageKeywords[language] || []), ...(pathKeywords[pathname] || [])];
}

// Add structured data for rich snippets with language support
function addStructuredData(pathname: string, language: LanguageCode) {
  // Remove any existing structured data
  const existingScript = document.querySelector('script[type="application/ld+json"]');
  if (existingScript) {
    existingScript.remove();
  }
  
  let structuredData: any = null;
  
  // Get language-specific organization name
  const orgNames: Record<LanguageCode, string> = {
    'en': 'NovaCard Virtual Card Providers',
    'zh-CN': 'NovaCard虚拟卡提供商',
    'zh-TW': 'NovaCard虛擬卡提供商',
    'fr': 'NovaCard Fournisseurs de Cartes Virtuelles',
    'es': 'NovaCard Proveedores de Tarjetas Virtuales'
  };
  
  // Get language-specific descriptions
  const descriptions: Record<LanguageCode, string> = {
    'en': 'Global virtual card providers and payment solutions for businesses worldwide',
    'zh-CN': '为全球企业提供虚拟卡提供商和支付解决方案',
    'zh-TW': '為全球企業提供虛擬卡提供商和支付解決方案',
    'fr': 'Fournisseurs de cartes virtuelles et solutions de paiement pour les entreprises du monde entier',
    'es': 'Proveedores de tarjetas virtuales y soluciones de pago para empresas de todo el mundo'
  };
  
  // Create appropriate structured data based on the page
  if (pathname === '/') {
    structuredData = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": orgNames[language] || orgNames['en'],
      "url": `https://novacard.com/${language === 'en' ? '' : '?lang=' + language}`,
      "logo": "https://novacard.com/logo.png",
      "description": descriptions[language] || descriptions['en'],
      "sameAs": [
        "https://twitter.com/novacard",
        "https://www.linkedin.com/company/novacard",
        "https://www.facebook.com/novacard"
      ]
    };
  } else if (pathname === '/virtual-card-providers' || pathname === '/virtual-card-payments') {
    // Service-specific descriptions
    const serviceDescriptions: Record<string, Record<LanguageCode, string>> = {
      '/virtual-card-providers': {
        'en': 'Leading virtual card provider services for global businesses with multi-currency support.',
        'zh-CN': '领先的虚拟卡提供商服务，为全球企业提供多币种支持。',
        'zh-TW': '領先的虛擬卡提供商服務，為全球企業提供多幣種支持。',
        'fr': 'Services de fournisseur de cartes virtuelles de premier plan pour les entreprises mondiales avec support multidevises.',
        'es': 'Servicios de proveedor de tarjetas virtuales líderes para empresas globales con soporte multimoneda.'
      },
      '/virtual-card-payments': {
        'en': 'Secure virtual card payment processing with advanced encryption technology.',
        'zh-CN': '采用先进加密技术的安全虚拟卡支付处理。',
        'zh-TW': '採用先進加密技術的安全虛擬卡支付處理。',
        'fr': 'Traitement sécurisé des paiements par carte virtuelle avec technologie de cryptage avancée.',
        'es': 'Procesamiento seguro de pagos con tarjeta virtual con tecnología de encriptación avanzada.'
      }
    };
    
    structuredData = {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": pathname === '/virtual-card-providers' ? "Virtual Card Providers" : "Virtual Card Payments",
      "provider": {
        "@type": "Organization",
        "name": orgNames[language] || orgNames['en']
      },
      "description": serviceDescriptions[pathname]?.[language] || serviceDescriptions[pathname]['en'],
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
