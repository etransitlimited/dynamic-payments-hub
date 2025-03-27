
import React from "react";
import { Button } from "@/components/ui/button";
import { Filter, Download, RefreshCw, Calendar } from "lucide-react";

interface TableToolbarProps {
  onFilter: () => void;
  onExport: () => void;
  onRefresh: () => void;
}

const TableToolbar = ({ onFilter, onExport, onRefresh }: TableToolbarProps) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
      <div className="flex flex-wrap gap-2">
        <Button 
          variant="outline" 
          className="gap-2 border-blue-600/60 text-white hover:bg-blue-900/20"
          onClick={onFilter}
        >
          <Filter className="h-4 w-4" />
          <span className="sm:inline hidden">筛选</span>
        </Button>
        <Button 
          variant="outline" 
          className="gap-2 border-blue-600/60 text-white hover:bg-blue-900/20"
          onClick={onExport}
        >
          <Download className="h-4 w-4" />
          <span className="sm:inline hidden">导出</span>
        </Button>
        <Button 
          variant="outline" 
          className="gap-2 border-blue-600/60 text-white hover:bg-blue-900/20"
          onClick={onRefresh}
        >
          <RefreshCw className="h-4 w-4" />
          <span className="sm:inline hidden">刷新</span>
        </Button>
      </div>
      <div className="flex items-center text-sm text-blue-300">
        <Calendar className="h-4 w-4 mr-2" />
        <span>数据更新于: 2023-12-01 08:30</span>
      </div>
    </div>
  );
};

export default TableToolbar;
