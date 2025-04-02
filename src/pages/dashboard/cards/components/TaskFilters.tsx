
import React from "react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter } from "lucide-react";
import TranslatedText from "@/components/translation/TranslatedText";

interface TaskFiltersProps {
  statusFilter: string;
  setStatusFilter: (status: string) => void;
}

const TaskFilters: React.FC<TaskFiltersProps> = ({ statusFilter, setStatusFilter }) => {
  return (
    <div className="flex items-center">
      <Select
        value={statusFilter}
        onValueChange={setStatusFilter}
      >
        <SelectTrigger className="w-[180px] bg-blue-950/80 border-blue-800/50 text-white hover:bg-blue-900/80 transition-colors relative">
          <div className="flex items-center gap-2 w-full">
            <Filter className="h-4 w-4 text-blue-400" />
            <SelectValue 
              placeholder={<TranslatedText keyName="cards.activationTasks.filterByStatus" fallback="Filter by Status" /> as any}
              className="text-sm font-medium flex-grow truncate" 
            />
          </div>
        </SelectTrigger>
        <SelectContent 
          className="bg-blue-900 border-blue-700 text-white z-[100]" 
          position="popper"
          sideOffset={4}
        >
          <SelectItem value="all" className="text-white focus:text-white focus:bg-blue-800 hover:bg-blue-800/70">
            <TranslatedText keyName="common.all" fallback="All" />
          </SelectItem>
          <SelectItem value="pending" className="text-white focus:text-white focus:bg-blue-800 hover:bg-blue-800/70">
            <TranslatedText keyName="cards.activationTasks.statusPending" fallback="Pending" />
          </SelectItem>
          <SelectItem value="completed" className="text-white focus:text-white focus:bg-blue-800 hover:bg-blue-800/70">
            <TranslatedText keyName="cards.activationTasks.statusCompleted" fallback="Completed" />
          </SelectItem>
          <SelectItem value="failed" className="text-white focus:text-white focus:bg-blue-800 hover:bg-blue-800/70">
            <TranslatedText keyName="cards.activationTasks.statusFailed" fallback="Failed" />
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default TaskFilters;
