
import React from "react";
import { Button } from "@/components/ui/button";
import { Filter, Download, RefreshCw } from "lucide-react";
import { LanguageCode } from "@/utils/languageUtils";

interface TableToolbarProps {
  onFilter: () => void;
  onExport: () => void;
  onRefresh: () => void;
  currentLanguage: LanguageCode;
  getTranslation: (key: string) => string;
}

const TableToolbar: React.FC<TableToolbarProps> = ({ 
  onFilter, 
  onExport, 
  onRefresh,
  currentLanguage,
  getTranslation
}) => {
  return (
    <div className="flex justify-end space-x-2 mb-4" data-language={currentLanguage}>
      <Button
        variant="outline"
        size="sm"
        className="bg-charcoal-light hover:bg-charcoal-dark text-purple-200 border-purple-900/30"
        onClick={onFilter}
      >
        <Filter className="h-4 w-4 mr-2" />
        {getTranslation('filter')}
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="bg-charcoal-light hover:bg-charcoal-dark text-purple-200 border-purple-900/30"
        onClick={onExport}
      >
        <Download className="h-4 w-4 mr-2" />
        {getTranslation('export')}
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="bg-charcoal-light hover:bg-charcoal-dark text-purple-200 border-purple-900/30"
        onClick={onRefresh}
      >
        <RefreshCw className="h-4 w-4 mr-2" />
        {getTranslation('refresh')}
      </Button>
    </div>
  );
};

export default TableToolbar;
