
import React, { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import TranslatedText from "@/components/translation/TranslatedText";
import { Shield, Smartphone, Key, Clock, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const SecurityTab: React.FC = () => {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [loginNotifications, setLoginNotifications] = useState(true);
  const [rememberDevices, setRememberDevices] = useState(true);
  const [sessionTimeout, setSessionTimeout] = useState(false);
  const [timeoutDialogOpen, setTimeoutDialogOpen] = useState(false);
  const [timeoutDuration, setTimeoutDuration] = useState("30");
  const [customDuration, setCustomDuration] = useState("");
  const [showCustomDuration, setShowCustomDuration] = useState(false);

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
    if (!sessionTimeout) {
      // Open configuration dialog when enabling
      setTimeoutDialogOpen(true);
    }
  };

  const handleTimeoutChange = (value: string) => {
    if (value === "custom") {
      setShowCustomDuration(true);
    } else {
      setShowCustomDuration(false);
      setTimeoutDuration(value);
    }
  };

  const handleSaveTimeoutSettings = () => {
    const finalDuration = timeoutDuration === "custom" ? customDuration : timeoutDuration;
    
    toast.success(
      <div className="flex flex-col">
        <span>
          <TranslatedText 
            keyName="accountInfo.security.timeoutConfigured" 
            fallback="Auto session timeout configured" 
          />
        </span>
        <span className="text-xs text-gray-300">
          <TranslatedText 
            keyName="accountInfo.security.timeoutDurationSet" 
            fallback="Duration set to {minutes} minutes" 
            values={{minutes: finalDuration}} 
          />
        </span>
      </div>
    );
    setTimeoutDialogOpen(false);
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
        onClick: () => setTimeoutDialogOpen(true),
      },
    },
  ];

  const recentActivities = [
    {
      action: "accountInfo.security.activity.login",
      actionFallback: "Login successful",
      device: "accountInfo.security.activity.device.chrome",
      deviceFallback: "Chrome on Windows",
      location: "accountInfo.security.activity.location.hongKong",
      locationFallback: "Hong Kong",
      time: "accountInfo.security.activity.time.today",
      timeFallback: "Today, 10:25 AM",
      current: true
    },
    {
      action: "accountInfo.security.activity.passwordChanged",
      actionFallback: "Password changed",
      device: "accountInfo.security.activity.device.chrome",
      deviceFallback: "Chrome on Windows",
      location: "accountInfo.security.activity.location.hongKong",
      locationFallback: "Hong Kong",
      time: "accountInfo.security.activity.time.august15",
      timeFallback: "Aug 15, 2023, 4:30 PM",
      current: false
    },
    {
      action: "accountInfo.security.activity.login",
      actionFallback: "Login successful",
      device: "accountInfo.security.activity.device.safari",
      deviceFallback: "Safari on iPhone",
      location: "accountInfo.security.activity.location.hongKong",
      locationFallback: "Hong Kong",
      time: "accountInfo.security.activity.time.august12",
      timeFallback: "Aug 12, 2023, 9:15 AM",
      current: false
    }
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
                    onClick={measure.action.onClick}
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
              {recentActivities.map((activity, index) => (
                <li key={index} className="flex items-start justify-between border-b border-blue-800/10 pb-3 last:border-0">
                  <div>
                    <p className="text-white font-medium">
                      <TranslatedText keyName={activity.action} fallback={activity.actionFallback} />
                    </p>
                    <p className="text-sm text-gray-400">
                      <TranslatedText keyName={activity.device} fallback={activity.deviceFallback} />
                    </p>
                    <p className="text-xs text-gray-500">
                      <TranslatedText keyName={activity.location} fallback={activity.locationFallback} /> • <TranslatedText keyName={activity.time} fallback={activity.timeFallback} />
                    </p>
                  </div>
                  {activity.current && (
                    <span className="text-xs font-medium px-2 py-1 bg-green-500/20 text-green-300 rounded-full">
                      <TranslatedText keyName="accountInfo.security.activity.current" fallback="Current" />
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

      {/* Session Timeout Configuration Dialog */}
      <Dialog open={timeoutDialogOpen} onOpenChange={setTimeoutDialogOpen}>
        <DialogContent className="bg-slate-900 border border-blue-800/30 text-white">
          <DialogHeader>
            <DialogTitle>
              <TranslatedText keyName="accountInfo.security.configureTimeout" fallback="Configure Session Timeout" />
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              <TranslatedText keyName="accountInfo.security.configureTimeoutDesc" fallback="Set how long before automatically signing you out due to inactivity." />
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <Label htmlFor="timeout-duration" className="block mb-2">
              <TranslatedText keyName="accountInfo.security.timeoutDuration" fallback="Timeout Duration" />
            </Label>
            <Select value={timeoutDuration} onValueChange={handleTimeoutChange}>
              <SelectTrigger className="w-full bg-slate-800 border-blue-800/30">
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-blue-800/30 text-white">
                <SelectItem value="5">
                  <TranslatedText keyName="accountInfo.security.minutes" fallback="{minutes} minutes" values={{minutes: 5}} />
                </SelectItem>
                <SelectItem value="15">
                  <TranslatedText keyName="accountInfo.security.minutes" fallback="{minutes} minutes" values={{minutes: 15}} />
                </SelectItem>
                <SelectItem value="30">
                  <TranslatedText keyName="accountInfo.security.minutes" fallback="{minutes} minutes" values={{minutes: 30}} />
                </SelectItem>
                <SelectItem value="60">
                  <TranslatedText keyName="accountInfo.security.minutes" fallback="{minutes} minutes" values={{minutes: 60}} />
                </SelectItem>
                <SelectItem value="custom">
                  <TranslatedText keyName="accountInfo.security.customTime" fallback="Custom time" />
                </SelectItem>
              </SelectContent>
            </Select>
            
            {showCustomDuration && (
              <div className="mt-4">
                <Label htmlFor="custom-duration" className="block mb-2">
                  <TranslatedText keyName="accountInfo.security.customDuration" fallback="Custom Duration (minutes)" />
                </Label>
                <Input
                  id="custom-duration"
                  type="number"
                  value={customDuration}
                  onChange={(e) => setCustomDuration(e.target.value)}
                  min="1"
                  className="bg-slate-800 border-blue-800/30 text-white w-full"
                  placeholder="Enter minutes"
                />
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setTimeoutDialogOpen(false)} className="border-blue-800/30">
              <TranslatedText keyName="common.cancel" fallback="Cancel" />
            </Button>
            <Button onClick={handleSaveTimeoutSettings} className="bg-purple-600 hover:bg-purple-700">
              <TranslatedText keyName="common.save" fallback="Save" />
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SecurityTab;
