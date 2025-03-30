
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Task } from "./types";
import TasksTable from "./components/TasksTable";
import TaskFilters from "./components/TaskFilters";
import TaskSearchInput from "./components/TaskSearchInput";
import PageHeader from "@/pages/dashboard/components/PageHeader";

const getDummyTasks = (language: string): Task[] => {
  const getLocalizedTaskType = (taskType: string, language: string) => {
    const taskTypes = {
      'identityVerification': {
        'en': 'Identity Verification',
        'zh-CN': '身份验证',
        'zh-TW': '身份驗證',
        'es': 'Verificación de Identidad',
        'fr': 'Vérification d\'Identité'
      },
      'activationCode': {
        'en': 'Activation Code Verification',
        'zh-CN': '激活码验证',
        'zh-TW': '激活碼驗證',
        'es': 'Verificación de Código de Activación',
        'fr': 'Vérification du Code d\'Activation'
      },
      'phoneBinding': {
        'en': 'Bind Phone Number',
        'zh-CN': '绑定手机号',
        'zh-TW': '綁定手機號',
        'es': 'Vincular Número de Teléfono',
        'fr': 'Associer un Numéro de Téléphone'
      },
      'setPassword': {
        'en': 'Set Password',
        'zh-CN': '设置密码',
        'zh-TW': '設置密碼',
        'es': 'Establecer Contraseña',
        'fr': 'Définir le Mot de Passe'
      },
      'realNameAuth': {
        'en': 'Real-name Authentication',
        'zh-CN': '实名认证',
        'zh-TW': '實名認證',
        'es': 'Autenticación de Nombre Real',
        'fr': 'Authentification de Nom Réel'
      }
    };

    return taskTypes[taskType as keyof typeof taskTypes]?.[language as keyof typeof taskTypes['identityVerification']] || taskType;
  };

  const getLocalizedCardType = (cardType: string, language: string) => {
    const cardTypes = {
      'standard': {
        'en': 'Standard Card',
        'zh-CN': '标准卡',
        'zh-TW': '標準卡',
        'es': 'Tarjeta Estándar',
        'fr': 'Carte Standard'
      },
      'gold': {
        'en': 'Gold Card',
        'zh-CN': '金卡',
        'zh-TW': '金卡',
        'es': 'Tarjeta Gold',
        'fr': 'Carte Gold'
      },
      'platinum': {
        'en': 'Platinum Card',
        'zh-CN': '白金卡',
        'zh-TW': '白金卡',
        'es': 'Tarjeta Platinum',
        'fr': 'Carte Platinum'
      }
    };

    return cardTypes[cardType as keyof typeof cardTypes]?.[language as keyof typeof cardTypes['standard']] || cardType;
  };

  return [
    { 
      id: "ACT-001", 
      cardNumber: "**** **** **** 4532", 
      cardType: getLocalizedCardType("standard", language), 
      task: getLocalizedTaskType("identityVerification", language), 
      status: "pending", 
      createdAt: "2023-11-18" 
    },
    { 
      id: "ACT-002", 
      cardNumber: "**** **** **** 7821", 
      cardType: getLocalizedCardType("gold", language), 
      task: getLocalizedTaskType("activationCode", language), 
      status: "completed", 
      createdAt: "2023-11-15" 
    },
    { 
      id: "ACT-003", 
      cardNumber: "**** **** **** 9635", 
      cardType: getLocalizedCardType("platinum", language), 
      task: getLocalizedTaskType("phoneBinding", language), 
      status: "failed", 
      createdAt: "2023-11-14" 
    },
    { 
      id: "ACT-004", 
      cardNumber: "**** **** **** 2514", 
      cardType: getLocalizedCardType("standard", language), 
      task: getLocalizedTaskType("setPassword", language), 
      status: "pending", 
      createdAt: "2023-11-12" 
    },
    { 
      id: "ACT-005", 
      cardNumber: "**** **** **** 6374", 
      cardType: getLocalizedCardType("gold", language), 
      task: getLocalizedTaskType("realNameAuth", language), 
      status: "completed", 
      createdAt: "2023-11-10" 
    }
  ];
};

const ActivationTasks = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const { t, language } = useLanguage();
  
  const dummyTasks = getDummyTasks(language);
  
  const filteredTasks = dummyTasks.filter(task => {
    const matchesSearch = 
      task.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
      task.cardNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.task.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesStatus = statusFilter === "all" || task.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  const getLocalizedStatus = (status: string) => {
    if (status === "pending") {
      return t("cards.activationTasks.statusPending");
    } else if (status === "completed") {
      return t("cards.activationTasks.statusCompleted");
    } else if (status === "failed") {
      return t("cards.activationTasks.statusFailed");
    }
    return status;
  };
  
  return (
    <div className="space-y-6 container px-4 py-6 mx-auto">
      <PageHeader title={t("cards.activationTasks.title")} />
      
      <Card className="bg-gradient-to-r from-[rgb(142,45,226)] to-[rgb(74,0,224)] border-purple-900/50 shadow-lg shadow-purple-900/10 overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
        <CardHeader className="relative z-10 pb-3">
          <CardTitle className="text-white flex items-center gap-3">
            <span className="bg-purple-500/20 p-2 rounded-full">
              <CreditCard size={18} className="text-purple-300" />
            </span>
            {t("cards.activationTasks.taskList")}
          </CardTitle>
          <CardDescription className="text-purple-200/80 mt-2">
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
        <CardFooter className="relative z-10 border-t border-purple-900/50 pt-4 mt-2">
          <div className="flex justify-between items-center w-full">
            <div className="text-sm text-purple-200">
              {t("cards.activationTasks.showing")} {filteredTasks.length} {t("cards.activationTasks.tasks")} ({t("common.of")} {dummyTasks.length})
            </div>
            <Button className="bg-purple-600 hover:bg-purple-700">
              {t("cards.activationTasks.createNewTask")}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ActivationTasks;
