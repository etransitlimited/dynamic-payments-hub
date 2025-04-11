
import React, { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useSafeTranslation } from "@/hooks/use-safe-translation";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { AlertCircle, Info, BanknoteIcon, CreditCard, Building, ExternalLink } from "lucide-react";
import PageLayout from "@/components/dashboard/PageLayout";
import { Separator } from "@/components/ui/separator";
import InformationBox from "./components/InformationBox";
import withdrawalTranslations from "./i18n/withdrawal";
import { LanguageCode } from "@/utils/languageUtils";

type WithdrawalMethod = "overseasBank" | "usdtPayment";

const WalletWithdraw: React.FC = () => {
  const { language } = useLanguage();
  const { t } = useSafeTranslation();
  const [amount, setAmount] = useState<string>("");
  const [withdrawalMethod, setWithdrawalMethod] = useState<WithdrawalMethod | "">("");
  const [bankName, setBankName] = useState<string>("");
  const [accountName, setAccountName] = useState<string>("");
  const [accountNumber, setAccountNumber] = useState<string>("");
  const [swiftCode, setSwiftCode] = useState<string>("");
  const [bankAddress, setBankAddress] = useState<string>("");
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [note, setNote] = useState<string>("");
  const [agreedToTerms, setAgreedToTerms] = useState<boolean>(false);
  const [amountToReceive, setAmountToReceive] = useState<number>(0);

  const currentLang = language as LanguageCode;
  const getText = (key: string) => {
    const translation = withdrawalTranslations[currentLang];
    return translation ? translation[key as keyof typeof translation] || key : key;
  };

  // Calculate fee and amount to receive when amount changes
  useEffect(() => {
    if (!amount || isNaN(Number(amount))) {
      setAmountToReceive(0);
      return;
    }
    
    const amountNumber = Number(amount);
    const fee = amountNumber * 0.05;
    setAmountToReceive(amountNumber - fee);
  }, [amount]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error(getText('fillRequiredFields'));
      return;
    }
    
    // Simulate form submission
    toast.success(getText('requestSubmitted'));
    // Reset form
    resetForm();
  };

  const validateForm = (): boolean => {
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      return false;
    }
    
    if (!withdrawalMethod) {
      return false;
    }
    
    if (withdrawalMethod === 'overseasBank' && 
        (!bankName || !accountName || !accountNumber || !swiftCode || !bankAddress)) {
      return false;
    }
    
    if (withdrawalMethod === 'usdtPayment' && !walletAddress) {
      return false;
    }
    
    if (!agreedToTerms) {
      return false;
    }
    
    return true;
  };

  const resetForm = () => {
    setAmount("");
    setWithdrawalMethod("");
    setBankName("");
    setAccountName("");
    setAccountNumber("");
    setSwiftCode("");
    setBankAddress("");
    setWalletAddress("");
    setNote("");
    setAgreedToTerms(false);
    setAmountToReceive(0);
  };

  return (
    <PageLayout 
      title={getText('title')}
      subtitle={getText('description')}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2">
          <Card className="border-purple-900/30 bg-gradient-to-br from-charcoal-light to-charcoal-dark shadow-md">
            <form onSubmit={handleSubmit}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BanknoteIcon className="h-5 w-5" />
                  {getText('title')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Amount Section */}
                <div className="space-y-2">
                  <Label htmlFor="amount">{getText('amount')}</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-gray-400">$</span>
                    <Input 
                      id="amount" 
                      type="text" 
                      placeholder={getText('enterAmount')}
                      className="pl-7"
                      value={amount} 
                      onChange={(e) => setAmount(e.target.value)} 
                    />
                  </div>
                </div>

                {/* Withdrawal Method */}
                <div className="space-y-2">
                  <Label>{getText('withdrawalMethod')}</Label>
                  <RadioGroup value={withdrawalMethod} onValueChange={(value) => setWithdrawalMethod(value as WithdrawalMethod)}>
                    <div className="flex items-center space-x-2 rounded-md border p-3 mb-2 hover:bg-charcoal-light/30">
                      <RadioGroupItem value="overseasBank" id="overseasBank" />
                      <Label htmlFor="overseasBank" className="flex-1 cursor-pointer">
                        <div className="flex items-center gap-2">
                          <Building className="h-4 w-4" />
                          {getText('overseasBank')}
                        </div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 rounded-md border p-3 hover:bg-charcoal-light/30">
                      <RadioGroupItem value="usdtPayment" id="usdtPayment" />
                      <Label htmlFor="usdtPayment" className="flex-1 cursor-pointer">
                        <div className="flex items-center gap-2">
                          <CreditCard className="h-4 w-4" />
                          {getText('usdtPayment')}
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Conditional Fields Based on Method */}
                {withdrawalMethod === 'overseasBank' && (
                  <div className="space-y-4 border rounded-md p-4 bg-charcoal-light/20">
                    {/* Bank Name */}
                    <div className="space-y-2">
                      <Label htmlFor="bankName">{getText('bankName')}</Label>
                      <Input 
                        id="bankName" 
                        placeholder={getText('enterBankName')} 
                        value={bankName} 
                        onChange={(e) => setBankName(e.target.value)} 
                      />
                    </div>

                    {/* Account Name */}
                    <div className="space-y-2">
                      <Label htmlFor="accountName">{getText('accountName')}</Label>
                      <Input 
                        id="accountName" 
                        placeholder={getText('enterAccountName')} 
                        value={accountName} 
                        onChange={(e) => setAccountName(e.target.value)} 
                      />
                    </div>

                    {/* Account Number */}
                    <div className="space-y-2">
                      <Label htmlFor="accountNumber">{getText('accountNumber')}</Label>
                      <Input 
                        id="accountNumber" 
                        placeholder={getText('enterAccountNumber')} 
                        value={accountNumber} 
                        onChange={(e) => setAccountNumber(e.target.value)} 
                      />
                    </div>

                    {/* SWIFT Code */}
                    <div className="space-y-2">
                      <Label htmlFor="swiftCode">{getText('swiftCode')}</Label>
                      <Input 
                        id="swiftCode" 
                        placeholder={getText('enterSwiftCode')} 
                        value={swiftCode} 
                        onChange={(e) => setSwiftCode(e.target.value)} 
                      />
                    </div>

                    {/* Bank Address */}
                    <div className="space-y-2">
                      <Label htmlFor="bankAddress">{getText('bankAddress')}</Label>
                      <Input 
                        id="bankAddress" 
                        placeholder={getText('enterBankAddress')} 
                        value={bankAddress} 
                        onChange={(e) => setBankAddress(e.target.value)} 
                      />
                    </div>
                  </div>
                )}

                {withdrawalMethod === 'usdtPayment' && (
                  <div className="space-y-4 border rounded-md p-4 bg-charcoal-light/20">
                    {/* Wallet Address */}
                    <div className="space-y-2">
                      <Label htmlFor="walletAddress">{getText('walletAddress')}</Label>
                      <Input 
                        id="walletAddress" 
                        placeholder={getText('enterWalletAddress')} 
                        value={walletAddress} 
                        onChange={(e) => setWalletAddress(e.target.value)} 
                      />
                    </div>
                  </div>
                )}

                {/* Note */}
                <div className="space-y-2">
                  <Label htmlFor="note">{getText('note')}</Label>
                  <Input 
                    id="note" 
                    placeholder={getText('enterNote')} 
                    value={note} 
                    onChange={(e) => setNote(e.target.value)} 
                  />
                </div>

                {/* Fee and Processing Time */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-3 border rounded-md">
                    <div className="flex items-center gap-2 mb-1 text-amber-400">
                      <AlertCircle className="h-4 w-4" />
                      <span className="font-medium">{getText('fee')}</span>
                    </div>
                    <p className="text-sm text-gray-400">{getText('feeDescription')}</p>
                  </div>
                  <div className="p-3 border rounded-md">
                    <div className="flex items-center gap-2 mb-1 text-blue-400">
                      <Info className="h-4 w-4" />
                      <span className="font-medium">{getText('processingTime')}</span>
                    </div>
                    <p className="text-sm text-gray-400">{getText('processingDescription')}</p>
                  </div>
                </div>

                {/* Amount Summary */}
                {amount && !isNaN(Number(amount)) && Number(amount) > 0 && (
                  <div className="bg-blue-900/20 p-4 rounded-md border border-blue-800/30">
                    <div className="flex justify-between mb-1">
                      <span>{getText('amount')}:</span>
                      <span>${amount}</span>
                    </div>
                    <div className="flex justify-between mb-1">
                      <span>{getText('fee')} (5%):</span>
                      <span>-${(Number(amount) * 0.05).toFixed(2)}</span>
                    </div>
                    <Separator className="my-2" />
                    <div className="flex justify-between font-medium">
                      <span>{getText('amountToReceive')}:</span>
                      <span>${amountToReceive.toFixed(2)}</span>
                    </div>
                  </div>
                )}

                {/* Terms Agreement */}
                <div className="flex items-start space-x-2">
                  <Checkbox 
                    id="terms" 
                    checked={agreedToTerms} 
                    onCheckedChange={(checked) => setAgreedToTerms(checked === true)} 
                  />
                  <Label htmlFor="terms" className="text-sm">
                    {getText('terms')}
                  </Label>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" type="button" onClick={resetForm}>
                  {getText('cancel')}
                </Button>
                <Button type="submit" disabled={!validateForm()}>
                  {getText('confirm')}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>

        {/* Information Card */}
        <div>
          <InformationBox 
            title={getText('information')}
            items={[
              { text: getText('infoProcessing') },
              { text: getText('infoOverseasBank') },
              { text: getText('infoUSDT') },
              { text: getText('infoFee') },
              { text: getText('infoMinimum') },
              { text: getText('infoSupport') },
            ]}
          />
        </div>
      </div>
    </PageLayout>
  );
};

export default WalletWithdraw;
