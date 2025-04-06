
import { useLanguage } from "@/context/LanguageContext";
import { useEffect } from "react";
import { LanguageCode } from "./languageUtils";

interface SEOMetaTags {
  title: string;
  meta: Array<{
    name?: string;
    property?: string;
    content: string;
  }>;
  script: Array<{
    type?: string;
    innerHTML?: string;
    src?: string;
  }>;
}

interface SEOOptions {
  title?: string;
  description?: string;
  keywords?: string;
  author?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  ogType?: string;
  twitterCard?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  twitterSite?: string;
  canonicalUrl?: string;
}

const defaultMetadata: Record<string, SEOOptions> = {
  "/": {
    title: "ZoraCard - Virtual Card Provider",
    description: "Secure, fast, and reliable virtual credit card payment processing for businesses worldwide",
    ogTitle: "ZoraCard - Global Virtual Card Solutions",
    ogDescription: "Enable your business with virtual card technology",
    ogImage: "/lovable-uploads/47003b38-e99e-468a-a1da-52124948df0d.png",
    ogType: "website"
  },
  "/login": {
    title: "Login - ZoraCard",
    description: "Access your ZoraCard account",
    ogTitle: "Login to ZoraCard",
    ogDescription: "Sign in to manage your virtual cards",
    ogImage: "/lovable-uploads/47003b38-e99e-468a-a1da-52124948df0d.png",
    ogType: "website"
  },
  "/register": {
    title: "Register - ZoraCard",
    description: "Create your ZoraCard account",
    ogTitle: "Register for ZoraCard",
    ogDescription: "Sign up to get started with virtual cards",
    ogImage: "/lovable-uploads/47003b38-e99e-468a-a1da-52124948df0d.png",
    ogType: "website"
  },
  "/forgot-password": {
    title: "Forgot Password - ZoraCard",
    description: "Reset your ZoraCard password",
    ogTitle: "Reset ZoraCard Password",
    ogDescription: "Reset your password to regain account access",
    ogImage: "/lovable-uploads/47003b38-e99e-468a-a1da-52124948df0d.png",
    ogType: "website"
  }
};

// Translate metadata based on language
const getLocalizedSEO = (
  path: string,
  language: LanguageCode,
  customOptions?: SEOOptions
): SEOOptions => {
  // Get base metadata for the path or use a default
  const baseMetadata = defaultMetadata[path] || defaultMetadata["/"];
  
  // Get translations for title and description based on path
  let titleKey = "";
  let descriptionKey = "";
  
  if (path === "/login") {
    titleKey = "auth.login.title";
    descriptionKey = "auth.login.description";
  } else if (path === "/register") {
    titleKey = "auth.register.title";
    descriptionKey = "auth.register.description";
  } else if (path === "/forgot-password") {
    titleKey = "auth.forgotPassword.title";
    descriptionKey = "auth.forgotPassword.description";
  } else if (path === "/") {
    titleKey = "hero.title";
    descriptionKey = "hero.subtitle";
  }

  // Merge with custom options
  return {
    ...baseMetadata,
    ...customOptions
  };
};

export function useSEO(options: SEOOptions = {}) {
  const { language } = useLanguage();

  useEffect(() => {
    const title = options.title || "ZoraCard";
    document.title = title;
  }, [options.title, language]);

  const getMetadata = (path: string, currentLanguage: LanguageCode): SEOMetaTags => {
    // Get localized SEO data
    const seoData = getLocalizedSEO(path, currentLanguage, options);
    
    // Prepare metadata
    const metaTitle = seoData.title || "ZoraCard";
    const metaDescription = seoData.description || "";
    const metaKeywords = seoData.keywords || "virtual cards, payment processing, business payments";
    const metaAuthor = seoData.author || "ZoraCard";
    
    // Open Graph
    const ogTitle = seoData.ogTitle || metaTitle;
    const ogDescription = seoData.ogDescription || metaDescription;
    const ogImage = seoData.ogImage || "/lovable-uploads/47003b38-e99e-468a-a1da-52124948df0d.png";
    const ogUrl = seoData.ogUrl || `https://zoracard.com${path}`;
    const ogType = seoData.ogType || "website";
    
    // Twitter Card
    const twitterCard = seoData.twitterCard || "summary_large_image";
    const twitterTitle = seoData.twitterTitle || ogTitle;
    const twitterDescription = seoData.twitterDescription || ogDescription;
    const twitterImage = seoData.twitterImage || ogImage;
    const twitterSite = seoData.twitterSite || "@zoracard";
    
    // Canonical URL
    const canonicalUrl = seoData.canonicalUrl || `https://zoracard.com${path}`;

    return {
      title: metaTitle,
      meta: [
        { name: "description", content: metaDescription },
        { name: "keywords", content: metaKeywords },
        { name: "author", content: metaAuthor },
        // Open Graph
        { property: "og:title", content: ogTitle },
        { property: "og:type", content: ogType },
        { property: "og:url", content: ogUrl },
        { property: "og:image", content: ogImage },
        { property: "og:description", content: ogDescription },
        // Twitter Card
        { name: "twitter:card", content: twitterCard },
        { name: "twitter:site", content: twitterSite },
        { name: "twitter:title", content: twitterTitle },
        { name: "twitter:description", content: twitterDescription },
        { name: "twitter:image", content: twitterImage },
        // Canonical
        { name: "canonical", content: canonicalUrl }
      ],
      script: []
    };
  };

  return { getMetadata };
}
