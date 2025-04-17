
import React, { useEffect, useRef, useState } from "react";
import { LucideIcon } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import { useLanguage } from "@/context/LanguageContext";
import { LanguageCode } from "@/utils/languageUtils";
import { getDirectTranslation } from "@/utils/translationHelpers";
import { useSafeTranslation } from "@/hooks/use-safe-translation";
import { navigationTranslations } from "./sidebarConfig";
import { safeNavigate, getLanguagePrefixedPath } from "@/utils/authNavigationUtils";

export interface NavItem {
  icon?: LucideIcon;
  name: string;
  url?: string;
  translationKey?: string;
  translatedName?: string;
  badge?: string | number;
  key?: string;
  group?: string;
}

export interface SidebarNavItemProps {
  item: NavItem;
  isCollapsed: boolean;
}

// 获取项目翻译的辅助函数
const getMenuItemTranslation = (item: NavItem, language: LanguageCode): string => {
  // 特殊处理通知项目
  if (item.name === 'notifications' || item.name.includes('notification') || (item.url && item.url.includes('notification'))) {
    const notificationKey = 'notification.title';
    const translated = getDirectTranslation(notificationKey, language, item.name);
    if (translated && translated !== notificationKey) {
      return translated;
    }
  }
  
  // 1. 如果有predefined翻译名称则直接使用
  if (item.translatedName) {
    return item.translatedName;
  }
  
  // 2. 尝试使用translationKey（如果有）
  if (item.translationKey) {
    // 处理交易项目
    if (item.translationKey.startsWith('transactions.')) {
      const key = item.translationKey;
      const translated = getDirectTranslation(key, language, item.name);
      if (translated && translated !== key) {
        return translated;
      }
    }
    
    const translated = getDirectTranslation(item.translationKey, language, item.name);
    if (translated && translated !== item.translationKey) {
      return translated;
    }
  }
  
  // 3. 检查项目名称是否为navigationTranslations对象的路径
  const nameParts = item.name.split('.');
  if (nameParts.length > 1) {
    // 尝试遍历navigationTranslations对象
    try {
      let result: any = navigationTranslations;
      for (let i = 0; i < nameParts.length; i++) {
        const part = nameParts[i];
        if (!result[part]) break;
        result = result[part];
      }
      
      // 如果找到带有语言键的匹配翻译对象
      if (result && typeof result === 'object' && language in result) {
        return result[language];
      }
    } catch (e) {
      console.log(`Translation traversal failed for ${item.name}:`, e);
    }
  }
  
  // 4. 尝试直接在navigationTranslations中查找键
  const pathKey = item.name.replace(/^sidebar\./, '');
  const pathParts = pathKey.split('.');
  
  // 处理嵌套翻译对象
  if (pathParts.length >= 2) {
    const section = pathParts[0];
    const subKey = pathParts[1];
    
    if (
      navigationTranslations[section as keyof typeof navigationTranslations] && 
      typeof navigationTranslations[section as keyof typeof navigationTranslations] === 'object'
    ) {
      const sectionObj = navigationTranslations[section as keyof typeof navigationTranslations] as any;
      
      if (sectionObj[subKey] && typeof sectionObj[subKey] === 'object' && language in sectionObj[subKey]) {
        return sectionObj[subKey][language];
      }
    }
  }
  
  // 5. 特殊情况：交易
  if (item.name.startsWith('transactions.')) {
    const key = item.name;
    const translated = getDirectTranslation(key, language, item.name);
    if (translated !== key) {
      return translated;
    }
  }
  
  // 6. 某些模式的完整路径方法
  if (item.name.startsWith('sidebar.')) {
    const key = item.name;
    const translated = getDirectTranslation(key, language, item.name);
    if (translated !== key) {
      return translated;
    }
  }
  
  // 7. 尝试使用命名空间键
  if (item.url && item.url.includes('/notifications')) {
    const notificationKey = 'notification.title';
    const translated = getDirectTranslation(notificationKey, language, 'Notifications');
    if (translated && translated !== notificationKey) {
      return translated;
    }
  }
  
  // 8. 回退到原始名称
  return item.name;
};

const SidebarNavItem = ({ item, isCollapsed }: SidebarNavItemProps) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { t, refreshCounter } = useSafeTranslation();
  const [displayName, setDisplayName] = useState<string>("");
  const [isActive, setIsActive] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const itemLinkRef = useRef<HTMLAnchorElement>(null);
  const itemRef = useRef<HTMLLIElement>(null);
  const lastLanguageRef = useRef<LanguageCode>(language as LanguageCode);
  const forceUpdateKey = useRef(0);
  
  // 为该组件实例生成一个固定ID
  const stableId = useRef(`nav-${Math.random().toString(36).slice(2, 9)}`);
  
  // 处理URL，确保包含语言前缀
  const getItemUrl = (): string => {
    if (!item.url) return '#';
    return getLanguagePrefixedPath(item.url, language as LanguageCode);
  };
  
  // 当语言变化时更新显示名称
  useEffect(() => {
    const translated = getMenuItemTranslation(item, language as LanguageCode);
    setDisplayName(translated);
    
    // 保存当前语言到ref
    lastLanguageRef.current = language as LanguageCode;
    
    // 更新DOM属性以获得视觉反馈
    if (itemRef.current) {
      itemRef.current.setAttribute('data-lang', language);
      itemRef.current.setAttribute('data-key', item.name);
      itemRef.current.setAttribute('data-text', translated);
    }
    
    // 如果语言变化则强制重新渲染
    if (language !== lastLanguageRef.current) {
      forceUpdateKey.current++;
    }
  }, [item, language, refreshCounter]);
  
  // 检查当前路径是否匹配此项目的URL
  useEffect(() => {
    // 实现更准确的路径匹配，考虑语言前缀
    const itemUrl = item.url ? getLanguagePrefixedPath(item.url) : '';
    
    // 比较路由路径部分，忽略语言前缀
    const routePart = pathname.replace(/^\/(en|zh-CN|zh-TW|fr|es)\//, '/');
    const itemRoutePart = itemUrl.replace(/^\/(en|zh-CN|zh-TW|fr|es)\//, '/');
    
    const isItemActive = itemRoutePart ? 
      routePart === itemRoutePart || 
      (routePart.startsWith(itemRoutePart) && itemRoutePart !== '/') : 
      false;
    
    setIsActive(isItemActive);
    
    // 为活动项目添加视觉反馈
    if (itemLinkRef.current) {
      if (isItemActive) {
        itemLinkRef.current.setAttribute('data-active', 'true');
      } else {
        itemLinkRef.current.removeAttribute('data-active');
      }
    }
    
    // 重置导航状态
    setIsNavigating(false);
  }, [pathname, item.url, language]);
  
  // 监听语言变化事件
  useEffect(() => {
    const handleLanguageChange = (e: Event) => {
      const customEvent = e as CustomEvent;
      const { language: newLanguage } = customEvent.detail || {};
      
      if (newLanguage && newLanguage !== lastLanguageRef.current) {
        lastLanguageRef.current = newLanguage as LanguageCode;
        
        // 获取更新的翻译
        const translated = getMenuItemTranslation(item, newLanguage as LanguageCode);
        
        // 更新状态
        setDisplayName(translated);
        
        // 直接更新DOM以获得即时反馈
        if (itemRef.current) {
          itemRef.current.setAttribute('data-lang', newLanguage);
          itemRef.current.setAttribute('data-text', translated);
        }
        
        // 也直接更新内容以获得即时更新
        const textElement = itemRef.current?.querySelector('[data-nav-item-text]');
        if (textElement) {
          textElement.textContent = translated;
        }
      }
    };
    
    window.addEventListener('app:languageChange', handleLanguageChange);
    document.addEventListener('languageChanged', handleLanguageChange);
    
    return () => {
      window.removeEventListener('app:languageChange', handleLanguageChange);
      document.removeEventListener('languageChanged', handleLanguageChange);
    };
  }, [item]);

  const Icon = item.icon;
  
  // 处理链接点击，使用React Router的navigate
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault(); // 阻止默认行为
    
    if (isActive || isNavigating || !item.url) {
      return;
    }
    
    // 标记导航正在进行中
    setIsNavigating(true);
    
    // 给用户视觉反馈
    if (itemRef.current) {
      itemRef.current.classList.add('opacity-80');
    }
    
    // 使用safeNavigate进行客户端路由导航（确保带有语言前缀）
    safeNavigate(navigate, item.url);
    
    // 短暂延迟后重置状态
    setTimeout(() => {
      setIsNavigating(false);
      if (itemRef.current) {
        itemRef.current.classList.remove('opacity-80');
      }
    }, 300);
  };

  return (
    <li 
      ref={itemRef} 
      className={`w-full ${isNavigating ? 'pointer-events-none' : ''} transition-opacity duration-150`}
      id={stableId.current} 
      data-sidebar="menu-item" 
      data-lang={language}
      data-key={item.name}
      data-text={displayName}
    >
      <SidebarMenuButton
        asChild
        isActive={isActive}
        className={cn(
          "flex w-full h-10 items-center gap-3 rounded-md px-3 py-2.5 transition-colors",
          "hover:bg-indigo-950/50 hover:text-indigo-200",
          "data-[active=true]:bg-indigo-900/60 data-[active=true]:text-indigo-100 data-[active=true]:font-medium",
          isCollapsed && "justify-center"
        )}
        data-sidebar="menu-button"
      >
        <a 
          href={getItemUrl()} 
          ref={itemLinkRef} 
          className="flex w-full items-center gap-3"
          data-active={isActive}
          onClick={handleClick}
        >
          {Icon && (
            <Icon className={cn(
              "h-4 w-4 flex-shrink-0", 
              isCollapsed && "w-5 h-5",
              isActive ? "text-indigo-200" : "text-slate-400"
            )} />
          )}
          
          {!isCollapsed && (
            <span className="truncate text-sm" data-nav-item-text>
              {displayName}
            </span>
          )}
          
          {!isCollapsed && item.badge && (
            <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-indigo-800/50 text-xs font-medium text-indigo-200">
              {item.badge}
            </span>
          )}
        </a>
      </SidebarMenuButton>
    </li>
  );
};

// 使用 React.memo 来避免不必要的重渲染
export default React.memo(SidebarNavItem);
