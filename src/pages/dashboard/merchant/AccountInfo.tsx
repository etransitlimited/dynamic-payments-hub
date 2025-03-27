
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

const AccountInfo = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">帐号信息</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>基本信息</CardTitle>
          <CardDescription>查看和更新您的个人信息</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="account-id">账户ID</Label>
              <Input id="account-id" value="M10058" readOnly className="bg-gray-50" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="account-type">账户类型</Label>
              <Input id="account-type" value="企业账户" readOnly className="bg-gray-50" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="company-name">公司名称</Label>
              <Input id="company-name" defaultValue="北京优卡科技有限公司" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="registration-date">注册日期</Label>
              <Input id="registration-date" value="2023-08-15" readOnly className="bg-gray-50" />
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-2">
            <Label htmlFor="email">电子邮箱</Label>
            <Input id="email" type="email" defaultValue="contact@example.com" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone">联系电话</Label>
            <Input id="phone" defaultValue="13800138000" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="address">公司地址</Label>
            <Input id="address" defaultValue="北京市海淀区科技园区88号" />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button>保存更改</Button>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>更改密码</CardTitle>
          <CardDescription>更新您的账户密码</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="current-password">当前密码</Label>
            <Input id="current-password" type="password" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="new-password">新密码</Label>
            <Input id="new-password" type="password" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="confirm-password">确认新密码</Label>
            <Input id="confirm-password" type="password" />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button>更新密码</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AccountInfo;
