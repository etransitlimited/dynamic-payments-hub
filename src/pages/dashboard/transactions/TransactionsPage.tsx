
import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import TransactionStatCards from "./components/TransactionStatCards";
import TransactionTable from "./components/TransactionTable";
import TransactionCharts from "./components/TransactionCharts";

const TransactionsPage = () => {
  const { t } = useLanguage();

  return (
    <div className="container mx-auto p-6 text-white">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">{t("transactions.title")}</h1>
        <p className="text-blue-300">{t("transactions.subtitle")}</p>
      </div>

      <TransactionStatCards />
      <TransactionTable />
      <TransactionCharts />
    </div>
  );
};

export default TransactionsPage;
