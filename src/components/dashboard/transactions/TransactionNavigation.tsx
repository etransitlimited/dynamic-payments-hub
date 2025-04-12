
import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BarChart3, Calendar, Wallet } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { getTransactionTranslation } from "@/pages/dashboard/transactions/i18n";
import { LanguageCode } from "@/utils/languageUtils";
import { 
  Tabs, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { useSafeTranslation } from "@/hooks/use-safe-translation";

interface NavigationTab {
  path: string;
  key: string;
  icon: React.ReactNode;
  value: string;
}

const TransactionNavigation: React.FC = () => {
  const { language } = useLanguage();
  const { refreshCounter } = useSafeTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const languageRef = useRef<LanguageCode>(language as LanguageCode);
  const navRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const stableId = useRef(`nav-${Math.random().toString(36).substring(2, 9)}`);
  const [activeTab, setActiveTab] = useState<string>(() => {
    // 根据当前路径确定激活的标签页
    const path = location.pathname;
    if (path.includes("/history")) return "history";
    if (path.includes("/wallet")) return "wallet";
    return "title";
  });
  
  // 使用固定key防止组件重新挂载
  const componentKey = useRef(`nav-${Math.random().toString(36).substring(2, 9)}`);
  
  // 在不触发重新渲染的情况下更新语言引用
  useEffect(() => {
    if (languageRef.current !== language) {
      languageRef.current = language as LanguageCode;
      
      // 在语言更改时强制更新DOM
      updateNavigationText();
      
      // 直接更新data属性
      if (navRef.current) {
        navRef.current.setAttribute('data-language', language);
        navRef.current.setAttribute('data-key', stableId.current);
        navRef.current.setAttribute('data-refresh', Date.now().toString());
      }
    }
  }, [language, refreshCounter]);
  
  // 使用正确的翻译获取导航标签
  const navigationTabs = useMemo(() => [
    {
      path: "/dashboard/transactions",
      key: "title",
      icon: <BarChart3 className="h-4 w-4 mr-2" />,
      value: getTransactionTranslation("title", languageRef.current)
    },
    {
      path: "/dashboard/transactions/history",
      key: "history",
      icon: <Calendar className="h-4 w-4 mr-2" />,
      value: getTransactionTranslation("history", languageRef.current)
    },
    {
      path: "/dashboard/wallet/funds",
      key: "wallet",
      icon: <Wallet className="h-4 w-4 mr-2" />,
      value: getTransactionTranslation("wallet", languageRef.current)
    }
  ], [refreshCounter]);

  // 在语言更改时强制更新导航文本的DOM
  const updateNavigationText = useCallback(() => {
    const tabElements = document.querySelectorAll(`[data-nav-id="${stableId.current}"] [data-transaction-nav-item]`);
    tabElements.forEach((element) => {
      const key = element.getAttribute('data-key');
      if (key) {
        const translation = getTransactionTranslation(key, languageRef.current);
        const textElement = element.querySelector('[data-translation-text]');
        if (textElement) {
          textElement.textContent = translation;
        }
      }
    });
  }, []);
  
  // 监听语言变化事件
  useEffect(() => {
    const handleLanguageChange = (e: Event) => {
      const customEvent = e as CustomEvent;
      const { language: newLanguage } = customEvent.detail || {};
      
      if (newLanguage && languageRef.current !== newLanguage) {
        languageRef.current = newLanguage as LanguageCode;
        updateNavigationText();
        
        // 直接更新data属性
        if (navRef.current) {
          navRef.current.setAttribute('data-language', newLanguage);
          navRef.current.setAttribute('data-update', Date.now().toString());
        }
      }
    };
    
    window.addEventListener('app:languageChange', handleLanguageChange);
    document.addEventListener('languageChanged', handleLanguageChange);
    
    return () => {
      window.removeEventListener('app:languageChange', handleLanguageChange);
      document.removeEventListener('languageChanged', handleLanguageChange);
    };
  }, [updateNavigationText]);

  // 使用客户端路由导航，采用平滑过渡
  const handleTabChange = useCallback((value: string) => {
    setActiveTab(value);
    const tab = navigationTabs.find(tab => tab.key === value);
    if (tab) {
      // 添加过渡动画效果
      document.body.classList.add('page-transitioning');
      
      // 使用延迟导航，给视觉过渡留出时间
      setTimeout(() => {
        navigate(tab.path, { 
          replace: false,
          state: { 
            fromNavigation: true,
            navigationTime: Date.now(),
            prevPath: location.pathname 
          } 
        });
        
        // 短暂延迟后移除过渡类
        setTimeout(() => {
          document.body.classList.remove('page-transitioning');
        }, 300);
      }, 50);
    }
  }, [navigate, navigationTabs, location.pathname]);
  
  // 确保导航正确初始化
  useEffect(() => {
    // 初始化导航文本
    updateNavigationText();
    
    // 根据当前路径更新激活的标签
    const path = location.pathname;
    let newTab = "title";
    if (path.includes("/history")) newTab = "history";
    if (path.includes("/wallet")) newTab = "wallet";
    
    if (newTab !== activeTab) {
      setActiveTab(newTab);
    }
    
    // 添加全局CSS，实现页面过渡效果
    if (!document.getElementById('navigation-transition-styles')) {
      const styleElement = document.createElement('style');
      styleElement.id = 'navigation-transition-styles';
      styleElement.textContent = `
        .page-transitioning main > div {
          opacity: 0.8;
          transform: translateY(8px);
          transition: opacity 0.3s, transform 0.3s;
        }
        main > div {
          transition: opacity 0.3s, transform 0.3s;
        }
      `;
      document.head.appendChild(styleElement);
    }
    
  }, [location.pathname, updateNavigationText, refreshCounter, activeTab]);

  return (
    <motion.div
      ref={navRef}
      key={componentKey.current}
      className="mb-6"
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      data-language={languageRef.current}
      data-nav-id={stableId.current}
    >
      <Tabs 
        ref={tabsRef as React.RefObject<HTMLDivElement>}
        defaultValue={activeTab} 
        value={activeTab} 
        onValueChange={handleTabChange}
        className="w-full"
      >
        <TabsList className="grid grid-cols-3 bg-indigo-950/20 border border-indigo-800/30 p-1 rounded-lg">
          <AnimatePresence mode="wait">
            {navigationTabs.map((tab) => (
              <TabsTrigger
                key={tab.key}
                value={tab.key}
                className="flex items-center gap-1.5 data-[state=active]:bg-indigo-700/30 data-[state=active]:text-indigo-100 data-[state=active]:shadow-sm"
                data-transaction-nav-item
                data-key={tab.key}
              >
                <motion.div 
                  className="flex items-center w-full justify-center"
                  whileTap={{ scale: 0.97 }}
                >
                  {tab.icon}
                  <span 
                    className="text-xs sm:text-sm whitespace-nowrap"
                    data-translation-text
                  >
                    {tab.value}
                  </span>
                </motion.div>
              </TabsTrigger>
            ))}
          </AnimatePresence>
        </TabsList>
      </Tabs>
    </motion.div>
  );
};

export default React.memo(TransactionNavigation);
