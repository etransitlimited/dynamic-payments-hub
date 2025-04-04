import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
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
import { CreditCard, ArrowLeft } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import TranslatedText from "@/components/translation/TranslatedText";
import PaymentMethodIcon from "./components/PaymentMethodIcon";
import DepositInfoCard from "./components/DepositInfoCard";
import { formatUSD } from "@/utils/currencyUtils";
import { useLanguage } from "@/context/LanguageContext";
import { getDepositTranslation } from "./i18n/deposit";

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
  
  useEffect(() => {
    console.log(`WalletDeposit language updated: ${language}`);
    setForceUpdateKey(Date.now());
  }, [language]);

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
      className="container px-4 mx-auto py-6 space-y-8 relative"
      key={`wallet-deposit-${language}-${forceUpdateKey}`}
      data-language={language}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-charcoal-light/50 to-charcoal-dark/50 backdrop-blur-md overflow-hidden shadow-lg">
        <div className="absolute inset-0 bg-grid-white/[0.03] [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
        <div className="absolute top-0 right-0 w-40 h-40 bg-purple-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 opacity-70"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-purple-800/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 opacity-70"></div>
      </div>

      <motion.div 
        variants={itemVariants} 
        className="relative z-10 flex items-center justify-between"
      >
        <h1 className="text-2xl font-bold text-white">
          {t("form")}
        </h1>
        <Button
          variant="ghost"
          className="bg-purple-900/30 border border-purple-800/30 hover:bg-purple-800/50 text-white transition-all duration-300"
          onClick={() => window.history.back()}
        >
          <ArrowLeft size={16} className="mr-2" /> 
          <TranslatedText keyName="common.back" />
        </Button>
      </motion.div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
        <div className="lg:col-span-2">
          <Card 
            className="relative overflow-hidden border-purple-900/30 bg-gradient-to-br from-charcoal-light/50 to-charcoal-dark/50 backdrop-blur-md shadow-lg"
          >
            <div className="absolute inset-0 bg-grid-white/[0.03] [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 via-purple-500 to-purple-700"></div>
            
            <CardHeader className="relative z-10 pb-3 pt-6 bg-purple-950/20 backdrop-blur-sm border-b border-purple-800/20">
              <CardTitle className="text-white text-xl flex items-center">
                <span className="bg-purple-500/30 p-2 rounded-lg mr-3 shadow-inner shadow-purple-900/30">
                  <CreditCard size={20} className="text-purple-200" />
                </span>
                {t("form")}
              </CardTitle>
              <CardDescription className="text-purple-200/90 mt-1">
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
                  <span className="bg-purple-900/80 px-3 py-2 rounded-l-md border border-r-0 border-purple-800/50 text-white font-medium">$</span>
                  <Input 
                    id="amount" 
                    type="number" 
                    placeholder={t("enterAmount")}
                    className="rounded-l-none bg-purple-900/50 border-purple-800/50 text-white placeholder-purple-300/40 focus:border-purple-500 focus:ring-purple-500/30"
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
                    className="bg-purple-900/50 border-purple-800/50 text-white hover:bg-purple-900/60 focus:border-purple-500 focus:ring-purple-500/30"
                  >
                    <SelectValue placeholder={t("selectPaymentMethod")} />
                  </SelectTrigger>
                  <SelectContent className="bg-purple-950/95 border-purple-800/50 text-white">
                    <SelectItem 
                      value="alipay" 
                      className="focus:bg-purple-900/40 focus:text-white hover:bg-purple-900/50"
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
                      className="focus:bg-purple-900/40 focus:text-white hover:bg-purple-900/50"
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
                      className="focus:bg-purple-900/40 focus:text-white hover:bg-purple-900/50"
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
                      className="focus:bg-purple-900/40 focus:text-white hover:bg-purple-900/50"
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
                      className="focus:bg-purple-900/40 focus:text-white hover:bg-purple-900/50"
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
                      className="focus:bg-purple-900/40 focus:text-white hover:bg-purple-900/50"
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
                  className="bg-purple-900/50 border-purple-800/50 text-white placeholder-purple-300/40 min-h-[100px] focus:border-purple-500 focus:ring-purple-500/30"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
              </div>
            </CardContent>
            
            <CardFooter className="relative z-10 flex justify-end space-x-4 pt-2 pb-6 px-6 bg-purple-950/30 backdrop-blur-sm border-t border-purple-800/20">
              <Button 
                variant="outline" 
                className="border-purple-600/60 text-white hover:bg-purple-900/40 hover:text-purple-200"
                onClick={() => {
                  setAmount("");
                  setPaymentMethod("");
                  setNote("");
                }}
              >
                {t("cancel")}
              </Button>
              <Button 
                className="bg-purple-600 hover:bg-purple-700 text-white shadow-md shadow-purple-900/30"
                onClick={handleSubmit}
              >
                {t("confirm")}
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        <div className="lg:col-span-1">
          <DepositInfoCard 
            paymentMethod={paymentMethod} 
            language={language} 
            forceUpdateKey={forceUpdateKey} 
          />
        </div>
      </div>
    </motion.div>
  );
};

export default WalletDeposit;
