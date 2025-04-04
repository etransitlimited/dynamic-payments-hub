
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { usePageLanguage } from "@/hooks/use-page-language";
import TasksTable from "./components/TasksTable";
import TaskSearchInput from "./components/TaskSearchInput";
import TaskFilters from "./components/TaskFilters";
import PageTitle from "./components/PageTitle";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, Eye, ArrowRightCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Task } from "./types";

const CardActivationTasksPage: React.FC = () => {
  const { language, forceUpdateKey, getTranslation } = usePageLanguage("cards.activation.title", "Card Activation Tasks");
  const navigate = useNavigate();
  
  // Get translations
  const pageTitle = getTranslation("cards.activation.title", "Card Activation Tasks");
  const pageSubtitle = getTranslation("cards.activation.subtitle", "Manage and monitor your card activation tasks");
  
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isLoading, setIsLoading] = useState(true);
  
  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
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
      
      {/* Card Management Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">
        <Card className="border-blue-800/40 bg-blue-950/30 hover:bg-blue-900/30 transition-colors cursor-pointer"
              onClick={() => navigate('/dashboard/cards/search')}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center text-blue-100">
              <CreditCard className="h-4 w-4 mr-2 text-blue-400" />
              {getTranslation("cards.search.title", "Card Search")}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 pb-2 flex justify-between items-center">
            <span className="text-xs text-blue-300">{getTranslation("cards.search.cardSearchResults", "Manage your cards")}</span>
            <ArrowRightCircle className="h-4 w-4 text-blue-400" />
          </CardContent>
        </Card>
        
        <Card className="border-purple-800/40 bg-purple-950/30 hover:bg-purple-900/30 transition-colors cursor-pointer"
              onClick={() => navigate('/dashboard/cards/apply')}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center text-purple-100">
              <CreditCard className="h-4 w-4 mr-2 text-purple-400" />
              {getTranslation("cards.apply.title", "Apply for Card")}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 pb-2 flex justify-between items-center">
            <span className="text-xs text-purple-300">{getTranslation("cards.apply.subtitle", "Apply for a new card")}</span>
            <ArrowRightCircle className="h-4 w-4 text-purple-400" />
          </CardContent>
        </Card>
        
        <Card className="border-green-800/40 bg-green-950/30 hover:bg-green-900/30 transition-colors">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center text-green-100">
              <Eye className="h-4 w-4 mr-2 text-green-400" />
              {getTranslation("cards.activationTasks.taskStatus", "Task Status")}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 pb-2 flex justify-between items-center">
            <div className="flex space-x-2">
              <span className="px-2 py-0.5 rounded-full text-xs bg-yellow-500/20 text-yellow-300 border border-yellow-400/20">
                {pendingTasks} {getTranslation("cards.activationTasks.statusPending", "Pending")}
              </span>
              <span className="px-2 py-0.5 rounded-full text-xs bg-green-500/20 text-green-300 border border-green-400/20">
                {completedTasks} {getTranslation("cards.activationTasks.statusCompleted", "Completed")}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
      
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
            onClick={() => navigate('/dashboard/account/management')}
          >
            {getTranslation("accountManagement.accountManagement", "Account Management")}
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default CardActivationTasksPage;
