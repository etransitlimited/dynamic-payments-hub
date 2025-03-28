
import React from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface TaskSearchInputProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const TaskSearchInput = ({ searchTerm, setSearchTerm }: TaskSearchInputProps) => {
  return (
    <div className="relative flex-1">
      <Search className="absolute left-3 top-2.5 h-4 w-4 text-blue-400" />
      <Input 
        placeholder="搜索任务ID或卡号" 
        className="pl-10 bg-[#061428]/70 border-blue-900/50 text-white placeholder-blue-300/40"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} 
      />
    </div>
  );
};

export default TaskSearchInput;
