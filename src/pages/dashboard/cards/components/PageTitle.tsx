
import React from "react";

interface PageTitleProps {
  title: React.ReactNode;
  subtitle?: string;
}

const PageTitle = ({ title, subtitle }: PageTitleProps) => {
  return (
    <div className="mb-6">
      <h1 className="text-2xl md:text-3xl font-bold text-white mb-2 flex items-center gap-2">
        {title}
      </h1>
      {subtitle && (
        <p className="text-gray-400">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default PageTitle;
