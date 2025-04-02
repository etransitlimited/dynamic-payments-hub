
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, CreditCard, Upload, UserPlus } from "lucide-react";
import { motion } from "framer-motion";
import TranslatedText from "@/components/translation/TranslatedText";

interface QuickActionsProps {
  title: React.ReactNode;
  depositText: React.ReactNode;
  applyCardText: React.ReactNode;
  inviteFriendsText: React.ReactNode;
  noticeTitle: React.ReactNode;
  noticeText: React.ReactNode;
}

const QuickActions: React.FC<QuickActionsProps> = ({
  title,
  depositText,
  applyCardText,
  inviteFriendsText,
  noticeTitle,
  noticeText,
}) => {
  return (
    <Card className="border-purple-900/30 bg-gradient-to-br from-charcoal-light/50 to-charcoal-dark/50 backdrop-blur-md shadow-lg relative group transition-all duration-300 h-full rounded-xl overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/[0.03] [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-neon-green to-neon-green/70"></div>
      <CardContent className="p-4 md:p-6 relative z-10">
        <div className="flex items-center mb-4">
          <span className="w-1.5 h-6 bg-neon-green rounded-sm mr-2"></span>
          <h2 className="text-lg font-semibold text-white">
            <TranslatedText keyName="dashboard.quickActions" fallback="Quick Actions" />
          </h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-3 mb-6">
          <motion.button 
            whileHover={{ y: -2, boxShadow: "0 10px 25px -5px rgba(139, 92, 246, 0.3)" }}
            className="p-3 bg-gradient-to-r from-purple-800/40 to-purple-700/40 rounded-lg flex items-center border border-purple-500/30 hover:border-purple-400/50 transition-all"
          >
            <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center mr-3">
              <Upload className="h-4 w-4 text-purple-300" />
            </div>
            <span className="text-white">{depositText}</span>
          </motion.button>
          
          <motion.button 
            whileHover={{ y: -2, boxShadow: "0 10px 25px -5px rgba(139, 92, 246, 0.3)" }}
            className="p-3 bg-gradient-to-r from-blue-800/40 to-blue-700/40 rounded-lg flex items-center border border-blue-500/30 hover:border-blue-400/50 transition-all"
          >
            <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center mr-3">
              <CreditCard className="h-4 w-4 text-blue-300" />
            </div>
            <span className="text-white">{applyCardText}</span>
          </motion.button>
          
          <motion.button 
            whileHover={{ y: -2, boxShadow: "0 10px 25px -5px rgba(139, 92, 246, 0.3)" }}
            className="p-3 bg-gradient-to-r from-green-800/40 to-green-700/40 rounded-lg flex items-center border border-green-500/30 hover:border-green-400/50 transition-all"
          >
            <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center mr-3">
              <UserPlus className="h-4 w-4 text-green-300" />
            </div>
            <span className="text-white">{inviteFriendsText}</span>
          </motion.button>
        </div>
        
        <div className="p-4 bg-amber-600/10 border border-amber-500/30 rounded-lg">
          <div className="flex items-center mb-2">
            <AlertCircle className="h-4 w-4 text-amber-400 mr-2" />
            <h3 className="font-medium text-white">
              <TranslatedText keyName="dashboard.importantNotice" fallback="Important Notice" />
            </h3>
          </div>
          <p className="text-sm text-gray-300">{noticeText}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
