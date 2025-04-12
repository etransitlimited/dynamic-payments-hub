
import React, { useEffect, useRef, useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import AdminSidebar from "@/components/dashboard/AdminSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { LanguageProvider } from "@/context/LanguageContext";
import HreflangTags from "@/components/seo/HreflangTags";
import { useLanguage } from "@/context/LanguageContext";
import TranslationWrapper from "@/components/translation/TranslationWrapper";
import { useSafeTranslation } from "@/hooks/use-safe-translation";

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

// 内部组件处理特定于语言的渲染
const DashboardContent = ({ children }: DashboardLayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { language, refreshCounter } = useSafeTranslation();
  const locationPathRef = useRef(location.pathname);
  const languageRef = useRef(language);
  const contentRef = useRef<HTMLDivElement>(null);
  const mountedRef = useRef(true);
  const layoutKey = useRef(`dashboard-layout-${Math.random().toString(36).substring(2, 9)}`);
  const outletRef = useRef<HTMLDivElement>(null);
  const [contentKey, setContentKey] = useState(`content-${Math.random().toString(36).substring(2, 7)}`);
  
  // 当导航到根路径时重定向到仪表盘
  useEffect(() => {
    if (location.pathname === '/') {
      navigate('/dashboard');
    } else if (location.pathname === '/dashboard/') {
      navigate('/dashboard');
    }
  }, [location.pathname, navigate]);
  
  // 跟踪挂载状态以防止内存泄漏
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);
  
  // 更新refs而不触发重新渲染
  useEffect(() => {
    if (location.pathname !== locationPathRef.current && mountedRef.current) {
      locationPathRef.current = location.pathname;
      
      // 缓和过渡动画通过添加动画类
      if (outletRef.current) {
        outletRef.current.style.opacity = '0';
        outletRef.current.style.transform = 'translateY(5px)';
        
        // 在下一帧恢复，创建平滑过渡
        requestAnimationFrame(() => {
          if (outletRef.current) {
            outletRef.current.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
            outletRef.current.style.opacity = '1';
            outletRef.current.style.transform = 'translateY(0)';
          }
        });
      }
    }
  }, [location.pathname]);
  
  // 当语言改变时更新
  useEffect(() => {
    if (language !== languageRef.current && mountedRef.current) {
      languageRef.current = language;
      
      // 直接更新data-language属性
      if (contentRef.current) {
        contentRef.current.setAttribute('data-language', language);
        contentRef.current.setAttribute('data-refresh', refreshCounter.toString());
      }
    }
  }, [language, refreshCounter]);
  
  // 监听语言变化事件
  useEffect(() => {
    if (!mountedRef.current) return;
    
    const handleLanguageChange = (e: Event) => {
      if (!mountedRef.current) return;
      
      const customEvent = e as CustomEvent;
      const { language: newLanguage } = customEvent.detail || {};
      
      if (newLanguage && newLanguage !== languageRef.current) {
        languageRef.current = newLanguage;
        
        // 直接更新DOM属性而不重新渲染
        if (contentRef.current) {
          contentRef.current.setAttribute('data-language', newLanguage);
          contentRef.current.setAttribute('data-event-update', Date.now().toString());
        }
      }
    };
    
    // 添加事件监听器
    window.addEventListener('app:languageChange', handleLanguageChange);
    document.addEventListener('languageChanged', handleLanguageChange);
    
    return () => {
      window.removeEventListener('app:languageChange', handleLanguageChange);
      document.removeEventListener('languageChanged', handleLanguageChange);
    };
  }, []);
  
  // 当路由变化时优化页面切换
  useEffect(() => {
    // 使用一个新的key强制组件更新，但保留动画平滑
    setContentKey(`content-${Math.random().toString(36).substring(2, 7)}-${location.pathname.split('/').pop() || 'dashboard'}`);
  }, [location.key]);
  
  // 为Outlet/children使用稳定的备忘录以避免重新渲染
  const contentElement = React.useMemo(() => {
    return children || <Outlet />;
  }, [children]);

  return (
    <div 
      className="min-h-screen flex w-full bg-charcoal overflow-visible relative" 
      ref={contentRef}
      data-language={languageRef.current}
      key={`${layoutKey.current}`}
    >
      {/* 增强背景层与现代设计 */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {/* 木炭基础 */}
        <div className="absolute inset-0 bg-gradient-to-br from-charcoal to-charcoal-dark"></div>
        
        {/* 网格图案覆盖 */}
        <div className="absolute inset-0 bg-grid-white/[0.03] [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
        
        {/* 微妙的噪声纹理 */}
        <div className="absolute inset-0 opacity-[0.04] [background-image:url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]"></div>
        
        {/* 改进的渐变光晕与微妙动画 */}
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[30rem] h-[30rem] bg-purple-600/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[30rem] h-[30rem] bg-purple-800/5 rounded-full blur-3xl opacity-70"></div>
        <div className="absolute top-3/4 right-1/4 -translate-y-1/2 w-[20rem] h-[20rem] bg-blue-900/5 rounded-full blur-3xl opacity-50"></div>
        
        {/* 额外强调 */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent"></div>
      </div>
      
      {/* 主布局 */}
      <div className="relative z-10 flex w-full h-screen overflow-visible">
        <AdminSidebar />
        <div className="flex-1 flex flex-col h-screen overflow-auto">
          <DashboardHeader className="flex-shrink-0" />
          <main className="flex-1 overflow-auto p-6">
            <ErrorBoundary>
              <TranslationWrapper>
                <div 
                  ref={outletRef} 
                  className="transition-opacity duration-200 ease-in-out"
                  key={contentKey}
                >
                  {contentElement}
                </div>
              </TranslationWrapper>
            </ErrorBoundary>
          </main>
        </div>
      </div>
    </div>
  );
};

// 使用React.memo防止不必要的重新渲染
const DashboardContent_Memoized = React.memo(DashboardContent);

const DashboardLayout = (props: DashboardLayoutProps) => {
  return (
    <LanguageProvider>
      <SidebarProvider defaultState="expanded">
        <DashboardContent_Memoized {...props} />
        <HreflangTags />
      </SidebarProvider>
    </LanguageProvider>
  );
};

export default React.memo(DashboardLayout);
