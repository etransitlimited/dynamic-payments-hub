
import React from "react";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useLanguage } from "@/context/LanguageContext";
import StatusBadge from "./StatusBadge";
import { Task } from "../types";

interface TasksTableProps {
  tasks: Task[];
}

const TasksTable: React.FC<TasksTableProps> = ({ tasks }) => {
  const { language, t } = useLanguage();
  
  // Helper function to get localized text
  const getText = (key: string) => {
    switch (key) {
      case "id":
        return t("cards.activationTasks.id") || "ID";
               
      case "cardDetails":
        return t("cards.activationTasks.cardDetails") || "Card Details";
               
      case "taskType":
        return t("cards.activationTasks.taskType") || "Task Type";
               
      case "taskStatus":
        return t("cards.activationTasks.taskStatus") || "Task Status";
               
      case "taskDate":
        return t("cards.activationTasks.taskDate") || "Creation Date";
               
      case "actions":
        return t("cards.activationTasks.actions") || "Actions";
               
      case "viewTask":
        return t("cards.activationTasks.viewTask") || "View Task";
               
      case "noData":
        return t("cards.activationTasks.noTasksFound") || "No data";
               
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
