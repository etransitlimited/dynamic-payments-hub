
import React from "react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

const PageHeader = ({ title, subtitle }: PageHeaderProps) => {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-semibold text-white mb-1">{title}</h1>
      {subtitle && <p className="text-blue-200">{subtitle}</p>}
    </div>
  );
};

export default PageHeader;
