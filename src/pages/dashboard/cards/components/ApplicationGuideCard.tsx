
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Info } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const ApplicationGuideCard = () => {
  const { t, language } = useLanguage();
  
  // Get guide items from translations
  const guideItems = t("cards.apply.guideItems");
  
  // If guideItems is not an array, we need to get individual items
  const getGuideItems = () => {
    if (Array.isArray(guideItems)) {
      return guideItems;
    } else {
      // Try to access individual items by index
      const items = [];
      for (let i = 0; i < 5; i++) {
        const item = t(`cards.apply.guideItems.${i}`);
        if (item && !item.includes("cards.apply.guideItems")) {
          items.push(item);
        }
      }
      return items.length > 0 ? items : null;
    }
  };
  
  // Fallback items for each language if needed
  const getFallbackItems = () => {
    const fallbacks = {
      'en': [
        "Please ensure all personal information is accurate",
        "ID information will be used for identity verification",
        "Application review usually takes 1-3 business days",
        "Card will be shipped within 5-7 business days after approval",
        "First-time application is free of processing fees"
      ],
      'zh-CN': [
        "请确保提供的个人信息真实有效",
        "身份证信息将用于实名认证",
        "申请审核通常需要1-3个工作日",
        "审核通过后，卡片将在5-7个工作日内寄出",
        "首次申请免收工本费"
      ],
      'zh-TW': [
        "請確保提供的個人信息真實有效",
        "身份證信息將用於實名認證",
        "申請審核通常需要1-3個工作日",
        "審核通過後，卡片將在5-7個工作日內寄出",
        "首次申請免收工本費"
      ],
      'es': [
        "Por favor asegúrese de que toda la información personal sea precisa",
        "La información de identificación se utilizará para la verificación de identidad",
        "La revisión de la solicitud generalmente toma de 1 a 3 días hábiles",
        "La tarjeta será enviada dentro de los 5 a 7 días hábiles después de la aprobación",
        "La primera solicitud está exenta de cargos de procesamiento"
      ],
      'fr': [
        "Veuillez vous assurer que toutes les informations personnelles sont exactes",
        "Les informations d'identification seront utilisées pour la vérification d'identité",
        "L'examen de la demande prend généralement 1 à 3 jours ouvrables",
        "La carte sera expédiée dans les 5 à 7 jours ouvrables après approbation",
        "La première demande est exonérée de frais de traitement"
      ]
    };
    
    return fallbacks[language] || fallbacks['en'];
  };
  
  // Get the appropriate items to display
  const itemsToDisplay = getGuideItems() || getFallbackItems();
  
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
            {t("cards.apply.applicationRequirements")}
          </h4>
          <ul className="space-y-2 text-blue-200/80 list-disc pl-5">
            {itemsToDisplay.map((item, index) => (
              <li key={`req-${index}`}>{item}</li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default ApplicationGuideCard;
