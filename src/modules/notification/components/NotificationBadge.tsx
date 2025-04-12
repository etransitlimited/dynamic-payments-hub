
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface NotificationBadgeProps {
  count: number;
  className?: string;
}

const NotificationBadge: React.FC<NotificationBadgeProps> = ({ count, className }) => {
  if (count <= 0) return null;
  
  return (
    <Badge 
      className={cn(
        "bg-red-500 text-white text-xs font-semibold",
        count > 99 ? "px-1.5" : "px-2", 
        className
      )}
    >
      {count > 99 ? '99+' : count}
    </Badge>
  );
};

export default NotificationBadge;
