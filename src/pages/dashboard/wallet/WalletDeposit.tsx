
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
import DepositStats from "./components/DepositStats";

const WalletDeposit = () => {
  const [amount, setAmount] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [note, setNote] = useState<string>("");

  const handleSubmit = () => {
    if (!amount || !paymentMethod) {
      toast({
        description: "Please fill in the amount and select a payment method",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Deposit Request Submitted",
      description: `Deposit Amount: $${amount}, Payment Method: ${paymentMethod}`,
    });
    
    // Reset form
    setAmount("");
    setPaymentMethod("");
    setNote("");
  };

  return (
    <div className="container max-w-2xl px-4 mx-auto py-6">
      <PageHeader title="Wallet Deposit" />
      
      <div className="mb-6">
        <DepositStats />
      </div>
      
      <Card className="bg-gradient-to-br from-blue-900 to-blue-950 border-blue-900/50 shadow-lg shadow-blue-900/10 hover:shadow-[0_0_15px_rgba(0,243,255,0.15)] transition-all duration-300 overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
        <CardHeader className="relative z-10 pb-3">
          <CardTitle className="text-white text-xl flex items-center">
            <span className="bg-blue-500/20 p-2 rounded-full mr-2">
              <CreditCard size={18} className="text-blue-400" />
            </span>
            Deposit Form
          </CardTitle>
          <CardDescription className="text-blue-200/80">
            Please enter the deposit amount and select a payment method
          </CardDescription>
        </CardHeader>
        <CardContent className="relative z-10 space-y-5">
          <div className="space-y-2">
            <Label htmlFor="amount" className="text-white text-sm">Deposit Amount</Label>
            <div className="flex items-center">
              <span className="bg-[#061428] px-3 py-2 rounded-l-md border border-r-0 border-blue-900/50 text-white">$</span>
              <Input 
                id="amount" 
                type="number" 
                placeholder="Enter deposit amount" 
                className="rounded-l-none bg-[#061428] border-blue-900/50 text-white placeholder-blue-300/40"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="payment-method" className="text-white text-sm">Payment Method</Label>
            <Select value={paymentMethod} onValueChange={setPaymentMethod}>
              <SelectTrigger id="payment-method" className="bg-[#061428] border-blue-900/50 text-white">
                <SelectValue placeholder="Select payment method" />
              </SelectTrigger>
              <SelectContent className="bg-[#0F2643] border-blue-900/50 text-white">
                <SelectItem value="alipay" className="focus:bg-blue-900/40 focus:text-white">
                  <div className="flex items-center">
                    <span className="text-blue-400 bg-blue-400/10 p-1 rounded-md mr-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.5 7H17a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-3"/><path d="M10 10h5"/><path d="M15 7v5.172a2 2 0 0 1-.586 1.414l-3.828 3.828"/></svg>
                    </span>
                    Alipay
                  </div>
                </SelectItem>
                <SelectItem value="wechat" className="focus:bg-blue-900/40 focus:text-white">
                  <div className="flex items-center">
                    <span className="text-green-400 bg-green-400/10 p-1 rounded-md mr-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.5 19H9a7 7 0 1 1 0-14h8.5a4.5 4.5 0 1 1 0 9H12v5"/></svg>
                    </span>
                    WeChat Pay
                  </div>
                </SelectItem>
                <SelectItem value="bank" className="focus:bg-blue-900/40 focus:text-white">
                  <div className="flex items-center">
                    <span className="text-yellow-400 bg-yellow-400/10 p-1 rounded-md mr-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>
                    </span>
                    Bank Transfer
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="note" className="text-white text-sm">Note</Label>
            <Input 
              id="note" 
              placeholder="Optional: Add a note" 
              className="bg-[#061428] border-blue-900/50 text-white placeholder-blue-300/40"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter className="relative z-10 flex justify-between pt-2">
          <Button variant="outline" className="border-blue-600/60 text-white hover:bg-blue-900/20">
            Cancel
          </Button>
          <Button 
            className="bg-blue-600 hover:bg-blue-700 text-white"
            onClick={handleSubmit}
          >
            Confirm Deposit
          </Button>
        </CardFooter>
      </Card>
      
      <Card className="bg-gradient-to-br from-blue-900 to-blue-950 border-blue-900/50 shadow-lg shadow-blue-900/10 mt-6 hover:shadow-[0_0_15px_rgba(0,243,255,0.15)] transition-all duration-300 overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
        <CardHeader className="relative z-10 pb-3">
          <CardTitle className="text-white text-xl flex items-center">
            <span className="bg-yellow-500/20 p-2 rounded-full mr-2">
              <AlertCircle size={18} className="text-yellow-400" />
            </span>
            Deposit Information
          </CardTitle>
        </CardHeader>
        <CardContent className="relative z-10">
          <ul className="space-y-2 text-blue-200/80 list-disc pl-5">
            <li>Deposit will be credited to your account immediately after confirmation</li>
            <li>Alipay and WeChat Pay transactions are typically processed within 10 minutes</li>
            <li>Bank transfers may take 1-3 business days</li>
            <li>For questions, please contact support: 400-123-4567</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default WalletDeposit;
