
import React from "react";
import { Button } from "@/components/ui/button";
import { Filter, Download, RefreshCw } from "lucide-react";
import TranslatedText from "@/components/translation/TranslatedText";

interface TableToolbarProps {
  onFilter: () => void;
  onExport: () => void;
  onRefresh: () => void;
  currentLanguage: string;
}

const TableToolbar: React.FC<TableToolbarProps> = ({ onFilter, onExport, onRefresh, currentLanguage }) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
      <div className="flex flex-wrap gap-2">
        <Button 
          variant="outline" 
          className="gap-2 bg-purple-900/30 border-purple-500/30 text-purple-200 hover:bg-purple-800/40 transition-all duration-300"
          onClick={onFilter}
        >
          <Filter className="h-4 w-4" />
          <span className="inline"><TranslatedText keyName="common.filter" fallback="Filter" key={`filter-${currentLanguage}`} /></span>
        </Button>
        <Button 
          variant="outline" 
          className="gap-2 bg-purple-900/30 border-purple-500/30 text-purple-200 hover:bg-purple-800/40 transition-all duration-300"
          onClick={onExport}
        >
          <Download className="h-4 w-4" />
          <span className="inline"><TranslatedText keyName="common.export" fallback="Export" key={`export-${currentLanguage}`} /></span>
        </Button>
        <Button 
          variant="outline" 
          className="gap-2 bg-purple-900/30 border-purple-500/30 text-purple-200 hover:bg-purple-800/40 transition-all duration-300"
          onClick={onRefresh}
        >
          <RefreshCw className="h-4 w-4" />
          <span className="inline"><TranslatedText keyName="common.refresh" fallback="Refresh" key={`refresh-${currentLanguage}`} /></span>
        </Button>
      </div>
    </div>
  );
};

export default TableToolbar;
