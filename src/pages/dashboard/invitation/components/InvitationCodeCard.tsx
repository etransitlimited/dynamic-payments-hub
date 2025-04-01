
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Share2, Users } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { useLanguage } from "@/context/LanguageContext";

const InvitationCodeCard = () => {
  const { t } = useLanguage();
  
  const handleCopyInviteCode = () => {
    navigator.clipboard.writeText("INV-8521-4796");
    toast({
      title: t("invitation.codeCopied"),
      description: t("invitation.shareCodeToFriends"),
    });
  };

  return (
    <Card className="bg-gradient-to-r from-[rgb(57,106,252)] to-[rgb(41,72,255)] border-blue-900/50 shadow-lg shadow-blue-900/10 hover:shadow-[0_0_15px_rgba(57,106,252,0.15)] transition-all duration-300 overflow-hidden h-full w-full">
      <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
      <CardHeader className="relative z-10 px-6 py-5 border-b border-purple-800/30">
        <CardTitle className="text-white flex items-center">
          <span className="bg-purple-500/20 p-2 rounded-full mr-3">
            <Users size={18} className="text-purple-400" />
          </span>
          {t("invitation.myCode")}
        </CardTitle>
      </CardHeader>
      <CardContent className="relative z-10 p-6">
        <div className="w-full">
          <div className="flex flex-col space-y-6">
            {/* Invitation code display area */}
            <div className="bg-[#061428]/80 rounded-lg p-4 border border-purple-900/30">
              <p className="text-purple-300/80 text-sm mb-2">{t("invitation.invitationCode")}</p>
              <div className="bg-[#051020] rounded-md py-3 px-4 font-mono text-xl text-purple-200 border border-purple-900/50 text-center w-full select-all">
                INV-8521-4796
              </div>
            </div>
            
            {/* Action buttons area */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Button 
                variant="outline" 
                className="h-12 w-full gap-2 border-purple-600/60 text-white hover:bg-purple-900/20"
                onClick={handleCopyInviteCode}
              >
                <Copy className="h-4 w-4" />
                <span>{t("invitation.copyCode")}</span>
              </Button>
              <Button 
                className="h-12 w-full gap-2 bg-purple-600 hover:bg-purple-700 text-white"
              >
                <Share2 className="h-4 w-4" />
                <span>{t("invitation.share")}</span>
              </Button>
            </div>
            
            {/* Stats area */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
              <div className="bg-[#061428]/70 rounded-lg p-4 border border-purple-900/30 hover:border-purple-700/40 transition-colors">
                <p className="text-purple-300/80 text-sm mb-1">{t("invitation.stats.invited")}</p>
                <p className="text-2xl font-bold text-white">3</p>
              </div>
              <div className="bg-[#061428]/70 rounded-lg p-4 border border-purple-900/30 hover:border-purple-700/40 transition-colors">
                <p className="text-purple-300/80 text-sm mb-1">{t("invitation.stats.activated")}</p>
                <p className="text-2xl font-bold text-white">2</p>
              </div>
              <div className="bg-[#061428]/70 rounded-lg p-4 border border-purple-900/30 hover:border-purple-700/40 transition-colors">
                <p className="text-purple-300/80 text-sm mb-1">{t("invitation.stats.totalRebate")}</p>
                <p className="text-2xl font-bold text-white">¥343.25</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InvitationCodeCard;
