
import React, { ReactNode } from "react";
import { motion } from "framer-motion";

export interface ActivityItemProps {
  icon: ReactNode;
  title: string;
  amount: string;
  date: string;
  status: string;
  isCompleted: boolean;
  isPending: boolean;
}

const ActivityItem = ({ 
  icon, 
  title, 
  amount, 
  date, 
  status, 
  isCompleted, 
  isPending 
}: ActivityItemProps) => {
  return (
    <motion.div 
      className="flex items-center p-3 rounded-lg bg-white/10 border border-white/10 hover:bg-white/20 transition-colors"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <div className="bg-blue-900/30 p-2 rounded-lg mr-3">
        {icon}
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <div>
            <h4 className="text-white font-medium">{title}</h4>
            <p className="text-sm text-blue-200/80">{date}</p>
          </div>
          <div className="text-right">
            <p className="text-white font-semibold">{amount}</p>
            <p className={`text-xs ${isCompleted ? 'text-green-400' : isPending ? 'text-yellow-400' : 'text-red-400'}`}>
              {status}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ActivityItem;
