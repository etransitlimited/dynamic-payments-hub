
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useLanguage } from "@/context/LanguageContext";

const FundDetailsTable = () => {
  const { t } = useLanguage();

  return (
    <Card 
      className="relative overflow-hidden border-purple-900/50 shadow-lg shadow-purple-900/10 hover:shadow-[0_0_15px_rgba(142,45,226,0.15)] transition-all duration-300" 
      style={{ background: "linear-gradient(to right, rgb(142, 45, 226), rgb(74, 0, 224))" }}
    >
      <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
      <CardHeader className="relative z-10">
        <CardTitle className="flex items-center">
          {t("fundDetails.title")}
        </CardTitle>
        <CardDescription className="text-purple-200/80">
          {t("fundDetails.description")}
        </CardDescription>
      </CardHeader>
      <CardContent className="relative z-10">
        {t("fundDetails.content")}
      </CardContent>
    </Card>
  );
};

export default FundDetailsTable;
