
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CreditCard, Check, AlertCircle } from "lucide-react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLanguage } from "@/context/LanguageContext";

const CardInfoCard = () => {
  const { t } = useLanguage();
  
  return (
    <Card className="bg-gradient-to-r from-[rgb(142,45,226)] to-[rgb(74,0,224)] border-purple-900/50 shadow-lg shadow-purple-900/10 hover:shadow-[0_0_15px_rgba(142,45,226,0.15)] transition-all duration-300 overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
      <CardHeader className="relative z-10 pb-3">
        <CardTitle className="text-white flex items-center gap-3 mb-1.5">
          <span className="bg-purple-500/20 p-2 rounded-full">
            <CreditCard size={18} className="text-purple-300" />
          </span>
          {t("cards.apply.cardInfo")}
        </CardTitle>
        <CardDescription className="text-purple-200/80 mt-2">
          {t("cards.apply.cardInfoDesc")}
        </CardDescription>
      </CardHeader>
      <CardContent className="relative z-10 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2.5">
            <label className="text-sm font-medium text-purple-200 block mb-1">{t("cards.apply.cardType")}</label>
            <Select>
              <SelectTrigger className="bg-[#3a0080]/70 border-purple-900/50 text-white focus:border-purple-500/70 focus:ring-purple-500/30">
                <SelectValue placeholder={t("cards.apply.selectCardType")} />
              </SelectTrigger>
              <SelectContent className="bg-[#3a0080] border-purple-800/50 text-white">
                <SelectItem value="standard" className="text-white focus:bg-purple-800/50 hover:bg-purple-800/50">{t("cards.apply.standardCard")}</SelectItem>
                <SelectItem value="gold" className="text-white focus:bg-purple-800/50 hover:bg-purple-800/50">{t("cards.apply.goldCard")}</SelectItem>
                <SelectItem value="platinum" className="text-white focus:bg-purple-800/50 hover:bg-purple-800/50">{t("cards.apply.platinumCard")}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2.5">
            <label className="text-sm font-medium text-purple-200 block mb-1">{t("cards.apply.cardCurrency")}</label>
            <Select>
              <SelectTrigger className="bg-[#3a0080]/70 border-purple-900/50 text-white focus:border-purple-500/70 focus:ring-purple-500/30">
                <SelectValue placeholder={t("cards.apply.selectCurrency")} />
              </SelectTrigger>
              <SelectContent className="bg-[#3a0080] border-purple-800/50 text-white">
                <SelectItem value="cny" className="text-white focus:bg-purple-800/50 hover:bg-purple-800/50">{t("cards.apply.cny")}</SelectItem>
                <SelectItem value="usd" className="text-white focus:bg-purple-800/50 hover:bg-purple-800/50">{t("cards.apply.usd")}</SelectItem>
                <SelectItem value="eur" className="text-white focus:bg-purple-800/50 hover:bg-purple-800/50">{t("cards.apply.eur")}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="space-y-2.5">
          <label className="text-sm font-medium text-purple-200 block mb-1">{t("cards.apply.mailingAddress")}</label>
          <Input 
            placeholder={t("cards.apply.enterMailingAddress")} 
            className="bg-[#3a0080]/70 border-purple-900/50 text-white placeholder-purple-300/50 focus:border-purple-500/70 focus:ring-purple-500/30" 
          />
        </div>
        
        <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-md mt-5">
          <div className="flex items-start">
            <AlertCircle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-yellow-200">
              {t("cards.apply.addressNote")}
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="relative z-10 border-t border-purple-900/50 pt-4 mt-2">
        <div className="flex flex-col sm:flex-row gap-3 w-full justify-end">
          <Button variant="outline" className="border-purple-600/60 text-white hover:bg-purple-900/20">
            {t("cards.apply.saveDraft")}
          </Button>
          <Button className="gap-2 bg-purple-600 hover:bg-purple-700">
            <Check className="h-4 w-4" />
            <span>{t("cards.apply.submitApplication")}</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default CardInfoCard;
