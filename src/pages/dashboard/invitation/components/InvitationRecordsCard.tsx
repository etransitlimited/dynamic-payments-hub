
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Skeleton } from "@/components/ui/skeleton";
import { useLanguage } from "@/context/LanguageContext";

// 创建独立的邀请记录卡片组件
const InvitationRecordsCard = ({ 
  invitees, 
  isLoading 
}: { 
  invitees: any[]; 
  isLoading: boolean; 
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const { t } = useLanguage();

  const filteredInvitees = invitees.filter(invitee => 
    invitee.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
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
  );
};

export default InvitationRecordsCard;
