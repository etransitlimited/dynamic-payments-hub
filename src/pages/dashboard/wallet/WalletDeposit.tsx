
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
      <h1 className="text-2xl font-bold tracking-tight mb-6">钱包充值</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>充值表单</CardTitle>
          <CardDescription>
            请填写充值金额和支付方式
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="amount">充值金额</Label>
            <div className="flex items-center">
              <span className="bg-muted px-3 py-2 rounded-l-md border border-r-0 border-input">¥</span>
              <Input 
                id="amount" 
                type="number" 
                placeholder="0.00" 
                className="rounded-l-none"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="payment-method">支付方式</Label>
            <Select>
              <SelectTrigger id="payment-method">
                <SelectValue placeholder="选择支付方式" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="alipay">支付宝</SelectItem>
                <SelectItem value="wechat">微信支付</SelectItem>
                <SelectItem value="bank">银行转账</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="note">备注</Label>
            <Input id="note" placeholder="可选：添加备注" />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">取消</Button>
          <Button>确认充值</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default WalletDeposit;
