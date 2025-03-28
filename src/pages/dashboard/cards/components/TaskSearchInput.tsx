
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
      <Search className="absolute left-3 top-2.5 h-4 w-4 text-blue-500" />
      <Input
        type="text"
        placeholder={t("cards.activationTasks.searchTasks")}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="pl-10 bg-blue-950/70 border-blue-800/50 text-white placeholder-blue-300/60 w-full"
      />
    </div>
  );
};

export default TaskSearchInput;
