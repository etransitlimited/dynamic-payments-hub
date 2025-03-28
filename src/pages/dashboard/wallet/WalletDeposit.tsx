
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
import PageHeader from "../merchant/components/PageHeader";
import { CreditCard, AlertCircle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Skeleton } from "@/components/ui/skeleton";
import { progressiveLoad } from "@/utils/progressive-loading";
import { formatUSD } from "@/utils/currencyUtils";

const DepositStats = progressiveLoad(
  () => import("./components/DepositStats"),
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    {[1, 2, 3].map((i) => (
      <Skeleton key={i} className="h-24 w-full bg-blue-900/10 rounded-lg" />
    ))}
  </div>
);

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
    
    // Reset form
    setAmount("");
    setPaymentMethod("");
    setNote("");
  };

  return (
    <div className="container max-w-2xl px-4 mx-auto py-6">
      <PageHeader title={t("wallet.deposit.form")} />
      
      <div className="mb-6">
        <DepositStats />
      </div>
      
      <Card>
        <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
        <CardHeader className="relative z-10 pb-3 bg-blue-950/60">
          <CardTitle className="text-white text-xl flex items-center">
            <span className="bg-blue-500/30 p-2 rounded-full mr-2">
              <CreditCard size={18} className="text-blue-300" />
            </span>
            {t("wallet.deposit.form")}
          </CardTitle>
          <CardDescription className="text-blue-200/90">
            {t("wallet.deposit.formDescription")}
          </CardDescription>
        </CardHeader>
        <CardContent className="relative z-10 space-y-5 bg-blue-950/40 py-6">
          <div className="space-y-2">
            <Label htmlFor="amount" className="text-white text-sm">{t("wallet.deposit.amount")}</Label>
            <div className="flex items-center">
              <span className="bg-blue-900/60 px-3 py-2 rounded-l-md border border-r-0 border-blue-800/50 text-white">$</span>
              <Input 
                id="amount" 
                type="number" 
                placeholder={t("wallet.deposit.enterAmount")} 
                className="rounded-l-none bg-blue-900/60 border-blue-800/50 text-white placeholder-blue-300/40"
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
                className="bg-blue-900/60 border-blue-800/50 text-white hover:bg-blue-900/70"
              >
                <SelectValue placeholder={t("wallet.deposit.selectPaymentMethod")} />
              </SelectTrigger>
              <SelectContent className="bg-blue-950/90 border-blue-800/50 text-white">
                <SelectItem 
                  value="alipay" 
                  className="focus:bg-blue-900/40 focus:text-white hover:bg-blue-900/50"
                >
                  <div className="flex items-center">
                    <span className="text-blue-400 bg-blue-400/10 p-1 rounded-md mr-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.5 7H17a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-3"/><path d="M10 10h5"/><path d="M15 7v5.172a2 2 0 0 1-.586 1.414l-3.828 3.828"/></svg>
                    </span>
                    {t("wallet.deposit.alipay")}
                  </div>
                </SelectItem>
                <SelectItem 
                  value="wechat" 
                  className="focus:bg-blue-900/40 focus:text-white hover:bg-blue-900/50"
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
                  className="focus:bg-blue-900/40 focus:text-white hover:bg-blue-900/50"
                >
                  <div className="flex items-center">
                    <span className="text-yellow-400 bg-yellow-400/10 p-1 rounded-md mr-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>
                    </span>
                    {t("wallet.deposit.bankTransfer")}
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="note" className="text-white text-sm">{t("wallet.deposit.note")}</Label>
            <Input 
              id="note" 
              placeholder={t("wallet.deposit.noteOptional")} 
              className="bg-blue-900/60 border-blue-800/50 text-white placeholder-blue-300/40"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter className="relative z-10 flex justify-between pt-2 bg-blue-950/60">
          <Button 
            variant="outline" 
            className="border-blue-600/60 text-white hover:bg-blue-900/20"
          >
            {t("wallet.deposit.cancel")}
          </Button>
          <Button 
            className="bg-blue-600 hover:bg-blue-700 text-white"
            onClick={handleSubmit}
          >
            {t("wallet.deposit.confirm")}
          </Button>
        </CardFooter>
      </Card>
      
      <Card 
        className="bg-gradient-to-br from-yellow-950/90 to-yellow-900/80 
                    border border-yellow-800/50 
                    shadow-2xl shadow-yellow-900/20 
                    mt-6 
                    hover:shadow-[0_0_25px_rgba(234,179,8,0.25)] 
                    transition-all duration-300 
                    overflow-hidden"
      >
        <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
        <CardHeader className="relative z-10 pb-3 bg-yellow-950/60">
          <CardTitle className="text-white text-xl flex items-center">
            <span className="bg-yellow-500/30 p-2 rounded-full mr-2">
              <AlertCircle size={18} className="text-yellow-300" />
            </span>
            {t("wallet.deposit.information")}
          </CardTitle>
        </CardHeader>
        <CardContent className="relative z-10 bg-yellow-950/40 py-6">
          <ul className="space-y-2 text-yellow-200/90 list-disc pl-5">
            <li>{t("wallet.deposit.infoCredit")}</li>
            <li>{t("wallet.deposit.infoAlipayWechat")}</li>
            <li>{t("wallet.deposit.infoBank")}</li>
            <li>{t("wallet.deposit.infoSupport")}</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default WalletDeposit;
