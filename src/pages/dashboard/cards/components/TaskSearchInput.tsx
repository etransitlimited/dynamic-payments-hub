
import React from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface TaskSearchInputProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const TaskSearchInput: React.FC<TaskSearchInputProps> = ({ searchTerm, setSearchTerm }) => {
  const { t } = useLanguage();
  
  return (
    <div className="relative flex-1">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-400 pointer-events-none" />
      <Input
        type="text"
        placeholder={t("cards.activationTasks.searchTasks")}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="pl-10 bg-blue-950/70 border-blue-800/50 text-white placeholder-blue-300/70 w-full text-sm focus:border-blue-500/70 focus:ring-blue-500/30 transition-all duration-200"
      />
    </div>
  );
};

export default TaskSearchInput;
