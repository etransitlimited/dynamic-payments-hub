
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wallet, CreditCard, User, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

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
  const buttonVariants = {
    hover: { 
      scale: 1.03,
      transition: { type: "spring", stiffness: 400, damping: 10 }
    },
    tap: { scale: 0.98 }
  };

  return (
    <Card className="bg-gradient-to-r from-[rgb(142,45,226)] to-[rgb(74,0,224)] border-purple-900/50 shadow-lg shadow-purple-900/10 hover:shadow-[0_0_15px_rgba(142,45,226,0.15)] transition-all duration-300 overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
      <CardHeader className="pb-3 relative z-10">
        <CardTitle className="text-white">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 relative z-10">
        <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
          <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white shadow-md shadow-purple-900/30 border border-purple-500/30">
            <Wallet className="mr-2 h-4 w-4" /> {depositText}
          </Button>
        </motion.div>
        
        <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
          <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white shadow-md shadow-purple-900/30 border border-purple-500/30">
            <CreditCard className="mr-2 h-4 w-4" /> {applyCardText}
          </Button>
        </motion.div>
        
        <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
          <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white shadow-md shadow-purple-900/30 border border-purple-500/30">
            <User className="mr-2 h-4 w-4" /> {inviteFriendsText}
          </Button>
        </motion.div>
        
        <motion.div 
          className="mt-6 p-4 bg-purple-900/30 rounded-lg border border-purple-500/30 shadow-inner"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <div className="flex items-start">
            <AlertCircle className="h-5 w-5 text-purple-300 mr-2 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-purple-200 font-medium mb-1">{noticeTitle}</h4>
              <p className="text-sm text-purple-200/80">
                {noticeText}
              </p>
            </div>
          </div>
        </motion.div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
