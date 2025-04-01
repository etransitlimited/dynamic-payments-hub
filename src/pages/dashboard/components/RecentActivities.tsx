
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, CreditCard, User } from "lucide-react";
import ActivityItem from "./ActivityItem";

interface Activity {
  type: string;
  amount: string;
  date: string;
  status: string;
}

interface RecentActivitiesProps {
  title: string;
  description: string;
  activities: Activity[];
  noActivitiesText: string;
  depositText: string;
  applyCardText: string;
  inviteUserText: string;
  completedText: string;
  pendingText: string;
}

const RecentActivities = ({
  title,
  description,
  activities,
  noActivitiesText,
  depositText,
  applyCardText,
  inviteUserText,
  completedText,
  pendingText,
}: RecentActivitiesProps) => {
  const getIcon = (type: string) => {
    if (type === depositText) return <Calendar className="h-8 w-8 text-blue-400" />;
    if (type === applyCardText) return <CreditCard className="h-8 w-8 text-purple-400" />;
    if (type === inviteUserText) return <User className="h-8 w-8 text-green-400" />;
    return <Calendar className="h-8 w-8 text-blue-400" />;
  };

  return (
    <Card className="bg-gradient-to-r from-[rgb(57,106,252)] to-[rgb(41,72,255)] border-purple-900/50 shadow-lg shadow-purple-900/10 hover:shadow-[0_0_15px_rgba(57,106,252,0.15)] transition-all duration-300 col-span-2 overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
      <CardHeader className="relative z-10">
        <CardTitle className="text-white">{title}</CardTitle>
        <CardDescription className="text-blue-200/80">{description}</CardDescription>
      </CardHeader>
      <CardContent className="relative z-10">
        {activities.length === 0 ? (
          <div className="text-center py-6 text-blue-200/80">{noActivitiesText}</div>
        ) : (
          <div className="space-y-4">
            {activities.map((activity, index) => (
              <ActivityItem
                key={index}
                icon={getIcon(activity.type)}
                title={activity.type}
                amount={activity.amount}
                date={activity.date}
                status={activity.status}
                isCompleted={activity.status === completedText}
                isPending={activity.status === pendingText}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentActivities;
