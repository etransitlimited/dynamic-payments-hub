
import React from "react";
import { motion } from "framer-motion";
import SearchBox from "./SearchBox";

interface SearchSectionProps {
  searchQuery: string;
  handleSearch: (query: string) => void;
}

const SearchSection: React.FC<SearchSectionProps> = ({ searchQuery, handleSearch }) => {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 }
    }
  };

  return (
    <motion.div 
      variants={itemVariants}
      className="w-full bg-gradient-to-br from-purple-900/40 to-charcoal-dark rounded-xl border border-purple-900/30 overflow-hidden relative"
    >
      <div className="absolute inset-0 bg-grid-white/[0.02] [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
      <div className="absolute top-0 right-0 w-40 h-40 bg-purple-600/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-purple-800/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4"></div>
      
      <div className="relative z-10 p-6">
        <SearchBox 
          onSearch={handleSearch}
          onDateFilter={() => console.log("Date filter clicked")}
          initialSearchQuery={searchQuery}
        />
      </div>
    </motion.div>
  );
};

export default SearchSection;
