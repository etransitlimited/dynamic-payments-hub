
import React, { useCallback, useRef, useEffect, useMemo } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSafeTranslation } from "@/hooks/use-safe-translation";
import SidebarNavGroup from "./sidebar/SidebarNavGroup";
import SidebarQuickAccess from "./sidebar/SidebarQuickAccess";
import SidebarLogo from "./sidebar/SidebarLogo";
import { getNavigationGroups, getQuickAccessItems } from "./sidebar/sidebarConfig";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageCode } from "@/utils/languageUtils";
import { useLocation, useNavigate } from "react-router-dom";

const AdminSidebar = () => {
  const { t, language, refreshCounter, refreshTranslations } = useSafeTranslation();
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";
  const languageRef = useRef<LanguageCode>(language as LanguageCode);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const stableKey = useRef(`sidebar-${Math.random().toString(36).substring(2, 9)}`);
  const prevLanguageRef = useRef<LanguageCode>(language as LanguageCode);
  const forceUpdateKey = useRef(0);
  const location = useLocation();
  const navigate = useNavigate();
  const previousPathRef = useRef(location.pathname);
  
  // 优化：确保侧边栏使用客户端路由，不导致全页面闪烁
  useEffect(() => {
    const sidebarContainer = sidebarRef.current;
    if (!sidebarContainer) return;
    
    // 拦截所有链接点击，使用React Router导航
    const handleSidebarNavigation = (e: MouseEvent) => {
      // 获取被点击的链接元素
      const target = e.target as HTMLElement;
      const linkElement = target.closest('a[href]');
      
      if (!linkElement || !linkElement.getAttribute('href')) return;
      
      const href = linkElement.getAttribute('href');
      
      // 忽略外部链接和锚点链接
      if (href === '#' || href?.startsWith('http')) return;
      
      // 阻止已激活链接的点击
      if (linkElement.getAttribute('data-active') === 'true') {
        e.preventDefault();
        e.stopPropagation();
        return;
      }
      
      // 阻止默认行为，使用客户端路由
      e.preventDefault();
      e.stopPropagation();
      
      // 添加视觉反馈 - 点击效果
      linkElement.classList.add('sidebar-link-clicked');
      setTimeout(() => {
        linkElement.classList.remove('sidebar-link-clicked');
      }, 500);
      
      // 使用 React Router 导航
      if (href) {
        // 添加页面切换类，提供视觉反馈
        document.querySelector('main')?.classList.add('page-transitioning');
        
        // 导航到新路径
        navigate(href);
        
        // 300ms后移除过渡效果类
        setTimeout(() => {
          document.querySelector('main')?.classList.remove('page-transitioning');
        }, 300);
      }
    };
    
    // 捕获阶段拦截点击事件，确保尽早处理
    sidebarContainer.addEventListener('click', handleSidebarNavigation, true);
    
    return () => {
      sidebarContainer.removeEventListener('click', handleSidebarNavigation, true);
    };
  }, [navigate]);
  
  // 路径变化检测，更新活动状态
  useEffect(() => {
    if (location.pathname !== previousPathRef.current) {
      previousPathRef.current = location.pathname;
      
      // 直接更新DOM属性，标记活动项
      document.querySelectorAll('[data-sidebar="menu-button"]').forEach(button => {
        const link = button.querySelector('a');
        if (!link || !link.getAttribute('href')) return;
        
        const href = link.getAttribute('href');
        const isActive = location.pathname === href || 
                         (location.pathname.startsWith(href!) && href !== '/');
        
        if (isActive) {
          button.setAttribute('data-active', 'true');
          link.setAttribute('data-active', 'true');
        } else {
          button.removeAttribute('data-active');
          link.removeAttribute('data-active');
        }
      });
    }
  }, [location.pathname]);
  
  // 语言变化监听
  useEffect(() => {
    if (language !== prevLanguageRef.current) {
      prevLanguageRef.current = language as LanguageCode;
      
      // 刷新翻译
      refreshTranslations();

      // 更新forceUpdateKey强制重渲染
      forceUpdateKey.current += 1;
      
      // 手动更新DOM属性以提供即时视觉反馈
      if (sidebarRef.current) {
        sidebarRef.current.setAttribute('data-language', language);
        sidebarRef.current.setAttribute('data-refresh', Date.now().toString());
        sidebarRef.current.setAttribute('data-force-update', forceUpdateKey.current.toString());
      }
      
      // 强制所有侧边栏项目更新
      document.querySelectorAll('[data-sidebar="menu-button"]').forEach(el => {
        el.setAttribute('data-language-update', language);
        el.setAttribute('data-refresh', Date.now().toString());
      });
    }
  }, [language, refreshTranslations]);

  // 监听语言变化事件
  useEffect(() => {
    const handleLanguageChange = (e: Event) => {
      const customEvent = e as CustomEvent;
      const { language: newLanguage } = customEvent.detail || {};
      
      if (newLanguage && languageRef.current !== newLanguage) {
        languageRef.current = newLanguage as LanguageCode;
        
        // 更新DOM属性以提供即时反馈
        if (sidebarRef.current) {
          sidebarRef.current.setAttribute('data-language', newLanguage);
          sidebarRef.current.setAttribute('data-event', Date.now().toString());
        }
        
        // 强制刷新
        refreshTranslations();
        
        // 更新forceUpdateKey强制重渲染
        forceUpdateKey.current += 1;
      }
    };
    
    window.addEventListener('app:languageChange', handleLanguageChange);
    document.addEventListener('languageChanged', handleLanguageChange);
    
    return () => {
      window.removeEventListener('app:languageChange', handleLanguageChange);
      document.removeEventListener('languageChanged', handleLanguageChange);
    };
  }, [refreshTranslations]);

  // 使用记忆化防止不必要的重新计算
  const navigationItems = useMemo(() => {
    return {
      quickAccessItems: getQuickAccessItems(t),
      navigationGroups: getNavigationGroups(t)
    };
  }, [t, language, refreshCounter, forceUpdateKey.current]);

  return (
    <TooltipProvider delayDuration={0}>
      <Sidebar 
        className="border-r border-indigo-900/30 bg-gradient-to-b from-[#1a1a2e] to-[#16162b] z-40 transition-all duration-300 ease-in-out" 
        collapsible="icon"
        ref={sidebarRef}
        data-language={language}
      >
        <SidebarHeader className="flex justify-center items-center border-b border-indigo-900/30 py-5 flex-shrink-0 bg-[#1A1F2C]/90 relative overflow-hidden">
          {/* 微妙的背景图案 */}
          <div className="absolute inset-0 bg-grid-white/[0.03] [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:20px_20px]"></div>
          {/* 微妙的渐变叠加 */}
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/20 to-purple-900/10"></div>
          
          <div className="relative z-10">
            <SidebarLogo isCollapsed={isCollapsed} />
          </div>
        </SidebarHeader>

        <ScrollArea className="h-[calc(100vh-80px)] bg-transparent">
          <SidebarContent className="pt-4 px-2">
            {/* 快速访问菜单 */}
            <SidebarQuickAccess 
              items={navigationItems.quickAccessItems} 
              isCollapsed={isCollapsed} 
            />
            
            <SidebarSeparator className="bg-indigo-900/30 my-3" />
            
            {/* 主导航 */}
            <div className="space-y-5 mt-4">
              {navigationItems.navigationGroups.map((navGroup) => (
                <SidebarNavGroup
                  key={`${navGroup.section}`}
                  section={navGroup.section}
                  icon={navGroup.icon}
                  items={navGroup.items}
                  isCollapsed={isCollapsed}
                />
              ))}
            </div>
          </SidebarContent>
        </ScrollArea>
      </Sidebar>
    </TooltipProvider>
  );
};

export default React.memo(AdminSidebar);
