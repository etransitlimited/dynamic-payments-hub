
import React, { useEffect, useMemo, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useSafeTranslation } from "@/hooks/use-safe-translation";
import { ArrowUp, ArrowDown, ArrowRight, Users, CreditCard, DollarSign, Activity } from "lucide-react";
import { formatDirectTranslation } from "@/utils/translationHelpers";
import { LanguageCode } from "@/utils/languageUtils";

// Mock data for stat cards
const stats = [
  {
    id: "users",
    title: "analytics.activeUsers",
    value: "2,897",
    change: 12.5,
    trend: "up",
    icon: Users,
  },
  // ... more stats
];

const StatCards = () => {
  const { t, language, refreshCounter } = useSafeTranslation();
  const cardsRef = useRef<HTMLDivElement>(null);
  const stableLanguageRef = useRef<LanguageCode>(language as LanguageCode);

  // Generate stable key for animations
  const cardsKey = useMemo(() => 
    `stat-cards-${language}-${refreshCounter || 0}`, 
    [language, refreshCounter]
  );
  
  // Update language reference without causing re-renders
  useEffect(() => {
    if (language !== stableLanguageRef.current) {
      stableLanguageRef.current = language as LanguageCode;
      
      if (cardsRef.current) {
        cardsRef.current.setAttribute('data-language', language);
      }
    }
  }, [language]);

  // Function to render trend icon
  const renderTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <ArrowUp className="h-3 w-3 text-green-400" />;
      case "down":
        return <ArrowDown className="h-3 w-3 text-red-400" />;
      default:
        return <ArrowRight className="h-3 w-3 text-blue-400" />;
    }
  };

  // Function to get change text with proper format
  const getChangeText = (change: number) => {
    const isPositive = change >= 0;
    const absChange = Math.abs(change);
    
    return formatDirectTranslation(
      t(isPositive ? "analytics.positiveChange" : "analytics.negativeChange", 
        isPositive ? "+{value}%" : "-{value}%"),
      { value: absChange }
    );
  };

  return (
    <div 
      ref={cardsRef} 
      key={cardsKey}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6" 
      data-language={stableLanguageRef.current}
    >
      {stats.map((stat) => (
        <Card 
          key={`${stat.id}-${stableLanguageRef.current}`} 
          className="border-purple-900/30 bg-gradient-to-br from-charcoal-light/50 to-charcoal-dark/50 backdrop-blur-md overflow-hidden shadow-lg relative rounded-xl transition-all duration-300 hover:shadow-[0_0_15px_rgba(142,45,226,0.15)]"
        >
          <CardContent className="p-4 sm:p-6 relative z-10">
            <div className="flex justify-between items-start mb-3">
              <div className="bg-purple-900/30 p-2 rounded-lg border border-purple-500/20">
                <stat.icon className="h-5 w-5 text-purple-300" />
              </div>
              <div className="flex items-center bg-charcoal-dark/50 px-2 py-1 rounded text-xs">
                {renderTrendIcon(stat.trend)}
                <span className={`ml-1 ${stat.trend === "up" ? "text-green-400" : stat.trend === "down" ? "text-red-400" : "text-blue-400"}`}>
                  {getChangeText(stat.change)}
                </span>
              </div>
            </div>
            <h3 className="text-gray-400 text-sm font-medium mb-1">
              {t(stat.title, stat.title.split('.').pop())}
            </h3>
            <p className="text-white text-2xl font-bold tracking-wide">
              {stat.value}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default React.memo(StatCards);
