
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
import { useLanguage } from "@/context/LanguageContext";

const InvitationList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { t } = useLanguage();
  
  const handleCopyInviteCode = () => {
    navigator.clipboard.writeText("INV-8521-4796");
    toast({
      title: t("invitation.codeCopied"),
      description: t("invitation.shareCodeToFriends"),
    });
  };
  
  const invitees = [
    {
      name: t("invitation.userNames.user1"),
      registerDate: "2023-11-15",
      status: "active",
      rebateAmount: 132.5,
      totalTransaction: 2650,
    },
    {
      name: t("invitation.userNames.user2"),
      registerDate: "2023-11-02",
      status: "pending",
      rebateAmount: 0,
      totalTransaction: 0,
    },
    {
      name: t("invitation.userNames.user3"),
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
        <h1 className="text-2xl font-bold tracking-tight text-white">{t("invitation.management")}</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-blue-900 to-blue-950 border-blue-900/50 shadow-lg shadow-blue-900/10 hover:shadow-[0_0_15px_rgba(0,243,255,0.15)] transition-all duration-300 overflow-hidden md:col-span-2">
          <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
          <CardHeader className="relative z-10 pb-3">
            <CardTitle className="text-white flex items-center">
              <span className="bg-green-500/20 p-2 rounded-full mr-2">
                <Users size={18} className="text-green-400" />
              </span>
              {t("invitation.myCode")}
            </CardTitle>
          </CardHeader>
          <CardContent className="relative z-10">
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
                  <span>{t("invitation.copy")}</span>
                </Button>
                <Button className="flex-1 gap-2 bg-blue-600 hover:bg-blue-700 text-white">
                  <Share2 className="h-4 w-4" />
                  <span>{t("invitation.share")}</span>
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-[#061428]/70 rounded-lg p-4 border border-blue-900/30">
                <p className="text-blue-300/80 text-sm mb-1">{t("invitation.stats.invited")}</p>
                <p className="text-xl font-bold text-white">{invitees.length}</p>
              </div>
              <div className="bg-[#061428]/70 rounded-lg p-4 border border-blue-900/30">
                <p className="text-blue-300/80 text-sm mb-1">{t("invitation.stats.activated")}</p>
                <p className="text-xl font-bold text-white">{invitees.filter(i => i.status === "active").length}</p>
              </div>
              <div className="bg-[#061428]/70 rounded-lg p-4 border border-blue-900/30">
                <p className="text-blue-300/80 text-sm mb-1">{t("invitation.stats.totalRebate")}</p>
                <p className="text-xl font-bold text-white">¥{invitees.reduce((total, i) => total + i.rebateAmount, 0).toFixed(2)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-blue-900 to-blue-950 border-blue-900/50 shadow-lg shadow-blue-900/10 hover:shadow-[0_0_15px_rgba(0,243,255,0.15)] transition-all duration-300 overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
          <CardHeader className="relative z-10 pb-3">
            <CardTitle className="text-white">{t("invitation.rewardRules")}</CardTitle>
          </CardHeader>
          <CardContent className="relative z-10">
            <ul className="space-y-2 text-blue-200/80 list-disc pl-5">
              <li>{t("invitation.rules.userRegisters")}: <span className="text-green-400">+10{t("invitation.rules.points")}</span></li>
              <li>{t("invitation.rules.firstDeposit")}: <span className="text-green-400">+50{t("invitation.rules.points")}</span></li>
              <li>{t("invitation.rules.transactionRebate1")}<span className="text-green-400">5%</span>{t("invitation.rules.transactionRebate2")}</li>
              <li>{t("invitation.rules.dailyLimit1")}: <span className="text-yellow-400">20{t("invitation.rules.dailyLimit2")}</span></li>
            </ul>
          </CardContent>
        </Card>
      </div>
      
      <Card className="bg-gradient-to-br from-blue-900 to-blue-950 border-blue-900/50 shadow-lg shadow-blue-900/10 hover:shadow-[0_0_15px_rgba(0,243,255,0.15)] transition-all duration-300 overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
        <CardHeader className="relative z-10 pb-3">
          <CardTitle className="text-white">{t("invitation.records")}</CardTitle>
        </CardHeader>
        <CardContent className="relative z-10">
          <div className="flex justify-between mb-6">
            <div className="flex gap-2 w-full max-w-sm">
              <Input 
                placeholder={t("invitation.search.placeholder")}
                className="bg-[#061428] border-blue-900/50 text-white placeholder-blue-300/40"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button variant="outline" className="gap-2 border-blue-600/60 text-white hover:bg-blue-900/20">
                <Search className="h-4 w-4" />
                <span>{t("invitation.search.button")}</span>
              </Button>
            </div>
          </div>
          
          <div className="rounded-md border border-blue-900/50 overflow-hidden">
            <Table>
              <TableCaption className="text-blue-200/50">{t("invitation.inviteeList")}</TableCaption>
              <TableHeader>
                <TableRow className="border-blue-900/50 hover:bg-transparent">
                  <TableHead className="text-white">{t("invitation.table.invitee")}</TableHead>
                  <TableHead className="text-white">{t("invitation.table.registerDate")}</TableHead>
                  <TableHead className="text-white">{t("invitation.table.status")}</TableHead>
                  <TableHead className="text-white">{t("invitation.table.rebateAmount")}</TableHead>
                  <TableHead className="text-white">{t("invitation.table.totalTransaction")}</TableHead>
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
                          {t("invitation.status.active")}
                        </span>
                      ) : (
                        <span className="inline-block px-2 py-1 text-xs rounded-full bg-yellow-600/20 text-yellow-300">
                          {t("invitation.status.pending")}
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
