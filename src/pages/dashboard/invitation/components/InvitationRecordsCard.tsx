
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/context/LanguageContext";

interface InviteeProps {
  name: string;
  registerDate: string;
  status: "active" | "pending";
  rebateAmount: number;
  totalTransaction: number;
}

interface InvitationRecordsCardProps {
  invitees: InviteeProps[];
  isLoading: boolean;
}

const InvitationRecordsCard: React.FC<InvitationRecordsCardProps> = ({ invitees, isLoading }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const { t } = useLanguage();
  
  // Filter invitees based on search query
  const filteredInvitees = invitees.filter(
    (invitee) =>
      invitee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invitee.registerDate.includes(searchQuery)
  );
  
  // Paginate invitees
  const indexOfLastInvitee = currentPage * itemsPerPage;
  const indexOfFirstInvitee = indexOfLastInvitee - itemsPerPage;
  const currentInvitees = filteredInvitees.slice(indexOfFirstInvitee, indexOfLastInvitee);
  const totalPages = Math.ceil(filteredInvitees.length / itemsPerPage) || 1;
  
  return (
    <Card className="border-purple-900/20 shadow-lg hover:shadow-purple-900/10 transition-all duration-300 overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/[0.03] [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
      <CardHeader className="relative z-10 bg-purple-900/10 border-b border-purple-900/20 px-6 py-4">
        <CardTitle className="text-white text-lg flex items-center">
          <span className="bg-purple-500 h-5 w-1 rounded-full mr-2"></span>
          {t("invitation.inviteeList")}
        </CardTitle>
      </CardHeader>
      <CardContent className="relative z-10 p-6">
        <div className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              className="bg-charcoal-dark pl-9 border-purple-900/20 placeholder:text-gray-500 focus:border-purple-500 focus:ring-purple-500/30"
              placeholder={t("search")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          {/* Table */}
          <div className="rounded-md border border-blue-900/30 overflow-hidden">
            <Table>
              <TableHeader className="bg-blue-950/50">
                <TableRow>
                  <TableHead className="text-blue-200 font-medium">{t("invitation.table.invitee")}</TableHead>
                  <TableHead className="text-blue-200 font-medium">{t("invitation.table.registerDate")}</TableHead>
                  <TableHead className="text-blue-200 font-medium">{t("status")}</TableHead>
                  <TableHead className="text-blue-200 font-medium text-right">{t("invitation.table.rebateAmount")}</TableHead>
                  <TableHead className="text-blue-200 font-medium text-right">{t("invitation.table.totalTransaction")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  Array(3)
                    .fill(0)
                    .map((_, index) => (
                      <TableRow key={index} className="bg-blue-950/20 animate-pulse">
                        <TableCell colSpan={5}>
                          <div className="h-10 bg-blue-900/10 rounded"></div>
                        </TableCell>
                      </TableRow>
                    ))
                ) : currentInvitees.length > 0 ? (
                  currentInvitees.map((invitee, index) => (
                    <TableRow key={index} className="border-b border-blue-900/30">
                      <TableCell className="font-medium text-blue-100">{invitee.name}</TableCell>
                      <TableCell className="text-blue-200">{invitee.registerDate}</TableCell>
                      <TableCell>
                        <Badge 
                          variant="default" 
                          className={`rounded-sm px-2 py-0.5 ${invitee.status === "active" ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"}`}
                        >
                          {invitee.status === "active" ? t("invitation.statusActive") : t("invitation.statusPending")}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right text-blue-100">${invitee.rebateAmount.toFixed(2)}</TableCell>
                      <TableCell className="text-right text-blue-100">${invitee.totalTransaction.toFixed(2)}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-blue-300 py-8">
                      {t("noData")}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          
          {/* Pagination */}
          {!isLoading && filteredInvitees.length > 0 && (
            <div className="flex justify-between items-center mt-4">
              <div className="text-sm text-blue-300">
                {t("showing")} {indexOfFirstInvitee + 1}-
                {Math.min(indexOfLastInvitee, filteredInvitees.length)} {t("of")}{" "}
                {filteredInvitees.length}
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-blue-900/30 text-blue-300 hover:bg-blue-900/20"
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-blue-900/30 text-blue-300 hover:bg-blue-900/20"
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default InvitationRecordsCard;
