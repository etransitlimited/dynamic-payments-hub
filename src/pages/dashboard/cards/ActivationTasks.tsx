
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, Download, RefreshCw, Clock, CheckCircle, XCircle, CreditCard } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import PageTitle from "./components/PageTitle";
import TaskSearchInput from "./components/TaskSearchInput";
import TaskFilters from "./components/TaskFilters";
import TasksTable from "./components/TasksTable";
import StatusBadge from "./components/StatusBadge";
import { motion } from "framer-motion";
import TranslatedText from "@/components/translation/TranslatedText";
import { Progress } from "@/components/ui/progress";
import { useSafeTranslation } from "@/hooks/use-safe-translation";

const ActivationTasks = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeStatus, setActiveStatus] = useState<string>("all");
  const { language } = useSafeTranslation();
  const [taskStats, setTaskStats] = useState({
    total: 35,
    pending: 18,
    approved: 12,
    rejected: 5
  });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 }
    }
  };

  useEffect(() => {
    console.log("ActivationTasks rendering with language:", language);
  }, [language]);

  // Helper function to get translated text based on language
  const getTranslatedText = (key: string, defaultText: string) => {
    switch (key) {
      case "title":
        return language === 'zh-CN' ? "开卡任务" : 
               language === 'zh-TW' ? "卡片激活任務" : 
               language === 'fr' ? "Tâches d'Activation" : 
               language === 'es' ? "Tareas de Activación" : 
               "Card Activation Tasks";
      
      case "totalTasks":
        return language === 'zh-CN' ? "总任务数" : 
               language === 'zh-TW' ? "總任務數" : 
               language === 'fr' ? "Tâches Totales" : 
               language === 'es' ? "Tareas Totales" : 
               "Total Tasks";
      
      case "pendingTasks":
        return language === 'zh-CN' ? "待处理任务" : 
               language === 'zh-TW' ? "待處理任務" : 
               language === 'fr' ? "Tâches en Attente" : 
               language === 'es' ? "Tareas Pendientes" : 
               "Pending Tasks";
      
      case "approvedTasks":
        return language === 'zh-CN' ? "已批准任务" : 
               language === 'zh-TW' ? "已批准任務" : 
               language === 'fr' ? "Tâches Approuvées" : 
               language === 'es' ? "Tareas Aprobadas" : 
               "Approved Tasks";
      
      case "rejectedTasks":
        return language === 'zh-CN' ? "已拒绝任务" : 
               language === 'zh-TW' ? "已拒絕任務" : 
               language === 'fr' ? "Tâches Rejetées" : 
               language === 'es' ? "Tareas Rechazadas" : 
               "Rejected Tasks";
      
      case "searchCriteria":
        return language === 'zh-CN' ? "搜索条件" : 
               language === 'zh-TW' ? "搜尋條件" : 
               language === 'fr' ? "Critères de Recherche" : 
               language === 'es' ? "Criterios de Búsqueda" : 
               "Search Criteria";
      
      case "enterTaskInfo":
        return language === 'zh-CN' ? "输入卡号或申请人姓名进行搜索" : 
               language === 'zh-TW' ? "輸入卡號或申請人姓名進行搜尋" : 
               language === 'fr' ? "Entrez le numéro de carte ou le nom du demandeur pour rechercher" : 
               language === 'es' ? "Ingrese el número de tarjeta o el nombre del solicitante para buscar" : 
               "Enter card number or applicant name to search";
      
      case "cardOrApplicant":
        return language === 'zh-CN' ? "卡号或申请人" : 
               language === 'zh-TW' ? "卡號或申請人" : 
               language === 'fr' ? "Carte ou Demandeur" : 
               language === 'es' ? "Tarjeta o Solicitante" : 
               "Card Number or Applicant";
      
      case "search":
        return language === 'zh-CN' ? "搜索" : 
               language === 'zh-TW' ? "搜尋" : 
               language === 'fr' ? "Rechercher" : 
               language === 'es' ? "Buscar" : 
               "Search";
      
      case "allTasks":
        return language === 'zh-CN' ? "所有任务" : 
               language === 'zh-TW' ? "所有任務" : 
               language === 'fr' ? "Toutes les Tâches" : 
               language === 'es' ? "Todas las Tareas" : 
               "All Tasks";
      
      case "pending":
        return language === 'zh-CN' ? "待处理" : 
               language === 'zh-TW' ? "待處理" : 
               language === 'fr' ? "En Attente" : 
               language === 'es' ? "Pendiente" : 
               "Pending";
      
      case "completed":
        return language === 'zh-CN' ? "已完成" : 
               language === 'zh-TW' ? "已完成" : 
               language === 'fr' ? "Terminée" : 
               language === 'es' ? "Completada" : 
               "Completed";
      
      case "rejected":
        return language === 'zh-CN' ? "已拒绝" : 
               language === 'zh-TW' ? "已拒絕" : 
               language === 'fr' ? "Rejetée" : 
               language === 'es' ? "Rechazada" : 
               "Rejected";
      
      case "taskList":
        return language === 'zh-CN' ? "任务列表" : 
               language === 'zh-TW' ? "任務列表" : 
               language === 'fr' ? "Liste des Tâches" : 
               language === 'es' ? "Lista de Tareas" : 
               "Tasks List";
      
      case "searchResults":
        return language === 'zh-CN' ? "搜索结果" : 
               language === 'zh-TW' ? "搜尋結果" : 
               language === 'fr' ? "Résultats de Recherche" : 
               language === 'es' ? "Resultados de Búsqueda" : 
               "Search Results";
      
      case "filter":
        return language === 'zh-CN' ? "筛选" : 
               language === 'zh-TW' ? "篩選" : 
               language === 'fr' ? "Filtrer" : 
               language === 'es' ? "Filtrar" : 
               "Filter";
      
      case "export":
        return language === 'zh-CN' ? "导出" : 
               language === 'zh-TW' ? "匯出" : 
               language === 'fr' ? "Exporter" : 
               language === 'es' ? "Exportar" : 
               "Export";
      
      case "refresh":
        return language === 'zh-CN' ? "刷新" : 
               language === 'zh-TW' ? "重新整理" : 
               language === 'fr' ? "Actualiser" : 
               language === 'es' ? "Actualizar" : 
               "Refresh";
      
      case "id":
        return language === 'zh-CN' ? "ID" : 
               language === 'zh-TW' ? "ID" : 
               language === 'fr' ? "ID" : 
               language === 'es' ? "ID" : 
               "ID";
      
      case "cardNumber":
        return language === 'zh-CN' ? "卡号" : 
               language === 'zh-TW' ? "卡號" : 
               language === 'fr' ? "Numéro de Carte" : 
               language === 'es' ? "Número de Tarjeta" : 
               "Card Number";
      
      case "applicant":
        return language === 'zh-CN' ? "申请人" : 
               language === 'zh-TW' ? "申請人" : 
               language === 'fr' ? "Demandeur" : 
               language === 'es' ? "Solicitante" : 
               "Applicant";
      
      case "applicationDate":
        return language === 'zh-CN' ? "申请日期" : 
               language === 'zh-TW' ? "申請日期" : 
               language === 'fr' ? "Date de Demande" : 
               language === 'es' ? "Fecha de Solicitud" : 
               "Application Date";
      
      case "status":
        return language === 'zh-CN' ? "状态" : 
               language === 'zh-TW' ? "狀態" : 
               language === 'fr' ? "Statut" : 
               language === 'es' ? "Estado" : 
               "Status";
      
      case "actions":
        return language === 'zh-CN' ? "操作" : 
               language === 'zh-TW' ? "操作" : 
               language === 'fr' ? "Actions" : 
               language === 'es' ? "Acciones" : 
               "Actions";
      
      case "statusPending":
        return language === 'zh-CN' ? "待处理" : 
               language === 'zh-TW' ? "待處理" : 
               language === 'fr' ? "En Attente" : 
               language === 'es' ? "Pendiente" : 
               "Pending";
      
      case "statusApproved":
        return language === 'zh-CN' ? "已批准" : 
               language === 'zh-TW' ? "已批准" : 
               language === 'fr' ? "Approuvée" : 
               language === 'es' ? "Aprobada" : 
               "Approved";
      
      case "statusRejected":
        return language === 'zh-CN' ? "已拒绝" : 
               language === 'zh-TW' ? "已拒絕" : 
               language === 'fr' ? "Rejetée" : 
               language === 'es' ? "Rechazada" : 
               "Rejected";
      
      case "viewDetails":
        return language === 'zh-CN' ? "查看详情" : 
               language === 'zh-TW' ? "查看詳情" : 
               language === 'fr' ? "Voir les Détails" : 
               language === 'es' ? "Ver Detalles" : 
               "View Details";
      
      case "taskSearchResults":
        return language === 'zh-CN' ? "卡片激活任务搜索结果" : 
               language === 'zh-TW' ? "卡片激活任務搜尋結果" : 
               language === 'fr' ? "Résultats de Recherche de Tâches d'Activation de Carte" : 
               language === 'es' ? "Resultados de Búsqueda de Tareas de Activación de Tarjeta" : 
               "Card Activation Task Search Results";
      
      default:
        return defaultText;
    }
  };

  const renderRadialProgress = (value: number, max: number, color: string) => {
    const percentage = (value / max) * 100;
    return (
      <div className="relative h-24 w-24 mx-auto">
        {/* Background circle */}
        <div className="absolute inset-0 rounded-full bg-charcoal-dark/60 border border-purple-900/20"></div>
        
        {/* Progress circle with gradient */}
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100">
          <circle 
            cx="50" 
            cy="50" 
            r="40" 
            fill="none" 
            stroke="rgba(30, 30, 45, 0.6)" 
            strokeWidth="8"
          />
          <circle 
            cx="50" 
            cy="50" 
            r="40" 
            fill="none" 
            stroke={color} 
            strokeWidth="8"
            strokeDasharray="251.2"
            strokeDashoffset={251.2 - (percentage * 251.2 / 100)}
            strokeLinecap="round"
            transform="rotate(-90 50 50)"
            className="drop-shadow-[0_0_3px_rgba(255,255,255,0.3)]"
          />
        </svg>
        
        {/* Inner content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl font-bold text-white">{value}</div>
            <div className="text-xs text-white/70">/ {max}</div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="container mx-auto px-4 py-6 space-y-6"
    >
      <div className="w-full">
        <PageTitle title={getTranslatedText("title", "Card Activation Tasks")} />
      </div>
      
      {/* Task Stats */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-purple-900/30 bg-gradient-to-br from-charcoal-light to-charcoal-dark shadow-lg shadow-purple-900/10 overflow-hidden relative group transition-all duration-300 hover:shadow-purple-600/20 hover:-translate-y-1">
          <div className="absolute inset-0 bg-grid-white/[0.02] [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
          <div className="absolute top-0 right-0 w-24 h-24 bg-purple-600/20 rounded-full blur-xl group-hover:bg-purple-600/30 transition-all duration-500"></div>
          
          <CardHeader className="pb-0 relative z-10">
            <CardTitle className="text-lg text-white flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-purple-400" />
              {getTranslatedText("totalTasks", "Total Tasks")}
            </CardTitle>
          </CardHeader>
          <CardContent className="relative z-10 pt-4">
            {renderRadialProgress(taskStats.total, taskStats.total, 'url(#purpleGradient)')}
            <svg width="0" height="0" className="absolute">
              <linearGradient id="purpleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8B5CF6" />
                <stop offset="100%" stopColor="#6D28D9" />
              </linearGradient>
            </svg>
          </CardContent>
        </Card>
        
        <Card className="border-purple-900/30 bg-gradient-to-br from-charcoal-light to-charcoal-dark shadow-lg shadow-purple-900/10 overflow-hidden relative group transition-all duration-300 hover:shadow-amber-600/20 hover:-translate-y-1">
          <div className="absolute inset-0 bg-grid-white/[0.02] [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-600/20 rounded-full blur-xl group-hover:bg-amber-600/30 transition-all duration-500"></div>
          
          <CardHeader className="pb-0 relative z-10">
            <CardTitle className="text-lg text-white flex items-center gap-2">
              <Clock className="h-5 w-5 text-amber-400" />
              {getTranslatedText("pendingTasks", "Pending Tasks")}
            </CardTitle>
          </CardHeader>
          <CardContent className="relative z-10 pt-4">
            {renderRadialProgress(taskStats.pending, taskStats.total, 'url(#amberGradient)')}
            <svg width="0" height="0" className="absolute">
              <linearGradient id="amberGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F59E0B" />
                <stop offset="100%" stopColor="#D97706" />
              </linearGradient>
            </svg>
          </CardContent>
        </Card>
        
        <Card className="border-purple-900/30 bg-gradient-to-br from-charcoal-light to-charcoal-dark shadow-lg shadow-purple-900/10 overflow-hidden relative group transition-all duration-300 hover:shadow-green-600/20 hover:-translate-y-1">
          <div className="absolute inset-0 bg-grid-white/[0.02] [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
          <div className="absolute top-0 right-0 w-24 h-24 bg-green-600/20 rounded-full blur-xl group-hover:bg-green-600/30 transition-all duration-500"></div>
          
          <CardHeader className="pb-0 relative z-10">
            <CardTitle className="text-lg text-white flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-emerald-400" />
              {getTranslatedText("approvedTasks", "Approved Tasks")}
            </CardTitle>
          </CardHeader>
          <CardContent className="relative z-10 pt-4">
            {renderRadialProgress(taskStats.approved, taskStats.total, 'url(#greenGradient)')}
            <svg width="0" height="0" className="absolute">
              <linearGradient id="greenGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10B981" />
                <stop offset="100%" stopColor="#059669" />
              </linearGradient>
            </svg>
          </CardContent>
        </Card>
        
        <Card className="border-purple-900/30 bg-gradient-to-br from-charcoal-light to-charcoal-dark shadow-lg shadow-purple-900/10 overflow-hidden relative group transition-all duration-300 hover:shadow-red-600/20 hover:-translate-y-1">
          <div className="absolute inset-0 bg-grid-white/[0.02] [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
          <div className="absolute top-0 right-0 w-24 h-24 bg-red-600/20 rounded-full blur-xl group-hover:bg-red-600/30 transition-all duration-500"></div>
          
          <CardHeader className="pb-0 relative z-10">
            <CardTitle className="text-lg text-white flex items-center gap-2">
              <XCircle className="h-5 w-5 text-red-400" />
              {getTranslatedText("rejectedTasks", "Rejected Tasks")}
            </CardTitle>
          </CardHeader>
          <CardContent className="relative z-10 pt-4">
            {renderRadialProgress(taskStats.rejected, taskStats.total, 'url(#redGradient)')}
            <svg width="0" height="0" className="absolute">
              <linearGradient id="redGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#EF4444" />
                <stop offset="100%" stopColor="#DC2626" />
              </linearGradient>
            </svg>
          </CardContent>
        </Card>
      </motion.div>
      
      {/* Search Section */}
      <motion.div 
        variants={itemVariants}
        className="w-full bg-gradient-to-br from-purple-900/40 to-charcoal-dark rounded-xl border border-purple-900/30 overflow-hidden relative shadow-lg shadow-purple-900/10 hover:shadow-purple-600/20 transition-all duration-300"
      >
        <div className="absolute inset-0 bg-grid-white/[0.02] [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
        <div className="absolute top-0 right-0 w-40 h-40 bg-purple-600/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
        
        <CardHeader className="pb-3 relative z-10 bg-purple-950/30 border-b border-purple-800/30">
          <CardTitle className="text-white flex items-center mb-1.5">
            <span className="bg-purple-500/30 p-2 rounded-full mr-2">
              <Search size={18} className="text-purple-300" />
            </span>
            {getTranslatedText("searchCriteria", "Search Criteria")}
          </CardTitle>
          <CardDescription className="text-purple-200">
            {getTranslatedText("enterTaskInfo", "Enter card number or applicant name to search")}
          </CardDescription>
        </CardHeader>
        <CardContent className="relative z-10 bg-purple-950/20 py-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-purple-400 pointer-events-none" />
              <Input 
                placeholder={getTranslatedText("cardOrApplicant", "Card Number or Applicant")}
                className="pl-10 bg-purple-950/70 border-purple-700/50 text-white placeholder-purple-300/70 focus:ring-purple-500/50 focus:border-purple-500/50 hover:bg-purple-900/70 transition-colors"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button className="gap-2 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white shadow-md shadow-purple-600/30 border border-purple-500/30">
              <Search className="h-4 w-4" />
              {getTranslatedText("search", "Search")}
            </Button>
          </div>
          
          <div className="flex flex-wrap gap-3 mt-4">
            <Button 
              variant={activeStatus === "all" ? "default" : "outline"} 
              onClick={() => setActiveStatus("all")}
              className={activeStatus === "all" ? 
                "bg-purple-600 hover:bg-purple-700 text-white" : 
                "border-purple-600/60 text-white hover:bg-purple-800/50"
              }
              size="sm"
            >
              {getTranslatedText("allTasks", "All Tasks")}
            </Button>
            <Button 
              variant={activeStatus === "pending" ? "default" : "outline"} 
              onClick={() => setActiveStatus("pending")}
              className={activeStatus === "pending" ? 
                "bg-amber-600 hover:bg-amber-700 text-white" : 
                "border-purple-600/60 text-white hover:bg-purple-800/50"
              }
              size="sm"
            >
              {getTranslatedText("pending", "Pending")}
            </Button>
            <Button 
              variant={activeStatus === "approved" ? "default" : "outline"} 
              onClick={() => setActiveStatus("approved")}
              className={activeStatus === "approved" ? 
                "bg-green-600 hover:bg-green-700 text-white" : 
                "border-purple-600/60 text-white hover:bg-purple-800/50"
              }
              size="sm"
            >
              {getTranslatedText("completed", "Approved")}
            </Button>
            <Button 
              variant={activeStatus === "rejected" ? "default" : "outline"} 
              onClick={() => setActiveStatus("rejected")}
              className={activeStatus === "rejected" ? 
                "bg-red-600 hover:bg-red-700 text-white" : 
                "border-purple-600/60 text-white hover:bg-purple-800/50"
              }
              size="sm"
            >
              {getTranslatedText("rejected", "Rejected")}
            </Button>
          </div>
        </CardContent>
      </motion.div>
      
      {/* Results Section */}
      <motion.div 
        variants={itemVariants}
        className="w-full bg-gradient-to-br from-purple-900/40 to-charcoal-dark rounded-xl border border-purple-900/30 overflow-hidden relative shadow-lg shadow-purple-900/10 hover:shadow-purple-600/10 transition-all duration-300"
      >
        <div className="absolute inset-0 bg-grid-white/[0.02] [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-purple-800/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4"></div>
        
        <CardHeader className="pb-3 relative z-10 bg-purple-950/30 border-b border-purple-800/30">
          <CardTitle className="text-white flex items-center mb-1.5">
            <span className="bg-purple-500/30 p-2 rounded-full mr-2">
              <CreditCard size={18} className="text-purple-300" />
            </span>
            {getTranslatedText("taskList", "Tasks List")}
          </CardTitle>
          <CardDescription className="text-purple-200">
            {getTranslatedText("searchResults", "Search Results")}
          </CardDescription>
        </CardHeader>
        <CardContent className="relative z-10 bg-purple-950/20 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div className="flex gap-2 flex-wrap">
              <Button variant="outline" className="gap-2 border-purple-600/60 text-white hover:bg-purple-800/50 transition-colors">
                <Filter className="h-4 w-4" />
                {getTranslatedText("filter", "Filter")}
              </Button>
              <Button variant="outline" className="gap-2 border-purple-600/60 text-white hover:bg-purple-800/50 transition-colors">
                <Download className="h-4 w-4" />
                {getTranslatedText("export", "Export")}
              </Button>
              <Button variant="outline" className="gap-2 border-purple-600/60 text-white hover:bg-purple-800/50 transition-colors">
                <RefreshCw className="h-4 w-4" />
                {getTranslatedText("refresh", "Refresh")}
              </Button>
            </div>
          </div>
          
          <div className="rounded-md border border-purple-700/50 overflow-hidden shadow-inner shadow-purple-950/50">
            <Table>
              <TableCaption className="text-purple-300/50">
                {getTranslatedText("taskSearchResults", "Card Activation Task Search Results")}
              </TableCaption>
              <TableHeader>
                <TableRow className="border-purple-700/50 bg-purple-900/40">
                  <TableHead className="text-white font-medium">
                    {getTranslatedText("id", "ID")}
                  </TableHead>
                  <TableHead className="text-white font-medium">
                    {getTranslatedText("cardNumber", "Card Number")}
                  </TableHead>
                  <TableHead className="text-white font-medium">
                    {getTranslatedText("applicant", "Applicant")}
                  </TableHead>
                  <TableHead className="text-white font-medium">
                    {getTranslatedText("applicationDate", "Application Date")}
                  </TableHead>
                  <TableHead className="text-white font-medium">
                    {getTranslatedText("status", "Status")}
                  </TableHead>
                  <TableHead className="text-white font-medium">
                    {getTranslatedText("actions", "Actions")}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow className="border-purple-700/50 hover:bg-purple-800/50 transition-colors duration-200">
                  <TableCell className="font-mono text-xs text-purple-300">ACT-2023-08-001</TableCell>
                  <TableCell className="text-white">5678 **** **** 1234</TableCell>
                  <TableCell className="text-white">John Smith</TableCell>
                  <TableCell className="text-white">2023-08-15</TableCell>
                  <TableCell>
                    <span className="inline-block px-2 py-1 text-xs rounded-full bg-amber-600/20 text-amber-300 border border-amber-500/20">
                      {getTranslatedText("statusPending", "Pending")}
                    </span>
                  </TableCell>
                  <TableCell className="space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="border-purple-600/60 text-white hover:bg-purple-800/50 transition-colors"
                    >
                      {getTranslatedText("viewDetails", "View Details")}
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow className="border-purple-700/50 hover:bg-purple-800/50 transition-colors duration-200">
                  <TableCell className="font-mono text-xs text-purple-300">ACT-2023-08-002</TableCell>
                  <TableCell className="text-white">4321 **** **** 5678</TableCell>
                  <TableCell className="text-white">Maria Garcia</TableCell>
                  <TableCell className="text-white">2023-08-12</TableCell>
                  <TableCell>
                    <span className="inline-block px-2 py-1 text-xs rounded-full bg-emerald-600/20 text-emerald-300 border border-emerald-500/20">
                      {getTranslatedText("statusApproved", "Approved")}
                    </span>
                  </TableCell>
                  <TableCell className="space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="border-purple-600/60 text-white hover:bg-purple-800/50 transition-colors"
                    >
                      {getTranslatedText("viewDetails", "View Details")}
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow className="border-purple-700/50 hover:bg-purple-800/50 transition-colors duration-200">
                  <TableCell className="font-mono text-xs text-purple-300">ACT-2023-08-003</TableCell>
                  <TableCell className="text-white">9876 **** **** 4321</TableCell>
                  <TableCell className="text-white">Alex Johnson</TableCell>
                  <TableCell className="text-white">2023-08-10</TableCell>
                  <TableCell>
                    <span className="inline-block px-2 py-1 text-xs rounded-full bg-red-600/20 text-red-300 border border-red-500/20">
                      {getTranslatedText("statusRejected", "Rejected")}
                    </span>
                  </TableCell>
                  <TableCell className="space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="border-purple-600/60 text-white hover:bg-purple-800/50 transition-colors"
                    >
                      {getTranslatedText("viewDetails", "View Details")}
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </motion.div>
    </motion.div>
  );
};

export default ActivationTasks;
