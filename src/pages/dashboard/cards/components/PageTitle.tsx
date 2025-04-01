
import React from "react";

interface PageTitleProps {
  title: React.ReactNode;
}

const PageTitle = ({ title }: PageTitleProps) => {
  return (
    <h1 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center gap-2">
      {title}
    </h1>
  );
};

export default PageTitle;
