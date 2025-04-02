
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
  
  return (
    <div className="relative flex-1">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-purple-400 pointer-events-none" />
      <Input
        type="text"
        placeholder={language === "zh-CN" ? "搜索任务" : language === "zh-TW" ? "搜尋任務" : language === "fr" ? "Rechercher des Tâches" : language === "es" ? "Buscar Tareas" : "Search Tasks"}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="pl-10 bg-purple-950/70 border-purple-700/50 text-white placeholder-purple-300/70 w-full text-sm focus:border-purple-500/70 focus:ring-purple-500/30 transition-all duration-200"
      />
    </div>
  );
};

export default TaskSearchInput;
