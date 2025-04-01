
import React from "react";

interface PageHeaderProps {
  title: string;
  className?: string;
}

const PageHeader = ({ title, className }: PageHeaderProps) => {
  return (
    <div className="flex items-center mb-6">
      <div className="w-2 h-8 bg-purple-500 rounded-full mr-3"></div>
      <h1 className={`text-2xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-purple-200 to-purple-300 ${className || ''}`}>{title}</h1>
    </div>
  );
};

export default PageHeader;
