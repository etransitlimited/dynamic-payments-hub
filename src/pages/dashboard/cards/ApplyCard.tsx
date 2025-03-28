
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CreditCard, Calendar, UserCircle, Phone, Check, Info, AlertCircle } from "lucide-react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLanguage } from "@/context/LanguageContext";

const ApplyCard = () => {
  const { t } = useLanguage();
  
  // Get guide items as array
  const guideItems = t("cards.apply.guideItems", { returnObjects: true }) as string[];
  
  return (
    <div className="space-y-6 container px-4 py-6 mx-auto">
      <div className="flex items-center mb-6">
        <div className="w-2 h-8 bg-purple-500 rounded-full mr-3"></div>
        <h1 className="text-2xl font-bold tracking-tight text-white">{t("cards.apply.title")}</h1>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 bg-gradient-to-br from-blue-900 to-blue-950 border-blue-900/50 shadow-lg shadow-blue-900/10 hover:shadow-[0_0_15px_rgba(0,243,255,0.15)] transition-all duration-300 overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
          <CardHeader className="relative z-10 pb-3">
            <CardTitle className="text-white flex items-center">
              <span className="bg-purple-500/20 p-2 rounded-full mr-2">
                <CreditCard size={18} className="text-purple-400" />
              </span>
              {t("cards.apply.personalInfo")}
            </CardTitle>
            <CardDescription className="text-blue-200/80">
              {t("cards.apply.personalInfoDesc")}
            </CardDescription>
          </CardHeader>
          <CardContent className="relative z-10 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-blue-200">{t("cards.apply.name")}</label>
                <div className="relative">
                  <UserCircle className="absolute left-3 top-2.5 h-4 w-4 text-blue-400" />
                  <Input 
                    placeholder={t("cards.apply.enterName")} 
                    className="pl-10 bg-[#061428]/70 border-blue-900/50 text-white placeholder-blue-300/40" 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-blue-200">{t("cards.apply.phone")}</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-2.5 h-4 w-4 text-blue-400" />
                  <Input 
                    placeholder={t("cards.apply.enterPhone")} 
                    className="pl-10 bg-[#061428]/70 border-blue-900/50 text-white placeholder-blue-300/40" 
                  />
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-blue-200">{t("cards.apply.idNumber")}</label>
                <Input 
                  placeholder={t("cards.apply.enterId")} 
                  className="bg-[#061428]/70 border-blue-900/50 text-white placeholder-blue-300/40" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-blue-200">{t("cards.apply.birthdate")}</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-blue-400" />
                  <Input 
                    type="date" 
                    className="pl-10 bg-[#061428]/70 border-blue-900/50 text-white" 
                  />
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-blue-200">{t("cards.apply.address")}</label>
              <Input 
                placeholder={t("cards.apply.enterAddress")} 
                className="bg-[#061428]/70 border-blue-900/50 text-white placeholder-blue-300/40" 
              />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-blue-900 to-blue-950 border-blue-900/50 shadow-lg shadow-blue-900/10 hover:shadow-[0_0_15px_rgba(0,243,255,0.15)] transition-all duration-300 overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
          <CardHeader className="relative z-10 pb-3">
            <CardTitle className="text-white flex items-center">
              <span className="bg-blue-500/20 p-2 rounded-full mr-2">
                <Info size={18} className="text-blue-400" />
              </span>
              {t("cards.apply.applicationGuide")}
            </CardTitle>
          </CardHeader>
          <CardContent className="relative z-10">
            <ul className="space-y-3 text-blue-200/80 list-disc pl-5">
              {guideItems && guideItems.map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
      
      <Card className="bg-gradient-to-br from-blue-900 to-blue-950 border-blue-900/50 shadow-lg shadow-blue-900/10 hover:shadow-[0_0_15px_rgba(0,243,255,0.15)] transition-all duration-300 overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
        <CardHeader className="relative z-10 pb-3">
          <CardTitle className="text-white flex items-center">
            <span className="bg-purple-500/20 p-2 rounded-full mr-2">
              <CreditCard size={18} className="text-purple-400" />
            </span>
            {t("cards.apply.cardInfo")}
          </CardTitle>
          <CardDescription className="text-blue-200/80">
            {t("cards.apply.cardInfoDesc")}
          </CardDescription>
        </CardHeader>
        <CardContent className="relative z-10 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-blue-200">{t("cards.apply.cardType")}</label>
              <Select>
                <SelectTrigger className="bg-[#061428]/70 border-blue-900/50 text-white">
                  <SelectValue placeholder={t("cards.apply.selectCardType")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">{t("cards.apply.standardCard")}</SelectItem>
                  <SelectItem value="gold">{t("cards.apply.goldCard")}</SelectItem>
                  <SelectItem value="platinum">{t("cards.apply.platinumCard")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-blue-200">{t("cards.apply.cardCurrency")}</label>
              <Select>
                <SelectTrigger className="bg-[#061428]/70 border-blue-900/50 text-white">
                  <SelectValue placeholder={t("cards.apply.selectCurrency")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cny">{t("cards.apply.cny")}</SelectItem>
                  <SelectItem value="usd">{t("cards.apply.usd")}</SelectItem>
                  <SelectItem value="eur">{t("cards.apply.eur")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-blue-200">{t("cards.apply.mailingAddress")}</label>
            <Input 
              placeholder={t("cards.apply.enterMailingAddress")} 
              className="bg-[#061428]/70 border-blue-900/50 text-white placeholder-blue-300/40" 
            />
          </div>
          
          <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-md">
            <div className="flex items-start">
              <AlertCircle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-yellow-200">
                {t("cards.apply.addressNote")}
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="relative z-10 border-t border-blue-900/50 pt-4 mt-2">
          <div className="flex flex-col sm:flex-row gap-3 w-full justify-end">
            <Button variant="outline" className="border-blue-600/60 text-white hover:bg-blue-900/20">
              {t("cards.apply.saveDraft")}
            </Button>
            <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
              <Check className="h-4 w-4" />
              <span>{t("cards.apply.submitApplication")}</span>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ApplyCard;
