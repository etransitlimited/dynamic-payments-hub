
import React, { useRef, useEffect, useMemo, useCallback } from 'react';
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
  path: string;
  icon: LucideIcon;
  disabled?: boolean;
  external?: boolean;
  badge?: string | number;
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
  const { name, path, icon: Icon, disabled, external, badge } = item;
  const { language } = useLanguage();
  const { refreshCounter } = useSafeTranslation();
  const languageRef = useRef<LanguageCode>(language as LanguageCode);
  const linkRef = useRef<HTMLAnchorElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const componentKey = useRef(`nav-item-${Math.random().toString(36).substring(2, 9)}`);
  const isInitializedRef = useRef(false);
  
  // Auto-detect active state based on current path
  const autoDetectActive = useMemo(() => {
    if (isActive !== undefined) return isActive;
    
    // Special case for dashboard (exact match)
    if (path === '/dashboard' && location.pathname === '/dashboard') {
      return true;
    }
    
    // For other paths, check if current path starts with the item path
    // But only if path is not just a base path like /dashboard
    if (path !== '/dashboard' && path.length > 1) {
      return location.pathname.startsWith(path);
    }
    
    return false;
  }, [path, location.pathname, isActive]);
  
  // Get translated name based on the current language
  const translatedName = useMemo(() => {
    // If the name looks like a translation key (contains dots)
    if (name && name.includes('.')) {
      return getDirectTranslation(name, languageRef.current, name);
    }
    return name;
  }, [name, language, refreshCounter]);
  
  // Update text content directly when translation changes
  const updateTextContent = useCallback(() => {
    if (textRef.current && translatedName) {
      textRef.current.textContent = translatedName;
    }
  }, [translatedName]);
  
  // Initialize on mount
  useEffect(() => {
    if (!isInitializedRef.current) {
      isInitializedRef.current = true;
      if (linkRef.current) {
        linkRef.current.setAttribute('data-language', language);
        linkRef.current.setAttribute('data-initialized', 'true');
        updateTextContent();
      }
    }
  }, [translatedName, updateTextContent]);
  
  // Direct DOM updates for language changes
  useEffect(() => {
    if (language !== languageRef.current) {
      console.log(`SidebarNavItem ${name}: Language changed to ${language}`);
      languageRef.current = language as LanguageCode;
      
      // Update data-language attribute on the component
      if (linkRef.current) {
        linkRef.current.setAttribute('data-language', language);
        linkRef.current.setAttribute('data-refresh', refreshCounter.toString());
        updateTextContent();
      }
    }
  }, [language, refreshCounter, updateTextContent, name]);
  
  // Listen for language change events with stability improvements
  useEffect(() => {
    const handleLanguageChange = (e: Event) => {
      try {
        const customEvent = e as CustomEvent;
        const { language: newLanguage } = customEvent.detail || {};
        
        if (newLanguage && languageRef.current !== newLanguage) {
          console.log(`SidebarNavItem ${name}: Language event received: ${newLanguage}`);
          languageRef.current = newLanguage as LanguageCode;
          
          // Update data-language attribute on the component
          if (linkRef.current) {
            linkRef.current.setAttribute('data-language', newLanguage);
            linkRef.current.setAttribute('data-event-update', Date.now().toString());
            
            // Update text content directly
            const updatedName = name.includes('.') ? 
              getDirectTranslation(name, newLanguage as LanguageCode, name) : 
              name;
              
            if (textRef.current && updatedName) {
              textRef.current.textContent = updatedName;
            }
          }
        }
      } catch (error) {
        console.error(`SidebarNavItem ${name}: Error in language change handler:`, error);
      }
    };
    
    window.addEventListener('app:languageChange', handleLanguageChange);
    document.addEventListener('languageChanged', handleLanguageChange);
    
    return () => {
      window.removeEventListener('app:languageChange', handleLanguageChange);
      document.removeEventListener('languageChanged', handleLanguageChange);
    };
  }, [name]);
  
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

  // Generate a stable key that includes the refresh counter and language
  const stableItemKey = useMemo(() => 
    `${componentKey.current}-${refreshCounter}-${language}`, 
  [refreshCounter, language]);

  // Create link element based on external flag
  const linkElement = external ? (
    <a
      href={disabled ? "#" : path}
      ref={linkRef}
      target="_blank"
      rel="noopener noreferrer"
      className={isCollapsed ? `${linkClassName} justify-center` : linkClassName}
      onClick={disabled ? (e) => e.preventDefault() : undefined}
      data-language={languageRef.current}
      data-path={path}
      data-active={autoDetectActive}
    >
      {Icon && <Icon size={18} className="flex-shrink-0" />}
      {!isCollapsed && <span ref={textRef} className="truncate">{translatedName}</span>}
      {badge && <span className={badgeClass}>{badge}</span>}
    </a>
  ) : (
    <Link
      to={disabled ? "#" : path}
      ref={linkRef as React.RefObject<HTMLAnchorElement>}
      className={isCollapsed ? `${linkClassName} justify-center` : linkClassName}
      onClick={disabled ? (e) => e.preventDefault() : undefined}
      data-language={languageRef.current}
      data-path={path}
      data-active={autoDetectActive}
    >
      {Icon && <Icon size={18} className="flex-shrink-0" />}
      {!isCollapsed && <span ref={textRef} className="truncate">{translatedName}</span>}
      {badge && <span className={badgeClass}>{badge}</span>}
    </Link>
  );

  // Render the component with appropriate tooltip when collapsed
  return (
    <li key={stableItemKey} data-item-name={name}>
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
            {translatedName}
          </TooltipContent>
        </Tooltip>
      ) : (
        linkElement
      )}
    </li>
  );
};

export default React.memo(SidebarNavItem);
