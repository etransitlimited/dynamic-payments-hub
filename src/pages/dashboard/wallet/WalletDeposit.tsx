
import React from "react";
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

const WalletDeposit = () => {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold tracking-tight mb-6 text-white">钱包充值</h1>
      
      <Card className="bg-[#0F2643]/80 backdrop-blur-sm border-blue-900/50 text-white">
        <CardHeader>
          <CardTitle className="text-white">充值表单</CardTitle>
          <CardDescription className="text-blue-200/80">
            请填写充值金额和支付方式
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="amount" className="text-white">充值金额</Label>
            <div className="flex items-center">
              <span className="bg-[#061428]/80 px-3 py-2 rounded-l-md border border-r-0 border-blue-900/50 text-white">¥</span>
              <Input 
                id="amount" 
                type="number" 
                placeholder="0.00" 
                className="rounded-l-none bg-[#061428]/50 border-blue-900/50 text-white placeholder-blue-200/50"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="payment-method" className="text-white">支付方式</Label>
            <Select>
              <SelectTrigger id="payment-method" className="bg-[#061428]/50 border-blue-900/50 text-white">
                <SelectValue placeholder="选择支付方式" />
              </SelectTrigger>
              <SelectContent className="bg-[#0F2643] border-blue-900/50 text-white">
                <SelectItem value="alipay">支付宝</SelectItem>
                <SelectItem value="wechat">微信支付</SelectItem>
                <SelectItem value="bank">银行转账</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="note" className="text-white">备注</Label>
            <Input 
              id="note" 
              placeholder="可选：添加备注" 
              className="bg-[#061428]/50 border-blue-900/50 text-white placeholder-blue-200/50"
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" className="border-blue-600 text-white hover:bg-blue-900/20">取消</Button>
          <Button className="bg-blue-600 hover:bg-blue-700">确认充值</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default WalletDeposit;
