
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Calendar, Filter } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface SearchBoxProps {
  onSearch: (query: string) => void;
  onDateFilter?: () => void;
}

const SearchBox = ({ onSearch, onDateFilter }: SearchBoxProps) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeFilters, setActiveFilters] = useState<string[]>(["本月"]);

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  const addFilter = (filter: string) => {
    if (!activeFilters.includes(filter)) {
      setActiveFilters([...activeFilters, filter]);
    }
  };

  const removeFilter = (filter: string) => {
    setActiveFilters(activeFilters.filter(f => f !== filter));
  };

  return (
    <Card className="bg-[#0F2643]/90 backdrop-blur-sm border-blue-900/50 shadow-lg shadow-blue-900/10 hover:shadow-[0_0_15px_rgba(0,243,255,0.15)] transition-all duration-300">
      <CardHeader className="pb-3">
        <CardTitle className="text-white flex items-center">
          <span className="bg-blue-500/20 p-2 rounded-full mr-2">
            <Search size={18} className="text-blue-400" />
          </span>
          查询条件
        </CardTitle>
        <CardDescription className="text-blue-200/80">
          输入时间范围或交易类型查询资金流水
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-blue-400 pointer-events-none" />
            <Input 
              placeholder="交易类型 / 交易号" 
              className="pl-10 bg-[#061428]/50 border-blue-900/50 text-white placeholder-blue-200/50"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button className="gap-2 bg-blue-600 hover:bg-blue-700" onClick={handleSearch}>
              <Search className="h-4 w-4" />
              <span>查询</span>
            </Button>
            <Button 
              variant="outline" 
              className="gap-2 border-blue-600/60 text-white hover:bg-blue-900/20"
              onClick={onDateFilter}
            >
              <Calendar className="h-4 w-4" />
              <span>选择日期</span>
            </Button>
          </div>
        </div>
        
        {/* Quick Filters */}
        <div className="mt-4">
          <div className="flex items-center mb-2">
            <Filter className="h-4 w-4 text-blue-400 mr-2" />
            <span className="text-sm text-blue-300">快速筛选：</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge 
              variant="outline" 
              className={`cursor-pointer ${activeFilters.includes('本月') ? 'bg-blue-600/30 border-blue-500' : 'bg-blue-900/20 border-blue-800/50'}`}
              onClick={() => activeFilters.includes('本月') ? removeFilter('本月') : addFilter('本月')}
            >
              本月
            </Badge>
            <Badge 
              variant="outline" 
              className={`cursor-pointer ${activeFilters.includes('上月') ? 'bg-blue-600/30 border-blue-500' : 'bg-blue-900/20 border-blue-800/50'}`}
              onClick={() => activeFilters.includes('上月') ? removeFilter('上月') : addFilter('上月')}
            >
              上月
            </Badge>
            <Badge 
              variant="outline" 
              className={`cursor-pointer ${activeFilters.includes('充值') ? 'bg-green-600/30 border-green-500' : 'bg-blue-900/20 border-blue-800/50'}`}
              onClick={() => activeFilters.includes('充值') ? removeFilter('充值') : addFilter('充值')}
            >
              充值
            </Badge>
            <Badge 
              variant="outline" 
              className={`cursor-pointer ${activeFilters.includes('支出') ? 'bg-red-600/30 border-red-500' : 'bg-blue-900/20 border-blue-800/50'}`}
              onClick={() => activeFilters.includes('支出') ? removeFilter('支出') : addFilter('支出')}
            >
              支出
            </Badge>
            <Badge 
              variant="outline" 
              className={`cursor-pointer ${activeFilters.includes('转账') ? 'bg-purple-600/30 border-purple-500' : 'bg-blue-900/20 border-blue-800/50'}`}
              onClick={() => activeFilters.includes('转账') ? removeFilter('转账') : addFilter('转账')}
            >
              转账
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SearchBox;
