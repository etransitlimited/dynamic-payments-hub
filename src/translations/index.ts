
type TranslationsType = {
  [key: string]: string;
};

type LanguageTranslationsType = {
  "zh-CN": TranslationsType;
  "zh-TW": TranslationsType;
  "en": TranslationsType;
};

const translations: LanguageTranslationsType = {
  "zh-CN": {
    // Hero Section - More detailed and compelling
    "hero.title": "DigiPayPro: 企业级全球支付解决方案",
    "hero.subtitle": "智能跨境支付 • 安全快速 • 降低成本",
    "hero.button": "免费试用",

    // Features Section - More specific value propositions
    "features.title": "为什么选择DigiPayPro",
    "features.1.title": "多币种信用卡",
    "features.1.description": "支持60+国际区域卡BIN，实现全球即时支付",
    "features.2.title": "电商支付解决方案",
    "features.2.description": "一站式集成主流电商平台，简化跨境交易流程",
    "features.3.title": "智能财务管理",
    "features.3.description": "实时费用追踪，自动生成财务报告",
    "features.4.title": "企业级安全防护",
    "features.4.description": "多重加密、风控系统，确保交易安全",
    "features.5.title": "极速开户",
    "features.5.description": "5分钟完成注册，24小时内激活账户",
    "features.6.title": "全球商户网络",
    "features.6.description": "覆盖200+国家和地区，支持主流支付场景",

    // Testimonials - More industry-specific
    "testimonials.title": "客户成功案例",
    "testimonials.1.quote": "DigiPayPro的跨境支付方案帮助我们显著降低了交易成本，提升了全球业务效率。",
    "testimonials.1.author": "张明",
    "testimonials.1.position": "跨境电商集团 财务总监",
    "testimonials.2.quote": "多币种支付功能为我们的国际业务拓展提供了强大支持，操作简单直观。",
    "testimonials.2.author": "李婷",
    "testimonials.2.position": "国际贸易平台 CEO",
    "testimonials.3.quote": "安全可靠的支付系统，让我们可以专注于业务增长，而不必担心支付复杂性。",
    "testimonials.3.author": "王建国",
    "testimonials.3.position": "科技创新公司 运营总监",

    // CTA Section - More action-oriented
    "cta.title": "立即开启全球商业新机遇",
    "cta.subtitle": "快速注册，获得专属账户经理全程指导",
    "cta.button": "免费注册",

    // Footer Section - More comprehensive
    "footer.description": "DigiPayPro致力于为全球企业提供安全、高效、智能的数字支付解决方案，助力企业轻松实现跨境商业价值。",
    "footer.product": "产品",
    "footer.features": "功能特点",
    "footer.solutions": "解决方案",
    "footer.security": "安全中心",
    "footer.company": "公司",
    "footer.about": "关于我们",
    "footer.careers": "招贤纳士",
    "footer.contact": "联系我们",
    "footer.resources": "资源",
    "footer.blog": "博客",
    "footer.documentation": "开发文档",
    "footer.support": "技术支持",
    "footer.rights": "保留所有权利。",
    
    // Language Switcher
    "language": "语言",
    "language.zh-CN": "简体中文",
    "language.zh-TW": "繁體中文",
    "language.en": "English"
  },
  "zh-TW": {
    // Similar enriched content for Traditional Chinese
    "hero.title": "DigiPayPro：企業級全球支付解決方案",
    "hero.subtitle": "智能跨境支付 • 安全快速 • 降低成本",
    "hero.button": "免費試用",
    
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
    
    // CTA Section
    "cta.title": "開始使用DigiPayPro，助力您的全球業務",
    "cta.subtitle": "快速註冊並獲得專屬賬戶經理的全程支持",
    "cta.button": "立即開通賬戶 →",
    
    // Footer Section
    "footer.description": "DigiPayPro是全球領先的數字支付解決方案提供商，專注於為企業提供安全、高效、便捷的跨境支付服務。",
    "footer.product": "產品",
    "footer.features": "功能特點",
    "footer.solutions": "解決方案",
    "footer.security": "安全中心",
    "footer.company": "公司",
    "footer.about": "關於我們",
    "footer.careers": "招賢納士",
    "footer.contact": "聯繫我們",
    "footer.resources": "資源",
    "footer.blog": "博客",
    "footer.documentation": "開發文檔",
    "footer.support": "技術支持",
    "footer.rights": "保留所有權利。",
    
    // Language Switcher
    "language": "語言",
    "language.zh-CN": "简体中文",
    "language.zh-TW": "繁體中文",
    "language.en": "English"
  },
  "en": {
    "hero.title": "DigiPayPro: Enterprise Global Payment Solution",
    "hero.subtitle": "Smart Cross-Border Payments • Secure & Fast • Cost-Effective",
    "hero.button": "Start Free Trial",
    
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
    
    // CTA Section
    "cta.title": "Start with DigiPayPro to Power Your Global Business",
    "cta.subtitle": "Register quickly and get full support from your dedicated account manager",
    "cta.button": "Create Account Now →",
    
    // Footer Section
    "footer.description": "DigiPayPro is a leading global digital payment solution provider focused on delivering secure, efficient and convenient cross-border payment services for businesses.",
    "footer.product": "Product",
    "footer.features": "Features",
    "footer.solutions": "Solutions",
    "footer.security": "Security",
    "footer.company": "Company",
    "footer.about": "About Us",
    "footer.careers": "Careers",
    "footer.contact": "Contact Us",
    "footer.resources": "Resources",
    "footer.blog": "Blog",
    "footer.documentation": "Documentation",
    "footer.support": "Support",
    "footer.rights": "All rights reserved.",
    
    // Language Switcher
    "language": "Language",
    "language.zh-CN": "简体中文",
    "language.zh-TW": "繁體中文",
    "language.en": "English"
  }
};

export default translations;
export type { TranslationsType, LanguageTranslationsType };
