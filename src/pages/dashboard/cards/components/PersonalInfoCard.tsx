
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { CreditCard, Calendar, UserCircle, Phone, IdCard } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format, parse, isValid } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { useLanguage } from "@/context/LanguageContext";
import TranslatedText from "@/components/translation/TranslatedText";
import { useSafeTranslation } from "@/hooks/use-safe-translation";

interface PersonalInfoCardProps {
  birthdate: Date | string | undefined;
  setBirthdate: (date: Date | undefined) => void;
}

const PersonalInfoCard = ({ birthdate, setBirthdate }: PersonalInfoCardProps) => {
  const { language } = useLanguage();
  const { t } = useSafeTranslation();
  
  // Convert string date to Date object if needed
  const getDateObject = (date: Date | string | undefined): Date | undefined => {
    if (!date) return undefined;
    if (typeof date === 'string') {
      try {
        // Try to parse the string date in different formats
        if (date.includes('-')) {
          const parsedDate = parse(date, 'yyyy-MM-dd', new Date());
          return isValid(parsedDate) ? parsedDate : undefined;
        } else if (date.includes('/')) {
          const parsedDate = parse(date, 'MM/dd/yyyy', new Date());
          return isValid(parsedDate) ? parsedDate : undefined;
        }
        const dateObj = new Date(date);
        return isValid(dateObj) ? dateObj : undefined;
      } catch (error) {
        console.error("Error parsing date:", error);
        return undefined;
      }
    }
    return date;
  };
  
  const dateObject = getDateObject(birthdate);
  
  const formatDate = (date: Date | string | undefined): string => {
    try {
      if (!date) return '';
      
      const dateObj = typeof date === 'string' ? getDateObject(date) : date;
      if (!dateObj) return '';
      
      // Format date according to locale conventions
      if (language === 'zh-CN' || language === 'zh-TW') {
        return format(dateObj, 'yyyy-MM-dd');
      } else if (language === 'fr') {
        return format(dateObj, 'dd/MM/yyyy');
      } else if (language === 'es') {
        return format(dateObj, 'dd/MM/yyyy');
      } else {
        return format(dateObj, 'MM/dd/yyyy');
      }
    } catch (error) {
      console.error("Error formatting date:", error);
      return '';
    }
  };
  
  const handleDateChange = (date: Date | undefined) => {
    setBirthdate(date);
  };
  
  return (
    <Card className="bg-gradient-to-br from-[#2E1065] to-[#3A0080] border-purple-900/40 shadow-lg shadow-purple-900/20 overflow-hidden relative group hover:shadow-[0_0_25px_rgba(139,92,246,0.2)] transition-all duration-500">
      <div className="absolute inset-0 bg-grid-white/[0.03] [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-neon-green/[0.02] rounded-full blur-3xl"></div>
      
      <CardHeader className="relative z-10 pb-2">
        <div className="flex items-center gap-3 mb-2">
          <span className="bg-gradient-to-br from-purple-500/30 to-purple-700/30 p-2.5 rounded-lg">
            <UserCircle size={18} className="text-purple-300" />
          </span>
          <CardTitle className="text-xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
            <TranslatedText keyName="cards.apply.personalInfo" fallback="Personal Information" />
          </CardTitle>
        </div>
        <CardDescription className="text-purple-200/70">
          <TranslatedText keyName="cards.apply.personalInfoDesc" fallback="Enter applicant's basic information" />
        </CardDescription>
      </CardHeader>
      
      <CardContent className="relative z-10 space-y-6 pt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <label className="text-sm font-medium text-purple-100 block">
              <TranslatedText keyName="cards.apply.name" fallback="Name" />
            </label>
            <div className="relative">
              <UserCircle className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-purple-300 pointer-events-none" />
              <Input 
                placeholder="John Doe" 
                className="pl-10 bg-purple-950/50 border-purple-700/40 text-white placeholder-purple-300/40 focus:border-purple-500/70 focus:ring-purple-500/30 hover:bg-purple-900/30 transition-colors" 
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-purple-100 block">
              <TranslatedText keyName="cards.apply.phone" fallback="Phone Number" />
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-purple-300 pointer-events-none" />
              <Input 
                placeholder="+1 (555) 000-0000" 
                className="pl-10 bg-purple-950/50 border-purple-700/40 text-white placeholder-purple-300/40 focus:border-purple-500/70 focus:ring-purple-500/30 hover:bg-purple-900/30 transition-colors" 
              />
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <label className="text-sm font-medium text-purple-100 block">
              <TranslatedText keyName="cards.apply.idNumber" fallback="ID Number" />
            </label>
            <div className="relative">
              <IdCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-purple-300 pointer-events-none" />
              <Input 
                placeholder="123-45-6789" 
                className="pl-10 bg-purple-950/50 border-purple-700/40 text-white placeholder-purple-300/40 focus:border-purple-500/70 focus:ring-purple-500/30 hover:bg-purple-900/30 transition-colors" 
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-purple-100 block">
              <TranslatedText keyName="cards.apply.birthdate" fallback="Birth Date" />
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-purple-300 z-10 pointer-events-none" />
                  <button 
                    type="button"
                    className={cn(
                      "w-full bg-purple-950/50 border border-purple-700/40 text-white placeholder-purple-300/40 pl-10 py-2 rounded-md text-left font-normal hover:bg-purple-900/30 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500/70",
                      !birthdate && "text-purple-300/50"
                    )}
                  >
                    {birthdate ? formatDate(birthdate) : <TranslatedText keyName="cards.apply.birthdate" fallback="Birth Date" />}
                  </button>
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-[#1e123a] border-purple-700/50">
                <CalendarComponent
                  mode="single"
                  selected={dateObject}
                  onSelect={handleDateChange}
                  className="bg-[#1e123a] text-white border-purple-700/50 pointer-events-auto"
                  disabled={(date) => date > new Date()}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-purple-100 block">
            <TranslatedText keyName="cards.apply.address" fallback="Address" />
          </label>
          <Input 
            placeholder="123 Main St, City, Country" 
            className="bg-purple-950/50 border-purple-700/40 text-white placeholder-purple-300/40 focus:border-purple-500/70 focus:ring-purple-500/30 hover:bg-purple-900/30 transition-colors" 
          />
        </div>
        
        <div className="relative mt-6 p-3 bg-gradient-to-r from-purple-600/20 to-purple-800/20 rounded-lg border border-purple-600/30">
          <div className="absolute -inset-[0.5px] bg-gradient-to-r from-purple-500/50 to-purple-700/50 rounded-lg blur-[2px] opacity-50"></div>
          <div className="relative flex items-center gap-3">
            <span className="p-1 bg-purple-500/20 rounded-full">
              <CreditCard size={16} className="text-purple-300" />
            </span>
            <p className="text-sm text-purple-200">
              <TranslatedText 
                keyName="cards.apply.cardApplicationNote" 
                fallback={t("cards.apply.accuracyNote", "Please ensure all information is accurate for faster application processing.")} 
              />
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonalInfoCard;
