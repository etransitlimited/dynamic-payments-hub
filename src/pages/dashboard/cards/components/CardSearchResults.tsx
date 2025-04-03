
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/context/LanguageContext";
import { getDirectTranslation } from "@/utils/translationHelpers";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

// Sample data for demonstration
const sampleCards = [
  { id: "CARD-1234", name: "John Doe", number: "•••• •••• •••• 5678", status: "active", balance: "$1,245.00", lastUsed: "2023-12-01" },
  { id: "CARD-2345", name: "Jane Smith", number: "•••• •••• •••• 4321", status: "inactive", balance: "$5,670.00", lastUsed: "2023-11-15" },
  { id: "CARD-3456", name: "Robert Johnson", number: "•••• •••• •••• 9876", status: "pending", balance: "$890.00", lastUsed: "2023-11-28" },
];

const CardSearchResults: React.FC = () => {
  const { language } = useLanguage();
  const [forceUpdateKey, setForceUpdateKey] = useState(`results-${language}-${Date.now()}`);
  
  // Force re-render when language changes
  useEffect(() => {
    console.log(`CardSearchResults detected language change to: ${language}`);
    setForceUpdateKey(`results-${language}-${Date.now()}`);
  }, [language]);
  
  // Get translations
  const resultsTitle = getDirectTranslation("cards.search.results", language, "Search Results");
  const idText = getDirectTranslation("cards.search.id", language, "ID");
  const nameText = getDirectTranslation("cards.search.name", language, "Name");
  const cardNumberText = getDirectTranslation("cards.search.cardNumber", language, "Card Number");
  const statusText = getDirectTranslation("cards.search.status", language, "Status");
  const balanceText = getDirectTranslation("cards.search.balance", language, "Balance");
  const lastUsedText = getDirectTranslation("cards.search.lastUsed", language, "Last Used");
  const actionsText = getDirectTranslation("cards.search.actions", language, "Actions");
  const viewText = getDirectTranslation("cards.search.view", language, "View");
  
  // Status translation map
  const statusTranslations = {
    active: getDirectTranslation("cards.status.active", language, "Active"),
    inactive: getDirectTranslation("cards.status.inactive", language, "Inactive"),
    pending: getDirectTranslation("cards.status.pending", language, "Pending"),
  };
  
  return (
    <Card 
      className="border-blue-900/30 bg-blue-950/20 backdrop-blur-sm overflow-hidden shadow-lg"
      key={forceUpdateKey}
      data-language={language}
    >
      <CardContent className="p-0">
        <div className="p-4 border-b border-blue-900/30 bg-blue-900/20">
          <h2 className="text-lg font-medium text-white">{resultsTitle}</h2>
        </div>
        
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-blue-900/30">
              <TableRow className="border-blue-800/30 hover:bg-blue-800/40">
                <TableHead className="text-blue-200 font-medium">{idText}</TableHead>
                <TableHead className="text-blue-200 font-medium">{nameText}</TableHead>
                <TableHead className="text-blue-200 font-medium">{cardNumberText}</TableHead>
                <TableHead className="text-blue-200 font-medium">{statusText}</TableHead>
                <TableHead className="text-blue-200 font-medium">{balanceText}</TableHead>
                <TableHead className="text-blue-200 font-medium">{lastUsedText}</TableHead>
                <TableHead className="text-blue-200 font-medium">{actionsText}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sampleCards.map((card) => (
                <TableRow 
                  key={card.id} 
                  className="border-blue-800/30 hover:bg-blue-900/30"
                >
                  <TableCell className="text-blue-300 font-mono">{card.id}</TableCell>
                  <TableCell className="text-white">{card.name}</TableCell>
                  <TableCell className="text-white font-mono">{card.number}</TableCell>
                  <TableCell>
                    <Badge 
                      className={`
                        ${card.status === 'active' ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30' : 
                          card.status === 'inactive' ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30' : 
                          'bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30'}
                      `}
                    >
                      {statusTranslations[card.status as keyof typeof statusTranslations]}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-white">{card.balance}</TableCell>
                  <TableCell className="text-blue-300">{card.lastUsed}</TableCell>
                  <TableCell>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-blue-400 hover:text-blue-300 hover:bg-blue-900/50"
                    >
                      {viewText}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

const Button = ({ children, className, variant, size }: any) => {
  return (
    <button className={className}>
      {children}
    </button>
  );
};

export default CardSearchResults;
