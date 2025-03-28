
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CreditCard, Calendar, UserCircle, Phone, Check, Info, AlertCircle, FileText, CreditCard as CreditCardIcon, ShieldCheck } from "lucide-react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLanguage } from "@/context/LanguageContext";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";

const ApplyCard = () => {
  const { t, language } = useLanguage();
  const [birthdate, setBirthdate] = useState<Date | undefined>(undefined);
  
  const getApplicationGuideContent = () => {
    try {
      // Get guide items from translation
      let guideItems: string[] = [];
      const translatedGuideItems = t("cards.apply.guideItems");
      
      // Check if we got an array or a string and handle accordingly
      if (Array.isArray(translatedGuideItems)) {
        guideItems = translatedGuideItems;
      } else {
        // If it's not an array (either a string or undefined), use fallback items
        guideItems = [
          t("cards.apply.guideItems.0") || "Please ensure all personal information is accurate",
          t("cards.apply.guideItems.1") || "ID information will be used for identity verification",
          t("cards.apply.guideItems.2") || "Application review usually takes 1-3 business days",
          t("cards.apply.guideItems.3") || "Card will be shipped within 5-7 business days after approval",
          t("cards.apply.guideItems.4") || "First-time application is free of processing fees"
        ];
      }
      
      // Get document requirements from translation
      const documentRequirements = [
        t("cards.apply.documentRequirements.idCard") || "Valid ID card or passport",
        t("cards.apply.documentRequirements.proofOfAddress") || "Proof of address (utility bill, bank statement)",
        t("cards.apply.documentRequirements.incomeProof") || "Proof of income (salary slips, tax returns)"
      ];
      
      // Get application timeline from translation
      const applicationTimeline = [
        t("cards.apply.applicationTimeline.application") || "Application submission (Day 1)",
        t("cards.apply.applicationTimeline.verification") || "Document verification (1-2 days)",
        t("cards.apply.applicationTimeline.creditCheck") || "Credit check (1-2 days)",
        t("cards.apply.applicationTimeline.approval") || "Application approval (1-3 days)",
        t("cards.apply.applicationTimeline.delivery") || "Card delivery (5-7 business days)"
      ];
      
      // Get section titles from translation
      const sectionTitles = {
        requirements: t("cards.apply.applicationGuideSections.requirements") || "Application Requirements",
        documents: t("cards.apply.applicationGuideSections.documents") || "Required Documents",
        timeline: t("cards.apply.applicationGuideSections.timeline") || "Application Timeline",
        importantNotes: t("cards.apply.applicationGuideSections.importantNotes") || "Important Notes"
      };
      
      // Get notes content from translation
      const notesContent = t("cards.apply.applicationGuideSections.notesContent") || 
        "All information provided is subject to verification. Providing false information may result in application rejection and potential legal consequences. Please review all information before submission.";
      
      return {
        guideItems,
        documentRequirements,
        applicationTimeline,
        sectionTitles,
        notesContent
      };
    } catch (error) {
      console.error("Error getting application guide content:", error);
      return {
        guideItems: [
          "Please ensure all personal information is accurate",
          "ID information will be used for identity verification",
          "Application review usually takes 1-3 business days",
          "Card will be shipped within 5-7 business days after approval",
          "First-time application is free of processing fees"
        ],
        documentRequirements: [
          "Valid ID card or passport",
          "Proof of address (utility bill, bank statement)",
          "Proof of income (salary slips, tax returns)"
        ],
        applicationTimeline: [
          "Application submission (Day 1)",
          "Document verification (1-2 days)",
          "Credit check (1-2 days)",
          "Application approval (1-3 days)",
          "Card delivery (5-7 business days)"
        ],
        sectionTitles: {
          requirements: "Application Requirements",
          documents: "Required Documents",
          timeline: "Application Timeline",
          importantNotes: "Important Notes"
        },
        notesContent: "All information provided is subject to verification. Providing false information may result in application rejection and potential legal consequences. Please review all information before submission."
      };
    }
  };
  
  const formatDate = (date: Date): string => {
    try {
      if (!date) return '';
      
      if (language === 'zh-CN' || language === 'zh-TW') {
        return format(date, 'yyyy-MM-dd');
      } else if (language === 'fr') {
        return format(date, 'dd/MM/yyyy');
      } else if (language === 'es') {
        return format(date, 'dd/MM/yyyy');
      } else {
        return format(date, 'MM/dd/yyyy');
      }
    } catch (error) {
      console.error("Error formatting date:", error);
      return '';
    }
  };
  
  const {
    guideItems,
    documentRequirements,
    applicationTimeline,
    sectionTitles,
    notesContent
  } = getApplicationGuideContent();
  
  return (
    <div className="space-y-6 container px-4 py-6 mx-auto">
      <div className="flex items-center mb-6">
        <div className="w-2 h-8 bg-purple-500 rounded-full mr-3"></div>
        <h1 className="text-2xl font-bold tracking-tight text-white">{t("cards.apply.title")}</h1>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 bg-gradient-to-br from-blue-900 to-blue-950 border-blue-900/50 shadow-lg shadow-blue-900/10 hover:shadow-[0_0_15px_rgba(0,243,255,0.15)] transition-all duration-300 overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
          <CardHeader className="relative z-10 pb-3">
            <CardTitle className="text-white flex items-center">
              <span className="bg-purple-500/20 p-2 rounded-full mr-2">
                <CreditCard size={18} className="text-purple-400" />
              </span>
              {t("cards.apply.personalInfo")}
            </CardTitle>
            <CardDescription className="text-blue-200/80">
              {t("cards.apply.personalInfoDesc")}
            </CardDescription>
          </CardHeader>
          <CardContent className="relative z-10 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-blue-200">{t("cards.apply.name")}</label>
                <div className="relative">
                  <UserCircle className="absolute left-3 top-2.5 h-4 w-4 text-blue-400" />
                  <Input 
                    placeholder={t("cards.apply.enterName")} 
                    className="pl-10 bg-[#061428]/70 border-blue-900/50 text-white placeholder-blue-300/40" 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-blue-200">{t("cards.apply.phone")}</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-2.5 h-4 w-4 text-blue-400" />
                  <Input 
                    placeholder={t("cards.apply.enterPhone")} 
                    className="pl-10 bg-[#061428]/70 border-blue-900/50 text-white placeholder-blue-300/40" 
                  />
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-blue-200">{t("cards.apply.idNumber")}</label>
                <Input 
                  placeholder={t("cards.apply.enterId")} 
                  className="bg-[#061428]/70 border-blue-900/50 text-white placeholder-blue-300/40" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-blue-200">{t("cards.apply.birthdate")}</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-blue-400 z-10" />
                      <Button 
                        variant="outline" 
                        className={cn(
                          "w-full bg-[#061428]/70 border-blue-900/50 text-white placeholder-blue-300/40 pl-10 justify-start text-left font-normal",
                          !birthdate && "text-blue-300/40"
                        )}
                      >
                        {birthdate ? formatDate(birthdate) : t("cards.apply.birthdate")}
                      </Button>
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-[#0A1A30] border-blue-900/50">
                    <CalendarComponent
                      mode="single"
                      selected={birthdate}
                      onSelect={setBirthdate}
                      className="p-3 pointer-events-auto bg-[#0A1A30] text-white"
                      disabled={(date) => date > new Date()}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-blue-200">{t("cards.apply.address")}</label>
              <Input 
                placeholder={t("cards.apply.enterAddress")} 
                className="bg-[#061428]/70 border-blue-900/50 text-white placeholder-blue-300/40" 
              />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-blue-900 to-blue-950 border-blue-900/50 shadow-lg shadow-blue-900/10 hover:shadow-[0_0_15px_rgba(0,243,255,0.15)] transition-all duration-300 overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
          <CardHeader className="relative z-10 pb-3">
            <CardTitle className="text-white flex items-center">
              <span className="bg-blue-500/20 p-2 rounded-full mr-2">
                <Info size={18} className="text-blue-400" />
              </span>
              {t("cards.apply.applicationGuide")}
            </CardTitle>
          </CardHeader>
          <CardContent className="relative z-10 space-y-5">
            <div>
              <h4 className="text-blue-200 font-medium text-sm mb-2 flex items-center">
                <Check className="h-4 w-4 mr-1.5 text-blue-400" />
                {sectionTitles.requirements}
              </h4>
              <ul className="space-y-2 text-blue-200/80 list-disc pl-5">
                {guideItems.map((item, index) => (
                  <li key={`req-${index}`}>{item}</li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-blue-200 font-medium text-sm mb-2 flex items-center">
                <FileText className="h-4 w-4 mr-1.5 text-blue-400" />
                {sectionTitles.documents}
              </h4>
              <ul className="space-y-2 text-blue-200/80 list-disc pl-5">
                {documentRequirements.map((item, index) => (
                  <li key={`doc-${index}`}>{item}</li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-blue-200 font-medium text-sm mb-2 flex items-center">
                <CreditCardIcon className="h-4 w-4 mr-1.5 text-blue-400" />
                {sectionTitles.timeline}
              </h4>
              <ul className="space-y-2 text-blue-200/80 list-disc pl-5">
                {applicationTimeline.map((item, index) => (
                  <li key={`timeline-${index}`}>{item}</li>
                ))}
              </ul>
            </div>
            
            <div className="mt-4 p-3 bg-blue-800/30 border border-blue-700/30 rounded-md">
              <h4 className="text-blue-200 font-medium text-sm mb-2 flex items-center">
                <ShieldCheck className="h-4 w-4 mr-1.5 text-blue-400" />
                {sectionTitles.importantNotes}
              </h4>
              <p className="text-sm text-blue-200/80">
                {notesContent}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="bg-gradient-to-br from-blue-900 to-blue-950 border-blue-900/50 shadow-lg shadow-blue-900/10 hover:shadow-[0_0_15px_rgba(0,243,255,0.15)] transition-all duration-300 overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
        <CardHeader className="relative z-10 pb-3">
          <CardTitle className="text-white flex items-center">
            <span className="bg-purple-500/20 p-2 rounded-full mr-2">
              <CreditCard size={18} className="text-purple-400" />
            </span>
            {t("cards.apply.cardInfo")}
          </CardTitle>
          <CardDescription className="text-blue-200/80">
            {t("cards.apply.cardInfoDesc")}
          </CardDescription>
        </CardHeader>
        <CardContent className="relative z-10 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-blue-200">{t("cards.apply.cardType")}</label>
              <Select>
                <SelectTrigger className="bg-[#061428]/70 border-blue-900/50 text-white">
                  <SelectValue placeholder={t("cards.apply.selectCardType")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">{t("cards.apply.standardCard")}</SelectItem>
                  <SelectItem value="gold">{t("cards.apply.goldCard")}</SelectItem>
                  <SelectItem value="platinum">{t("cards.apply.platinumCard")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-blue-200">{t("cards.apply.cardCurrency")}</label>
              <Select>
                <SelectTrigger className="bg-[#061428]/70 border-blue-900/50 text-white">
                  <SelectValue placeholder={t("cards.apply.selectCurrency")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cny">{t("cards.apply.cny")}</SelectItem>
                  <SelectItem value="usd">{t("cards.apply.usd")}</SelectItem>
                  <SelectItem value="eur">{t("cards.apply.eur")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-blue-200">{t("cards.apply.mailingAddress")}</label>
            <Input 
              placeholder={t("cards.apply.enterMailingAddress")} 
              className="bg-[#061428]/70 border-blue-900/50 text-white placeholder-blue-300/40" 
            />
          </div>
          
          <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-md">
            <div className="flex items-start">
              <AlertCircle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-yellow-200">
                {t("cards.apply.addressNote")}
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="relative z-10 border-t border-blue-900/50 pt-4 mt-2">
          <div className="flex flex-col sm:flex-row gap-3 w-full justify-end">
            <Button variant="outline" className="border-blue-600/60 text-white hover:bg-blue-900/20">
              {t("cards.apply.saveDraft")}
            </Button>
            <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
              <Check className="h-4 w-4" />
              <span>{t("cards.apply.submitApplication")}</span>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ApplyCard;

