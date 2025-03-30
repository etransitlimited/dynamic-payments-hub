
import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import TransactionStatCards from "./components/TransactionStatCards";
import TransactionTable from "./components/TransactionTable";
import TransactionCharts from "./components/TransactionCharts";
import PageHeader from "../components/PageHeader";

const TransactionsPage = () => {
  const { t } = useLanguage();

  return (
    <div className="container mx-auto p-6 text-white">
      <PageHeader title={t("transactions.title")} />
      
      <TransactionStatCards />
      <TransactionTable />
      <TransactionCharts />
    </div>
  );
};

export default TransactionsPage;
