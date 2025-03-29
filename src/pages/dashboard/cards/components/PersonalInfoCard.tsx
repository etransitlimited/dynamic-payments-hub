
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CreditCard, Calendar, UserCircle, Phone } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { useLanguage } from "@/context/LanguageContext";

interface PersonalInfoCardProps {
  birthdate: Date | undefined;
  setBirthdate: (date: Date | undefined) => void;
}

const PersonalInfoCard = ({ birthdate, setBirthdate }: PersonalInfoCardProps) => {
  const { t, language } = useLanguage();
  
  const formatDate = (date: Date): string => {
    try {
      if (!date) return '';
      
      // Format date according to locale conventions
      if (language === 'zh-CN' || language === 'zh-TW') {
        return format(date, 'yyyy-MM-dd');
      } else if (language === 'fr') {
        return format(date, 'dd/MM/yyyy');
      } else if (language === 'es') {
        return format(date, 'dd/MM/yyyy');
      } else {
        return format(date, 'MM/dd/yyyy');
      }
    } catch (error) {
      console.error("Error formatting date:", error);
      return '';
    }
  };
  
  return (
    <Card className="lg:col-span-2 bg-gradient-to-br from-blue-900 to-blue-950 border-blue-900/50 shadow-lg shadow-blue-900/10 hover:shadow-[0_0_15px_rgba(0,243,255,0.15)] transition-all duration-300 overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
      <CardHeader className="relative z-10 pb-3">
        <CardTitle className="text-white flex items-center mb-1.5">
          <span className="bg-purple-500/20 p-2 rounded-full mr-2">
            <CreditCard size={18} className="text-purple-400" />
          </span>
          {t("cards.apply.personalInfo")}
        </CardTitle>
        <CardDescription className="text-blue-200/80">
          {t("cards.apply.personalInfoDesc")}
        </CardDescription>
      </CardHeader>
      <CardContent className="relative z-10 space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2.5">
            <label className="text-sm font-medium text-blue-200 block mb-1">{t("cards.apply.name")}</label>
            <div className="relative">
              <UserCircle className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-400 pointer-events-none" />
              <Input 
                placeholder={t("cards.apply.enterName")} 
                className="pl-10 bg-[#061428]/70 border-blue-900/50 text-white placeholder-blue-300/50 focus:border-blue-500/70 focus:ring-blue-500/30" 
              />
            </div>
          </div>
          <div className="space-y-2.5">
            <label className="text-sm font-medium text-blue-200 block mb-1">{t("cards.apply.phone")}</label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-400 pointer-events-none" />
              <Input 
                placeholder={t("cards.apply.enterPhone")} 
                className="pl-10 bg-[#061428]/70 border-blue-900/50 text-white placeholder-blue-300/50 focus:border-blue-500/70 focus:ring-blue-500/30" 
              />
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2.5">
            <label className="text-sm font-medium text-blue-200 block mb-1">{t("cards.apply.idNumber")}</label>
            <Input 
              placeholder={t("cards.apply.enterId")} 
              className="bg-[#061428]/70 border-blue-900/50 text-white placeholder-blue-300/50 focus:border-blue-500/70 focus:ring-blue-500/30" 
            />
          </div>
          <div className="space-y-2.5">
            <label className="text-sm font-medium text-blue-200 block mb-1">{t("cards.apply.birthdate")}</label>
            <Popover>
              <PopoverTrigger asChild>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-400 z-10 pointer-events-none" />
                  <Button 
                    variant="outline" 
                    className={cn(
                      "w-full bg-[#061428]/70 border-blue-900/50 text-white placeholder-blue-300/50 pl-10 justify-start text-left font-normal focus:border-blue-500/70 focus:ring-blue-500/30",
                      !birthdate && "text-blue-300/60"
                    )}
                  >
                    {birthdate ? formatDate(birthdate) : t("cards.apply.birthdate")}
                  </Button>
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-[#0A1A30] border-blue-800/70">
                <CalendarComponent
                  mode="single"
                  selected={birthdate}
                  onSelect={setBirthdate}
                  className="p-3 pointer-events-auto bg-[#0A1A30] text-white"
                  disabled={(date) => date > new Date()}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        
        <div className="space-y-2.5">
          <label className="text-sm font-medium text-blue-200 block mb-1">{t("cards.apply.address")}</label>
          <Input 
            placeholder={t("cards.apply.enterAddress")} 
            className="bg-[#061428]/70 border-blue-900/50 text-white placeholder-blue-300/50 focus:border-blue-500/70 focus:ring-blue-500/30" 
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonalInfoCard;
