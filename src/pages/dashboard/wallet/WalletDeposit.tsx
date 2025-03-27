
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

const WalletDeposit = () => {
  const [amount, setAmount] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [note, setNote] = useState<string>("");

  const handleSubmit = () => {
    if (!amount || !paymentMethod) {
      toast({
        description: "请填写金额和选择支付方式",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "充值请求已提交",
      description: `充值金额: ¥${amount}，支付方式: ${paymentMethod}`,
    });
    
    // Reset form
    setAmount("");
    setPaymentMethod("");
    setNote("");
  };

  return (
    <div className="container max-w-2xl px-4 mx-auto py-6">
      <PageHeader title="钱包充值" />
      
      <Card className="bg-[#0F2643]/90 backdrop-blur-sm border-blue-900/50 shadow-lg shadow-blue-900/10 hover:shadow-[0_0_15px_rgba(0,243,255,0.15)] transition-all duration-300">
        <CardHeader className="pb-3">
          <CardTitle className="text-white text-xl flex items-center">
            <span className="bg-blue-500/20 p-2 rounded-full mr-2">
              <CreditCard size={18} className="text-blue-400" />
            </span>
            充值表单
          </CardTitle>
          <CardDescription className="text-blue-200/80">
            请填写充值金额和支付方式，我们将尽快处理您的请求
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="amount" className="text-white text-sm">充值金额</Label>
            <div className="flex items-center">
              <span className="bg-[#061428] px-3 py-2 rounded-l-md border border-r-0 border-blue-900/50 text-white">¥</span>
              <Input 
                id="amount" 
                type="number" 
                placeholder="请输入充值金额" 
                className="rounded-l-none bg-[#061428] border-blue-900/50 text-white placeholder-blue-300/40"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="payment-method" className="text-white text-sm">支付方式</Label>
            <Select value={paymentMethod} onValueChange={setPaymentMethod}>
              <SelectTrigger id="payment-method" className="bg-[#061428] border-blue-900/50 text-white">
                <SelectValue placeholder="选择支付方式" />
              </SelectTrigger>
              <SelectContent className="bg-[#0F2643] border-blue-900/50 text-white">
                <SelectItem value="alipay" className="focus:bg-blue-900/40 focus:text-white">
                  <div className="flex items-center">
                    <span className="text-blue-400 bg-blue-400/10 p-1 rounded-md mr-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.5 7H17a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-3"/><path d="M10 10h5"/><path d="M15 7v5.172a2 2 0 0 1-.586 1.414l-3.828 3.828"/></svg>
                    </span>
                    支付宝
                  </div>
                </SelectItem>
                <SelectItem value="wechat" className="focus:bg-blue-900/40 focus:text-white">
                  <div className="flex items-center">
                    <span className="text-green-400 bg-green-400/10 p-1 rounded-md mr-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.5 19H9a7 7 0 1 1 0-14h8.5a4.5 4.5 0 1 1 0 9H12v5"/></svg>
                    </span>
                    微信支付
                  </div>
                </SelectItem>
                <SelectItem value="bank" className="focus:bg-blue-900/40 focus:text-white">
                  <div className="flex items-center">
                    <span className="text-yellow-400 bg-yellow-400/10 p-1 rounded-md mr-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>
                    </span>
                    银行转账
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="note" className="text-white text-sm">备注</Label>
            <Input 
              id="note" 
              placeholder="可选：添加备注信息" 
              className="bg-[#061428] border-blue-900/50 text-white placeholder-blue-300/40"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between pt-2">
          <Button variant="outline" className="border-blue-600/60 text-white hover:bg-blue-900/20">
            取消
          </Button>
          <Button 
            className="bg-blue-600 hover:bg-blue-700 text-white"
            onClick={handleSubmit}
          >
            确认充值
          </Button>
        </CardFooter>
      </Card>
      
      <Card className="bg-[#0F2643]/90 backdrop-blur-sm border-blue-900/50 shadow-lg shadow-blue-900/10 mt-6 hover:shadow-[0_0_15px_rgba(0,243,255,0.15)] transition-all duration-300">
        <CardHeader className="pb-3">
          <CardTitle className="text-white text-xl flex items-center">
            <span className="bg-yellow-500/20 p-2 rounded-full mr-2">
              <AlertCircle size={18} className="text-yellow-400" />
            </span>
            充值说明
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-blue-200/80 list-disc pl-5">
            <li>充值金额将在系统确认后实时到账</li>
            <li>支付宝和微信支付通常会在10分钟内完成处理</li>
            <li>银行转账可能需要1-3个工作日</li>
            <li>如有疑问，请联系客服：400-123-4567</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default WalletDeposit;
