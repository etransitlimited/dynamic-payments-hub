
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Copy, Share2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useToast } from "@/components/ui/use-toast";

const InvitationCodeCard = () => {
  const [isCopied, setIsCopied] = useState(false);
  const { t } = useLanguage();
  const { toast } = useToast();
  
  const invitationCode = "ZORA-CARD-2023";
  
  const handleCopyClick = () => {
    navigator.clipboard.writeText(invitationCode);
    setIsCopied(true);
    toast({
      title: t("invitation.codeCopied"),
      duration: 2000,
    });
    
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };
  
  return (
    <Card className="border-purple-900/20 shadow-lg hover:shadow-purple-900/10 transition-all duration-300 overflow-hidden h-full">
      <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
      <CardHeader className="relative z-10 bg-purple-900/10 border-b border-purple-900/20 px-6 py-4">
        <CardTitle className="text-white text-lg flex items-center">
          <span className="bg-purple-500 h-5 w-1 rounded-full mr-2"></span>
          {t("invitation.myCode")}
        </CardTitle>
      </CardHeader>
      <CardContent className="relative z-10 p-6">
        <div className="mb-6">
          <p className="text-gray-400 mb-2 text-sm">{t("invitation.shareCodeToFriends")}</p>
          <div className="flex items-center space-x-4">
            <div className="flex-1 bg-charcoal p-4 rounded-lg border border-purple-900/20">
              <div className="flex items-center justify-between">
                <div className="font-mono font-bold text-xl text-white tracking-wider">{invitationCode}</div>
                <Badge variant="outline" className="border-green-500 text-green-400 ml-4">
                  {t("invitation.statusActive")}
                </Badge>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex space-x-3">
          <Button
            variant="outline"
            className="flex-1 border-purple-800 text-purple-300 hover:bg-purple-900/20"
            onClick={handleCopyClick}
          >
            <Copy className="mr-2 h-4 w-4" />
            {isCopied ? t("invitation.codeCopied") : t("invitation.copyCode")}
          </Button>
          <Button
            variant="outline"
            className="flex-1 border-teal-800 text-teal-300 hover:bg-teal-900/20"
          >
            <Share2 className="mr-2 h-4 w-4" />
            {t("invitation.share")}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default InvitationCodeCard;
