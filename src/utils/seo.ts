import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';
import { LanguageCode } from '@/utils/languageUtils';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  author?: string;
  image?: string;
  twitterHandle?: string;
  article?: boolean;
}

// Fix the page titles by language
const pageTitlesByLanguage: Record<LanguageCode, Record<string, string>> = {
  en: {
    '/': 'Virtual Card Provider | Global Payment Solutions',
    '/virtual-card-providers': 'Virtual Card Providers | Secure Payment Solutions',
    '/virtual-card-payments': 'Virtual Card Payments | Secure Online Transactions',
    '/login': 'Login | Virtual Card Platform',
    '/register': 'Register | Virtual Card Platform'
  },
  'zh-CN': {
    '/': '虚拟卡提供商 | 全球支付解决方案',
    '/virtual-card-providers': '虚拟卡提供商 | 安全支付解决方案',
    '/virtual-card-payments': '虚拟卡支付 | 安全在线交易',
    '/login': '登录 | 虚拟卡平台',
    '/register': '注册 | 虚拟卡平台'
  },
  'zh-TW': {
    '/': '虛擬卡提供商 | 全球支付解決方案',
    '/virtual-card-providers': '虛擬卡提供商 | 安全支付解決方案',
    '/virtual-card-payments': '虛擬卡支付 | 安全在線交易',
    '/login': '登錄 | 虛擬卡平台',
    '/register': '註冊 | 虛擬卡平台'
  },
  fr: {
    '/': 'Fournisseur de Cartes Virtuelles | Solutions de Paiement Mondiales',
    '/virtual-card-providers': 'Fournisseurs de Cartes Virtuelles | Solutions de Paiement Sécurisées',
    '/virtual-card-payments': 'Paiements par Carte Virtuelle | Transactions En Ligne Sécurisées',
    '/login': 'Connexion | Plateforme de Cartes Virtuelles',
    '/register': 'Inscription | Plateforme de Cartes Virtuelles'
  },
  es: {
    '/': 'Proveedor de Tarjetas Virtuales | Soluciones de Pago Globales',
    '/virtual-card-providers': 'Proveedores de Tarjetas Virtuales | Soluciones de Pago Seguras',
    '/virtual-card-payments': 'Pagos con Tarjeta Virtual | Transacciones En Línea Seguras',
    '/login': 'Iniciar Sesión | Plataforma de Tarjetas Virtuales',
    '/register': 'Registrarse | Plataforma de Tarjetas Virtuales'
  }
};

// Fix the page descriptions by language
const pageDescriptionsByLanguage: Record<LanguageCode, Record<string, string>> = {
  en: {
    '/': 'Secure virtual card provider for global businesses. Get instant virtual cards for e-commerce, advertising, and subscription payments.',
    '/virtual-card-providers': 'Find the best virtual card providers for your business needs. Compare features, pricing, and security of virtual card issuers.',
    '/virtual-card-payments': 'Learn about virtual card payments and how they can streamline your business expenses. Secure, instant, and globally accepted.',
    '/login': 'Login to access your virtual card dashboard and manage your cards, transactions, and account settings.',
    '/register': 'Create an account to start using virtual cards for your business payments, expense management, and online transactions.'
  },
  'zh-CN': {
    '/': '全球企业安全虚拟卡提供商。获取用于电子商务、广告和订阅支付的即时虚拟卡。',
    '/virtual-card-providers': '找到最适合您业务需求的虚拟卡提供商。比较虚拟卡发行商的功能、定价和安全性。',
    '/virtual-card-payments': '了解虚拟卡支付以及它们如何简化您的业务支出。安全、即时且全球接受。',
    '/login': '登录访问您的虚拟卡控制面板，管理您的卡片、交易和账户设置。',
    '/register': '创建账户，开始使用虚拟卡进行业务支付、费用管理和在线交易。'
  },
  'zh-TW': {
    '/': '全球企業安全虛擬卡提供商。獲取用於電子商務、廣告和訂閱支付的即時虛擬卡。',
    '/virtual-card-providers': '找到最適合您業務需求的虛擬卡提供商。比較虛擬卡發行商的功能、定價和安全性。',
    '/virtual-card-payments': '了解虛擬卡支付以及它們如何簡化您的業務支出。安全、即時且全球接受。',
    '/login': '登錄訪問您的虛擬卡控制面板，管理您的卡片、交易和賬戶設置。',
    '/register': '創建賬戶，開始使用虛擬卡進行業務支付、費用管理和在線交易。'
  },
  fr: {
    '/': 'Fournisseur de cartes virtuelles sécurisées pour les entreprises mondiales. Obtenez des cartes virtuelles instantanées pour le e-commerce, la publicité et les paiements d\'abonnement.',
    '/virtual-card-providers': 'Trouvez les meilleurs fournisseurs de cartes virtuelles pour les besoins de votre entreprise. Comparez les fonctionnalités, les prix et la sécurité des émetteurs de cartes virtuelles.',
    '/virtual-card-payments': 'Découvrez les paiements par carte virtuelle et comment ils peuvent rationaliser les dépenses de votre entreprise. Sécurisés, instantanés et acceptés mondialement.',
    '/login': 'Connectez-vous pour accéder à votre tableau de bord de carte virtuelle et gérer vos cartes, transactions et paramètres de compte.',
    '/register': 'Créez un compte pour commencer à utiliser des cartes virtuelles pour vos paiements d\'entreprise, la gestion des dépenses et les transactions en ligne.'
  },
  es: {
    '/': 'Proveedor seguro de tarjetas virtuales para empresas globales. Obtenga tarjetas virtuales instantáneas para comercio electrónico, publicidad y pagos de suscripción.',
    '/virtual-card-providers': 'Encuentre los mejores proveedores de tarjetas virtuales para las necesidades de su empresa. Compare características, precios y seguridad de emisores de tarjetas virtuales.',
    '/virtual-card-payments': 'Aprenda sobre pagos con tarjeta virtual y cómo pueden agilizar los gastos de su empresa. Seguros, instantáneos y aceptados globalmente.',
    '/login': 'Inicie sesión para acceder a su panel de tarjetas virtuales y administrar sus tarjetas, transacciones y configuración de cuenta.',
    '/register': 'Cree una cuenta para comenzar a usar tarjetas virtuales para pagos de empresa, gestión de gastos y transacciones en línea.'
  }
};

// Fix the keywords by language
const keywordsByLanguage: Record<LanguageCode, string[]> = {
  en: [
    'virtual credit card',
    'virtual card provider',
    'business virtual card',
    'prepaid virtual card',
    'global payment solutions',
    'ecommerce payments',
    'virtual card payment processing',
    'BIN virtual card',
    'virtual card security',
    'cross-border payments'
  ],
  'zh-CN': [
    '虚拟信用卡',
    '虚拟卡提供商',
    '企业虚拟卡',
    '预付虚拟卡',
    '全球支付解决方案',
    '电商支付',
    '虚拟卡支付处理',
    'BIN虚拟卡',
    '虚拟卡安全',
    '跨境支付'
  ],
  'zh-TW': [
    '虛擬信用卡',
    '虛擬卡提供商',
    '企業虛擬卡',
    '預付虛擬卡',
    '全球支付解決方案',
    '電商支付',
    '虛擬卡支付處理',
    'BIN虛擬卡',
    '虛擬卡安全',
    '跨境支付'
  ],
  fr: [
    'Carte virtuelle',
    'Fournisseur de cartes virtuelles',
    'Carte virtuelle entreprise',
    'Carte prépayée virtuelle',
    'Solutions de paiement mondiales',
    'Paiement e-commerce',
    'Traitement des paiements par carte virtuelle',
    'Carte virtuelle BIN',
    'Sécurité des cartes virtuelles',
    'Paiements transfrontaliers'
  ],
  es: [
    'Tarjeta virtual',
    'Proveedor de tarjetas virtuales',
    'Tarjeta virtual empresarial',
    'Tarjeta virtual prepaga',
    'Soluciones de pago globales',
    'Pago de comercio electrónico',
    'Procesamiento de pagos con tarjeta virtual',
    'Tarjeta virtual BIN',
    'Seguridad de tarjetas virtuales',
    'Pagos transfronterizos'
  ]
};

// Fix the company information by language
const companyInfoByLanguage: Record<LanguageCode, string> = {
  en: 'ZoraCard - Virtual Card Provider',
  'zh-CN': 'ZoraCard - 虚拟卡提供商',
  'zh-TW': 'ZoraCard - 虛擬卡提供商',
  fr: 'ZoraCard - Fournisseur de Cartes Virtuelles',
  es: 'ZoraCard - Proveedor de Tarjetas Virtuales'
};

// Fix the social media descriptions by language
const socialMediaDescriptionByLanguage: Record<LanguageCode, string> = {
  en: 'Get instant virtual cards for your global business payments. Secure, fast, and reliable.',
  'zh-CN': '为您的全球企业支付获取即时虚拟卡。安全、快速、可靠。',
  'zh-TW': '為您的全球企業支付獲取即時虛擬卡。安全、快速、可靠。',
  fr: 'Obtenez des cartes virtuelles instantanées pour les paiements de votre entreprise mondiale. Sécurisé, rapide et fiable.',
  es: 'Obtenga tarjetas virtuales instantáneas para los pagos de su empresa global. Seguro, rápido y confiable.'
};

// Fix the Twitter card strings by language
const twitterCardTitlesByLanguage: Record<LanguageCode, string> = {
  en: 'Global Virtual Card Solutions | ZoraCard',
  'zh-CN': '全球虚拟卡解决方案 | ZoraCard',
  'zh-TW': '全球虛擬卡解決方案 | ZoraCard',
  fr: 'Solutions de Cartes Virtuelles Mondiales | ZoraCard',
  es: 'Soluciones de Tarjetas Virtuales Globales | ZoraCard'
};

const twitterCardDescriptionsByLanguage: Record<LanguageCode, string> = {
  en: 'Virtual cards for global business payments. Accepted worldwide, instant issuance.',
  'zh-CN': '用于全球企业支付的虚拟卡。全球接受，即时发行。',
  'zh-TW': '用於全球企業支付的虛擬卡。全球接受，即時發行。',
  fr: 'Cartes virtuelles pour les paiements d\'entreprise mondiaux. Acceptées dans le monde entier, émission instantanée.',
  es: 'Tarjetas virtuales para pagos empresariales globales. Aceptadas en todo el mundo, emisión instantánea.'
};

export const useSEO = ({ title, description, keywords, author, image, twitterHandle, article }: SEOProps) => {
  const location = useLocation();
  const currentPath = location.pathname;

  // Determine the language based on the current path or a default
  const getLanguageFromPath = (): LanguageCode => {
    const langRegex = /^\/(en|zh-CN|zh-TW|fr|es)\/?.*$/;
    const match = currentPath.match(langRegex);
    return (match ? match[1] : 'en') as LanguageCode;
  };

  const language = getLanguageFromPath();

  // Fallback values
  const defaultTitle = pageTitlesByLanguage[language]?.[currentPath] || 'Virtual Card Provider';
  const defaultDescription = pageDescriptionsByLanguage[language]?.[currentPath] || 'Secure virtual card provider for global businesses.';
  const defaultKeywords = keywordsByLanguage[language] || ['virtual card', 'payment solutions'];
  const defaultCompanyInfo = companyInfoByLanguage[language] || 'ZoraCard - Virtual Card Provider';
  const defaultSocialMediaDescription = socialMediaDescriptionByLanguage[language] || 'Get instant virtual cards for your global business payments. Secure, fast, and reliable.';
  const defaultTwitterCardTitle = twitterCardTitlesByLanguage[language] || 'Global Virtual Card Solutions | ZoraCard';
  const defaultTwitterCardDescription = twitterCardDescriptionsByLanguage[language] || 'Virtual cards for global business payments. Accepted worldwide, instant issuance.';

  const metaTitle = title || defaultTitle;
  const metaDescription = description || defaultDescription;
  const metaKeywords = keywords?.length ? keywords.join(', ') : defaultKeywords.join(', ');
  const metaAuthor = author || defaultCompanyInfo;
  const metaImage = image || 'https://example.com/default-image.jpg'; // Replace with your default image URL
  const metaTwitterHandle = twitterHandle || '@ZoraCard';

  useEffect(() => {
    // Update the title in the document head
    document.title = metaTitle;
  }, [metaTitle]);

  return (
    <Helmet>
      {/* General metadata */}
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={metaKeywords} />
      <meta name="author" content={metaAuthor} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={article ? 'article' : 'website'} />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={metaImage} />
      <meta property="og:url" content={`https://www.zoracard.com${currentPath}`} />
      <meta property="og:site_name" content={defaultCompanyInfo} />
      <meta property="og:locale" content={language.replace('-', '_')} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={metaTwitterHandle} />
      <meta name="twitter:creator" content={metaTwitterHandle} />
      <meta name="twitter:title" content={defaultTwitterCardTitle} />
      <meta name="twitter:description" content={defaultTwitterCardDescription} />
      <meta name="twitter:image" content={metaImage} />

      {/* Structured Data / Schema.org markup */}
      {article && (
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            'headline': metaTitle,
            'description': metaDescription,
            'image': metaImage,
            'author': {
              '@type': 'Organization',
              'name': metaAuthor,
              'url': 'https://www.zoracard.com'
            },
            'publisher': {
              '@type': 'Organization',
              'name': metaAuthor,
              'logo': {
                '@type': 'ImageObject',
                'url': 'https://example.com/logo.png' // Replace with your logo URL
              }
            },
            'datePublished': new Date().toISOString(),
          })}
        </script>
      )}
    </Helmet>
  );
};
