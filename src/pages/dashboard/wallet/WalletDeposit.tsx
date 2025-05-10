import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";
import { CreditCard, ArrowLeft, Check, AlertCircle, Info, Globe2, Bitcoin } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import TranslatedText from "@/components/translation/TranslatedText";
import PaymentMethodIcon from "./components/PaymentMethodIcon";
import DepositInfoCard from "./components/DepositInfoCard";
import PaymentInstructionCard from "./components/PaymentInstructionCard";
import { formatUSD } from "@/utils/currencyUtils";
import { useLanguage } from "@/context/LanguageContext";
import { getDepositTranslation } from "./i18n/deposit";
import PageLayout from "@/components/dashboard/PageLayout";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useSafeTranslation } from "@/hooks/use-safe-translation";
import { usePageLanguage } from "@/hooks/use-page-language";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import PageNavigation from "@/components/dashboard/PageNavigation";

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

  const watchAmount = form.watch("amount");
  const watchPaymentMethod = form.watch("paymentMethod");
  
  const amount = parseFloat(watchAmount) || 0;
  const serviceFee = amount * 0.02;
  const totalAmount = amount + serviceFee;

  const handlePaymentMethodChange = useCallback((value: string) => {
    console.log("Payment method changed to:", value);
    form.setValue("paymentMethod", value, { shouldValidate: true });
  }, [form]);

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    console.log("Submitting form with values:", values);
    
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
                {getT("totalAmount")}: {formatUSD(parseFloat(values.amount) * 1.02)}
              </span>
              <span>
                {getT("paymentMethod")}: {getT(values.paymentMethod)}
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
  
  const walletNavItems = [
    {
      path: "/dashboard/wallet",
      title: t("wallet.walletManagement"),
      subtitle: t("wallet.overview"),
      icon: <CreditCard size={16} className="mr-2 text-blue-400" />
    },
    {
      path: "/dashboard/wallet/deposit",
      title: getT("form"),
      subtitle: getT("formDescription"),
      icon: <ArrowLeft size={16} className="mr-2 text-green-400" />,
      isActive: true
    }
  ];
  
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
      label: pageTitle
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

  const selectedPaymentMethod = watchPaymentMethod;
  const showInstructions = selectedPaymentMethod && amount > 0;
  
  const paymentMethods = [
    {
      id: "overseasBank",
      label: getT("overseasBank"),
      icon: <Globe2 size={18} className="text-indigo-200" />
    },
    {
      id: "platformTransfer",
      label: getT("platformTransfer"),
      icon: <CreditCard size={18} className="text-indigo-200" />
    },
    {
      id: "cryptoCurrency",
      label: getT("cryptoCurrency"),
      icon: <Bitcoin size={18} className="text-indigo-200" />
    }
  ];

  console.log("Current payment method:", selectedPaymentMethod);
  console.log("Show instructions:", showInstructions);
  console.log("Available payment methods:", paymentMethods.map(m => m.id).join(", "));

  return (
    <PageLayout 
      title={pageTitle}
      subtitle={pageSubtitle}
      actions={pageActions}
      breadcrumbs={breadcrumbs}
      animationKey={`wallet-deposit-${language}-${forceUpdateKey}`}
    >
      <PageNavigation items={walletNavItems} className="mb-6" />

      <Alert className="mb-6 border-amber-600/30 bg-amber-900/20">
        <AlertCircle className="h-5 w-5 text-amber-400" />
        <AlertTitle className="text-amber-400 font-medium">
          {getT("manualReview")}
        </AlertTitle>
        <AlertDescription className="text-amber-200">
          {getT("manualReviewDesc")}
        </AlertDescription>
      </Alert>

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
                  
                  {amount > 0 && (
                    <div className="rounded-md border border-purple-800/30 bg-purple-900/20 p-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-purple-300">{getT("amount")}</span>
                          <span className="text-white">${amount.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-purple-300">{getT("serviceFee")}</span>
                          <span className="text-white">${serviceFee.toFixed(2)}</span>
                        </div>
                        <div className="h-px bg-purple-800/30 my-1"></div>
                        <div className="flex justify-between text-sm font-medium">
                          <span className="text-purple-200">{getT("totalAmount")}</span>
                          <span className="text-white">${totalAmount.toFixed(2)}</span>
                        </div>
                        <div className="mt-2 pt-2 border-t border-purple-800/30">
                          <div className="text-xs text-purple-300 flex items-start gap-2">
                            <Info size={12} className="mt-0.5 flex-shrink-0 text-purple-400" />
                            <span>{getT("feeExplanation")}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <FormField
                    control={form.control}
                    name="paymentMethod"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel className="text-white text-sm font-medium flex items-center">
                          {getT("paymentMethod")}
                          <span className="ml-1 text-red-400">*</span>
                        </FormLabel>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          {paymentMethods.map((method) => (
                            <div
                              key={`payment-method-${method.id}`}
                              className={`
                                flex items-center p-3 rounded-md border cursor-pointer
                                ${selectedPaymentMethod === method.id ? 'bg-indigo-800/40 border-indigo-500/60' : 'bg-purple-900/40 border-purple-800/40'}
                                hover:bg-indigo-800/60 transition-all duration-200 relative overflow-hidden w-full
                              `}
                              onClick={() => handlePaymentMethodChange(method.id)}
                            >
                              {selectedPaymentMethod === method.id && (
                                <motion.div
                                  initial={{ opacity: 0, scale: 0 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  className="absolute top-0 left-0 w-1 h-full bg-indigo-500"
                                />
                              )}
                              
                              <input 
                                type="radio" 
                                value={method.id}
                                checked={selectedPaymentMethod === method.id}
                                readOnly
                                className="sr-only"
                                id={`radio-${method.id}`}
                              />
                              
                              <div className="flex items-center">
                                <div className="bg-indigo-800/40 p-2 rounded-md flex items-center justify-center mr-2">
                                  {method.icon}
                                </div>
                                <span className="text-white">
                                  {method.label}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                        <FormMessage className="text-red-400 text-sm" />
                      </FormItem>
                    )}
                  />
                  
                  {showInstructions && (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      key={`instructions-${selectedPaymentMethod}-${forceUpdateKey}`} 
                      className="mt-6"
                    >
                      <PaymentInstructionCard
                        paymentMethod={selectedPaymentMethod}
                        language={language}
                        platformId="USER12345"
                        amount={amount}
                        key={`payment-instruction-${selectedPaymentMethod}-${forceUpdateKey}`}
                      />
                    </motion.div>
                  )}
                  
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
                            className="bg-purple-900/50 border-purple-800/50 text-white placeholder-purple-300/40 min-h-[80px] focus:border-purple-500 focus:ring-purple-500/30"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="pt-2">
                    <CardFooter className="relative z-10 flex justify-end space-x-4 pt-4 px-0 pb-0 bg-transparent">
                      <Button 
                        type="button"
                        variant="outline" 
                        className="border-purple-600/60 text-white hover:bg-purple-900/40 hover:text-purple-200"
                        onClick={() => {
                          form.reset();
                          setForceUpdateKey(Date.now());
                        }}
                        disabled={isSubmitting}
                      >
                        {getT("cancel")}
                      </Button>
                      <Button 
                        type="submit"
                        className="bg-purple-600 hover:bg-purple-700 text-white shadow-md shadow-purple-900/30"
                        disabled={isSubmitting || !amount || !selectedPaymentMethod}
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
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <DepositInfoCard 
            paymentMethod={selectedPaymentMethod}
            language={language}
            forceUpdateKey={forceUpdateKey}
            amount={amount}
          />
        </motion.div>
      </motion.div>
    </PageLayout>
  );
};

export default WalletDeposit;
