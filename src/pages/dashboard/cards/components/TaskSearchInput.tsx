
import React, { memo } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { getDirectTranslation } from "@/utils/translationHelpers";

interface TaskSearchInputProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const TaskSearchInput: React.FC<TaskSearchInputProps> = ({ searchTerm, setSearchTerm }) => {
  const { language, t } = useLanguage();
  
  // Get placeholder text using both methods for reliability
  const placeholderDirectTranslation = getDirectTranslation("search.placeholder", language, "Search Tasks");
  const placeholderFromContext = t("cards.activationTasks.searchTasks");
  
  // Use the context translation if available, otherwise fall back to direct translation
  const placeholderText = placeholderFromContext && placeholderFromContext !== "cards.activationTasks.searchTasks" 
    ? placeholderFromContext 
    : placeholderDirectTranslation;
  
  return (
    <div className="relative flex-1">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-purple-400 pointer-events-none" />
      <Input
        type="text"
        placeholder={placeholderText}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="pl-10 bg-purple-950/70 border-purple-700/50 text-white placeholder-purple-300/70 w-full text-sm focus:border-purple-500/70 focus:ring-purple-500/30 transition-all duration-200"
      />
    </div>
  );
};

// Memoize component to prevent unnecessary re-renders
export default memo(TaskSearchInput);
