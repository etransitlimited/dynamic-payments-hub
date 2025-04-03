
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { getDirectTranslation } from "@/utils/translationHelpers";
import CardSearchHeader from "./components/CardSearchHeader";
import TaskSearchInput from "./components/TaskSearchInput";
import TaskFilters from "./components/TaskFilters";
import TasksTable from "./components/TasksTable";
import { useLocation } from "react-router-dom";
import { Task } from "./types";

// Sample task data for demonstration
const sampleTasks: Task[] = [
  {
    id: "TSK001",
    cardNumber: "4567 **** **** 7890",
    cardType: "Visa Platinum",
    task: "Card Activation",
    status: "pending",
    createdAt: "2023-10-05"
  },
  {
    id: "TSK002",
    cardNumber: "5432 **** **** 1234",
    cardType: "Mastercard Gold",
    task: "PIN Reset",
    status: "completed",
    createdAt: "2023-10-03"
  },
  {
    id: "TSK003",
    cardNumber: "6789 **** **** 4321",
    cardType: "UnionPay Standard",
    task: "Card Activation",
    status: "failed",
    createdAt: "2023-10-01"
  }
];

const CardActivationTasksPage: React.FC = () => {
  const { language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [forceUpdateKey, setForceUpdateKey] = useState(`activation-tasks-${language}-${Date.now()}`);
  const location = useLocation();
  
  // Force re-render when language changes OR when navigating to this page
  useEffect(() => {
    console.log(`ActivationTasksPage detected language: ${language}, path: ${location.pathname}`);
    setForceUpdateKey(`activation-tasks-${language}-${Date.now()}`);
    
    // Update page title
    document.title = `${getDirectTranslation("cards.activationTasks.title", language, "Activation Tasks")} | Dashboard`;
  }, [language, location.pathname]);

  // Get translations
  const pageTitle = getDirectTranslation("cards.activationTasks.title", language, "Activation Tasks");
  const pageSubtitle = getDirectTranslation("cards.activationTasks.manageCardTasks", language, "Manage your card activation tasks");

  // Filter tasks based on search term and status
  const filteredTasks = sampleTasks.filter(task => {
    const matchesSearch = 
      searchTerm === "" || 
      task.cardNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = 
      statusFilter === "all" || 
      task.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <motion.div
      key={forceUpdateKey}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
      data-language={language}
    >
      <CardSearchHeader 
        title={pageTitle}
        subtitle={pageSubtitle}
      />
      
      <div className="flex flex-col md:flex-row gap-4 items-start">
        <TaskSearchInput 
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm} 
        />
        
        <TaskFilters 
          statusFilter={statusFilter} 
          setStatusFilter={setStatusFilter} 
        />
      </div>
      
      <TasksTable tasks={filteredTasks} />
    </motion.div>
  );
};

export default CardActivationTasksPage;
