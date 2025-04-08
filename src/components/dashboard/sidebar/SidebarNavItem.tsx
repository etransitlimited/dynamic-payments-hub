
import React, { useRef, useEffect, useMemo, useCallback } from 'react';
import { LucideIcon } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useLanguage } from "@/context/LanguageContext";
import { LanguageCode } from '@/utils/languageUtils';
import { useSafeTranslation } from '@/hooks/use-safe-translation';
import { getDirectTranslation } from '@/utils/translationHelpers';

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
  
  const { name, path, icon: Icon, disabled, external, badge } = item;
  const { language } = useLanguage();
  const { refreshCounter } = useSafeTranslation();
  const languageRef = useRef<LanguageCode>(language as LanguageCode);
  const linkRef = useRef<HTMLAnchorElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const componentKey = useRef(`nav-item-${Math.random().toString(36).substring(2, 9)}`);
  const isInitializedRef = useRef(false);
  
  // Get translated name based on the current language
  const translatedName = useMemo(() => {
    // If the name looks like a translation key (contains dots)
    if (name && name.includes('.')) {
      return getDirectTranslation(name, languageRef.current, name);
    }
    return name;
  }, [name, language, refreshCounter]);
  
  // Initialize on mount
  useEffect(() => {
    if (!isInitializedRef.current) {
      isInitializedRef.current = true;
      if (linkRef.current) {
        linkRef.current.setAttribute('data-language', language);
        linkRef.current.setAttribute('data-initialized', 'true');
        
        // Update text content if needed
        if (textRef.current && translatedName) {
          textRef.current.textContent = translatedName;
        }
      }
    }
  }, [translatedName]);
  
  // Direct DOM updates for language changes
  useEffect(() => {
    if (language !== languageRef.current) {
      languageRef.current = language as LanguageCode;
      
      // Update data-language attribute on the component
      if (linkRef.current) {
        linkRef.current.setAttribute('data-language', language);
        linkRef.current.setAttribute('data-refresh', refreshCounter.toString());
        
        // Update text content directly for smoother transitions
        if (textRef.current && translatedName) {
          textRef.current.textContent = translatedName;
        }
      }
    }
  }, [language, refreshCounter, translatedName]);
  
  // Listen for language change events with stability improvements
  useEffect(() => {
    const handleLanguageChange = (e: Event) => {
      try {
        const customEvent = e as CustomEvent;
        const { language: newLanguage } = customEvent.detail || {};
        
        if (newLanguage && languageRef.current !== newLanguage) {
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
        console.error("Error in SidebarNavItem language change handler:", error);
      }
    };
    
    window.addEventListener('app:languageChange', handleLanguageChange);
    document.addEventListener('languageChanged', handleLanguageChange);
    
    return () => {
      window.removeEventListener('app:languageChange', handleLanguageChange);
      document.removeEventListener('languageChanged', handleLanguageChange);
    };
  }, [name]);
  
  // Determine appropriate link target
  const linkTarget = external ? '_blank' : undefined;
  const rel = external ? 'noopener noreferrer' : undefined;
  
  // Prepare class names for link
  const linkClassName = `
    flex items-center gap-x-2 py-2 px-3 rounded-md text-sm
    ${isActive 
      ? 'bg-gradient-to-r from-purple-600/30 to-purple-700/30 border border-purple-500/30 text-white font-medium' 
      : 'text-gray-400 hover:text-white hover:bg-charcoal-light/50'}
    ${disabled ? 'opacity-50 pointer-events-none' : ''}
    transition-colors duration-200
  `;
  
  // Badge styling
  const badgeClass = "ml-auto bg-indigo-600/30 text-xs py-0.5 px-1.5 rounded-full border border-indigo-500/30";

  // Generate a stable key that includes the refresh counter
  const stableItemKey = useMemo(() => 
    `${componentKey.current}-${refreshCounter}`, 
  [refreshCounter]);

  // Render the component with appropriate tooltip when collapsed
  return isCollapsed ? (
    <li key={stableItemKey}>
      <Tooltip>
        <TooltipTrigger asChild>
          <a
            href={disabled ? "#" : path}
            ref={linkRef}
            target={linkTarget}
            rel={rel}
            className={`${linkClassName} justify-center`}
            onClick={disabled ? (e) => e.preventDefault() : undefined}
            data-language={languageRef.current}
          >
            {Icon && <Icon size={18} />}
            {badge && <span className={badgeClass}>{badge}</span>}
          </a>
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
    </li>
  ) : (
    <li key={stableItemKey}>
      <a
        href={disabled ? "#" : path}
        ref={linkRef}
        target={linkTarget}
        rel={rel}
        className={linkClassName}
        onClick={disabled ? (e) => e.preventDefault() : undefined}
        data-language={languageRef.current}
      >
        {Icon && <Icon size={18} className="flex-shrink-0" />}
        <span ref={textRef} className="truncate">{translatedName}</span>
        {badge && <span className={badgeClass}>{badge}</span>}
      </a>
    </li>
  );
};

export default React.memo(SidebarNavItem);
