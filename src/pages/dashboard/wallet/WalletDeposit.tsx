
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { toast } from "sonner";
import PageTitle from "../cards/components/PageTitle";
import { CreditCard, ArrowLeft } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Skeleton } from "@/components/ui/skeleton";
import { progressiveLoad } from "@/utils/progressive-loading";
import { formatUSD } from "@/utils/currencyUtils";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import TranslatedText from "@/components/translation/TranslatedText";
import PaymentMethodIcon from "./components/PaymentMethodIcon";
import DepositInfoCard from "./components/DepositInfoCard";
import { getDepositTranslation } from "./i18n/deposit";

const DepositStats = progressiveLoad(
  () => import("./components/DepositStats"),
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    {[1, 2, 3].map((i) => (
      <Skeleton key={i} className="h-24 w-full bg-blue-900/10 rounded-lg" />
    ))}
  </div>
);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 15 }
  }
};

const WalletDeposit = () => {
  const { language } = useLanguage();
  const [amount, setAmount] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [note, setNote] = useState<string>("");
  const [forceUpdateKey, setForceUpdateKey] = useState(Date.now());
  
  // Monitor language changes
  useEffect(() => {
    console.log(`WalletDeposit language updated: ${language}`);
    setForceUpdateKey(Date.now());
  }, [language]);

  // Helper function to get translations
  const t = (key: string): string => {
    return getDepositTranslation(key, language);
  };

  const handleSubmit = () => {
    if (!amount || !paymentMethod) {
      toast(
        <div className="flex items-center">
          {t("fillRequiredFields")}
        </div>,
        {
          description: (
            <div className="text-sm">
              {t("description")}
            </div>
          )
        }
      );
      return;
    }
    
    toast(
      <div className="flex items-center">
        {t("requestSubmitted")}
      </div>,
      {
        description: (
          <div className="flex flex-col gap-1">
            <span>
              {t("amount")}: {formatUSD(parseFloat(amount))}
            </span>
            <span>
              {t("paymentMethod")}: {t(paymentMethod === 'wechat' ? 'wechatPay' : paymentMethod)}
            </span>
          </div>
        )
      }
    );
    
    setAmount("");
    setPaymentMethod("");
    setNote("");
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible" 
      className="container px-4 mx-auto py-6 space-y-8"
      key={`wallet-deposit-${language}-${forceUpdateKey}`}
      data-language={language}
    >
      <motion.div variants={itemVariants} className="w-full flex items-center justify-between">
        <PageTitle title={t("form")} />
        <div className="hidden sm:flex">
          <Button
            variant="ghost"
            className="bg-indigo-900/20 border border-indigo-800/30 hover:bg-indigo-800/30 text-indigo-200 transition-all duration-300"
            onClick={() => window.history.back()}
          >
            <ArrowLeft size={16} className="mr-1" /> <TranslatedText keyName="common.back" />
          </Button>
        </div>
      </motion.div>
      
      <motion.div variants={itemVariants} className="mb-8">
        <DepositStats />
      </motion.div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <Card className="relative overflow-hidden border-indigo-900/30 bg-gradient-to-br from-indigo-900/40 to-charcoal-dark shadow-xl hover:shadow-indigo-900/10 transition-all duration-300">
            {/* Background decorations */}
            <div className="absolute inset-0 bg-grid-white/[0.02] [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
            <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-600/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-indigo-800/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4"></div>
            
            {/* Accent top bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-600 via-indigo-500 to-indigo-700"></div>
            
            <CardHeader className="relative z-10 pb-3 pt-6 bg-indigo-950/20 backdrop-blur-sm border-b border-indigo-800/20">
              <CardTitle className="text-white text-xl flex items-center">
                <span className="bg-indigo-500/30 p-2 rounded-lg mr-3 shadow-inner shadow-indigo-900/30">
                  <CreditCard size={20} className="text-indigo-200" />
                </span>
                {t("form")}
              </CardTitle>
              <CardDescription className="text-indigo-200/90 mt-1">
                {t("formDescription")}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="relative z-10 space-y-6 py-6">
              <div className="space-y-2">
                <Label htmlFor="amount" className="text-white text-sm font-medium flex items-center">
                  {t("amount")}
                  <span className="ml-1 text-red-400">*</span>
                </Label>
                <div className="flex items-center">
                  <span className="bg-indigo-900/80 px-3 py-2 rounded-l-md border border-r-0 border-indigo-800/50 text-white font-medium">$</span>
                  <Input 
                    id="amount" 
                    type="number" 
                    placeholder={t("enterAmount")}
                    className="rounded-l-none bg-indigo-900/50 border-indigo-800/50 text-white placeholder-indigo-300/40 focus:border-indigo-500 focus:ring-indigo-500/30"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="payment-method" className="text-white text-sm font-medium flex items-center">
                  {t("paymentMethod")}
                  <span className="ml-1 text-red-400">*</span>
                </Label>
                <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                  <SelectTrigger 
                    id="payment-method" 
                    className="bg-indigo-900/50 border-indigo-800/50 text-white hover:bg-indigo-900/60 focus:border-indigo-500 focus:ring-indigo-500/30"
                  >
                    <SelectValue placeholder={t("selectPaymentMethod")} />
                  </SelectTrigger>
                  <SelectContent className="bg-indigo-950/95 border-indigo-800/50 text-white">
                    <SelectItem 
                      value="alipay" 
                      className="focus:bg-indigo-900/40 focus:text-white hover:bg-indigo-900/50"
                    >
                      <div className="flex items-center">
                        <PaymentMethodIcon method="alipay" />
                        <span className="ml-2">
                          {t("alipay")}
                        </span>
                      </div>
                    </SelectItem>
                    <SelectItem 
                      value="wechat" 
                      className="focus:bg-indigo-900/40 focus:text-white hover:bg-indigo-900/50"
                    >
                      <div className="flex items-center">
                        <PaymentMethodIcon method="wechat" />
                        <span className="ml-2">
                          {t("wechatPay")}
                        </span>
                      </div>
                    </SelectItem>
                    <SelectItem 
                      value="bank" 
                      className="focus:bg-indigo-900/40 focus:text-white hover:bg-indigo-900/50"
                    >
                      <div className="flex items-center">
                        <PaymentMethodIcon method="bank" />
                        <span className="ml-2">
                          {t("bankTransfer")}
                        </span>
                      </div>
                    </SelectItem>
                    <SelectItem 
                      value="overseasBank" 
                      className="focus:bg-indigo-900/40 focus:text-white hover:bg-indigo-900/50"
                    >
                      <div className="flex items-center">
                        <PaymentMethodIcon method="overseas_bank" />
                        <span className="ml-2">
                          {t("overseasBank")}
                        </span>
                      </div>
                    </SelectItem>
                    <SelectItem 
                      value="platformTransfer" 
                      className="focus:bg-indigo-900/40 focus:text-white hover:bg-indigo-900/50"
                    >
                      <div className="flex items-center">
                        <PaymentMethodIcon method="platform" />
                        <span className="ml-2">
                          {t("platformTransfer")}
                        </span>
                      </div>
                    </SelectItem>
                    <SelectItem 
                      value="cryptoCurrency" 
                      className="focus:bg-indigo-900/40 focus:text-white hover:bg-indigo-900/50"
                    >
                      <div className="flex items-center">
                        <PaymentMethodIcon method="crypto" />
                        <span className="ml-2">
                          {t("cryptoCurrency")}
                        </span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="note" className="text-white text-sm font-medium">
                  {t("note")}
                </Label>
                <Textarea 
                  id="note" 
                  placeholder={t("noteOptional")}
                  className="bg-indigo-900/50 border-indigo-800/50 text-white placeholder-indigo-300/40 min-h-[100px] focus:border-indigo-500 focus:ring-indigo-500/30"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
              </div>
            </CardContent>
            
            <CardFooter className="relative z-10 flex justify-end space-x-4 pt-2 pb-6 px-6 bg-indigo-950/30 backdrop-blur-sm border-t border-indigo-800/20">
              <Button 
                variant="outline" 
                className="border-indigo-600/60 text-white hover:bg-indigo-900/40 hover:text-indigo-200"
                onClick={() => {
                  setAmount("");
                  setPaymentMethod("");
                  setNote("");
                }}
              >
                {t("cancel")}
              </Button>
              <Button 
                className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-900/30"
                onClick={handleSubmit}
              >
                {t("confirm")}
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
        
        <motion.div variants={itemVariants} className="lg:col-span-1">
          <DepositInfoCard 
            paymentMethod={paymentMethod} 
            language={language} 
            forceUpdateKey={forceUpdateKey} 
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default WalletDeposit;
