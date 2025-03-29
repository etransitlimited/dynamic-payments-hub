
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Task } from "./types";
import TasksTable from "./components/TasksTable";
import TaskFilters from "./components/TaskFilters";
import TaskSearchInput from "./components/TaskSearchInput";

// Dummy data for the activation tasks
const getDummyTasks = (language: string): Task[] => {
  const getLocalizedTaskType = (taskType: string, language: string) => {
    const taskTypeMap: Record<string, Record<string, string>> = {
      'en': {
        '身份验证': 'Identity Verification',
        '激活码验证': 'Activation Code Verification',
        '绑定手机号': 'Bind Phone Number',
        '设置密码': 'Set Password',
        '实名认证': 'Real-name Authentication'
      },
      'zh-CN': {
        '身份验证': '身份验证',
        '激活码验证': '激活码验证',
        '绑定手机号': '绑定手机号',
        '设置密码': '设置密码',
        '实名认证': '实名认证'
      },
      'zh-TW': {
        '身份验证': '身份驗證',
        '激活码验证': '激活碼驗證',
        '绑定手机号': '綁定手機號',
        '设置密码': '設置密碼',
        '实名认证': '實名認證'
      },
      'es': {
        '身份验证': 'Verificación de Identidad',
        '激活码验证': 'Verificación de Código de Activación',
        '绑定手机号': 'Vincular Número de Teléfono',
        '设置密码': 'Establecer Contraseña',
        '实名认证': 'Autenticación de Nombre Real'
      },
      'fr': {
        '身份验证': 'Vérification d\'Identité',
        '激活码验证': 'Vérification du Code d\'Activation',
        '绑定手机号': 'Associer un Numéro de Téléphone',
        '设置密码': 'Définir le Mot de Passe',
        '实名认证': 'Authentification de Nom Réel'
      }
    };

    return taskTypeMap[language]?.[taskType] || taskType;
  };

  const getLocalizedCardType = (cardType: string, language: string) => {
    const cardTypeMap: Record<string, Record<string, string>> = {
      'en': {
        '标准卡': 'Standard Card',
        '金卡': 'Gold Card',
        '白金卡': 'Platinum Card'
      },
      'zh-CN': {
        '标准卡': '标准卡',
        '金卡': '金卡',
        '白金卡': '白金卡'
      },
      'zh-TW': {
        '标准卡': '標準卡',
        '金卡': '金卡',
        '白金卡': '白金卡'
      },
      'es': {
        '标准卡': 'Tarjeta Estándar',
        '金卡': 'Tarjeta Gold',
        '白金卡': 'Tarjeta Platinum'
      },
      'fr': {
        '标准卡': 'Carte Standard',
        '金卡': 'Carte Gold',
        '白金卡': 'Carte Platinum'
      }
    };

    return cardTypeMap[language]?.[cardType] || cardType;
  };

  return [
    { 
      id: "ACT-001", 
      cardNumber: "**** **** **** 4532", 
      cardType: getLocalizedCardType("标准卡", language), 
      task: getLocalizedTaskType("身份验证", language), 
      status: "pending", 
      createdAt: "2023-11-18" 
    },
    { 
      id: "ACT-002", 
      cardNumber: "**** **** **** 7821", 
      cardType: getLocalizedCardType("金卡", language), 
      task: getLocalizedTaskType("激活码验证", language), 
      status: "completed", 
      createdAt: "2023-11-15" 
    },
    { 
      id: "ACT-003", 
      cardNumber: "**** **** **** 9635", 
      cardType: getLocalizedCardType("白金卡", language), 
      task: getLocalizedTaskType("绑定手机号", language), 
      status: "failed", 
      createdAt: "2023-11-14" 
    },
    { 
      id: "ACT-004", 
      cardNumber: "**** **** **** 2514", 
      cardType: getLocalizedCardType("标准卡", language), 
      task: getLocalizedTaskType("设置密码", language), 
      status: "pending", 
      createdAt: "2023-11-12" 
    },
    { 
      id: "ACT-005", 
      cardNumber: "**** **** **** 6374", 
      cardType: getLocalizedCardType("金卡", language), 
      task: getLocalizedTaskType("实名认证", language), 
      status: "completed", 
      createdAt: "2023-11-10" 
    }
  ];
};

const ActivationTasks = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const { t, language } = useLanguage();
  
  // Get the tasks with proper localization
  const dummyTasks = getDummyTasks(language);
  
  // Filter tasks based on search term and status filter
  const filteredTasks = dummyTasks.filter(task => {
    const matchesSearch = 
      task.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
      task.cardNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.task.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesStatus = statusFilter === "all" || task.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  return (
    <div className="space-y-6 container px-4 py-6 mx-auto">
      <div className="flex items-center mb-6">
        <div className="w-2 h-8 bg-blue-500 rounded-full mr-3"></div>
        <h1 className="text-2xl font-bold tracking-tight text-white">{t("cards.activationTasks.title")}</h1>
      </div>
      
      <Card className="bg-gradient-to-br from-blue-900 to-blue-950 border-blue-900/50 shadow-lg shadow-blue-900/10 overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
        <CardHeader className="relative z-10 pb-3">
          <CardTitle className="text-white flex items-center">
            <span className="bg-blue-500/20 p-2 rounded-full mr-2">
              <CreditCard size={18} className="text-blue-400" />
            </span>
            {t("cards.activationTasks.taskList")}
          </CardTitle>
          <CardDescription className="text-blue-200/80">
            {t("cards.activationTasks.manageCardTasks")}
          </CardDescription>
        </CardHeader>
        <CardContent className="relative z-10 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <TaskSearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <TaskFilters statusFilter={statusFilter} setStatusFilter={setStatusFilter} />
          </div>
          
          <TasksTable tasks={filteredTasks} />
        </CardContent>
        <CardFooter className="relative z-10 border-t border-blue-900/50 pt-4 mt-2">
          <div className="flex justify-between items-center w-full">
            <div className="text-sm text-blue-200">
              {t("cards.activationTasks.showing")} {filteredTasks.length} {t("cards.activationTasks.tasks")} ({t("common.of")} {dummyTasks.length})
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">
              {t("cards.activationTasks.createNewTask")}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ActivationTasks;
