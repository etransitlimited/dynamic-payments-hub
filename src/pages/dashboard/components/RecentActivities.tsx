
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
  pendingText
}: RecentActivitiesProps) => {
  return (
    <Card className="col-span-1 lg:col-span-2 bg-gradient-to-r from-[rgb(142,45,226)] to-[rgb(74,0,224)] border-purple-900/50 shadow-lg shadow-purple-900/10 hover:shadow-[0_0_15px_rgba(142,45,226,0.15)] transition-all duration-300 overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
      <CardHeader className="relative z-10 pb-3">
        <CardTitle className="text-white">{title}</CardTitle>
        <CardDescription className="text-purple-200/80">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="relative z-10">
        {activities.length > 0 ? (
          <div className="space-y-4">
            {activities.map((activity, index) => (
              <ActivityItem 
                key={index}
                type={activity.type}
                amount={activity.amount}
                date={activity.date}
                status={activity.status}
                depositText={depositText}
                applyCardText={applyCardText}
                inviteUserText={inviteUserText}
                completedText={completedText}
                pendingText={pendingText}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-10 text-purple-300">
            {noActivitiesText}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentActivities;
