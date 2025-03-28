
import React from "react";
import { Calendar, Wallet, CreditCard, User } from "lucide-react";

interface ActivityItemProps {
  type: string;
  amount: string;
  date: string;
  status: string;
  depositText: string;
  applyCardText: string;
  inviteUserText: string;
  completedText: string;
  pendingText: string;
}

const ActivityItem = ({ 
  type, 
  amount, 
  date, 
  status,
  depositText,
  applyCardText,
  inviteUserText,
  completedText,
  pendingText
}: ActivityItemProps) => {
  const getActivityIcon = () => {
    if (type === depositText) {
      return (
        <div className="bg-blue-500/20 p-2 rounded-full">
          <Wallet className="h-5 w-5 text-blue-400" />
        </div>
      );
    }
    if (type === applyCardText) {
      return (
        <div className="bg-purple-500/20 p-2 rounded-full">
          <CreditCard className="h-5 w-5 text-purple-400" />
        </div>
      );
    }
    if (type === inviteUserText) {
      return (
        <div className="bg-green-500/20 p-2 rounded-full">
          <User className="h-5 w-5 text-green-400" />
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex items-center p-3 bg-blue-900/30 rounded-lg border border-blue-800/30 hover:bg-blue-800/30 transition-colors">
      <div className="mr-3">
        {getActivityIcon()}
      </div>
      <div className="flex-1">
        <p className="text-white font-medium">{type}</p>
        <div className="flex items-center text-sm text-blue-300">
          <Calendar className="h-3 w-3 mr-1" />
          <span>{date}</span>
        </div>
      </div>
      <div className="text-right">
        <p className="text-white">{amount}</p>
        {status === completedText ? (
          <span className="inline-block px-2 py-0.5 text-xs rounded-full bg-green-600/20 text-green-300 border border-green-500/20">
            {status}
          </span>
        ) : (
          <span className="inline-block px-2 py-0.5 text-xs rounded-full bg-yellow-600/20 text-yellow-300 border border-yellow-500/20">
            {status}
          </span>
        )}
      </div>
    </div>
  );
};

export default ActivityItem;
