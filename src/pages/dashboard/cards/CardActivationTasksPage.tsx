
import React, { useState, useEffect } from "react";
import { usePageLanguage } from "@/hooks/use-page-language";
import TasksTable from "./components/TasksTable";
import TaskSearchInput from "./components/TaskSearchInput";
import TaskFilters from "./components/TaskFilters";
import { Button } from "@/components/ui/button";
import { Task } from "./types";
import PageLayout from "@/components/dashboard/PageLayout";
import { AnimatePresence, motion } from "framer-motion";

const CardActivationTasksPage: React.FC = () => {
  const { language, forceUpdateKey, getTranslation } = usePageLanguage("cards.activationTasks.title", "Card Activation Tasks");
  
  // Get translations
  const pageTitle = getTranslation("cards.activationTasks.title", "Card Activation Tasks");
  const pageSubtitle = getTranslation("cards.activationTasks.manageCardTasks", "Manage and monitor your card activation tasks");
  
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isLoading, setIsLoading] = useState(true);
  
  // Reduce loading time to minimize flickering
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);
  
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
    
    const matchesFilter = statusFilter === "all" || task.status === statusFilter;
    
    return matchesSearch && matchesFilter;
  });

  // Calculate statistics
  const pendingTasks = tasks.filter(task => task.status === "pending").length;
  const completedTasks = tasks.filter(task => task.status === "completed").length;
  
  // Animation variants
  const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, transition: { duration: 0.1 } }
  };
  
  return (
    <PageLayout
      animationKey={`activation-tasks-${language}`}
      title={pageTitle}
      subtitle={pageSubtitle}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={`activation-tasks-content-${language}`}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={pageVariants}
          className="space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-3">
              <TaskSearchInput 
                searchTerm={searchTerm} 
                setSearchTerm={setSearchTerm} 
              />
            </div>
            <div className="md:col-span-1">
              <TaskFilters 
                statusFilter={statusFilter} 
                setStatusFilter={setStatusFilter} 
              />
            </div>
          </div>
          
          <TasksTable tasks={filteredTasks} />
          
          <div className="flex justify-end mt-4">
            <Button 
              variant="outline" 
              className="text-sm bg-blue-900/30 border-blue-800/30 hover:bg-blue-800/50 text-blue-200"
            >
              {getTranslation("common.back", "Back")}
            </Button>
          </div>
        </motion.div>
      </AnimatePresence>
    </PageLayout>
  );
};

export default CardActivationTasksPage;
