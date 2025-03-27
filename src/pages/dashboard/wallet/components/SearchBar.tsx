
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, Download, RefreshCw } from "lucide-react";

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const SearchBar = ({ searchQuery, setSearchQuery }: SearchBarProps) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
      <div className="flex gap-2 w-full max-w-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-blue-400 pointer-events-none" />
          <Input 
            placeholder="交易号 / 订单号" 
            className="bg-[#061428] border-blue-900/50 text-white placeholder-blue-300/40 pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" className="gap-2 border-blue-600/60 text-white hover:bg-blue-900/20">
          <Search className="h-4 w-4" />
          <span>查询</span>
        </Button>
      </div>
      
      <div className="flex flex-wrap gap-2">
        <Button variant="outline" className="gap-2 border-blue-600/60 text-white hover:bg-blue-900/20">
          <Filter className="h-4 w-4" />
          <span className="sm:inline hidden">筛选</span>
        </Button>
        <Button variant="outline" className="gap-2 border-blue-600/60 text-white hover:bg-blue-900/20">
          <Download className="h-4 w-4" />
          <span className="sm:inline hidden">导出</span>
        </Button>
        <Button variant="outline" className="gap-2 border-blue-600/60 text-white hover:bg-blue-900/20">
          <RefreshCw className="h-4 w-4" />
          <span className="sm:inline hidden">刷新</span>
        </Button>
      </div>
    </div>
  );
};

export default SearchBar;
