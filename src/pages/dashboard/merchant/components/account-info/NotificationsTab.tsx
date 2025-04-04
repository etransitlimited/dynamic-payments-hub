
import React, { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Bell, MessageSquare, Mail, Calendar, Smartphone } from "lucide-react";
import TranslatedText from "@/components/translation/TranslatedText";

const NotificationsTab: React.FC = () => {
  const [notificationSettings, setNotificationSettings] = useState({
    email: {
      transactions: true,
      security: true,
      promotions: false,
      system: true,
    },
    push: {
      transactions: true,
      security: true,
      promotions: true,
      system: true,
    },
    sms: {
      transactions: false,
      security: true,
      promotions: false,
      system: false,
    }
  });

  const handleToggle = (category: keyof typeof notificationSettings, type: keyof typeof notificationSettings.email) => {
    setNotificationSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [type]: !prev[category][type]
      }
    }));
    
    const isEnabled = !notificationSettings[category][type];
    const message = isEnabled 
      ? `${category.charAt(0).toUpperCase() + category.slice(1)} notifications for ${type} enabled` 
      : `${category.charAt(0).toUpperCase() + category.slice(1)} notifications for ${type} disabled`;
    
    toast.success(message);
  };
  
  const handleSavePreferences = () => {
    toast.success("Notification preferences saved successfully");
  };
  
  const notificationCategories = [
    {
      id: "transactions",
      title: "accountInfo.notifications.transactions",
      titleFallback: "Transaction Notifications",
      description: "accountInfo.notifications.transactionsDesc",
      descriptionFallback: "Get notified about deposits, withdrawals, and other account transactions.",
      icon: <Bell className="h-5 w-5 text-blue-400" />,
    },
    {
      id: "security",
      title: "accountInfo.notifications.security",
      titleFallback: "Security Alerts",
      description: "accountInfo.notifications.securityDesc",
      descriptionFallback: "Important alerts about login attempts, password changes, and security issues.",
      icon: <Smartphone className="h-5 w-5 text-blue-400" />,
    },
    {
      id: "system",
      title: "accountInfo.notifications.system",
      titleFallback: "System Updates",
      description: "accountInfo.notifications.systemDesc",
      descriptionFallback: "Platform updates, maintenance schedules, and service announcements.",
      icon: <Calendar className="h-5 w-5 text-blue-400" />,
    },
    {
      id: "promotions",
      title: "accountInfo.notifications.promotions",
      titleFallback: "Marketing & Promotions",
      description: "accountInfo.notifications.promotionsDesc",
      descriptionFallback: "News about new services, special offers, and promotions.",
      icon: <MessageSquare className="h-5 w-5 text-blue-400" />,
    }
  ];

  const notificationChannels = [
    {
      id: "email",
      title: "accountInfo.notifications.email",
      titleFallback: "Email Notifications",
      icon: <Mail className="h-5 w-5" />,
    },
    {
      id: "push",
      title: "accountInfo.notifications.push",
      titleFallback: "Push Notifications",
      icon: <Bell className="h-5 w-5" />,
    },
    {
      id: "sms",
      title: "accountInfo.notifications.sms",
      titleFallback: "SMS Notifications",
      icon: <Smartphone className="h-5 w-5" />,
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-medium text-white mb-4">
          <TranslatedText keyName="accountInfo.notifications.title" fallback="Notification Preferences" />
        </h2>
        <p className="text-gray-400 mb-6">
          <TranslatedText 
            keyName="accountInfo.notifications.description" 
            fallback="Customize how and when you receive notifications from our platform." 
          />
        </p>

        <Card className="border border-blue-800/20 bg-gradient-to-br from-blue-950/50 to-indigo-950/40 p-5 mb-6">
          <div className="overflow-x-auto">
            <table className="w-full mb-4">
              <thead>
                <tr>
                  <th className="text-left pb-4 text-gray-400 font-normal">
                    <TranslatedText keyName="accountInfo.notifications.notificationType" fallback="Notification Type" />
                  </th>
                  {notificationChannels.map(channel => (
                    <th key={channel.id} className="text-center pb-4 text-gray-400 font-normal">
                      <div className="flex items-center justify-center gap-2">
                        {channel.icon}
                        <TranslatedText keyName={channel.title} fallback={channel.titleFallback} />
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {notificationCategories.map(category => (
                  <tr key={category.id} className="border-t border-blue-800/10">
                    <td className="py-4 pr-4">
                      <div className="flex items-center gap-2">
                        {category.icon}
                        <div>
                          <p className="text-white">
                            <TranslatedText keyName={category.title} fallback={category.titleFallback} />
                          </p>
                          <p className="text-xs text-gray-400 mt-1 max-w-xs">
                            <TranslatedText keyName={category.description} fallback={category.descriptionFallback} />
                          </p>
                        </div>
                      </div>
                    </td>
                    {notificationChannels.map(channel => (
                      <td key={`${category.id}-${channel.id}`} className="text-center py-4">
                        <Switch 
                          checked={notificationSettings[channel.id as keyof typeof notificationSettings][category.id as keyof typeof notificationSettings.email]}
                          onCheckedChange={() => handleToggle(
                            channel.id as keyof typeof notificationSettings, 
                            category.id as keyof typeof notificationSettings.email
                          )}
                          className="data-[state=checked]:bg-purple-600"
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Button 
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            onClick={handleSavePreferences}
          >
            <TranslatedText keyName="accountInfo.notifications.savePreferences" fallback="Save Preferences" />
          </Button>
        </Card>

        <Card className="border border-blue-800/20 bg-gradient-to-br from-blue-950/50 to-indigo-950/40 p-5">
          <h3 className="text-lg font-medium text-white mb-4">
            <TranslatedText keyName="accountInfo.notifications.scheduleTitle" fallback="Notification Schedule" />
          </h3>
          <p className="text-sm text-gray-400 mb-4">
            <TranslatedText 
              keyName="accountInfo.notifications.scheduleDesc" 
              fallback="Set your preferred time for receiving non-critical notifications." 
            />
          </p>

          <div className="flex flex-col md:flex-row gap-4 md:items-center">
            <div className="flex-1">
              <div className="flex items-center justify-between p-3 border border-blue-800/30 rounded-md bg-blue-900/20">
                <div>
                  <p className="text-white">
                    <TranslatedText keyName="accountInfo.notifications.dailyDigest" fallback="Daily Digest" />
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    <TranslatedText keyName="accountInfo.notifications.deliveredAt" fallback="Delivered at 08:00 AM" />
                  </p>
                </div>
                <Switch 
                  checked={true} 
                  className="data-[state=checked]:bg-purple-600"
                />
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between p-3 border border-blue-800/30 rounded-md bg-blue-900/20">
                <div>
                  <p className="text-white">
                    <TranslatedText keyName="accountInfo.notifications.weeklyReport" fallback="Weekly Summary" />
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    <TranslatedText keyName="accountInfo.notifications.everyMonday" fallback="Every Monday" />
                  </p>
                </div>
                <Switch 
                  checked={true} 
                  className="data-[state=checked]:bg-purple-600"
                />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default NotificationsTab;
