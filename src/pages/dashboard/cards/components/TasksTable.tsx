
import React from "react";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useSafeTranslation } from "@/hooks/use-safe-translation";
import StatusBadge from "./StatusBadge";
import { Task } from "../types";

interface TasksTableProps {
  tasks: Task[];
}

const TasksTable: React.FC<TasksTableProps> = ({ tasks }) => {
  const { language } = useSafeTranslation();
  
  // Helper function to get localized text
  const getText = (key: string) => {
    switch (key) {
      case "id":
        return language === 'zh-CN' ? "ID" : 
               language === 'zh-TW' ? "ID" : 
               language === 'fr' ? "ID" : 
               language === 'es' ? "ID" : 
               "ID";
               
      case "cardDetails":
        return language === 'zh-CN' ? "卡片详情" : 
               language === 'zh-TW' ? "卡片詳情" : 
               language === 'fr' ? "Détails de la Carte" : 
               language === 'es' ? "Detalles de la Tarjeta" : 
               "Card Details";
               
      case "taskType":
        return language === 'zh-CN' ? "任务类型" : 
               language === 'zh-TW' ? "任務類型" : 
               language === 'fr' ? "Type de Tâche" : 
               language === 'es' ? "Tipo de Tarea" : 
               "Task Type";
               
      case "taskStatus":
        return language === 'zh-CN' ? "任务状态" : 
               language === 'zh-TW' ? "任務狀態" : 
               language === 'fr' ? "Statut de la Tâche" : 
               language === 'es' ? "Estado de la Tarea" : 
               "Task Status";
               
      case "taskDate":
        return language === 'zh-CN' ? "创建日期" : 
               language === 'zh-TW' ? "創建日期" : 
               language === 'fr' ? "Date de Création" : 
               language === 'es' ? "Fecha de Creación" : 
               "Creation Date";
               
      case "actions":
        return language === 'zh-CN' ? "操作" : 
               language === 'zh-TW' ? "操作" : 
               language === 'fr' ? "Actions" : 
               language === 'es' ? "Acciones" : 
               "Actions";
               
      case "viewTask":
        return language === 'zh-CN' ? "查看任务" : 
               language === 'zh-TW' ? "查看任務" : 
               language === 'fr' ? "Voir la Tâche" : 
               language === 'es' ? "Ver Tarea" : 
               "View Task";
               
      case "noData":
        return language === 'zh-CN' ? "暂无数据" : 
               language === 'zh-TW' ? "暫無數據" : 
               language === 'fr' ? "Aucune donnée" : 
               language === 'es' ? "Sin datos" : 
               "No data";
               
      default:
        return key;
    }
  };
  
  return (
    <div className="overflow-hidden rounded-lg border border-blue-800/40">
      <Table className="w-full">
        <TableHeader className="bg-blue-900/50">
          <TableRow className="hover:bg-blue-800/30">
            <TableHead className="w-[100px] text-blue-200">{getText("id")}</TableHead>
            <TableHead className="text-blue-200">{getText("cardDetails")}</TableHead>
            <TableHead className="text-blue-200">{getText("taskType")}</TableHead>
            <TableHead className="text-blue-200">{getText("taskStatus")}</TableHead>
            <TableHead className="text-blue-200">{getText("taskDate")}</TableHead>
            <TableHead className="text-blue-200 text-right">{getText("actions")}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <TableRow key={task.id} className="bg-blue-950/30 hover:bg-blue-900/30 border-t border-blue-800/30">
                <TableCell className="font-mono text-xs text-blue-300">{task.id}</TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="text-white font-medium">{task.cardNumber}</span>
                    <span className="text-blue-400 text-xs">{task.cardType}</span>
                  </div>
                </TableCell>
                <TableCell className="text-white">{task.task}</TableCell>
                <TableCell>
                  <StatusBadge status={task.status} />
                </TableCell>
                <TableCell className="text-blue-300 text-sm">{task.createdAt}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" className="text-blue-300 hover:text-white hover:bg-blue-800/50">
                    <Eye className="h-4 w-4 mr-1" />
                    {getText("viewTask")}
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-6 text-blue-400">
                {getText("noData")}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default TasksTable;
