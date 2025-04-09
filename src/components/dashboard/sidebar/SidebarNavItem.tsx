
import React, { useRef, useEffect, useMemo, useState } from 'react';
import { LucideIcon } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useLanguage } from "@/context/LanguageContext";
import { LanguageCode } from '@/utils/languageUtils';
import { useSafeTranslation } from '@/hooks/use-safe-translation';
import { getDirectTranslation } from '@/utils/translationHelpers';
import { Link, useLocation } from 'react-router-dom';

// Define the NavItem interface
export interface NavItem {
  name: string;
  translatedName?: string; // Add directly translated name
  path: string;
  icon: LucideIcon;
  disabled?: boolean;
  external?: boolean;
  badge?: string | number;
  key?: string; // Added for language keying
}

// Define the props for the SidebarNavItem component
interface SidebarNavItemProps {
  item: NavItem;
  isActive?: boolean;
  isCollapsed?: boolean;
}

const SidebarNavItem: React.FC<SidebarNavItemProps> = ({
  item,
  isActive = false,
  isCollapsed = false
}) => {
  if (!item) {
    console.error("SidebarNavItem received undefined item");
    return null;
  }
  
  const location = useLocation();
  const { name, translatedName, path, icon: Icon, disabled, external, badge } = item;
  const { language } = useLanguage();
  const { t, refreshCounter } = useSafeTranslation();
  const [displayName, setDisplayName] = useState<string>(translatedName || name);
  const languageRef = useRef<LanguageCode>(language as LanguageCode);
  const linkRef = useRef<HTMLAnchorElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const componentKey = useRef(`nav-item-${Math.random().toString(36).substring(2, 9)}`);
  const prevLanguageRef = useRef<LanguageCode>(language as LanguageCode);
  const forceUpdateKey = useRef(0);
  const isMountedRef = useRef(true);
  const initialSetupDone = useRef(false);
  const currentPathRef = useRef(path);
  const forceRenderCounter = useRef(0);
  
  // Debug logging for item
  useEffect(() => {
    console.log(`SidebarNavItem [${name}] mounted/updated, path: ${path}, language: ${language}, refreshCounter: ${refreshCounter}`);
    
    // Force initial translation display
    if (!initialSetupDone.current) {
      initialSetupDone.current = true;
      handleNameTranslation();
    }
    
    return () => {
      console.log(`SidebarNavItem [${name}] unmounting`);
    };
  }, [name, path]);
  
  // Auto-detect active state based on current path
  const autoDetectActive = useMemo(() => {
    if (isActive !== undefined) return isActive;
    
    // Special case for dashboard (exact match)
    if (path === '/dashboard' && location.pathname === '/dashboard') {
      return true;
    }
    
    // Special case for wallet paths
    if (path.includes('/wallet/') && location.pathname.includes('/wallet/')) {
      const pathSegment = path.split('/').filter(Boolean).pop();
      const locationSegment = location.pathname.split('/').filter(Boolean).pop();
      
      // Handle specific cases like deposit-records matching depositRecords in translations
      if (pathSegment === 'deposit-records' && locationSegment === 'deposit-records') {
        return true;
      }
      
      return location.pathname.startsWith(path);
    }
    
    // For other paths, check if current path starts with the item path
    // But only if path is not just a base path like /dashboard
    if (path !== '/dashboard' && path.length > 1) {
      return location.pathname.startsWith(path);
    }
    
    return false;
  }, [path, location.pathname, isActive]);
  
  // Component lifecycle management
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);
  
  // Function to handle translation of the menu item name
  const handleNameTranslation = () => {
    if (!isMountedRef.current) return;
    
    // Special case for wallet deposit records path
    if (path.includes('/wallet/deposit-records')) {
      // Hard-coded translations for critical navigation items
      const walletDepositRecordsTranslations: Record<LanguageCode, string> = {
        'en': 'Deposit Records',
        'es': 'Registros de Depósito',
        'fr': 'Registres de Dépôt',
        'zh-CN': '充值记录',
        'zh-TW': '充值記錄'
      };
      
      const translation = walletDepositRecordsTranslations[language as LanguageCode] || 'Deposit Records';
      setDisplayName(translation);
      
      // Force immediate DOM update
      if (textRef.current) {
        textRef.current.textContent = translation;
        textRef.current.setAttribute('data-updated', Date.now().toString());
        textRef.current.setAttribute('data-display', translation);
      }
      
      console.log(`SidebarNavItem [${name}] deposit-records special case: ${translation}`);
      return;
    }
    
    // First check if translatedName is provided directly
    if (translatedName) {
      setDisplayName(translatedName);
      if (textRef.current) {
        textRef.current.textContent = translatedName;
      }
      return;
    }
    
    // Then check if the name looks like a translation key (contains dots)
    if (name && name.includes('.')) {
      // Force bypass cache to get fresh translation
      const translated = getDirectTranslation(name, language as LanguageCode, name, false);
      if (translated !== name) {
        setDisplayName(translated);
        
        // Update DOM directly
        if (textRef.current) {
          textRef.current.textContent = translated;
          textRef.current.setAttribute('data-translated-key', name);
          textRef.current.setAttribute('data-translation', translated);
        }
        return;
      }
    }
    
    // Fallback
    setDisplayName(name);
    if (textRef.current) {
      textRef.current.textContent = name;
    }
  };
  
  // Update displayed name when language changes
  useEffect(() => {
    if (!isMountedRef.current) return;
    
    // If language changed, force a re-render with new key
    if (language !== prevLanguageRef.current || refreshCounter > 0) {
      console.log(`SidebarNavItem [${name}] language changed: ${prevLanguageRef.current} -> ${language} (refresh: ${refreshCounter})`);
      prevLanguageRef.current = language as LanguageCode;
      forceUpdateKey.current += 1;
      handleNameTranslation();
    }
  }, [name, translatedName, language, refreshCounter]);
  
  // Direct DOM manipulation for immediate visual feedback on language change
  useEffect(() => {
    if (!isMountedRef.current) return;
    
    if (language !== languageRef.current || forceUpdateKey.current > 0) {
      languageRef.current = language as LanguageCode;
      
      // Update DOM attributes
      if (linkRef.current) {
        linkRef.current.setAttribute('data-language', language);
        linkRef.current.setAttribute('data-refresh', refreshCounter.toString());
        linkRef.current.setAttribute('data-force-update', forceUpdateKey.current.toString());
        linkRef.current.setAttribute('data-name', name);
        linkRef.current.setAttribute('data-display', displayName);
      }
    }
  }, [language, displayName, refreshCounter, name]);
  
  // Force update on location change for active state
  useEffect(() => {
    if (!isMountedRef.current) return;
    
    // Check if we need to update active state
    if (currentPathRef.current !== location.pathname) {
      currentPathRef.current = location.pathname;
      forceRenderCounter.current += 1;
      
      // Update active state visually
      if (linkRef.current) {
        linkRef.current.setAttribute('data-active', autoDetectActive.toString());
        linkRef.current.setAttribute('data-counter', forceRenderCounter.current.toString());
      }
    }
  }, [location.pathname, autoDetectActive]);
  
  // Listen for global language change events
  useEffect(() => {
    if (!isMountedRef.current) return;
    
    const handleLanguageChange = (e: Event) => {
      if (!isMountedRef.current) return;
      
      const customEvent = e as CustomEvent;
      const { language: newLanguage } = customEvent.detail || {};
      
      if (newLanguage && newLanguage !== languageRef.current) {
        console.log(`SidebarNavItem [${name}] detected language event: ${languageRef.current} -> ${newLanguage}`);
        languageRef.current = newLanguage as LanguageCode;
        forceUpdateKey.current += 1;
        
        // Force immediate translation update
        if (name && name.includes('.')) {
          const newTranslation = getDirectTranslation(name, newLanguage as LanguageCode, name, false);
          
          // Force immediate visual feedback
          if (textRef.current) {
            textRef.current.textContent = newTranslation;
            textRef.current.setAttribute('data-event-updated', Date.now().toString());
            textRef.current.setAttribute('data-translation', newTranslation);
          }
          
          if (linkRef.current) {
            linkRef.current.setAttribute('data-language', newLanguage);
            linkRef.current.setAttribute('data-event-update', Date.now().toString());
          }
        }
      }
    };
    
    window.addEventListener('app:languageChange', handleLanguageChange);
    document.addEventListener('languageChanged', handleLanguageChange);
    
    return () => {
      window.removeEventListener('app:languageChange', handleLanguageChange);
      document.removeEventListener('languageChanged', handleLanguageChange);
    };
  }, [name, translatedName]);
  
  // Prepare class names for link
  const linkClassName = `
    flex items-center gap-x-2 py-2 px-3 rounded-md text-sm
    ${autoDetectActive 
      ? 'bg-gradient-to-r from-purple-600/30 to-purple-700/30 border border-purple-500/30 text-white font-medium' 
      : 'text-gray-400 hover:text-white hover:bg-charcoal-light/50'}
    ${disabled ? 'opacity-50 pointer-events-none' : ''}
    transition-colors duration-200
  `;
  
  // Badge styling
  const badgeClass = "ml-auto bg-indigo-600/30 text-xs py-0.5 px-1.5 rounded-full border border-indigo-500/30";

  // Generate a stable key that includes language and force update counter
  const stableItemKey = `${componentKey.current}-${language}-${forceUpdateKey.current}-${refreshCounter}-${forceRenderCounter.current}`;

  // Create link element based on external flag
  const linkElement = external ? (
    <a
      href={disabled ? "#" : path}
      ref={linkRef}
      target="_blank"
      rel="noopener noreferrer"
      className={isCollapsed ? `${linkClassName} justify-center` : linkClassName}
      onClick={disabled ? (e) => e.preventDefault() : undefined}
      data-language={language}
      data-path={path}
      data-active={autoDetectActive}
      key={`link-${stableItemKey}`}
    >
      {Icon && <Icon size={18} className="flex-shrink-0" />}
      {!isCollapsed && <span ref={textRef} className="truncate" data-text={displayName} data-lang={language}>{displayName}</span>}
      {badge && <span className={badgeClass}>{badge}</span>}
    </a>
  ) : (
    <Link
      to={disabled ? "#" : path}
      ref={linkRef as React.RefObject<HTMLAnchorElement>}
      className={isCollapsed ? `${linkClassName} justify-center` : linkClassName}
      onClick={disabled ? (e) => e.preventDefault() : undefined}
      data-language={language}
      data-path={path}
      data-active={autoDetectActive}
      key={`link-${stableItemKey}`}
    >
      {Icon && <Icon size={18} className="flex-shrink-0" />}
      {!isCollapsed && <span ref={textRef} className="truncate" data-text={displayName} data-lang={language}>{displayName}</span>}
      {badge && <span className={badgeClass}>{badge}</span>}
    </Link>
  );

  // Render the component with appropriate tooltip when collapsed
  return (
    <li key={stableItemKey} data-item-name={name} data-language={language} data-display={displayName}>
      {isCollapsed ? (
        <Tooltip>
          <TooltipTrigger asChild>
            {linkElement}
          </TooltipTrigger>
          <TooltipContent 
            side="right" 
            sideOffset={10} 
            align="start" 
            avoidCollisions={false}
            className="font-medium z-[99999]"
          >
            {displayName}
          </TooltipContent>
        </Tooltip>
      ) : (
        linkElement
      )}
    </li>
  );
};

export default React.memo(SidebarNavItem);
