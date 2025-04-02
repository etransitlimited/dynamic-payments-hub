
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CreditCard, Check, AlertCircle, CreditCardIcon } from "lucide-react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLanguage } from "@/context/LanguageContext";
import TranslatedText from "@/components/translation/TranslatedText";

const CardInfoCard = () => {
  const { t } = useLanguage();
  
  return (
    <Card className="bg-gradient-to-br from-[#2E1065] to-[#3A0080] border-purple-900/40 shadow-lg shadow-purple-900/20 overflow-hidden relative group hover:shadow-[0_0_25px_rgba(139,92,246,0.2)] transition-all duration-500">
      <div className="absolute inset-0 bg-grid-white/[0.03] [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-neon-green/[0.02] rounded-full blur-3xl"></div>
      
      <CardHeader className="relative z-10 pb-2">
        <div className="flex items-center gap-3 mb-2">
          <span className="bg-gradient-to-br from-purple-500/30 to-purple-700/30 p-2.5 rounded-lg">
            <CreditCard size={18} className="text-purple-300" />
          </span>
          <CardTitle className="text-xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
            <TranslatedText keyName="cards.apply.cardInfo" fallback="Card Information" />
          </CardTitle>
        </div>
        <CardDescription className="text-purple-200/70">
          <TranslatedText keyName="cards.apply.cardInfoDesc" fallback="Select the type of card you want to apply for" />
        </CardDescription>
      </CardHeader>
      
      <CardContent className="relative z-10 space-y-6 pt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <label className="text-sm font-medium text-purple-100 block">
              <TranslatedText keyName="cards.apply.cardType" fallback="Card Type" />
            </label>
            <Select>
              <SelectTrigger className="bg-purple-950/50 border-purple-700/40 text-white focus:border-purple-500/70 focus:ring-purple-500/30 hover:bg-purple-900/30 transition-colors">
                <SelectValue placeholder={t("cards.apply.selectCardType")} />
              </SelectTrigger>
              <SelectContent className="bg-[#1e123a] border-purple-700/50 text-white">
                <SelectItem value="standard" className="text-white focus:bg-purple-800/50 hover:bg-purple-800/50">
                  <TranslatedText keyName="cards.apply.standardCard" fallback="Standard Card" />
                </SelectItem>
                <SelectItem value="gold" className="text-white focus:bg-purple-800/50 hover:bg-purple-800/50">
                  <TranslatedText keyName="cards.apply.goldCard" fallback="Gold Card" />
                </SelectItem>
                <SelectItem value="platinum" className="text-white focus:bg-purple-800/50 hover:bg-purple-800/50">
                  <TranslatedText keyName="cards.apply.platinumCard" fallback="Platinum Card" />
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-purple-100 block">
              <TranslatedText keyName="cards.apply.cardCurrency" fallback="Card Currency" />
            </label>
            <Select>
              <SelectTrigger className="bg-purple-950/50 border-purple-700/40 text-white focus:border-purple-500/70 focus:ring-purple-500/30 hover:bg-purple-900/30 transition-colors">
                <SelectValue placeholder={t("cards.apply.selectCurrency")} />
              </SelectTrigger>
              <SelectContent className="bg-[#1e123a] border-purple-700/50 text-white">
                <SelectItem value="cny" className="text-white focus:bg-purple-800/50 hover:bg-purple-800/50">
                  <TranslatedText keyName="cards.apply.cny" fallback="Chinese Yuan (CNY)" />
                </SelectItem>
                <SelectItem value="usd" className="text-white focus:bg-purple-800/50 hover:bg-purple-800/50">
                  <TranslatedText keyName="cards.apply.usd" fallback="US Dollar (USD)" />
                </SelectItem>
                <SelectItem value="eur" className="text-white focus:bg-purple-800/50 hover:bg-purple-800/50">
                  <TranslatedText keyName="cards.apply.eur" fallback="Euro (EUR)" />
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-purple-100 block">
            <TranslatedText keyName="cards.apply.mailingAddress" fallback="Mailing Address" />
          </label>
          <Input 
            placeholder={t("cards.apply.enterMailingAddress")} 
            className="bg-purple-950/50 border-purple-700/40 text-white placeholder-purple-300/40 focus:border-purple-500/70 focus:ring-purple-500/30 hover:bg-purple-900/30 transition-colors" 
          />
        </div>
        
        {/* Card Visual Preview */}
        <div className="mt-6 w-full relative">
          <div className="p-5 rounded-xl bg-gradient-to-r from-purple-800/50 via-purple-700/40 to-purple-800/50 border border-purple-600/30 relative overflow-hidden h-44 md:h-48">
            <div className="absolute inset-0 bg-grid-white/[0.03] [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
            
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-purple-500/20 rounded-full blur-xl"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-neon-green/10 rounded-full blur-xl"></div>
              
              {/* EMV Chip */}
              <div className="absolute top-8 left-8 w-12 h-8 bg-gradient-to-br from-yellow-500/70 to-yellow-600/70 rounded-md border border-yellow-500/50"></div>
              
              {/* Card number placeholder */}
              <div className="absolute top-24 left-8 right-8 flex space-x-4">
                <div className="w-10 h-3 bg-white/20 rounded-full"></div>
                <div className="w-10 h-3 bg-white/20 rounded-full"></div>
                <div className="w-10 h-3 bg-white/20 rounded-full"></div>
                <div className="w-10 h-3 bg-white/20 rounded-full"></div>
              </div>
              
              {/* Card name placeholder */}
              <div className="absolute bottom-8 left-8 w-32 h-3 bg-white/20 rounded-full"></div>
              
              {/* Card type logo */}
              <div className="absolute bottom-8 right-8 w-12 h-12 flex items-center justify-center">
                <CreditCard size={30} className="text-white/60" />
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-md mt-5">
          <div className="flex items-start">
            <AlertCircle className="h-5 w-5 text-yellow-400 mr-2 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-yellow-200/90">
              <TranslatedText keyName="cards.apply.addressNote" fallback="Please ensure the address is accurate to avoid affecting card delivery. Address changes should be notified to customer service at least 5 business days in advance." />
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CardInfoCard;
