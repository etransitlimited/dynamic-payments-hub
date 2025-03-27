
import React from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const SearchBar = ({ searchQuery, setSearchQuery }: SearchBarProps) => {
  return (
    <div className="relative w-full sm:w-80">
      <Search className="absolute left-3 top-2.5 h-4 w-4 text-blue-400 pointer-events-none" />
      <Input
        type="text"
        placeholder="交易类型 / 交易号"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="pl-10 bg-[#061428]/50 border-blue-900/50 text-white placeholder-blue-200/50 w-full"
      />
    </div>
  );
};

export default SearchBar;
