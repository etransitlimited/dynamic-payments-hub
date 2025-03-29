import React, { useState, useEffect } from "react";
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
import { Skeleton } from "@/components/ui/skeleton";
import { DeferredLoad } from "@/utils/progressive-loading";
import PageHeader from "../components/PageHeader";

const InvitationList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [invitees, setInvitees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useLanguage();
  
  useEffect(() => {
    const loadInvitees = async () => {
      await new Promise(resolve => setTimeout(resolve, 100));
      
      setInvitees([
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
      ]);
      setIsLoading(false);
    };
    
    loadInvitees();
  }, [t]);
  
  const handleCopyInviteCode = () => {
    navigator.clipboard.writeText("INV-8521-4796");
    toast({
      title: t("invitation.codeCopied"),
      description: t("invitation.shareCodeToFriends"),
    });
  };
  
  const filteredInvitees = invitees.filter(invitee => 
    invitee.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container max-w-7xl mx-auto px-4 py-6">
      <PageHeader title={t("invitation.title")} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-6">
        <DeferredLoad
          placeholder={
            <div className="bg-gradient-to-br from-blue-900 to-blue-950 border-blue-900/50 shadow-lg animate-pulse h-auto lg:col-span-2 rounded-lg min-h-[16rem]"></div>
          }
        >
          <Card className="bg-gradient-to-br from-blue-900 to-blue-950 border-blue-900/50 shadow-lg shadow-blue-900/10 hover:shadow-[0_0_15px_rgba(0,243,255,0.15)] transition-all duration-300 overflow-hidden lg:col-span-2 min-h-[16rem]">
            <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
            <CardHeader className="relative z-10 px-6 py-5 border-b border-blue-800/30">
              <CardTitle className="text-white flex items-center">
                <span className="bg-green-500/20 p-2 rounded-full mr-3">
                  <Users size={18} className="text-green-400" />
                </span>
                {t("invitation.myCode")}
              </CardTitle>
            </CardHeader>
            <CardContent className="relative z-10 p-6">
              <div className="flex flex-col md:flex-row items-stretch gap-4 w-full">
                <div className="bg-[#061428] p-4 rounded-md font-mono text-xl text-blue-200 flex items-center justify-center border border-blue-900/30 w-full md:min-w-[500px] lg:min-w-[600px] flex-shrink-0 shadow-inner shadow-blue-950/50 h-[50px]">
                  INV-8521-4796
                </div>
                <div className="flex flex-col sm:flex-row gap-3 w-full">
                  <Button 
                    variant="outline" 
                    className="flex-1 gap-2 border-blue-600/60 text-white hover:bg-blue-900/20 h-[50px]"
                    onClick={handleCopyInviteCode}
                  >
                    <Copy className="h-4 w-4" />
                    <span>{t("invitation.copyCode")}</span>
                  </Button>
                  <Button className="flex-1 gap-2 bg-blue-600 hover:bg-blue-700 text-white h-[50px]">
                    <Share2 className="h-4 w-4" />
                    <span>{t("invitation.share")}</span>
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                <div className="bg-[#061428]/70 rounded-lg p-5 border border-blue-900/30 hover:border-blue-700/40 transition-colors shadow-sm">
                  <p className="text-blue-300/80 text-sm mb-2">{t("invitation.stats.invited")}</p>
                  <p className="text-2xl font-bold text-white">{invitees.length}</p>
                </div>
                <div className="bg-[#061428]/70 rounded-lg p-5 border border-blue-900/30 hover:border-blue-700/40 transition-colors shadow-sm">
                  <p className="text-blue-300/80 text-sm mb-2">{t("invitation.stats.activated")}</p>
                  <p className="text-2xl font-bold text-white">{invitees.filter(i => i.status === "active").length}</p>
                </div>
                <div className="bg-[#061428]/70 rounded-lg p-5 border border-blue-900/30 hover:border-blue-700/40 transition-colors shadow-sm">
                  <p className="text-blue-300/80 text-sm mb-2">{t("invitation.stats.totalRebate")}</p>
                  <p className="text-2xl font-bold text-white">¥{invitees.reduce((total, i) => total + i.rebateAmount, 0).toFixed(2)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </DeferredLoad>
        
        <DeferredLoad
          placeholder={
            <div className="bg-gradient-to-br from-blue-900 to-blue-950 border-blue-900/50 shadow-lg animate-pulse h-full rounded-lg min-h-[16rem]"></div>
          }
        >
          <Card className="bg-gradient-to-br from-blue-900 to-blue-950 border-blue-900/50 shadow-lg shadow-blue-900/10 hover:shadow-[0_0_15px_rgba(0,243,255,0.15)] transition-all duration-300 overflow-hidden h-full flex flex-col min-h-[16rem]">
            <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
            <CardHeader className="relative z-10 px-6 py-5 border-b border-blue-800/30">
              <CardTitle className="text-white">{t("invitation.rewardRules")}</CardTitle>
            </CardHeader>
            <CardContent className="relative z-10 p-6 flex-1">
              <ul className="space-y-3 text-blue-200/90 list-disc pl-5">
                <li>{t("invitation.rules.userRegisters")}: <span className="text-green-400 font-medium">+10{t("invitation.rules.points")}</span></li>
                <li>{t("invitation.rules.firstDeposit")}: <span className="text-green-400 font-medium">+50{t("invitation.rules.points")}</span></li>
                <li>{t("invitation.rules.transactionRebate1")}<span className="text-green-400 font-medium">5%</span>{t("invitation.rules.transactionRebate2")}</li>
                <li>{t("invitation.rules.dailyLimit1")}: <span className="text-yellow-400 font-medium">20{t("invitation.rules.dailyLimit2")}</span></li>
              </ul>
            </CardContent>
          </Card>
        </DeferredLoad>
      </div>
      
      <DeferredLoad
        placeholder={
          <div className="bg-gradient-to-br from-blue-900 to-blue-950 border-blue-900/50 shadow-lg animate-pulse h-72 rounded-lg"></div>
        }
      >
        <Card className="bg-gradient-to-br from-blue-900 to-blue-950 border-blue-900/50 shadow-lg shadow-blue-900/10 hover:shadow-[0_0_15px_rgba(0,243,255,0.15)] transition-all duration-300 overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
          <CardHeader className="relative z-10 px-6 py-5 border-b border-blue-800/30">
            <CardTitle className="text-white">{t("invitation.records")}</CardTitle>
          </CardHeader>
          <CardContent className="relative z-10 p-6">
            <div className="flex justify-between mb-6">
              <div className="relative flex gap-2 w-full max-w-sm">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-400/70" />
                  <Input 
                    placeholder={t("invitation.searchInvitations")}
                    className="pl-10 bg-[#061428] border-blue-900/50 text-white placeholder-blue-300/40 w-full"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button variant="default" className="gap-2 bg-blue-600 hover:bg-blue-700 text-white">
                  <Search className="h-4 w-4" />
                  <span>{t("common.search")}</span>
                </Button>
              </div>
            </div>
            
            <div className="rounded-md border border-blue-900/50 overflow-hidden">
              <Table>
                <TableCaption className="text-blue-200/50">{t("invitation.inviteeList")}</TableCaption>
                <TableHeader>
                  <TableRow className="border-blue-900/50 hover:bg-transparent">
                    <TableHead className="text-white font-medium">{t("invitation.table.invitee")}</TableHead>
                    <TableHead className="text-white font-medium">{t("invitation.table.registerDate")}</TableHead>
                    <TableHead className="text-white font-medium">{t("invitation.table.status")}</TableHead>
                    <TableHead className="text-white font-medium">{t("invitation.table.rebateAmount")}</TableHead>
                    <TableHead className="text-white font-medium">{t("invitation.table.totalTransaction")}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    Array(3).fill(0).map((_, index) => (
                      <TableRow key={`skeleton-${index}`} className="border-blue-900/50">
                        <TableCell><Skeleton className="h-4 w-24 bg-blue-900/20" /></TableCell>
                        <TableCell><Skeleton className="h-4 w-32 bg-blue-900/20" /></TableCell>
                        <TableCell><Skeleton className="h-6 w-16 bg-blue-900/20 rounded-sm" /></TableCell>
                        <TableCell><Skeleton className="h-4 w-12 bg-blue-900/20" /></TableCell>
                        <TableCell><Skeleton className="h-4 w-16 bg-blue-900/20" /></TableCell>
                      </TableRow>
                    ))
                  ) : filteredInvitees.length > 0 ? (
                    filteredInvitees.map((invitee, index) => (
                      <TableRow key={index} className="border-blue-900/50 hover:bg-blue-900/20">
                        <TableCell className="font-medium text-white">{invitee.name}</TableCell>
                        <TableCell className="text-white">{invitee.registerDate}</TableCell>
                        <TableCell>
                          {invitee.status === "active" ? (
                            <span className="inline-flex items-center px-2.5 py-1 text-xs rounded-full bg-green-600/20 text-green-300 border border-green-600/20">
                              {t("invitation.statusActive")}
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2.5 py-1 text-xs rounded-full bg-yellow-600/20 text-yellow-300 border border-yellow-600/20">
                              {t("invitation.statusPending")}
                            </span>
                          )}
                        </TableCell>
                        <TableCell className="text-white">¥{invitee.rebateAmount.toFixed(2)}</TableCell>
                        <TableCell className="text-white">¥{invitee.totalTransaction.toFixed(2)}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center text-blue-300 py-8">
                        {t("common.noData")}
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </DeferredLoad>
    </div>
  );
};

export default InvitationList;
