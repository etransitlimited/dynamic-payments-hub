
import React, { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import TranslatedText from "@/components/translation/TranslatedText";
import { Shield, Smartphone, Key, Clock } from "lucide-react";

const SecurityTab: React.FC = () => {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [loginNotifications, setLoginNotifications] = useState(true);
  const [rememberDevices, setRememberDevices] = useState(true);
  const [sessionTimeout, setSessionTimeout] = useState(false);

  const handleTwoFactorToggle = () => {
    const newValue = !twoFactorEnabled;
    setTwoFactorEnabled(newValue);
    if (newValue) {
      toast.success("Two-factor authentication enabled");
    } else {
      toast.warning("Two-factor authentication disabled");
    }
  };

  const handleLoginNotificationsToggle = () => {
    const newValue = !loginNotifications;
    setLoginNotifications(newValue);
    if (newValue) {
      toast.success("Login notifications enabled");
    } else {
      toast.info("Login notifications disabled");
    }
  };

  const handleRememberDevicesToggle = () => {
    setRememberDevices(!rememberDevices);
  };

  const handleSessionTimeoutToggle = () => {
    setSessionTimeout(!sessionTimeout);
  };

  const securityMeasures = [
    {
      id: "two-factor",
      title: "accountInfo.security.twoFactor",
      titleFallback: "Two-factor Authentication",
      description: "accountInfo.security.twoFactorDesc",
      descriptionFallback: "Secure your account with a second verification step when you sign in.",
      enabled: twoFactorEnabled,
      toggle: handleTwoFactorToggle,
      icon: <Shield className="h-5 w-5 text-blue-400" />,
      action: {
        text: "accountInfo.security.configure",
        fallback: "Configure",
      },
    },
    {
      id: "login-notifications",
      title: "accountInfo.security.loginNotifications",
      titleFallback: "Login Notifications",
      description: "accountInfo.security.loginNotificationsDesc",
      descriptionFallback: "Get notified when someone logs into your account.",
      enabled: loginNotifications,
      toggle: handleLoginNotificationsToggle,
      icon: <Smartphone className="h-5 w-5 text-blue-400" />,
    },
    {
      id: "remember-devices",
      title: "accountInfo.security.rememberDevices",
      titleFallback: "Remember Trusted Devices",
      description: "accountInfo.security.rememberDevicesDesc",
      descriptionFallback: "Stay signed in on the devices you use frequently.",
      enabled: rememberDevices,
      toggle: handleRememberDevicesToggle,
      icon: <Key className="h-5 w-5 text-blue-400" />,
    },
    {
      id: "session-timeout",
      title: "accountInfo.security.sessionTimeout",
      titleFallback: "Auto Session Timeout",
      description: "accountInfo.security.sessionTimeoutDesc",
      descriptionFallback: "Automatically sign out after 30 minutes of inactivity.",
      enabled: sessionTimeout,
      toggle: handleSessionTimeoutToggle,
      icon: <Clock className="h-5 w-5 text-blue-400" />,
      action: {
        text: "accountInfo.security.configure",
        fallback: "Configure",
      },
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-medium text-white mb-4">
          <TranslatedText keyName="accountInfo.security.title" fallback="Account Security" />
        </h2>
        <p className="text-gray-400 mb-6">
          <TranslatedText keyName="accountInfo.security.description" fallback="Manage your account security settings and enable additional protection." />
        </p>

        <div className="grid gap-4 md:grid-cols-2">
          {securityMeasures.map((measure) => (
            <Card key={measure.id} className="border border-blue-800/20 bg-gradient-to-br from-blue-950/50 to-indigo-950/40 p-5">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    {measure.icon}
                    <h3 className="text-lg font-medium text-white">
                      <TranslatedText keyName={measure.title} fallback={measure.titleFallback} />
                    </h3>
                  </div>
                  <Switch 
                    checked={measure.enabled} 
                    onCheckedChange={measure.toggle} 
                    className="data-[state=checked]:bg-purple-600"
                  />
                </div>
                <p className="text-sm text-gray-400 mb-4 flex-grow">
                  <TranslatedText keyName={measure.description} fallback={measure.descriptionFallback} />
                </p>
                {measure.action && (
                  <Button 
                    variant="outline" 
                    className="border-blue-800/30 hover:bg-blue-900/20 text-white self-start"
                    disabled={!measure.enabled}
                  >
                    <TranslatedText keyName={measure.action.text} fallback={measure.action.fallback} />
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-8">
          <h3 className="text-lg font-medium text-white mb-4">
            <TranslatedText keyName="accountInfo.security.recentActivity" fallback="Recent Account Activity" />
          </h3>
          <Card className="border border-blue-800/20 bg-gradient-to-br from-blue-950/50 to-indigo-950/40 p-5">
            <ul className="space-y-4">
              {[
                {
                  action: "Login successful",
                  device: "Chrome on Windows",
                  location: "Hong Kong",
                  time: "Today, 10:25 AM",
                },
                {
                  action: "Password changed",
                  device: "Chrome on Windows",
                  location: "Hong Kong",
                  time: "Aug 15, 2023, 4:30 PM",
                },
                {
                  action: "Login successful",
                  device: "Safari on iPhone",
                  location: "Hong Kong",
                  time: "Aug 12, 2023, 9:15 AM",
                }
              ].map((activity, index) => (
                <li key={index} className="flex items-start justify-between border-b border-blue-800/10 pb-3 last:border-0">
                  <div>
                    <p className="text-white font-medium">{activity.action}</p>
                    <p className="text-sm text-gray-400">{activity.device}</p>
                    <p className="text-xs text-gray-500">{activity.location} • {activity.time}</p>
                  </div>
                  {index === 0 && (
                    <span className="text-xs font-medium px-2 py-1 bg-green-500/20 text-green-300 rounded-full">
                      Current
                    </span>
                  )}
                </li>
              ))}
            </ul>
            <div className="mt-4 text-center">
              <Button 
                variant="outline" 
                className="border-blue-800/30 hover:bg-blue-900/20 text-white"
              >
                <TranslatedText keyName="accountInfo.security.viewAllActivity" fallback="View All Activity" />
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SecurityTab;
