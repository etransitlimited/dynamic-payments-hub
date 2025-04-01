
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
  const { t } = useLanguage();
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
      t("wallet.deposit.infoCredit")
    ];

    if (paymentMethod === 'alipay' || paymentMethod === 'wechat') {
      infoItems.push(t("wallet.deposit.infoAlipayWechat"));
    } else if (paymentMethod === 'bank') {
      infoItems.push(t("wallet.deposit.infoBank"));
    } else if (paymentMethod === 'overseas_bank') {
      infoItems.push(t("wallet.deposit.infoOverseasBank"));
    } else if (paymentMethod === 'platform') {
      infoItems.push(t("wallet.deposit.infoPlatform"));
    } else if (paymentMethod === 'crypto') {
      infoItems.push(t("wallet.deposit.infoCrypto"));
    }

    infoItems.push(t("wallet.deposit.infoSupport"));
    return infoItems;
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible" 
      className="container px-4 mx-auto py-6 space-y-6"
    >
      <div className="w-full">
        <PageTitle title={t("wallet.deposit.form")} />
      </div>
      
      <motion.div variants={itemVariants} className="mb-6">
        <DepositStats />
      </motion.div>
      
      <motion.div variants={itemVariants} className="w-full">
        <Card className="relative overflow-hidden border-purple-900/30 bg-gradient-to-br from-purple-900/40 to-charcoal-dark">
          {/* Background decorations */}
          <div className="absolute inset-0 bg-grid-white/[0.02] [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
          <div className="absolute top-0 right-0 w-40 h-40 bg-purple-600/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-purple-800/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4"></div>
          
          <CardHeader className="relative z-10 pb-3 bg-purple-950/20 backdrop-blur-sm">
            <CardTitle className="text-white text-xl flex items-center">
              <span className="bg-purple-500/30 p-2 rounded-full mr-2">
                <CreditCard size={18} className="text-purple-300" />
              </span>
              {t("wallet.deposit.form")}
            </CardTitle>
            <CardDescription className="text-purple-200/90">
              {t("wallet.deposit.formDescription")}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="relative z-10 space-y-5 py-6">
            <div className="space-y-2">
              <Label htmlFor="amount" className="text-white text-sm">{t("wallet.deposit.amount")}</Label>
              <div className="flex items-center">
                <span className="bg-purple-900/60 px-3 py-2 rounded-l-md border border-r-0 border-purple-800/50 text-white">$</span>
                <Input 
                  id="amount" 
                  type="number" 
                  placeholder={t("wallet.deposit.enterAmount")} 
                  className="rounded-l-none bg-purple-900/40 border-purple-800/50 text-white placeholder-purple-300/40 focus:border-purple-500 focus:ring-purple-500/30"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="payment-method" className="text-white text-sm">{t("wallet.deposit.paymentMethod")}</Label>
              <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                <SelectTrigger 
                  id="payment-method" 
                  className="bg-purple-900/40 border-purple-800/50 text-white hover:bg-purple-900/60 focus:border-purple-500 focus:ring-purple-500/30"
                >
                  <SelectValue placeholder={t("wallet.deposit.selectPaymentMethod")} />
                </SelectTrigger>
                <SelectContent className="bg-purple-950/90 border-purple-800/50 text-white">
                  <SelectItem 
                    value="alipay" 
                    className="focus:bg-purple-900/40 focus:text-white hover:bg-purple-900/50"
                  >
                    <div className="flex items-center">
                      <span className="text-purple-400 bg-purple-400/10 p-1 rounded-md mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.5 7H17a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-3"/><path d="M10 10h5"/><path d="M15 7v5.172a2 2 0 0 1-.586 1.414l-3.828 3.828"/></svg>
                      </span>
                      {t("wallet.deposit.alipay")}
                    </div>
                  </SelectItem>
                  <SelectItem 
                    value="wechat" 
                    className="focus:bg-purple-900/40 focus:text-white hover:bg-purple-900/50"
                  >
                    <div className="flex items-center">
                      <span className="text-green-400 bg-green-400/10 p-1 rounded-md mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.5 19H9a7 7 0 1 1 0-14h8.5a4.5 4.5 0 1 1 0 9H12v5"/></svg>
                      </span>
                      {t("wallet.deposit.wechatPay")}
                    </div>
                  </SelectItem>
                  <SelectItem 
                    value="bank" 
                    className="focus:bg-purple-900/40 focus:text-white hover:bg-purple-900/50"
                  >
                    <div className="flex items-center">
                      <span className="text-yellow-400 bg-yellow-400/10 p-1 rounded-md mr-2">
                        <Banknote size={16} />
                      </span>
                      {t("wallet.deposit.bankTransfer")}
                    </div>
                  </SelectItem>
                  <SelectItem 
                    value="overseas_bank" 
                    className="focus:bg-purple-900/40 focus:text-white hover:bg-purple-900/50"
                  >
                    <div className="flex items-center">
                      <span className="text-purple-400 bg-purple-400/10 p-1 rounded-md mr-2">
                        <Globe size={16} />
                      </span>
                      {t("wallet.deposit.overseasBank")}
                    </div>
                  </SelectItem>
                  <SelectItem 
                    value="platform" 
                    className="focus:bg-purple-900/40 focus:text-white hover:bg-purple-900/50"
                  >
                    <div className="flex items-center">
                      <span className="text-blue-400 bg-blue-400/10 p-1 rounded-md mr-2">
                        <BarChart3 size={16} />
                      </span>
                      {t("wallet.deposit.platformTransfer")}
                    </div>
                  </SelectItem>
                  <SelectItem 
                    value="crypto" 
                    className="focus:bg-purple-900/40 focus:text-white hover:bg-purple-900/50"
                  >
                    <div className="flex items-center">
                      <span className="text-orange-400 bg-orange-400/10 p-1 rounded-md mr-2">
                        <Bitcoin size={16} />
                      </span>
                      {t("wallet.deposit.cryptoCurrency")}
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="note" className="text-white text-sm">{t("wallet.deposit.note")}</Label>
              <Textarea 
                id="note" 
                placeholder={t("wallet.deposit.noteOptional")} 
                className="bg-purple-900/40 border-purple-800/50 text-white placeholder-purple-300/40 min-h-[100px] focus:border-purple-500 focus:ring-purple-500/30"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </div>
          </CardContent>
          
          <CardFooter className="relative z-10 flex justify-end space-x-4 pt-2 bg-purple-950/20 backdrop-blur-sm">
            <Button 
              variant="outline" 
              className="border-purple-600/60 text-white hover:bg-purple-900/40 hover:text-purple-200"
              onClick={() => {
                setAmount("");
                setPaymentMethod("");
                setNote("");
              }}
            >
              {t("wallet.deposit.cancel")}
            </Button>
            <Button 
              className="bg-purple-600 hover:bg-purple-700 text-white shadow-md shadow-purple-900/30"
              onClick={handleSubmit}
            >
              {t("wallet.deposit.confirm")}
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <CardBase
          className="border border-amber-800/30 bg-gradient-to-br from-amber-950/30 to-amber-900/20 overflow-hidden rounded-xl shadow-lg hover:shadow-amber-900/20 transition-shadow duration-300"
          withGrid={true}
        >
          <div className="relative">
            <div className="absolute top-0 right-0 w-40 h-40 bg-amber-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
            
            <CardHeader className="pb-3 relative z-10 bg-amber-950/30 backdrop-blur-sm">
              <CardTitle className="text-white flex items-center">
                <span className="bg-amber-500/30 p-2 rounded-full mr-2">
                  <AlertCircle size={18} className="text-amber-300" />
                </span>
                {t("wallet.deposit.information")}
              </CardTitle>
            </CardHeader>
            
            <CardContent className="relative z-10 py-6 bg-amber-950/10 backdrop-blur-sm">
              <ul className="space-y-3 text-amber-200/90 list-disc pl-5">
                {getAdditionalInfo().map((info, index) => (
                  <li key={index} className="text-sm leading-relaxed">{info}</li>
                ))}
              </ul>
            </CardContent>
          </div>
        </CardBase>
      </motion.div>
    </motion.div>
  );
};

export default WalletDeposit;
