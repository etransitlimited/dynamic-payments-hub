
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Copy, Share2, Users } from "lucide-react";
import { 
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "@/components/ui/use-toast";

const InvitationList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const handleCopyInviteCode = () => {
    navigator.clipboard.writeText("INV-8521-4796");
    toast({
      title: "邀请码已复制",
      description: "您可以将此邀请码分享给您的朋友",
    });
  };
  
  const invitees = [
    {
      name: "王五",
      registerDate: "2023-11-15",
      status: "active",
      rebateAmount: 132.5,
      totalTransaction: 2650,
    },
    {
      name: "赵六",
      registerDate: "2023-11-02",
      status: "pending",
      rebateAmount: 0,
      totalTransaction: 0,
    },
    {
      name: "张三",
      registerDate: "2023-10-28",
      status: "active",
      rebateAmount: 210.75,
      totalTransaction: 4215,
    },
  ];

  return (
    <div className="space-y-6 container px-4 py-6">
      <div className="flex items-center mb-6">
        <div className="w-2 h-8 bg-green-500 rounded-full mr-3"></div>
        <h1 className="text-2xl font-bold tracking-tight text-white">邀请管理</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-[#0F2643]/90 backdrop-blur-sm border-blue-900/50 shadow-lg shadow-blue-900/10 md:col-span-2">
          <CardHeader className="pb-3">
            <CardTitle className="text-white flex items-center">
              <span className="bg-green-500/20 p-2 rounded-full mr-2">
                <Users size={18} className="text-green-400" />
              </span>
              我的邀请码
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row items-stretch gap-4">
              <div className="bg-[#061428] p-4 rounded-md font-mono text-lg flex-1 text-blue-200 flex items-center justify-center border border-blue-900/30">
                INV-8521-4796
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  className="flex-1 gap-2 border-blue-600/60 text-white hover:bg-blue-900/20"
                  onClick={handleCopyInviteCode}
                >
                  <Copy className="h-4 w-4" />
                  <span>复制</span>
                </Button>
                <Button className="flex-1 gap-2 bg-blue-600 hover:bg-blue-700 text-white">
                  <Share2 className="h-4 w-4" />
                  <span>分享</span>
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-[#061428]/70 rounded-lg p-4 border border-blue-900/30">
                <p className="text-blue-300/80 text-sm mb-1">已邀请用户</p>
                <p className="text-xl font-bold text-white">{invitees.length}</p>
              </div>
              <div className="bg-[#061428]/70 rounded-lg p-4 border border-blue-900/30">
                <p className="text-blue-300/80 text-sm mb-1">已激活用户</p>
                <p className="text-xl font-bold text-white">{invitees.filter(i => i.status === "active").length}</p>
              </div>
              <div className="bg-[#061428]/70 rounded-lg p-4 border border-blue-900/30">
                <p className="text-blue-300/80 text-sm mb-1">累计返点(元)</p>
                <p className="text-xl font-bold text-white">¥{invitees.reduce((total, i) => total + i.rebateAmount, 0).toFixed(2)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-[#0F2643]/90 backdrop-blur-sm border-blue-900/50 shadow-lg shadow-blue-900/10">
          <CardHeader className="pb-3">
            <CardTitle className="text-white">邀请奖励规则</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-blue-200/80 list-disc pl-5">
              <li>邀请用户注册成功：<span className="text-green-400">+10积分</span></li>
              <li>被邀请人首次充值：<span className="text-green-400">+50积分</span></li>
              <li>被邀请人交易金额的<span className="text-green-400">5%</span>返点</li>
              <li>每日邀请用户上限：<span className="text-yellow-400">20人</span></li>
            </ul>
          </CardContent>
        </Card>
      </div>
      
      <Card className="bg-[#0F2643]/90 backdrop-blur-sm border-blue-900/50 shadow-lg shadow-blue-900/10">
        <CardHeader className="pb-3">
          <CardTitle className="text-white">邀请记录</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between mb-6">
            <div className="flex gap-2 w-full max-w-sm">
              <Input 
                placeholder="用户名/手机号" 
                className="bg-[#061428] border-blue-900/50 text-white placeholder-blue-300/40"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button variant="outline" className="gap-2 border-blue-600/60 text-white hover:bg-blue-900/20">
                <Search className="h-4 w-4" />
                <span>查询</span>
              </Button>
            </div>
          </div>
          
          <div className="rounded-md border border-blue-900/50 overflow-hidden">
            <Table>
              <TableCaption className="text-blue-200/50">邀请用户列表</TableCaption>
              <TableHeader>
                <TableRow className="border-blue-900/50 hover:bg-transparent">
                  <TableHead className="text-white">被邀请人</TableHead>
                  <TableHead className="text-white">注册时间</TableHead>
                  <TableHead className="text-white">状态</TableHead>
                  <TableHead className="text-white">返点金额</TableHead>
                  <TableHead className="text-white">累计交易</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invitees.map((invitee, index) => (
                  <TableRow key={index} className="border-blue-900/50 hover:bg-blue-900/20">
                    <TableCell className="font-medium text-white">{invitee.name}</TableCell>
                    <TableCell className="text-white">{invitee.registerDate}</TableCell>
                    <TableCell>
                      {invitee.status === "active" ? (
                        <span className="inline-block px-2 py-1 text-xs rounded-full bg-green-600/20 text-green-300">
                          已激活
                        </span>
                      ) : (
                        <span className="inline-block px-2 py-1 text-xs rounded-full bg-yellow-600/20 text-yellow-300">
                          待激活
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="text-white">¥{invitee.rebateAmount.toFixed(2)}</TableCell>
                    <TableCell className="text-white">¥{invitee.totalTransaction.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InvitationList;
