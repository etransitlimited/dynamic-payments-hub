
import React from "react";
import { Button } from "@/components/ui/button";
import { Filter, CheckCircle2, XCircle, Clock } from "lucide-react";

interface TaskFiltersProps {
  statusFilter: string;
  setStatusFilter: (status: string) => void;
}

const TaskFilters = ({ statusFilter, setStatusFilter }: TaskFiltersProps) => {
  return (
    <div className="flex gap-2">
      <Button 
        variant="outline" 
        className={`flex items-center gap-1.5 border-blue-600/40 text-white ${statusFilter === 'all' ? 'bg-blue-600/20' : 'bg-transparent'}`}
        onClick={() => setStatusFilter("all")}
      >
        <Filter size={16} />
        全部
      </Button>
      <Button 
        variant="outline" 
        className={`flex items-center gap-1.5 border-green-600/40 text-white ${statusFilter === 'completed' ? 'bg-green-600/20' : 'bg-transparent'}`}
        onClick={() => setStatusFilter("completed")}
      >
        <CheckCircle2 size={16} />
        已完成
      </Button>
      <Button 
        variant="outline" 
        className={`flex items-center gap-1.5 border-yellow-600/40 text-white ${statusFilter === 'pending' ? 'bg-yellow-600/20' : 'bg-transparent'}`}
        onClick={() => setStatusFilter("pending")}
      >
        <Clock size={16} />
        处理中
      </Button>
      <Button 
        variant="outline" 
        className={`flex items-center gap-1.5 border-red-600/40 text-white ${statusFilter === 'failed' ? 'bg-red-600/20' : 'bg-transparent'}`}
        onClick={() => setStatusFilter("failed")}
      >
        <XCircle size={16} />
        失败
      </Button>
    </div>
  );
};

export default TaskFilters;
