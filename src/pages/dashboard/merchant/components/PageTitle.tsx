
import React from "react";
import TranslatedText from "@/components/translation/TranslatedText";

interface PageTitleProps {
  title: string;
}

const PageTitle = ({ title }: PageTitleProps) => {
  return (
    <h1 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center gap-2">
      <TranslatedText keyName={title} />
    </h1>
  );
};

export default PageTitle;
