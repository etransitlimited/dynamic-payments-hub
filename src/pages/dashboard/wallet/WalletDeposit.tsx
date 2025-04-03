
import React, { useState } from "react";
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
import { toast } from "@/components/ui/use-toast";
import PageTitle from "../cards/components/PageTitle";
import { CreditCard, AlertCircle, Banknote, Globe, BarChart3, Bitcoin } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Skeleton } from "@/components/ui/skeleton";
import { progressiveLoad } from "@/utils/progressive-loading";
import { formatUSD } from "@/utils/currencyUtils";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import CardBase from "@/components/cards/CardBase";
import TranslatedText from "@/components/translation/TranslatedText";

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
  const { t, language } = useLanguage();
  const [amount, setAmount] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [note, setNote] = useState<string>("");

  const handleSubmit = () => {
    if (!amount || !paymentMethod) {
      toast({
        description: t("wallet.deposit.fillRequiredFields"),
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: t("wallet.deposit.requestSubmitted"),
      description: `${t("wallet.deposit.amount")}: ${formatUSD(parseFloat(amount))}, ${t("wallet.deposit.paymentMethod")}: ${paymentMethod}`,
    });
    
    setAmount("");
    setPaymentMethod("");
    setNote("");
  };

  const getAdditionalInfo = () => {
    const infoItems = [
      "wallet.deposit.infoCredit"
    ];

    if (paymentMethod === 'alipay' || paymentMethod === 'wechat') {
      infoItems.push("wallet.deposit.infoAlipayWechat");
    } else if (paymentMethod === 'bank') {
      infoItems.push("wallet.deposit.infoBank");
    } else if (paymentMethod === 'overseas_bank') {
      infoItems.push("wallet.deposit.infoOverseasBank");
    } else if (paymentMethod === 'platform') {
      infoItems.push("wallet.deposit.infoPlatform");
    } else if (paymentMethod === 'crypto') {
      infoItems.push("wallet.deposit.infoCrypto");
    }

    infoItems.push("wallet.deposit.infoSupport");
    return infoItems;
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible" 
      className="container px-4 mx-auto py-6 space-y-8"
    >
      <motion.div variants={itemVariants} className="w-full flex items-center justify-between">
        <PageTitle title={t("wallet.deposit.form")} />
        <div className="hidden sm:flex">
          <Button
            variant="ghost"
            className="bg-purple-900/20 border border-purple-800/30 hover:bg-purple-800/30 text-purple-200"
            onClick={() => window.history.back()}
          >
            &larr; {t("common.back")}
          </Button>
        </div>
      </motion.div>
      
      <motion.div variants={itemVariants} className="mb-8">
        <DepositStats />
      </motion.div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <Card className="relative overflow-hidden border-purple-900/30 bg-gradient-to-br from-purple-900/40 to-charcoal-dark shadow-xl hover:shadow-purple-900/10 transition-all duration-300">
            {/* Background decorations */}
            <div className="absolute inset-0 bg-grid-white/[0.02] [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
            <div className="absolute top-0 right-0 w-40 h-40 bg-purple-600/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-purple-800/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4"></div>
            
            {/* Purple accent top bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 via-purple-500 to-purple-700"></div>
            
            <CardHeader className="relative z-10 pb-3 pt-6 bg-purple-950/20 backdrop-blur-sm border-b border-purple-800/20">
              <CardTitle className="text-white text-xl flex items-center">
                <span className="bg-purple-500/30 p-2 rounded-lg mr-3 shadow-inner shadow-purple-900/30">
                  <CreditCard size={20} className="text-purple-200" />
                </span>
                <TranslatedText keyName="wallet.deposit.form" className="text-white" />
              </CardTitle>
              <CardDescription className="text-purple-200/90 mt-1">
                <TranslatedText keyName="wallet.deposit.formDescription" className="text-purple-200/90" />
              </CardDescription>
            </CardHeader>
            
            <CardContent className="relative z-10 space-y-6 py-6">
              <div className="space-y-2">
                <Label htmlFor="amount" className="text-white text-sm font-medium flex items-center">
                  <TranslatedText keyName="wallet.deposit.amount" className="text-white" />
                  <span className="ml-1 text-red-400">*</span>
                </Label>
                <div className="flex items-center">
                  <span className="bg-purple-900/80 px-3 py-2 rounded-l-md border border-r-0 border-purple-800/50 text-white font-medium">$</span>
                  <Input 
                    id="amount" 
                    type="number" 
                    placeholder={t("wallet.deposit.enterAmount")} 
                    className="rounded-l-none bg-purple-900/50 border-purple-800/50 text-white placeholder-purple-300/40 focus:border-purple-500 focus:ring-purple-500/30"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="payment-method" className="text-white text-sm font-medium flex items-center">
                  <TranslatedText keyName="wallet.deposit.paymentMethod" className="text-white" />
                  <span className="ml-1 text-red-400">*</span>
                </Label>
                <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                  <SelectTrigger 
                    id="payment-method" 
                    className="bg-purple-900/50 border-purple-800/50 text-white hover:bg-purple-900/60 focus:border-purple-500 focus:ring-purple-500/30"
                  >
                    <SelectValue placeholder={t("wallet.deposit.selectPaymentMethod")} />
                  </SelectTrigger>
                  <SelectContent className="bg-purple-950/95 border-purple-800/50 text-white">
                    <SelectItem 
                      value="alipay" 
                      className="focus:bg-purple-900/40 focus:text-white hover:bg-purple-900/50"
                    >
                      <div className="flex items-center">
                        <span className="text-blue-400 bg-blue-400/10 p-1.5 rounded-md mr-2 flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.5 7H17a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-3"/><path d="M10 10h5"/><path d="M15 7v5.172a2 2 0 0 1-.586 1.414l-3.828 3.828"/></svg>
                        </span>
                        <TranslatedText keyName="wallet.deposit.alipay" className="text-white" />
                      </div>
                    </SelectItem>
                    <SelectItem 
                      value="wechat" 
                      className="focus:bg-purple-900/40 focus:text-white hover:bg-purple-900/50"
                    >
                      <div className="flex items-center">
                        <span className="text-green-400 bg-green-400/10 p-1.5 rounded-md mr-2 flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.5 19H9a7 7 0 1 1 0-14h8.5a4.5 4.5 0 1 1 0 9H12v5"/></svg>
                        </span>
                        <TranslatedText keyName="wallet.deposit.wechatPay" className="text-white" />
                      </div>
                    </SelectItem>
                    <SelectItem 
                      value="bank" 
                      className="focus:bg-purple-900/40 focus:text-white hover:bg-purple-900/50"
                    >
                      <div className="flex items-center">
                        <span className="text-yellow-400 bg-yellow-400/10 p-1.5 rounded-md mr-2 flex items-center justify-center">
                          <Banknote size={16} />
                        </span>
                        <TranslatedText keyName="wallet.deposit.bankTransfer" className="text-white" />
                      </div>
                    </SelectItem>
                    <SelectItem 
                      value="overseas_bank" 
                      className="focus:bg-purple-900/40 focus:text-white hover:bg-purple-900/50"
                    >
                      <div className="flex items-center">
                        <span className="text-purple-400 bg-purple-400/10 p-1.5 rounded-md mr-2 flex items-center justify-center">
                          <Globe size={16} />
                        </span>
                        <TranslatedText keyName="wallet.deposit.overseasBank" className="text-white" />
                      </div>
                    </SelectItem>
                    <SelectItem 
                      value="platform" 
                      className="focus:bg-purple-900/40 focus:text-white hover:bg-purple-900/50"
                    >
                      <div className="flex items-center">
                        <span className="text-blue-400 bg-blue-400/10 p-1.5 rounded-md mr-2 flex items-center justify-center">
                          <BarChart3 size={16} />
                        </span>
                        <TranslatedText keyName="wallet.deposit.platformTransfer" className="text-white" />
                      </div>
                    </SelectItem>
                    <SelectItem 
                      value="crypto" 
                      className="focus:bg-purple-900/40 focus:text-white hover:bg-purple-900/50"
                    >
                      <div className="flex items-center">
                        <span className="text-orange-400 bg-orange-400/10 p-1.5 rounded-md mr-2 flex items-center justify-center">
                          <Bitcoin size={16} />
                        </span>
                        <TranslatedText keyName="wallet.deposit.cryptoCurrency" className="text-white" />
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="note" className="text-white text-sm font-medium">
                  <TranslatedText keyName="wallet.deposit.note" className="text-white" />
                </Label>
                <Textarea 
                  id="note" 
                  placeholder={t("wallet.deposit.noteOptional")} 
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
                <TranslatedText keyName="wallet.deposit.cancel" className="text-white" />
              </Button>
              <Button 
                className="bg-purple-600 hover:bg-purple-700 text-white shadow-md shadow-purple-900/30"
                onClick={handleSubmit}
              >
                <TranslatedText keyName="wallet.deposit.confirm" className="text-white" />
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
        
        <motion.div variants={itemVariants} className="lg:col-span-1">
          <InfoCard paymentMethod={paymentMethod} />
        </motion.div>
      </div>
    </motion.div>
  );
};

// Create a separate InfoCard component for better organization
const InfoCard = ({ paymentMethod }: { paymentMethod: string }) => {
  const infoItems = getInfoItems(paymentMethod);
  
  return (
    <CardBase
      className="border border-amber-800/30 bg-gradient-to-br from-amber-950/30 to-amber-900/20 overflow-hidden rounded-xl shadow-lg shadow-amber-900/10 hover:shadow-amber-900/20 transition-shadow duration-300 h-full"
      withGrid={true}
    >
      <div className="h-full flex flex-col">
        <div className="absolute top-0 right-0 w-40 h-40 bg-amber-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
        
        <CardHeader className="pb-3 relative z-10 bg-amber-950/30 backdrop-blur-sm border-b border-amber-800/20">
          <CardTitle className="text-white flex items-center">
            <span className="bg-amber-500/30 p-2 rounded-lg mr-2 shadow-inner shadow-amber-900/30">
              <AlertCircle size={18} className="text-amber-300" />
            </span>
            <TranslatedText keyName="wallet.deposit.information" className="text-white" />
          </CardTitle>
        </CardHeader>
        
        <CardContent className="relative z-10 py-6 flex-grow bg-amber-950/10 backdrop-blur-sm">
          <ul className="space-y-4 text-amber-200/90 list-disc pl-5">
            {infoItems.map((key, index) => (
              <li key={index} className="text-sm leading-relaxed">
                <TranslatedText keyName={key} className="text-amber-200/90" />
              </li>
            ))}
          </ul>
        </CardContent>
        
        {paymentMethod && (
          <div className="relative z-10 p-4 bg-amber-900/30 backdrop-blur-sm border-t border-amber-800/20">
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse mr-2"></div>
              <p className="text-xs text-amber-200/90">
                <TranslatedText 
                  keyName={
                    paymentMethod === 'crypto' ? "wallet.deposit.infoCrypto" : 
                    paymentMethod === 'overseas_bank' ? "wallet.deposit.infoOverseasBank" :
                    "wallet.deposit.infoCredit"
                  } 
                  className="text-amber-200/90" 
                />
              </p>
            </div>
          </div>
        )}
      </div>
    </CardBase>
  );
};

// Helper function to get info items based on payment method
function getInfoItems(paymentMethod: string): string[] {
  const infoItems = [
    "wallet.deposit.infoCredit"
  ];

  if (paymentMethod === 'alipay' || paymentMethod === 'wechat') {
    infoItems.push("wallet.deposit.infoAlipayWechat");
  } else if (paymentMethod === 'bank') {
    infoItems.push("wallet.deposit.infoBank");
  } else if (paymentMethod === 'overseas_bank') {
    infoItems.push("wallet.deposit.infoOverseasBank");
  } else if (paymentMethod === 'platform') {
    infoItems.push("wallet.deposit.infoPlatform");
  } else if (paymentMethod === 'crypto') {
    infoItems.push("wallet.deposit.infoCrypto");
  }

  infoItems.push("wallet.deposit.infoSupport");
  return infoItems;
}

export default WalletDeposit;
