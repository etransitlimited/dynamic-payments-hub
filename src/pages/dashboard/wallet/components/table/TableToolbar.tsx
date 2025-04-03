
import React from "react";
import { Button } from "@/components/ui/button";
import { Filter, Download, RefreshCw } from "lucide-react";

interface TableToolbarProps {
  onFilter: () => void;
  onExport: () => void;
  onRefresh: () => void;
  currentLanguage: string;
  getTranslation?: (key: string) => string;
}

const TableToolbar: React.FC<TableToolbarProps> = ({ 
  onFilter, 
  onExport, 
  onRefresh, 
  currentLanguage,
  getTranslation 
}) => {
  // Use either direct translation or fallback texts
  const filterText = getTranslation ? getTranslation('filter') : 'Filter';
  const exportText = getTranslation ? getTranslation('export') : 'Export';
  const refreshText = getTranslation ? getTranslation('refresh') : 'Refresh';

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
      <div className="flex flex-wrap gap-2">
        <Button 
          variant="outline" 
          className="gap-2 bg-purple-900/30 border-purple-500/30 text-purple-200 hover:bg-purple-800/40 transition-all duration-300"
          onClick={onFilter}
          key={`filter-btn-${currentLanguage}`}
        >
          <Filter className="h-4 w-4" />
          <span>{filterText}</span>
        </Button>
        <Button 
          variant="outline" 
          className="gap-2 bg-purple-900/30 border-purple-500/30 text-purple-200 hover:bg-purple-800/40 transition-all duration-300"
          onClick={onExport}
          key={`export-btn-${currentLanguage}`}
        >
          <Download className="h-4 w-4" />
          <span>{exportText}</span>
        </Button>
        <Button 
          variant="outline" 
          className="gap-2 bg-purple-900/30 border-purple-500/30 text-purple-200 hover:bg-purple-800/40 transition-all duration-300"
          onClick={onRefresh}
          key={`refresh-btn-${currentLanguage}`}
        >
          <RefreshCw className="h-4 w-4" />
          <span>{refreshText}</span>
        </Button>
      </div>
    </div>
  );
};

export default TableToolbar;
