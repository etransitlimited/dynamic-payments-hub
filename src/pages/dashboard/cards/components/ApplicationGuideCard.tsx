
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Info, Check } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import TranslatedText from "@/components/translation/TranslatedText";

const ApplicationGuideCard = () => {
  const { t } = useLanguage();
  
  return (
    <Card className="bg-gradient-to-br from-[#2E1065] to-[#3A0080] border-purple-900/40 shadow-lg shadow-purple-900/20 overflow-hidden relative group hover:shadow-[0_0_25px_rgba(139,92,246,0.2)] transition-all duration-500 h-full">
      <div className="absolute inset-0 bg-grid-white/[0.03] [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
      <div className="absolute top-0 right-0 w-40 h-40 bg-purple-600/10 rounded-full blur-3xl opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-neon-green/[0.02] rounded-full blur-3xl"></div>
      
      <CardHeader className="relative z-10 pb-2">
        <div className="flex items-center gap-3 mb-2">
          <span className="bg-gradient-to-br from-blue-500/30 to-blue-700/30 p-2.5 rounded-lg">
            <Info size={18} className="text-blue-300" />
          </span>
          <CardTitle className="text-xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
            <TranslatedText keyName="cards.apply.applicationGuide" fallback="Application Guide" />
          </CardTitle>
        </div>
        <CardDescription className="text-blue-200/70">
          <TranslatedText keyName="cards.apply.applicationRequirements" fallback="Application Requirements" />
        </CardDescription>
      </CardHeader>
      
      <CardContent className="relative z-10 space-y-5 pt-4">
        <ul className="space-y-3">
          {[...Array(5)].map((_, index) => (
            <li key={index} className="flex gap-3">
              <div className="flex-shrink-0 w-5 h-5 bg-green-500/20 rounded-full flex items-center justify-center mt-0.5">
                <Check size={12} className="text-green-400" />
              </div>
              <p className="text-blue-200/90 text-sm">
                <TranslatedText keyName={`cards.apply.guideItems.${index}`} fallback={`Item ${index + 1}`} />
              </p>
            </li>
          ))}
        </ul>
        
        <div className="relative mt-6 p-4 bg-gradient-to-r from-blue-600/20 to-blue-800/20 rounded-lg border border-blue-600/30">
          <div className="absolute -inset-[0.5px] bg-gradient-to-r from-blue-500/50 to-blue-700/50 rounded-lg blur-[2px] opacity-30"></div>
          <div className="relative">
            <h4 className="text-blue-200 font-medium mb-2 text-sm">
              <TranslatedText keyName="cards.apply.applicationTips" fallback="Application Tips" />
            </h4>
            <p className="text-xs text-blue-200/70">
              <TranslatedText keyName="cards.apply.applicationNote" fallback="Fill out all required fields and upload clear photos of your identification documents to speed up the verification process." />
            </p>
          </div>
        </div>
        
        {/* Decorative image */}
        <div className="mt-4 flex justify-center">
          <div className="w-24 h-24 relative">
            <div className="w-20 h-20 absolute top-2 left-2 bg-gradient-to-br from-neon-green/10 to-neon-green/5 rounded-xl"></div>
            <div className="w-20 h-20 relative bg-gradient-to-br from-purple-600/20 to-purple-800/20 rounded-xl border border-purple-500/20 flex items-center justify-center">
              <div className="w-12 h-8 bg-gradient-to-br from-purple-500/40 to-purple-700/40 rounded-md relative overflow-hidden">
                <div className="absolute top-1 left-1 w-2 h-2 bg-yellow-500/70 rounded-sm"></div>
                <div className="absolute bottom-2 left-4 right-4 h-1 bg-white/20 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ApplicationGuideCard;
