
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, Download, RefreshCw } from "lucide-react";

interface RebateSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const RebateSearch = ({ searchQuery, setSearchQuery }: RebateSearchProps) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
      <div className="flex gap-2 w-full max-w-sm">
        <Input 
          placeholder="用户名/交易号" 
          className="bg-[#061428] border-blue-900/50 text-white placeholder-blue-300/40 focus:border-blue-500/50 focus:ring-blue-500/20"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button variant="outline" className="gap-2 border-blue-600/60 text-white hover:bg-blue-600/20 transition-colors">
          <Search className="h-4 w-4" />
          <span>查询</span>
        </Button>
      </div>
      
      <div className="flex gap-2">
        <Button variant="outline" className="gap-2 border-blue-600/60 text-white hover:bg-blue-600/20 transition-colors">
          <Filter className="h-4 w-4" />
          <span className="hidden sm:inline">筛选</span>
        </Button>
        <Button variant="outline" className="gap-2 border-blue-600/60 text-white hover:bg-blue-600/20 transition-colors">
          <Download className="h-4 w-4" />
          <span className="hidden sm:inline">导出</span>
        </Button>
        <Button variant="outline" className="gap-2 border-blue-600/60 text-white hover:bg-blue-600/20 transition-colors">
          <RefreshCw className="h-4 w-4" />
          <span className="hidden sm:inline">刷新</span>
        </Button>
      </div>
    </div>
  );
};

export default RebateSearch;
