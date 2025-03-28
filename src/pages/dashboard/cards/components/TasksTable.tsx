
import React from "react";
import { 
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Task } from "../types";
import StatusBadge from "./StatusBadge";
import { useLanguage } from "@/context/LanguageContext";

interface TasksTableProps {
  tasks: Task[];
}

const TasksTable: React.FC<TasksTableProps> = ({ tasks }) => {
  const { t } = useLanguage();

  return (
    <div className="rounded-md border border-blue-900/50 overflow-hidden">
      <Table>
        <TableCaption className="text-blue-200/70">
          {tasks.length === 0 ? t("common.noData") : `${t("cards.activationTasks.taskList")}`}
        </TableCaption>
        <TableHeader className="bg-blue-950/40">
          <TableRow className="border-blue-900/50 hover:bg-transparent">
            <TableHead className="text-blue-200 font-medium">{t("common.id")}</TableHead>
            <TableHead className="text-blue-200 font-medium">{t("cards.activationTasks.cardDetails")}</TableHead>
            <TableHead className="text-blue-200 font-medium">{t("cards.activationTasks.taskType")}</TableHead>
            <TableHead className="text-blue-200 font-medium">{t("cards.activationTasks.taskStatus")}</TableHead>
            <TableHead className="text-blue-200 font-medium">{t("cards.activationTasks.taskDate")}</TableHead>
            <TableHead className="text-blue-200 font-medium text-right">{t("cards.search.actions")}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <TableRow key={task.id} className="border-blue-900/50 hover:bg-blue-900/20">
                <TableCell className="font-medium text-blue-100">{task.id}</TableCell>
                <TableCell>
                  <div>
                    <div className="text-sm text-white">{task.cardNumber}</div>
                    <div className="text-xs text-blue-300 mt-1">{task.cardType}</div>
                  </div>
                </TableCell>
                <TableCell className="text-blue-100">{task.task}</TableCell>
                <TableCell>
                  <StatusBadge status={task.status} />
                </TableCell>
                <TableCell className="text-blue-100">{task.createdAt}</TableCell>
                <TableCell className="text-right">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-blue-100 border-blue-800 hover:bg-blue-800/30 hover:text-white"
                  >
                    {t("cards.activationTasks.viewTask")}
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center text-blue-300">
                {t("common.noData")}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default TasksTable;
