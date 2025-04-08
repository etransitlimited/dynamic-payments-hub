
import React from 'react';
import { LucideIcon } from 'lucide-react';

export interface NavItem {
  name: string;
  path: string;
  icon: LucideIcon;
  disabled?: boolean;
  external?: boolean;
  badge?: string | number;
}

interface SidebarNavItemProps {
  item: NavItem;
  isActive?: boolean;
}

const SidebarNavItem: React.FC<SidebarNavItemProps> = ({
  item,
  isActive = false
}) => {
  const { name, path, icon: Icon, disabled, external, badge } = item;
  
  // Determine if we should use a regular anchor or an internal link
  const LinkComponent = external ? 'a' : 'a';
  
  // Handle link props based on whether it's external or not
  const linkProps = external ? { href: path, target: '_blank', rel: 'noopener noreferrer' } : { href: path };
  
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
        {Icon && <Icon className="mr-2 h-4 w-4" />}
        <span>{name}</span>
        {badge && (
          <span className="ml-auto bg-purple-800 text-gray-100 text-xs px-2 py-0.5 rounded">
            {badge}
          </span>
        )}
      </LinkComponent>
    </li>
  );
};

export default SidebarNavItem;
export type { NavItem };
