
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wallet, CreditCard, User, AlertCircle } from "lucide-react";

interface QuickActionsProps {
  title: string;
  depositText: string;
  applyCardText: string;
  inviteFriendsText: string;
  noticeTitle: string;
  noticeText: string;
}

const QuickActions = ({ 
  title, 
  depositText, 
  applyCardText, 
  inviteFriendsText,
  noticeTitle,
  noticeText
}: QuickActionsProps) => {
  return (
    <Card className="bg-gradient-to-br from-blue-900/90 to-blue-950/90 border-blue-800/30 shadow-lg shadow-blue-900/20 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-white">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-900/30 border border-blue-500/30">
          <Wallet className="mr-2 h-4 w-4" /> {depositText}
        </Button>
        <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white shadow-md shadow-purple-900/30 border border-purple-500/30">
          <CreditCard className="mr-2 h-4 w-4" /> {applyCardText}
        </Button>
        <Button className="w-full bg-green-600 hover:bg-green-700 text-white shadow-md shadow-green-900/30 border border-green-500/30">
          <User className="mr-2 h-4 w-4" /> {inviteFriendsText}
        </Button>
        
        <div className="mt-6 p-4 bg-blue-900/30 rounded-lg border border-yellow-800/30 shadow-inner">
          <div className="flex items-start">
            <AlertCircle className="h-5 w-5 text-yellow-400 mr-2 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-yellow-400 font-medium mb-1">{noticeTitle}</h4>
              <p className="text-sm text-blue-300">
                {noticeText}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
