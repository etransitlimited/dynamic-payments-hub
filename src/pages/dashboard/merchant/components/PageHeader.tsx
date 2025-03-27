
import React from "react";

interface PageHeaderProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, description, children }) => {
  return (
    <div className="flex items-center mb-6">
      <div className="w-2 h-8 bg-blue-500 rounded-full mr-3"></div>
      <div className="flex-1">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold tracking-tight text-white">{title}</h1>
          {children && <span className="ml-2">{children}</span>}
        </div>
        {description && (
          <p className="text-sm text-blue-200/80 mt-1">{description}</p>
        )}
      </div>
    </div>
  );
};

export default PageHeader;
