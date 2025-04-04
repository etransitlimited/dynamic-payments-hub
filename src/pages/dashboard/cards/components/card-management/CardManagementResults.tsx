import React, { useState } from 'react';
import TranslatedText from '@/components/translation/TranslatedText';
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye, MoreHorizontal, Ban, CheckCircle, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useSafeTranslation } from "@/hooks/use-safe-translation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const mockCards = [
  { 
    id: "CRD-1234-5678", 
    cardNumber: "•••• •••• •••• 4567", 
    cardHolder: "John Smith", 
    type: "Standard",
    issueDate: "2023-05-12", 
    expiryDate: "2026-05-11", 
    status: "active", 
    balance: "$3,458.24" 
  },
  { 
    id: "CRD-2345-6789", 
    cardNumber: "•••• •••• •••• 7890", 
    cardHolder: "Emma Johnson", 
    type: "Gold",
    issueDate: "2023-06-18", 
    expiryDate: "2026-06-17", 
    status: "active", 
    balance: "$12,642.50" 
  },
  { 
    id: "CRD-3456-7890", 
    cardNumber: "•••• •••• •••• 1234", 
    cardHolder: "Michael Davis", 
    type: "Platinum",
    issueDate: "2023-09-01", 
    expiryDate: "2026-08-31", 
    status: "pending", 
    balance: "$0.00" 
  },
  { 
    id: "CRD-4567-8901", 
    cardNumber: "•••• •••• •••• 5678", 
    cardHolder: "Sarah Wilson", 
    type: "Standard",
    issueDate: "2021-03-15", 
    expiryDate: "2024-03-14", 
    status: "expired", 
    balance: "$0.00" 
  },
  { 
    id: "CRD-5678-9012", 
    cardNumber: "•••• •••• •••• 9012", 
    cardHolder: "Robert Brown", 
    type: "Gold",
    issueDate: "2023-11-20", 
    expiryDate: "2026-11-19", 
    status: "pending", 
    balance: "$0.00" 
  }
];

interface StatusBadgeProps {
  status: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  switch (status) {
    case 'active':
      return (
        <Badge className="bg-green-600/80 hover:bg-green-600">
          <CheckCircle className="h-3 w-3 mr-1" />
          <TranslatedText keyName="cards.management.active" fallback="Active" />
        </Badge>
      );
    case 'pending':
      return (
        <Badge className="bg-amber-600/80 hover:bg-amber-600">
          <AlertCircle className="h-3 w-3 mr-1" />
          <TranslatedText keyName="cards.management.pending" fallback="Pending" />
        </Badge>
      );
    case 'expired':
      return (
        <Badge className="bg-red-600/80 hover:bg-red-600">
          <Ban className="h-3 w-3 mr-1" />
          <TranslatedText keyName="cards.management.expired" fallback="Expired" />
        </Badge>
      );
    default:
      return (
        <Badge className="bg-blue-600/80 hover:bg-blue-600">
          {status}
        </Badge>
      );
  }
};

interface CardManagementResultsProps {
  status: string;
  isLoading?: boolean;
}

const CardManagementResults: React.FC<CardManagementResultsProps> = ({ status, isLoading = false }) => {
  const { t } = useSafeTranslation();
  
  const filteredCards = status === 'all' 
    ? mockCards 
    : mockCards.filter(card => card.status === status);
  
  if (isLoading) {
    return (
      <Card className="overflow-hidden border border-blue-800/20 bg-gradient-to-br from-blue-950/40 to-indigo-950/30">
        <div className="p-4 animate-pulse">
          <div className="h-8 bg-blue-900/30 rounded-md w-1/3 mb-4"></div>
          <div className="space-y-3">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="flex space-x-4">
                <Skeleton className="h-6 w-2/12 bg-blue-900/30 rounded" />
                <Skeleton className="h-6 w-2/12 bg-blue-900/30 rounded" />
                <Skeleton className="h-6 w-2/12 bg-blue-900/30 rounded" />
                <Skeleton className="h-6 w-2/12 bg-blue-900/30 rounded" />
                <Skeleton className="h-6 w-2/12 bg-blue-900/30 rounded" />
                <Skeleton className="h-6 w-2/12 bg-blue-900/30 rounded" />
              </div>
            ))}
          </div>
        </div>
      </Card>
    );
  }
  
  return (
    <Card className="overflow-hidden border border-blue-800/20 bg-gradient-to-br from-blue-950/40 to-indigo-950/30">
      <div className="p-4">
        <Table>
          <TableCaption>
            {filteredCards.length > 0 ? (
              <TranslatedText 
                keyName="cards.management.showingResults" 
                fallback={`Showing ${filteredCards.length} cards`} 
                values={{ count: filteredCards.length.toString() }}
              />
            ) : (
              <TranslatedText keyName="cards.management.noResults" fallback="No cards found matching your criteria." />
            )}
          </TableCaption>
          <TableHeader>
            <TableRow className="border-b border-blue-800/20 hover:bg-blue-950/40">
              <TableHead className="text-white w-[150px]">
                <TranslatedText keyName="cards.management.cardID" fallback="Card ID" />
              </TableHead>
              <TableHead className="text-white">
                <TranslatedText keyName="cards.management.cardNumber" fallback="Card Number" />
              </TableHead>
              <TableHead className="text-white">
                <TranslatedText keyName="cards.management.cardHolder" fallback="Cardholder" />
              </TableHead>
              <TableHead className="text-white">
                <TranslatedText keyName="cards.management.type" fallback="Type" />
              </TableHead>
              <TableHead className="text-white">
                <TranslatedText keyName="cards.management.status" fallback="Status" />
              </TableHead>
              <TableHead className="text-white">
                <TranslatedText keyName="cards.management.balance" fallback="Balance" />
              </TableHead>
              <TableHead className="text-right">
                <TranslatedText keyName="cards.management.actions" fallback="Actions" />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCards.length > 0 ? (
              filteredCards.map((card) => (
                <TableRow key={card.id} className="border-b border-blue-800/20 hover:bg-blue-950/40">
                  <TableCell className="font-medium text-white">{card.id}</TableCell>
                  <TableCell>{card.cardNumber}</TableCell>
                  <TableCell>{card.cardHolder}</TableCell>
                  <TableCell>{card.type}</TableCell>
                  <TableCell><StatusBadge status={card.status} /></TableCell>
                  <TableCell>{card.balance}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">{t("cards.management.openMenu")}</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-blue-950 border-blue-800">
                        <DropdownMenuLabel>
                          {t("cards.management.cardActions")}
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="focus:bg-blue-900 text-white">
                          <Eye className="h-4 w-4 mr-2" />
                          {t("cards.management.viewDetails")}
                        </DropdownMenuItem>
                        {card.status === "active" && (
                          <DropdownMenuItem className="focus:bg-blue-900 text-white">
                            <Ban className="h-4 w-4 mr-2" />
                            {t("cards.management.block")}
                          </DropdownMenuItem>
                        )}
                        {card.status === "pending" && (
                          <DropdownMenuItem className="focus:bg-blue-900 text-white">
                            <CheckCircle className="h-4 w-4 mr-2" />
                            {t("cards.management.activate")}
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8">
                  <div className="flex flex-col items-center justify-center">
                    <AlertCircle className="h-10 w-10 text-gray-400 mb-2" />
                    <p className="text-gray-400">
                      <TranslatedText keyName="cards.management.noResults" fallback="No cards found matching your criteria." />
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};

export default CardManagementResults;
