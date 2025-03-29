
import React from "react";

interface PageTitleProps {
  title: string;
}

const PageTitle = ({ title }: PageTitleProps) => {
  return (
    <div className="flex items-center mb-6">
      <div className="w-2 h-8 bg-purple-500 rounded-full mr-3"></div>
      <h1 className="text-2xl font-bold tracking-tight text-white">{title}</h1>
    </div>
  );
};

export default PageTitle;
