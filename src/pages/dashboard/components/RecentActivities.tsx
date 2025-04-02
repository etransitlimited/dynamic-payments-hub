
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import TranslatedText from "@/components/translation/TranslatedText";

interface Activity {
  type: string;
  amount: string;
  date: string;
  status: string;
}

interface RecentActivitiesProps {
  title: React.ReactNode;
  description: React.ReactNode;
  activities: Activity[];
  noActivitiesText: React.ReactNode;
}

const RecentActivities: React.FC<RecentActivitiesProps> = ({
  title,
  description,
  activities,
  noActivitiesText,
}) => {
  return (
    <Card className="border-purple-900/30 bg-gradient-to-br from-charcoal-light/50 to-charcoal-dark/50 backdrop-blur-md shadow-lg relative group transition-all duration-300 h-full rounded-xl overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/[0.03] [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-700 to-purple-500"></div>
      <CardContent className="p-4 md:p-6 relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <span className="w-1.5 h-6 bg-purple-500 rounded-sm mr-2"></span>
            <h2 className="text-lg font-semibold text-white">
              <TranslatedText keyName="dashboard.recentActivities" fallback="Recent Activities" />
            </h2>
          </div>
          <motion.button 
            whileHover={{ x: 5 }}
            className="text-purple-400 hover:text-neon-green flex items-center text-sm"
          >
            <TranslatedText keyName="common.viewAll" fallback="View All" />
            <ChevronRight className="h-4 w-4 ml-1" />
          </motion.button>
        </div>
        
        <p className="text-gray-400 mb-4 text-sm">{description}</p>
        
        <div className="space-y-3">
          {activities.length === 0 ? (
            <div className="text-center py-6 text-gray-400">{noActivitiesText}</div>
          ) : (
            activities.map((activity, index) => (
              <div 
                key={index}
                className="p-3 bg-black/20 rounded-lg border border-purple-900/20 hover:border-purple-500/30 transition-colors flex items-center justify-between"
              >
                <div className="flex flex-col">
                  <div className="font-medium text-white">
                    <TranslatedText keyName={activity.type} fallback={activity.type.replace("dashboard.activity.", "")} />
                  </div>
                  <div className="text-xs text-gray-400">{activity.date}</div>
                </div>
                <div className="flex flex-col items-end">
                  <div className="font-semibold text-neon-green">{activity.amount}</div>
                  <div className="text-xs px-2 py-0.5 rounded-full bg-purple-900/30 border border-purple-800/30">
                    <TranslatedText keyName={activity.status} fallback={activity.status.replace("dashboard.status.", "")} />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivities;
