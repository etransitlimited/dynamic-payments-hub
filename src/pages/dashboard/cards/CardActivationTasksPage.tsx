
import React, { useState } from "react";
import { motion } from "framer-motion";
import { usePageLanguage } from "@/hooks/use-page-language";
import TasksTable from "./components/TasksTable";
import TaskSearchInput from "./components/TaskSearchInput";
import TaskFilters from "./components/TaskFilters";
import PageTitle from "./components/PageTitle";
import { Task } from "./types";

// Create interface for TaskFilters props
interface TaskFiltersProps {
  filterStatus: string;
  setFilterStatus: React.Dispatch<React.SetStateAction<string>>;
}

const CardActivationTasksPage: React.FC = () => {
  const { language, forceUpdateKey, getTranslation } = usePageLanguage("cards.activation.title", "Card Activation Tasks");
  
  // Get translations
  const pageTitle = getTranslation("cards.activation.title", "Card Activation Tasks");
  const pageSubtitle = getTranslation("cards.activation.subtitle", "Manage and monitor your card activation tasks");
  
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  
  // Sample data with correct status values
  const tasks: Task[] = [
    {
      id: "1",
      cardNumber: "**** **** **** 1234",
      cardType: "Visa Gold",
      task: "Activate Card",
      status: "pending",
      createdAt: "2023-09-15"
    },
    {
      id: "2",
      cardNumber: "**** **** **** 5678",
      cardType: "Mastercard",
      task: "Verify Identity",
      status: "completed",
      createdAt: "2023-09-14"
    },
    {
      id: "3",
      cardNumber: "**** **** **** 9012",
      cardType: "Visa Platinum",
      task: "Set PIN",
      status: "failed",
      createdAt: "2023-09-13"
    },
    {
      id: "4",
      cardNumber: "**** **** **** 3456",
      cardType: "Visa Classic",
      task: "Security Verification",
      status: "pending",
      createdAt: "2023-09-12"
    },
    {
      id: "5",
      cardNumber: "**** **** **** 7890",
      cardType: "Mastercard Gold",
      task: "Activate Card",
      status: "completed",
      createdAt: "2023-09-11"
    },
    {
      id: "6",
      cardNumber: "**** **** **** 1357",
      cardType: "Visa Gold",
      task: "Set PIN",
      status: "rejected",
      createdAt: "2023-09-10"
    }
  ];
  
  // Filter tasks based on search term and filter status
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = 
      task.cardNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.cardType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.task.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === "all" || task.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });
  
  return (
    <motion.div
      key={forceUpdateKey}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
      data-language={language}
    >
      <PageTitle 
        title={pageTitle}
        subtitle={pageSubtitle}
      />
      
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-3">
            <TaskSearchInput 
              searchTerm={searchTerm} 
              setSearchTerm={setSearchTerm} 
            />
          </div>
          <div className="md:col-span-1">
            <TaskFilters 
              filterStatus={filterStatus} 
              setFilterStatus={setFilterStatus} 
            />
          </div>
        </div>
        
        <TasksTable tasks={filteredTasks} />
      </div>
    </motion.div>
  );
};

export default CardActivationTasksPage;
