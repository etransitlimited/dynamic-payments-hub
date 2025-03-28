
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
    <Card className="col-span-1 lg:col-span-2 bg-gradient-to-br from-blue-900/90 to-blue-950/90 border-blue-800/30 shadow-lg shadow-blue-900/20 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-white">{title}</CardTitle>
        <CardDescription className="text-blue-300">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
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
          <div className="text-center py-10 text-blue-300">
            {noActivitiesText}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentActivities;
