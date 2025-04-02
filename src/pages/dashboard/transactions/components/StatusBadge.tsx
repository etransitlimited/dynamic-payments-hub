
import React from "react";
import { Badge } from "@/components/ui/badge";
import TranslatedText from "@/components/translation/TranslatedText";
import { useSafeTranslation } from "@/hooks/use-safe-translation";

interface StatusBadgeProps {
  status: "completed" | "pending" | "failed";
  className?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className }) => {
  const { language } = useSafeTranslation();
  
  const getStatusKey = (status: string): string => {
    return `transactions.status${status.charAt(0).toUpperCase() + status.slice(1)}`;
  };
  
  const statusStyles = {
    completed: "bg-green-500/20 text-green-400 border-green-500/50",
    pending: "bg-blue-500/20 text-blue-400 border-blue-500/50",
    failed: "bg-red-500/20 text-red-400 border-red-500/50",
  };
  
  // Enhanced width adjustment based on language for consistent badge sizes
  const getMinWidth = () => {
    if (language === 'fr') {
      return "min-w-[110px]"; // French needs more space for "En Attente"
    } else if (language === 'es') {
      return "min-w-[95px]"; // Spanish needs moderate space
    } else if (['zh-CN', 'zh-TW'].includes(language)) {
      return "min-w-[70px]"; // Chinese languages need less space
    }
    return "min-w-[85px]"; // Default for English
  };
  
  // Adjust font size based on language
  const getFontClass = () => {
    if (language === 'fr') {
      return 'text-[11px]'; // Smaller text for French (longer text)
    }
    return 'text-xs'; // Default size
  };
  
  return (
    <Badge 
      className={`px-2 py-1 capitalize border ${statusStyles[status]} ${getFontClass()} font-medium hover:bg-opacity-80 ${getMinWidth()} flex justify-center items-center ${className}`}
      variant="outline"
    >
      <TranslatedText 
        keyName={getStatusKey(status)} 
        fallback={status.charAt(0).toUpperCase() + status.slice(1)} 
        truncate
        maxLines={1}
      />
    </Badge>
  );
};

export default StatusBadge;
