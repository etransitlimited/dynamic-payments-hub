
import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRightCircle } from "lucide-react";

export type NavItem = {
  path: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  isActive?: boolean;
};

interface PageNavigationProps {
  items: NavItem[];
  layout?: 'horizontal' | 'vertical';
  className?: string;
}

/**
 * PageNavigation component
 * Provides consistent navigation between related pages
 * Used for card sections, wallet sections, etc.
 */
const PageNavigation: React.FC<PageNavigationProps> = ({ 
  items, 
  layout = 'horizontal',
  className = '' 
}) => {
  const navigate = useNavigate();
  
  const gridClass = layout === 'horizontal' 
    ? 'grid grid-cols-1 md:grid-cols-3 gap-4' 
    : 'grid grid-cols-1 gap-4';
    
  return (
    <div className={`${gridClass} mb-6 ${className}`}>
      {items.map((item, index) => {
        // Determine card styling based on active state
        const cardClasses = item.isActive 
          ? "border-purple-800/40 bg-purple-950/30" 
          : "border-blue-800/40 bg-blue-950/30 hover:bg-blue-900/30 cursor-pointer";
          
        return (
          <Card 
            key={`nav-item-${index}`}
            className={`transition-colors ${cardClasses}`}
            onClick={() => !item.isActive && navigate(item.path)}
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center text-blue-100">
                {item.icon}
                {item.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0 pb-2 flex justify-between items-center">
              <span className="text-xs text-blue-300">{item.subtitle}</span>
              {!item.isActive && <ArrowRightCircle className="h-4 w-4 text-blue-400" />}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default PageNavigation;
