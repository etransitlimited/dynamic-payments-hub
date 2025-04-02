
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { InfoIcon, Lightbulb, Sparkles } from "lucide-react";
import TranslatedText from "@/components/translation/TranslatedText";

const RebateRules = () => {
  const [expanded, setExpanded] = useState(false);
  
  return (
    <Card className="border-purple-900/30 bg-gradient-to-br from-charcoal-light/80 to-charcoal-dark/80 overflow-hidden relative group">
      <div className="absolute inset-0 bg-grid-white/[0.03] [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
      
      <CardContent className="relative z-10 p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Lightbulb className="h-5 w-5 text-amber-500 mr-2" />
            <h3 className="text-white font-medium text-lg">
              <TranslatedText keyName="invitation.rebate.rulesTitle" fallback="Rebate Rules" />
            </h3>
          </div>
          
          <button 
            onClick={() => setExpanded(!expanded)}
            className="text-sm text-purple-400 hover:text-neon-green transition-colors"
          >
            {expanded ? (
              <TranslatedText keyName="common.collapse" fallback="Collapse" />
            ) : (
              <TranslatedText keyName="common.expand" fallback="Expand" />
            )}
          </button>
        </div>
        
        <div className={`space-y-4 overflow-hidden transition-all duration-300 ${expanded ? 'max-h-[500px]' : 'max-h-[150px]'}`}>
          <div className="flex flex-col space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-300 flex items-center">
                <InfoIcon className="h-3 w-3 mr-1 text-purple-400" />
                <TranslatedText keyName="invitation.rebate.tier1" fallback="Tier 1 (Basic)" />
              </span>
              <span className="text-xs text-neon-green font-medium">10%</span>
            </div>
            <Progress value={10} className="h-1.5" indicatorClassName="bg-neon-green" />
          </div>
          
          <div className="flex flex-col space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-300 flex items-center">
                <InfoIcon className="h-3 w-3 mr-1 text-purple-400" />
                <TranslatedText keyName="invitation.rebate.tier2" fallback="Tier 2 (Silver)" />
              </span>
              <span className="text-xs text-blue-400 font-medium">15%</span>
            </div>
            <Progress value={15} className="h-1.5" indicatorClassName="bg-blue-500" />
          </div>
          
          <div className="flex flex-col space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-300 flex items-center">
                <InfoIcon className="h-3 w-3 mr-1 text-purple-400" />
                <TranslatedText keyName="invitation.rebate.tier3" fallback="Tier 3 (Gold)" />
              </span>
              <span className="text-xs text-amber-400 font-medium">20%</span>
            </div>
            <Progress value={20} className="h-1.5" indicatorClassName="bg-amber-500" />
          </div>
          
          <div className="flex flex-col space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-300 flex items-center">
                <InfoIcon className="h-3 w-3 mr-1 text-purple-400" />
                <TranslatedText keyName="invitation.rebate.tier4" fallback="Tier 4 (Platinum)" />
              </span>
              <span className="text-xs text-purple-400 font-medium">25%</span>
            </div>
            <Progress value={25} className="h-1.5" indicatorClassName="bg-purple-500" />
          </div>
          
          {expanded && (
            <div className="mt-4 p-3 bg-purple-900/20 rounded-lg border border-purple-900/30">
              <div className="flex items-start">
                <Sparkles className="h-4 w-4 text-neon-green mt-0.5 mr-2 flex-shrink-0" />
                <p className="text-sm text-gray-200">
                  <TranslatedText 
                    keyName="invitation.rebate.rulesDescription" 
                    fallback="Rebate percentages are calculated based on the transaction volume of your invitees. Higher tiers provide greater benefits and exclusive features." 
                  />
                </p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RebateRules;
