
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
import { useSafeTranslation } from "@/hooks/use-safe-translation";

interface TaskFiltersProps {
  statusFilter: string;
  setStatusFilter: (status: string) => void;
}

const TaskFilters: React.FC<TaskFiltersProps> = ({ statusFilter, setStatusFilter }) => {
  const { language } = useSafeTranslation();
  
  // Direct translations for better reliability
  const getFilterPlaceholder = () => {
    switch (language) {
      case 'zh-CN': return '按状态筛选';
      case 'zh-TW': return '按狀態篩選';
      case 'fr': return 'Filtrer par Statut';
      case 'es': return 'Filtrar por Estado';
      default: return 'Filter by Status';
    }
  };
  
  const getAllText = () => {
    switch (language) {
      case 'zh-CN': return '全部';
      case 'zh-TW': return '全部';
      case 'fr': return 'Tous';
      case 'es': return 'Todos';
      default: return 'All';
    }
  };
  
  const getPendingText = () => {
    switch (language) {
      case 'zh-CN': return '待处理';
      case 'zh-TW': return '待處理';
      case 'fr': return 'En Attente';
      case 'es': return 'Pendiente';
      default: return 'Pending';
    }
  };
  
  const getCompletedText = () => {
    switch (language) {
      case 'zh-CN': return '已完成';
      case 'zh-TW': return '已完成';
      case 'fr': return 'Terminée';
      case 'es': return 'Completada';
      default: return 'Completed';
    }
  };
  
  const getFailedText = () => {
    switch (language) {
      case 'zh-CN': return '失败';
      case 'zh-TW': return '失敗';
      case 'fr': return 'Échouée';
      case 'es': return 'Fallida';
      default: return 'Failed';
    }
  };

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
              placeholder={getFilterPlaceholder()}
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
            {getAllText()}
          </SelectItem>
          <SelectItem value="pending" className="text-white focus:text-white focus:bg-blue-800 hover:bg-blue-800/70">
            {getPendingText()}
          </SelectItem>
          <SelectItem value="completed" className="text-white focus:text-white focus:bg-blue-800 hover:bg-blue-800/70">
            {getCompletedText()}
          </SelectItem>
          <SelectItem value="failed" className="text-white focus:text-white focus:bg-blue-800 hover:bg-blue-800/70">
            {getFailedText()}
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default TaskFilters;
