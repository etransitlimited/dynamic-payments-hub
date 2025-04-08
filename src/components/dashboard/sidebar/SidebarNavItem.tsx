
import React, { useRef, useEffect } from 'react';
import { LucideIcon } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useLanguage } from "@/context/LanguageContext";
import { LanguageCode } from '@/utils/languageUtils';

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
  const languageRef = useRef<LanguageCode>(language as LanguageCode);
  const linkRef = useRef<HTMLAnchorElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const componentKey = useRef(`nav-item-${Math.random().toString(36).substring(2, 9)}`);
  
  // Direct DOM updates for language changes
  useEffect(() => {
    if (language !== languageRef.current) {
      languageRef.current = language as LanguageCode;
      
      // Update data-language attribute on the component
      if (linkRef.current) {
        linkRef.current.setAttribute('data-language', language);
      }
    }
  }, [language]);
  
  // Listen for language change events
  useEffect(() => {
    const handleLanguageChange = (e: Event) => {
      const customEvent = e as CustomEvent;
      const { language: newLanguage } = customEvent.detail || {};
      
      if (newLanguage && languageRef.current !== newLanguage) {
        languageRef.current = newLanguage as LanguageCode;
        
        // Update data-language attribute on the component
        if (linkRef.current) {
          linkRef.current.setAttribute('data-language', newLanguage);
        }
      }
    };
    
    window.addEventListener('app:languageChange', handleLanguageChange);
    document.addEventListener('languageChanged', handleLanguageChange);
    
    return () => {
      window.removeEventListener('app:languageChange', handleLanguageChange);
      document.removeEventListener('languageChanged', handleLanguageChange);
    };
  }, []);
  
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

  // Render the component with appropriate tooltip when collapsed
  return isCollapsed ? (
    <li key={componentKey.current}>
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
          {name}
        </TooltipContent>
      </Tooltip>
    </li>
  ) : (
    <li key={componentKey.current}>
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
        <span ref={textRef} className="truncate">{name}</span>
        {badge && <span className={badgeClass}>{badge}</span>}
      </a>
    </li>
  );
};

export default React.memo(SidebarNavItem);
