
import React from "react";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { CreditCard, Eye } from "lucide-react";
import StatusBadge from "./StatusBadge";
import { Task } from "../types";

interface TasksTableProps {
  tasks: Task[];
}

const TasksTable = ({ tasks }: TasksTableProps) => {
  return (
    <div className="rounded-md border border-blue-900/50 overflow-hidden">
      <Table>
        <TableHeader className="bg-blue-950/50">
          <TableRow className="hover:bg-blue-900/20 border-blue-900/50">
            <TableHead className="text-blue-200 font-medium">任务ID</TableHead>
            <TableHead className="text-blue-200 font-medium">卡号</TableHead>
            <TableHead className="text-blue-200 font-medium">卡片类型</TableHead>
            <TableHead className="text-blue-200 font-medium">任务</TableHead>
            <TableHead className="text-blue-200 font-medium">状态</TableHead>
            <TableHead className="text-blue-200 font-medium">创建日期</TableHead>
            <TableHead className="text-blue-200 font-medium text-right">操作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <TableRow key={task.id} className="hover:bg-blue-900/20 border-blue-900/50">
                <TableCell className="text-blue-100 font-medium">{task.id}</TableCell>
                <TableCell className="text-blue-100">
                  <div className="flex items-center gap-2">
                    <CreditCard size={16} className="text-blue-400" />
                    {task.cardNumber}
                  </div>
                </TableCell>
                <TableCell className="text-blue-100">{task.cardType}</TableCell>
                <TableCell className="text-blue-100">{task.task}</TableCell>
                <TableCell><StatusBadge status={task.status} /></TableCell>
                <TableCell className="text-blue-100">{task.createdAt}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Eye size={16} className="text-blue-200" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-8 text-blue-200">
                没有找到符合条件的开卡任务
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default TasksTable;
