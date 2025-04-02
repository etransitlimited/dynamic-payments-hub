
import React from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import TranslatedText from "@/components/translation/TranslatedText";
import { useSafeTranslation } from "@/hooks/use-safe-translation";

interface TaskSearchInputProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const TaskSearchInput: React.FC<TaskSearchInputProps> = ({ searchTerm, setSearchTerm }) => {
  const { language } = useSafeTranslation();
  
  // Helper function to get placeholder text based on language
  const getPlaceholderText = () => {
    switch (language) {
      case 'zh-CN': 
        return "搜索任务";
      case 'zh-TW': 
        return "搜尋任務";
      case 'fr': 
        return "Rechercher des Tâches";
      case 'es': 
        return "Buscar Tareas";
      default: 
        return "Search Tasks";
    }
  };
  
  return (
    <div className="relative flex-1">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-purple-400 pointer-events-none" />
      <Input
        type="text"
        placeholder={getPlaceholderText()}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="pl-10 bg-purple-950/70 border-purple-700/50 text-white placeholder-purple-300/70 w-full text-sm focus:border-purple-500/70 focus:ring-purple-500/30 transition-all duration-200"
      />
    </div>
  );
};

export default TaskSearchInput;
