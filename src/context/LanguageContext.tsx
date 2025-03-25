
import React, { createContext, useState, useContext } from "react";

type Language = "zh-CN" | "zh-TW" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const translations = {
  "zh-CN": {
    // Hero Section
    "hero.title": "全球数字支付新势力",
    "hero.subtitle": "60+国际卡BIN | 多币种即时激活 | 企业级安全标准",
    "hero.button": "立即开通账户 →",
    
    // Features Section
    "features.title": "核心优势",
    "features.1.title": "多币种信用卡",
    "features.1.description": "支持港/美/英/欧等地区60+卡BIN",
    "features.2.title": "电商支付解决方案",
    "features.2.description": "一站式集成主流电商平台支付网关",
    "features.3.title": "企业费用管理",
    "features.3.description": "多场景支出管理，实时数据分析",
    "features.4.title": "安全保障",
    "features.4.description": "银行级加密标准，多重风控系统",
    "features.5.title": "即时激活",
    "features.5.description": "秒级卡片激活，无需等待审核",
    "features.6.title": "全球通用",
    "features.6.description": "覆盖200+国家和地区的主流商户",
    
    // New Pricing Section
    "pricing.title": "灵活定价套餐",
    "pricing.subtitle": "根据企业规模和需求选择最适合的方案",
    "pricing.basic.title": "基础版",
    "pricing.basic.price": "¥999",
    "pricing.basic.period": "/月",
    "pricing.basic.description": "适合小型企业和初创公司",
    "pricing.basic.feature1": "最多5张虚拟卡",
    "pricing.basic.feature2": "基础交易报告",
    "pricing.basic.feature3": "标准客户支持",
    "pricing.basic.cta": "选择套餐",
    
    "pricing.pro.title": "专业版",
    "pricing.pro.price": "¥2,999",
    "pricing.pro.period": "/月",
    "pricing.pro.description": "适合中型企业和成长型公司",
    "pricing.pro.feature1": "最多20张虚拟卡",
    "pricing.pro.feature2": "高级数据分析",
    "pricing.pro.feature3": "优先客户支持",
    "pricing.pro.cta": "选择套餐",
    
    "pricing.enterprise.title": "企业版",
    "pricing.enterprise.price": "定制价格",
    "pricing.enterprise.period": "",
    "pricing.enterprise.description": "适合大型企业和跨国公司",
    "pricing.enterprise.feature1": "无限虚拟卡",
    "pricing.enterprise.feature2": "定制解决方案",
    "pricing.enterprise.feature3": "专属客户经理",
    "pricing.enterprise.cta": "联系销售",
    
    // New Testimonials Section
    "testimonials.title": "客户评价",
    "testimonials.1.quote": "这个平台帮助我们简化了全球支付流程，大大提升了运营效率。",
    "testimonials.1.author": "张明",
    "testimonials.1.position": "某科技公司 CFO",
    "testimonials.2.quote": "多币种支付功能为我们的国际业务拓展提供了强大支持。",
    "testimonials.2.author": "李婷",
    "testimonials.2.position": "某电商平台 CEO",
    "testimonials.3.quote": "安全可靠的支付系统，让我们可以专注于业务增长而不必担心支付问题。",
    "testimonials.3.author": "王建国",
    "testimonials.3.position": "某贸易公司 运营总监",
    
    // Language Switcher
    "language": "语言",
    "language.zh-CN": "简体中文",
    "language.zh-TW": "繁體中文",
    "language.en": "English"
  },
  "zh-TW": {
    // Hero Section
    "hero.title": "全球數字支付新勢力",
    "hero.subtitle": "60+國際卡BIN | 多幣種即時激活 | 企業級安全標準",
    "hero.button": "立即開通賬戶 →",
    
    // Features Section
    "features.title": "核心優勢",
    "features.1.title": "多幣種信用卡",
    "features.1.description": "支持港/美/英/歐等地區60+卡BIN",
    "features.2.title": "電商支付解決方案",
    "features.2.description": "一站式集成主流電商平台支付網關",
    "features.3.title": "企業費用管理",
    "features.3.description": "多場景支出管理，實時數據分析",
    "features.4.title": "安全保障",
    "features.4.description": "銀行級加密標準，多重風控系統",
    "features.5.title": "即時激活",
    "features.5.description": "秒級卡片激活，無需等待審核",
    "features.6.title": "全球通用",
    "features.6.description": "覆蓋200+國家和地區的主流商戶",
    
    // New Pricing Section
    "pricing.title": "靈活定價套餐",
    "pricing.subtitle": "根據企業規模和需求選擇最適合的方案",
    "pricing.basic.title": "基礎版",
    "pricing.basic.price": "¥999",
    "pricing.basic.period": "/月",
    "pricing.basic.description": "適合小型企業和初創公司",
    "pricing.basic.feature1": "最多5張虛擬卡",
    "pricing.basic.feature2": "基礎交易報告",
    "pricing.basic.feature3": "標準客戶支持",
    "pricing.basic.cta": "選擇套餐",
    
    "pricing.pro.title": "專業版",
    "pricing.pro.price": "¥2,999",
    "pricing.pro.period": "/月",
    "pricing.pro.description": "適合中型企業和成長型公司",
    "pricing.pro.feature1": "最多20張虛擬卡",
    "pricing.pro.feature2": "高級數據分析",
    "pricing.pro.feature3": "優先客戶支持",
    "pricing.pro.cta": "選擇套餐",
    
    "pricing.enterprise.title": "企業版",
    "pricing.enterprise.price": "定制價格",
    "pricing.enterprise.period": "",
    "pricing.enterprise.description": "適合大型企業和跨國公司",
    "pricing.enterprise.feature1": "無限虛擬卡",
    "pricing.enterprise.feature2": "定制解決方案",
    "pricing.enterprise.feature3": "專屬客戶經理",
    "pricing.enterprise.cta": "聯繫銷售",
    
    // New Testimonials Section
    "testimonials.title": "客戶評價",
    "testimonials.1.quote": "這個平台幫助我們簡化了全球支付流程，大大提升了運營效率。",
    "testimonials.1.author": "張明",
    "testimonials.1.position": "某科技公司 CFO",
    "testimonials.2.quote": "多幣種支付功能為我們的國際業務拓展提供了強大支持。",
    "testimonials.2.author": "李婷",
    "testimonials.2.position": "某電商平台 CEO",
    "testimonials.3.quote": "安全可靠的支付系統，讓我們可以專注於業務增長而不必擔心支付問題。",
    "testimonials.3.author": "王建國",
    "testimonials.3.position": "某貿易公司 運營總監",
    
    // Language Switcher
    "language": "語言",
    "language.zh-CN": "简体中文",
    "language.zh-TW": "繁體中文",
    "language.en": "English"
  },
  "en": {
    // Hero Section
    "hero.title": "New Global Digital Payment Solution",
    "hero.subtitle": "60+ International Card BINs | Multi-Currency Instant Activation | Enterprise-Level Security",
    "hero.button": "Create Account Now →",
    
    // Features Section
    "features.title": "Core Advantages",
    "features.1.title": "Multi-Currency Cards",
    "features.1.description": "Support for 60+ card BINs from HK/US/UK/EU regions",
    "features.2.title": "E-commerce Payment Solutions",
    "features.2.description": "One-stop integration with mainstream e-commerce payment gateways",
    "features.3.title": "Corporate Expense Management",
    "features.3.description": "Multi-scenario expense management with real-time data analytics",
    "features.4.title": "Security Guarantee",
    "features.4.description": "Bank-level encryption standards with multi-layered risk control",
    "features.5.title": "Instant Activation",
    "features.5.description": "Second-level card activation with no waiting for approval",
    "features.6.title": "Global Acceptance",
    "features.6.description": "Coverage of mainstream merchants in 200+ countries and regions",
    
    // New Pricing Section
    "pricing.title": "Flexible Pricing Plans",
    "pricing.subtitle": "Choose the perfect plan based on your company size and needs",
    "pricing.basic.title": "Basic",
    "pricing.basic.price": "$149",
    "pricing.basic.period": "/month",
    "pricing.basic.description": "Ideal for small businesses and startups",
    "pricing.basic.feature1": "Up to 5 virtual cards",
    "pricing.basic.feature2": "Basic transaction reports",
    "pricing.basic.feature3": "Standard customer support",
    "pricing.basic.cta": "Choose Plan",
    
    "pricing.pro.title": "Professional",
    "pricing.pro.price": "$449",
    "pricing.pro.period": "/month",
    "pricing.pro.description": "Perfect for medium-sized businesses",
    "pricing.pro.feature1": "Up to 20 virtual cards",
    "pricing.pro.feature2": "Advanced data analytics",
    "pricing.pro.feature3": "Priority customer support",
    "pricing.pro.cta": "Choose Plan",
    
    "pricing.enterprise.title": "Enterprise",
    "pricing.enterprise.price": "Custom Pricing",
    "pricing.enterprise.period": "",
    "pricing.enterprise.description": "For large enterprises and multinational companies",
    "pricing.enterprise.feature1": "Unlimited virtual cards",
    "pricing.enterprise.feature2": "Custom solutions",
    "pricing.enterprise.feature3": "Dedicated account manager",
    "pricing.enterprise.cta": "Contact Sales",
    
    // New Testimonials Section
    "testimonials.title": "Customer Testimonials",
    "testimonials.1.quote": "This platform has helped us streamline our global payment processes and greatly improved our operational efficiency.",
    "testimonials.1.author": "Michael Zhang",
    "testimonials.1.position": "CFO at Tech Company",
    "testimonials.2.quote": "The multi-currency payment feature provides powerful support for our international business expansion.",
    "testimonials.2.author": "Tina Li",
    "testimonials.2.position": "CEO at E-commerce Platform",
    "testimonials.3.quote": "The secure and reliable payment system allows us to focus on business growth without worrying about payment issues.",
    "testimonials.3.author": "John Wang",
    "testimonials.3.position": "Operations Director at Trading Company",
    
    // Language Switcher
    "language": "Language",
    "language.zh-CN": "简体中文",
    "language.zh-TW": "繁體中文",
    "language.en": "English"
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>("zh-CN");

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
