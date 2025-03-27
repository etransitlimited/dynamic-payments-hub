
import React from "react";
import { TableHead, TableHeader as UITableHeader, TableRow } from "@/components/ui/table";

const TableHeader = () => {
  return (
    <UITableHeader>
      <TableRow className="border-blue-900/50 hover:bg-transparent">
        <TableHead className="text-white font-medium">交易 ID</TableHead>
        <TableHead className="text-white font-medium">交易类型</TableHead>
        <TableHead className="text-white font-medium">金额</TableHead>
        <TableHead className="text-white font-medium">余额</TableHead>
        <TableHead className="text-white font-medium">交易时间</TableHead>
        <TableHead className="text-white font-medium">备注</TableHead>
      </TableRow>
    </UITableHeader>
  );
};

export default TableHeader;
