
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { 
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const RebateList = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">返点列表</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>返点统计</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">本月返点金额</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">¥1,234.56</div>
                <p className="text-xs text-muted-foreground">
                  比上月增长 12.3%
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">累计返点金额</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">¥15,678.90</div>
                <p className="text-xs text-muted-foreground">
                  自 2023-08-15 起
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">邀请用户数</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-muted-foreground">
                  其中活跃用户 18 人
                </p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>返点记录</CardTitle>
          <CardDescription>查询您的邀请返点记录</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between mb-4">
            <div className="flex gap-2 w-full max-w-sm">
              <Input placeholder="用户名/交易号" />
              <Button variant="outline" className="gap-2">
                <Search className="h-4 w-4" />
                <span>查询</span>
              </Button>
            </div>
          </div>
          
          <Table>
            <TableCaption>返点收益记录</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>交易号</TableHead>
                <TableHead>被邀请人</TableHead>
                <TableHead>交易类型</TableHead>
                <TableHead>交易金额</TableHead>
                <TableHead>返点金额</TableHead>
                <TableHead>返点时间</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">RB-8973-4610</TableCell>
                <TableCell>王五</TableCell>
                <TableCell>充值</TableCell>
                <TableCell>¥1,000.00</TableCell>
                <TableCell>¥50.00</TableCell>
                <TableCell>2023-11-25 14:32</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">RB-7645-2198</TableCell>
                <TableCell>赵六</TableCell>
                <TableCell>购卡</TableCell>
                <TableCell>¥2,500.00</TableCell>
                <TableCell>¥125.00</TableCell>
                <TableCell>2023-11-20 09:45</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default RebateList;
