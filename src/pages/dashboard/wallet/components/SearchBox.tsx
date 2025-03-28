
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Calendar } from "lucide-react";

interface SearchBoxProps {
  onSearch: (query: string) => void;
  onDateFilter?: () => void;
  className?: string;
}

const SearchBox = ({ onSearch, onDateFilter, className = "" }: SearchBoxProps) => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  return (
    <Card className={`bg-gradient-to-br from-blue-900 to-blue-950 border-blue-900/50 shadow-lg shadow-blue-900/10 hover:shadow-[0_0_15px_rgba(0,243,255,0.15)] transition-all duration-300 ${className}`}>
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
      </CardContent>
    </Card>
  );
};

export default SearchBox;
