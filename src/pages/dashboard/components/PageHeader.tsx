
import React from "react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

const PageHeader = ({ title, subtitle }: PageHeaderProps) => {
  return (
    <div className="mb-6">
      <div className="flex items-center mb-2">
        <div className="w-1.5 h-8 bg-purple-500 rounded-full mr-3"></div>
        <h1 className="text-2xl font-bold tracking-tight text-white">{title}</h1>
      </div>
      {subtitle && <p className="text-blue-300/80 ml-5">{subtitle}</p>}
    </div>
  );
};

export default PageHeader;
