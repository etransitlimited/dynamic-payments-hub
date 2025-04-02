
import React, { memo } from "react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter } from "lucide-react";
import { useSafeTranslation } from "@/hooks/use-safe-translation";
import { getDirectTranslation } from "@/utils/translationHelpers";

interface TaskFiltersProps {
  statusFilter: string;
  setStatusFilter: (status: string) => void;
}

const TaskFilters: React.FC<TaskFiltersProps> = ({ statusFilter, setStatusFilter }) => {
  const { language } = useSafeTranslation();
  
  // Direct access translations to avoid context update delays
  const filterPlaceholder = getDirectTranslation("filter.status", language, "Filter by Status");
  const allText = getDirectTranslation("filter.all", language, "All");
  const pendingText = getDirectTranslation("status.pending", language, "Pending");
  const completedText = getDirectTranslation("status.completed", language, "Completed");
  const failedText = getDirectTranslation("status.failed", language, "Failed");

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
              placeholder={filterPlaceholder}
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
            {allText}
          </SelectItem>
          <SelectItem value="pending" className="text-white focus:text-white focus:bg-blue-800 hover:bg-blue-800/70">
            {pendingText}
          </SelectItem>
          <SelectItem value="completed" className="text-white focus:text-white focus:bg-blue-800 hover:bg-blue-800/70">
            {completedText}
          </SelectItem>
          <SelectItem value="failed" className="text-white focus:text-white focus:bg-blue-800 hover:bg-blue-800/70">
            {failedText}
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

// Memoize component to prevent unnecessary re-renders 
export default memo(TaskFilters);
