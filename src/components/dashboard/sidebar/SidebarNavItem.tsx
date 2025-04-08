
import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

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
  isCollapsed?: boolean; // Add this prop for collapsible sidebar support
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
  
  // Determine if we should use a regular anchor or an internal link
  const LinkComponent = external ? 'a' : 'a';
  
  // Handle link props based on whether it's external or not
  const linkProps = external ? { href: path, target: '_blank', rel: 'noopener noreferrer' } : { href: path };
  
  // Create the navigation item content
  const itemContent = (
    <>
      {Icon && <Icon className="mr-2 h-4 w-4" />}
      {!isCollapsed && <span>{name}</span>}
      {!isCollapsed && badge && (
        <span className="ml-auto bg-purple-800 text-gray-100 text-xs px-2 py-0.5 rounded">
          {badge}
        </span>
      )}
    </>
  );
  
  // Apply tooltip when sidebar is collapsed
  if (isCollapsed) {
    return (
      <li>
        <Tooltip>
          <TooltipTrigger asChild>
            <LinkComponent
              {...linkProps}
              className={`flex items-center justify-center p-2 rounded-lg text-sm transition-colors ${
                isActive 
                  ? 'bg-gradient-to-r from-purple-700/30 to-purple-800/30 text-purple-100 shadow-sm' 
                  : 'text-gray-300 hover:text-white hover:bg-purple-900/20'
              } ${disabled ? 'cursor-not-allowed opacity-60' : ''}`}
              onClick={(e) => disabled && e.preventDefault()}
            >
              {Icon && <Icon className="h-4 w-4" />}
              {badge && (
                <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-purple-800 text-xs w-4 h-4 flex items-center justify-center rounded-full">
                  {badge}
                </span>
              )}
            </LinkComponent>
          </TooltipTrigger>
          <TooltipContent side="right" align="start" sideOffset={10} className="font-medium">
            {name}
          </TooltipContent>
        </Tooltip>
      </li>
    );
  }
  
  // Regular navigation item when not collapsed
  return (
    <li>
      <LinkComponent
        {...linkProps}
        className={`flex items-center px-3 py-2 rounded-lg text-sm transition-colors ${
          isActive 
            ? 'bg-gradient-to-r from-purple-700/30 to-purple-800/30 text-purple-100 shadow-sm' 
            : 'text-gray-300 hover:text-white hover:bg-purple-900/20'
        } ${disabled ? 'cursor-not-allowed opacity-60' : ''}`}
        onClick={(e) => disabled && e.preventDefault()}
      >
        {itemContent}
      </LinkComponent>
    </li>
  );
};

export default SidebarNavItem;
