
import React, { memo } from "react";
import { Button } from "@/components/ui/button";
import { Filter, FileDown, RefreshCw } from "lucide-react";
import { LanguageCode } from "@/utils/languageUtils";

interface TableToolbarProps {
  onFilter: () => void;
  onExport: () => void;
  onRefresh: () => void;
  currentLanguage: LanguageCode;
  getTranslation: (key: string) => string;
}

const TableToolbar: React.FC<TableToolbarProps> = memo(({
  onFilter,
  onExport,
  onRefresh,
  currentLanguage,
  getTranslation
}) => {
  return (
    <div 
      className="flex flex-wrap justify-end gap-2 mb-4"
      data-language={currentLanguage}
    >
      <Button
        variant="outline"
        size="sm"
        className="text-xs text-white bg-purple-900/30 border-purple-500/20 hover:bg-purple-700/30"
        onClick={onFilter}
      >
        <Filter className="h-3 w-3 mr-1" />
        {getTranslation('filter')}
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="text-xs text-white bg-purple-900/30 border-purple-500/20 hover:bg-purple-700/30"
        onClick={onExport}
      >
        <FileDown className="h-3 w-3 mr-1" />
        {getTranslation('export')}
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="text-xs text-white bg-purple-900/30 border-purple-500/20 hover:bg-purple-700/30"
        onClick={onRefresh}
      >
        <RefreshCw className="h-3 w-3 mr-1" />
        {getTranslation('refresh')}
      </Button>
    </div>
  );
});

TableToolbar.displayName = "TableToolbar";

export default TableToolbar;
