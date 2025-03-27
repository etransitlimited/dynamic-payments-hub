
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { CreditCard, CheckCircle, AlertCircle } from "lucide-react";

const ApplyCard = () => {
  const [cardType, setCardType] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [purpose, setPurpose] = useState("");
  
  const handleSubmit = () => {
    if (!cardType || !name || !phone) {
      toast({
        description: "请填写必要的申请信息",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "申请已提交",
      description: "我们将尽快审核您的申请",
    });
    
    // Reset form
    setCardType("");
    setName("");
    setPhone("");
    setEmail("");
    setPurpose("");
  };

  return (
    <div className="container max-w-6xl px-4 mx-auto py-6">
      <div className="flex items-center mb-6">
        <div className="w-2 h-8 bg-purple-500 rounded-full mr-3"></div>
        <h1 className="text-2xl font-bold tracking-tight text-white">申请卡片</h1>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="bg-[#0F2643]/90 backdrop-blur-sm border-blue-900/50 shadow-lg shadow-blue-900/10">
            <CardHeader className="pb-3">
              <CardTitle className="text-white text-xl">卡片申请表单</CardTitle>
              <CardDescription className="text-blue-200/80">
                请填写申请卡片所需的信息，标记<span className="text-red-400">*</span>的为必填项
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="card-type" className="text-white text-sm">
                  卡片类型<span className="text-red-400 ml-1">*</span>
                </Label>
                <Select value={cardType} onValueChange={setCardType}>
                  <SelectTrigger id="card-type" className="bg-[#061428] border-blue-900/50 text-white">
                    <SelectValue placeholder="选择卡片类型" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0F2643] border-blue-900/50 text-white">
                    <SelectItem value="standard" className="focus:bg-blue-900/40 focus:text-white">
                      <div className="flex items-center">
                        <span className="text-blue-400 bg-blue-400/10 p-1 rounded-md mr-2">
                          <CreditCard size={16} />
                        </span>
                        标准卡
                      </div>
                    </SelectItem>
                    <SelectItem value="gold" className="focus:bg-blue-900/40 focus:text-white">
                      <div className="flex items-center">
                        <span className="text-yellow-400 bg-yellow-400/10 p-1 rounded-md mr-2">
                          <CreditCard size={16} />
                        </span>
                        金卡
                      </div>
                    </SelectItem>
                    <SelectItem value="platinum" className="focus:bg-blue-900/40 focus:text-white">
                      <div className="flex items-center">
                        <span className="text-purple-400 bg-purple-400/10 p-1 rounded-md mr-2">
                          <CreditCard size={16} />
                        </span>
                        白金卡
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="cardholder-name" className="text-white text-sm">
                  持卡人姓名<span className="text-red-400 ml-1">*</span>
                </Label>
                <Input 
                  id="cardholder-name" 
                  placeholder="请输入持卡人姓名" 
                  className="bg-[#061428] border-blue-900/50 text-white placeholder-blue-300/40"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-white text-sm">
                  联系电话<span className="text-red-400 ml-1">*</span>
                </Label>
                <Input 
                  id="phone" 
                  placeholder="请输入联系电话" 
                  className="bg-[#061428] border-blue-900/50 text-white placeholder-blue-300/40"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white text-sm">电子邮件</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="请输入电子邮件" 
                  className="bg-[#061428] border-blue-900/50 text-white placeholder-blue-300/40"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="purpose" className="text-white text-sm">申请用途</Label>
                <Textarea 
                  id="purpose" 
                  placeholder="请简要说明申请用途" 
                  rows={3} 
                  className="bg-[#061428] border-blue-900/50 text-white placeholder-blue-300/40 min-h-[100px]"
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between pt-2">
              <Button variant="outline" className="border-blue-600/60 text-white hover:bg-blue-900/20">取消</Button>
              <Button 
                className="bg-blue-600 hover:bg-blue-700 text-white"
                onClick={handleSubmit}
              >
                提交申请
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        <div>
          <Card className="bg-[#0F2643]/90 backdrop-blur-sm border-blue-900/50 shadow-lg shadow-blue-900/10 mb-6">
            <CardHeader className="pb-3">
              <CardTitle className="text-white">卡片类型对比</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-[#061428]/70 rounded-lg p-4 border border-blue-900/30">
                  <h3 className="text-blue-400 font-semibold flex items-center">
                    <span className="text-blue-400 bg-blue-400/10 p-1 rounded-md mr-2">
                      <CreditCard size={16} />
                    </span>
                    标准卡
                  </h3>
                  <ul className="mt-2 space-y-1 text-sm text-blue-200/80">
                    <li className="flex items-center">
                      <CheckCircle size={14} className="text-green-400 mr-2" />
                      基础服务支持
                    </li>
                    <li className="flex items-center">
                      <CheckCircle size={14} className="text-green-400 mr-2" />
                      单日交易限额 ¥5,000
                    </li>
                    <li className="flex items-center">
                      <AlertCircle size={14} className="text-red-400 mr-2" />
                      无高级权益
                    </li>
                  </ul>
                </div>
                
                <div className="bg-[#061428]/70 rounded-lg p-4 border border-blue-900/30">
                  <h3 className="text-yellow-400 font-semibold flex items-center">
                    <span className="text-yellow-400 bg-yellow-400/10 p-1 rounded-md mr-2">
                      <CreditCard size={16} />
                    </span>
                    金卡
                  </h3>
                  <ul className="mt-2 space-y-1 text-sm text-blue-200/80">
                    <li className="flex items-center">
                      <CheckCircle size={14} className="text-green-400 mr-2" />
                      优先服务支持
                    </li>
                    <li className="flex items-center">
                      <CheckCircle size={14} className="text-green-400 mr-2" />
                      单日交易限额 ¥20,000
                    </li>
                    <li className="flex items-center">
                      <CheckCircle size={14} className="text-green-400 mr-2" />
                      返现比例 0.5%
                    </li>
                  </ul>
                </div>
                
                <div className="bg-[#061428]/70 rounded-lg p-4 border border-blue-900/30">
                  <h3 className="text-purple-400 font-semibold flex items-center">
                    <span className="text-purple-400 bg-purple-400/10 p-1 rounded-md mr-2">
                      <CreditCard size={16} />
                    </span>
                    白金卡
                  </h3>
                  <ul className="mt-2 space-y-1 text-sm text-blue-200/80">
                    <li className="flex items-center">
                      <CheckCircle size={14} className="text-green-400 mr-2" />
                      24小时专属客服
                    </li>
                    <li className="flex items-center">
                      <CheckCircle size={14} className="text-green-400 mr-2" />
                      单日交易限额 ¥50,000
                    </li>
                    <li className="flex items-center">
                      <CheckCircle size={14} className="text-green-400 mr-2" />
                      返现比例 1.5%
                    </li>
                    <li className="flex items-center">
                      <CheckCircle size={14} className="text-green-400 mr-2" />
                      专属增值服务
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-[#0F2643]/90 backdrop-blur-sm border-blue-900/50 shadow-lg shadow-blue-900/10">
            <CardHeader className="pb-3">
              <CardTitle className="text-white">申请流程</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="space-y-3 text-blue-200/80">
                <li className="flex">
                  <span className="bg-blue-600/20 text-blue-400 rounded-full h-6 w-6 flex items-center justify-center mr-2 flex-shrink-0">1</span>
                  <span>提交申请表单</span>
                </li>
                <li className="flex">
                  <span className="bg-blue-600/20 text-blue-400 rounded-full h-6 w-6 flex items-center justify-center mr-2 flex-shrink-0">2</span>
                  <span>系统审核（1-3个工作日）</span>
                </li>
                <li className="flex">
                  <span className="bg-blue-600/20 text-blue-400 rounded-full h-6 w-6 flex items-center justify-center mr-2 flex-shrink-0">3</span>
                  <span>短信或邮件通知结果</span>
                </li>
                <li className="flex">
                  <span className="bg-blue-600/20 text-blue-400 rounded-full h-6 w-6 flex items-center justify-center mr-2 flex-shrink-0">4</span>
                  <span>激活卡片并开始使用</span>
                </li>
              </ol>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ApplyCard;
