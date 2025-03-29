
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Info, FileText, CreditCard, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface ApplicationGuideContent {
  guideItems: string[];
  documentRequirements: string[];
  applicationTimeline: string[];
  sectionTitles: {
    requirements: string;
    documents: string;
    timeline: string;
    importantNotes: string;
  };
  notesContent: string;
}

const ApplicationGuideCard = () => {
  const { t, language } = useLanguage();
  const [guideContent, setGuideContent] = useState<ApplicationGuideContent>();
  
  // Update guide content whenever language changes
  useEffect(() => {
    setGuideContent(getApplicationGuideContent());
  }, [language]);
  
  const getApplicationGuideContent = (): ApplicationGuideContent => {
    // Guide items
    let guideItems: string[] = [];
    try {
      // Try to get array directly
      const directItems = t("cards.apply.guideItems");
      if (Array.isArray(directItems)) {
        guideItems = directItems;
      } else {
        // Try to get individual items
        for (let i = 0; i < 5; i++) {
          const item = t(`cards.apply.guideItems.${i}`);
          if (item && !item.includes("cards.apply.guideItems")) {
            guideItems.push(item);
          }
        }
      }
    } catch (error) {
      console.error("Error getting guide items:", error);
    }
    
    // Fallback for guide items
    if (guideItems.length === 0) {
      guideItems = [
        "Please ensure all personal information is accurate",
        "ID information will be used for identity verification",
        "Application review usually takes 1-3 business days",
        "Card will be shipped within 5-7 business days after approval",
        "First-time application is free of processing fees"
      ];
    }
    
    // Document requirements
    let documentRequirements: string[] = [];
    try {
      // Try to get nested object properties first (new structure)
      const idCard = t("cards.apply.documentRequirements.idCard");
      const proofOfAddress = t("cards.apply.documentRequirements.proofOfAddress");
      const incomeProof = t("cards.apply.documentRequirements.incomeProof");
      
      if (idCard && !idCard.includes("cards.apply.documentRequirements")) {
        documentRequirements.push(idCard);
      }
      if (proofOfAddress && !proofOfAddress.includes("cards.apply.documentRequirements")) {
        documentRequirements.push(proofOfAddress);
      }
      if (incomeProof && !incomeProof.includes("cards.apply.documentRequirements")) {
        documentRequirements.push(incomeProof);
      }
    } catch (error) {
      console.error("Error getting document requirements:", error);
    }
    
    // Fallback for document requirements
    if (documentRequirements.length === 0) {
      documentRequirements = [
        "Valid ID card or passport",
        "Proof of address (utility bill, bank statement)",
        "Proof of income (salary slips, tax returns)"
      ];
    }
    
    // Application timeline
    let applicationTimeline: string[] = [];
    try {
      // Try to get nested object properties first (new structure)
      const application = t("cards.apply.applicationTimeline.application");
      const verification = t("cards.apply.applicationTimeline.verification");
      const creditCheck = t("cards.apply.applicationTimeline.creditCheck");
      const approval = t("cards.apply.applicationTimeline.approval");
      const delivery = t("cards.apply.applicationTimeline.delivery");
      
      if (application && !application.includes("cards.apply.applicationTimeline")) {
        applicationTimeline.push(application);
      }
      if (verification && !verification.includes("cards.apply.applicationTimeline")) {
        applicationTimeline.push(verification);
      }
      if (creditCheck && !creditCheck.includes("cards.apply.applicationTimeline")) {
        applicationTimeline.push(creditCheck);
      }
      if (approval && !approval.includes("cards.apply.applicationTimeline")) {
        applicationTimeline.push(approval);
      }
      if (delivery && !delivery.includes("cards.apply.applicationTimeline")) {
        applicationTimeline.push(delivery);
      }
    } catch (error) {
      console.error("Error getting application timeline:", error);
    }
    
    // Fallback for application timeline
    if (applicationTimeline.length === 0) {
      applicationTimeline = [
        "Application submission (Day 1)",
        "Document verification (1-2 days)",
        "Credit check (1-2 days)",
        "Application approval (1-3 days)",
        "Card delivery (5-7 business days)"
      ];
    }
    
    // Section titles
    const sectionTitles = {
      requirements: t("cards.apply.applicationGuideSections.requirements") || "Application Requirements",
      documents: t("cards.apply.applicationGuideSections.documents") || "Required Documents",
      timeline: t("cards.apply.applicationGuideSections.timeline") || "Application Timeline",
      importantNotes: t("cards.apply.applicationGuideSections.importantNotes") || "Important Notes"
    };
    
    // Notes content
    const notesContent = t("cards.apply.applicationGuideSections.notesContent") || 
      "All information provided is subject to verification. Providing false information may result in application rejection and potential legal consequences. Please review all information before submission.";
    
    return {
      guideItems,
      documentRequirements,
      applicationTimeline,
      sectionTitles,
      notesContent
    };
  };
  
  // If guide content is not yet loaded, use a temporary placeholder
  const content = guideContent || getApplicationGuideContent();
  
  return (
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
            {content.sectionTitles.requirements}
          </h4>
          <ul className="space-y-2 text-blue-200/80 list-disc pl-5">
            {content.guideItems.map((item, index) => (
              <li key={`req-${index}`}>{item}</li>
            ))}
          </ul>
        </div>
        
        <div>
          <h4 className="text-blue-200 font-medium text-sm mb-2 flex items-center">
            <FileText className="h-4 w-4 mr-1.5 text-blue-400" />
            {content.sectionTitles.documents}
          </h4>
          <ul className="space-y-2 text-blue-200/80 list-disc pl-5">
            {content.documentRequirements.map((item, index) => (
              <li key={`doc-${index}`}>{item}</li>
            ))}
          </ul>
        </div>
        
        <div>
          <h4 className="text-blue-200 font-medium text-sm mb-2 flex items-center">
            <CreditCard className="h-4 w-4 mr-1.5 text-blue-400" />
            {content.sectionTitles.timeline}
          </h4>
          <ul className="space-y-2 text-blue-200/80 list-disc pl-5">
            {content.applicationTimeline.map((item, index) => (
              <li key={`timeline-${index}`}>{item}</li>
            ))}
          </ul>
        </div>
        
        <div className="mt-4 p-3 bg-blue-800/30 border border-blue-700/30 rounded-md">
          <h4 className="text-blue-200 font-medium text-sm mb-2 flex items-center">
            <ShieldCheck className="h-4 w-4 mr-1.5 text-blue-400" />
            {content.sectionTitles.importantNotes}
          </h4>
          <p className="text-sm text-blue-200/80">
            {content.notesContent}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ApplicationGuideCard;
