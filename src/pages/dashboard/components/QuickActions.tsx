
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
    <Card className="bg-gradient-to-r from-[rgb(57,106,252)] to-[rgb(41,72,255)] border-purple-900/50 shadow-lg shadow-purple-900/10 hover:shadow-[0_0_15px_rgba(57,106,252,0.15)] transition-all duration-300 overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
      <CardHeader className="pb-3 relative z-10">
        <CardTitle className="text-white">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 relative z-10">
        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-900/30 border border-blue-500/30">
          <Wallet className="mr-2 h-4 w-4" /> {depositText}
        </Button>
        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-900/30 border border-blue-500/30">
          <CreditCard className="mr-2 h-4 w-4" /> {applyCardText}
        </Button>
        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-900/30 border border-blue-500/30">
          <User className="mr-2 h-4 w-4" /> {inviteFriendsText}
        </Button>
        
        <div className="mt-6 p-4 bg-blue-900/30 rounded-lg border border-blue-500/30 shadow-inner">
          <div className="flex items-start">
            <AlertCircle className="h-5 w-5 text-blue-300 mr-2 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-blue-200 font-medium mb-1">{noticeTitle}</h4>
              <p className="text-sm text-blue-200/80">
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
