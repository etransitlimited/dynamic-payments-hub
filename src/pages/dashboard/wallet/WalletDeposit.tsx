
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
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";
import { CreditCard, ArrowLeft, Check } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import TranslatedText from "@/components/translation/TranslatedText";
import PaymentMethodIcon from "./components/PaymentMethodIcon";
import DepositInfoCard from "./components/DepositInfoCard";
import { formatUSD } from "@/utils/currencyUtils";
import { useLanguage } from "@/context/LanguageContext";
import { getDepositTranslation } from "./i18n/deposit";
import PageLayout from "@/components/dashboard/PageLayout";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useSafeTranslation } from "@/hooks/use-safe-translation";
import { usePageLanguage } from "@/hooks/use-page-language";

const formSchema = z.object({
  amount: z.string().min(1, "Amount is required")
    .refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0, {
      message: "Amount must be greater than 0"
    }),
  paymentMethod: z.string().min(1, "Payment method is required"),
  note: z.string().optional()
});

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      when: "beforeChildren"
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
  const [forceUpdateKey, setForceUpdateKey] = useState(Date.now());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { t } = useSafeTranslation();
  const pageLanguage = usePageLanguage('wallet.deposit.form', 'Deposit Form');
  
  useEffect(() => {
    console.log(`WalletDeposit language updated: ${language}`);
    setForceUpdateKey(Date.now());
  }, [language]);

  const getT = (key: string): string => {
    return getDepositTranslation(key, language);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: "",
      paymentMethod: "",
      note: ""
    }
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    // Simulate API call with a short delay
    setTimeout(() => {
      toast(
        <div className="flex items-center gap-2">
          <Check className="text-green-500" size={18} />
          {getT("requestSubmitted")}
        </div>,
        {
          description: (
            <div className="flex flex-col gap-1">
              <span>
                {getT("amount")}: {formatUSD(parseFloat(values.amount))}
              </span>
              <span>
                {getT("paymentMethod")}: {getT(values.paymentMethod === 'wechat' ? 'wechatPay' : values.paymentMethod)}
              </span>
            </div>
          )
        }
      );
      
      form.reset();
      setIsSubmitting(false);
    }, 800);
  };

  const pageTitle = getT("form");
  const pageSubtitle = getT("formDescription");
  
  const breadcrumbs = [
    {
      label: t("sidebar.dashboard"),
      href: "/dashboard"
    },
    {
      label: t("wallet.walletManagement"),
      href: "/dashboard/wallet"
    },
    {
      label: getT("form")
    }
  ];
  
  const pageActions = (
    <Button
      variant="ghost"
      className="bg-purple-900/30 border border-purple-800/30 hover:bg-purple-800/50 text-white transition-all duration-300"
      onClick={() => window.history.back()}
    >
      <ArrowLeft size={16} className="mr-2" /> 
      <TranslatedText keyName="common.back" />
    </Button>
  );

  const selectedPaymentMethod = form.watch("paymentMethod");

  return (
    <PageLayout 
      title={pageTitle}
      subtitle={pageSubtitle}
      actions={pageActions}
      breadcrumbs={breadcrumbs}
      animationKey={`wallet-deposit-${language}-${forceUpdateKey}`}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative"
      >
        <motion.div 
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="lg:col-span-2"
        >
          <Card 
            className="relative overflow-hidden border-purple-900/30 bg-charcoal-light/50 backdrop-blur-md shadow-lg"
          >
            <CardHeader className="relative z-10 pb-3 pt-6 bg-purple-950/20 backdrop-blur-sm border-b border-purple-800/20">
              <CardTitle className="text-white text-xl flex items-center">
                <span className="bg-purple-500/30 p-2 rounded-lg mr-3 shadow-inner shadow-purple-900/30">
                  <CreditCard size={20} className="text-purple-200" />
                </span>
                {getT("form")}
              </CardTitle>
              <CardDescription className="text-purple-200/90 mt-1">
                {getT("formDescription")}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="relative z-10 space-y-6 py-6">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className="text-white text-sm font-medium flex items-center">
                          {getT("amount")}
                          <span className="ml-1 text-red-400">*</span>
                        </FormLabel>
                        <div className="flex items-center">
                          <span className="bg-purple-900/80 px-3 py-2 rounded-l-md border border-r-0 border-purple-800/50 text-white font-medium">$</span>
                          <FormControl>
                            <Input 
                              type="number" 
                              placeholder={getT("enterAmount")}
                              className="rounded-l-none bg-purple-900/50 border-purple-800/50 text-white placeholder-purple-300/40 focus:border-purple-500 focus:ring-purple-500/30"
                              {...field}
                            />
                          </FormControl>
                        </div>
                        <FormMessage className="text-red-400 text-sm" />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="paymentMethod"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className="text-white text-sm font-medium flex items-center">
                          {t("paymentMethod")}
                          <span className="ml-1 text-red-400">*</span>
                        </FormLabel>
                        <Select 
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger
                              className="bg-purple-900/50 border-purple-800/50 text-white hover:bg-purple-900/60 focus:border-purple-500 focus:ring-purple-500/30"
                            >
                              <SelectValue placeholder={t("selectPaymentMethod")} />
                            </SelectTrigger>
                          </FormControl>
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
                        <FormMessage className="text-red-400 text-sm" />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="note"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className="text-white text-sm font-medium">
                          {getT("note")}
                        </FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder={getT("noteOptional")}
                            className="bg-purple-900/50 border-purple-800/50 text-white placeholder-purple-300/40 min-h-[100px] focus:border-purple-500 focus:ring-purple-500/30"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="pt-2">
                    {selectedPaymentMethod && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="p-4 mb-4 bg-purple-900/30 rounded-lg border border-purple-800/30"
                      >
                        <p className="text-purple-200 text-sm flex items-center">
                          <Check size={16} className="mr-2 text-green-400" />
                          {getT(`info${selectedPaymentMethod.charAt(0).toUpperCase() + selectedPaymentMethod.slice(1)}`)}
                        </p>
                      </motion.div>
                    )}
                    <CardFooter className="relative z-10 flex justify-end space-x-4 pt-2 px-0 pb-0 bg-transparent">
                      <Button 
                        type="button"
                        variant="outline" 
                        className="border-purple-600/60 text-white hover:bg-purple-900/40 hover:text-purple-200"
                        onClick={() => form.reset()}
                        disabled={isSubmitting}
                      >
                        {getT("cancel")}
                      </Button>
                      <Button 
                        type="submit"
                        className="bg-purple-600 hover:bg-purple-700 text-white shadow-md shadow-purple-900/30"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <div className="flex items-center">
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            {getT("processing")}
                          </div>
                        ) : getT("confirm")}
                      </Button>
                    </CardFooter>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div 
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="lg:col-span-1"
        >
          <DepositInfoCard 
            paymentMethod={selectedPaymentMethod} 
            language={language} 
            forceUpdateKey={forceUpdateKey} 
          />
        </motion.div>
      </motion.div>
    </PageLayout>
  );
};

export default WalletDeposit;
