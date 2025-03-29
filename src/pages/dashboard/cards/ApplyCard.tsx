
import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import PageTitle from "./components/PageTitle";

const ApplyCard = () => {
  const { t } = useLanguage();
  
  return (
    <div className="space-y-6 container px-4 py-6 mx-auto">
      <PageTitle title={t("cards.search.title")} />
      
      <div className="text-white text-center py-10">
        {t("cards.search.cardSearchResults")}
      </div>
    </div>
  );
};

export default ApplyCard;
