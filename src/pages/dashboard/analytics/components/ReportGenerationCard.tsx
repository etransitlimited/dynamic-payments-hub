
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";
import { FileDown, Calendar, FileText, Download, Check } from "lucide-react";
import TranslatedText from "@/components/translation/TranslatedText";
import { motion } from "framer-motion";

const reportTypes = [
  {
    id: "daily",
    name: "analytics.daily",
    fallback: "Daily",
    icon: <Calendar size={16} />,
  },
  {
    id: "weekly",
    name: "analytics.weekly",
    fallback: "Weekly",
    icon: <Calendar size={16} />,
  },
  {
    id: "monthly",
    name: "analytics.monthly",
    fallback: "Monthly",
    icon: <Calendar size={16} />,
  },
  {
    id: "quarterly",
    name: "analytics.quarterly",
    fallback: "Quarterly",
    icon: <FileText size={16} />,
  },
  {
    id: "yearly",
    name: "analytics.yearly",
    fallback: "Yearly",
    icon: <FileText size={16} />,
  },
];

const ReportGenerationCard = () => {
  const { t } = useLanguage();
  const [selectedReport, setSelectedReport] = useState("monthly");
  const [generatedReport, setGeneratedReport] = useState<string | null>(null);

  const handleGenerateReport = () => {
    // Simulate report generation
    setGeneratedReport(selectedReport);
    setTimeout(() => {
      setGeneratedReport(null);
    }, 3000);
  };

  return (
    <Card className="border-purple-900/30 bg-gradient-to-br from-charcoal-light/50 to-charcoal-dark/50 backdrop-blur-md shadow-lg shadow-purple-900/10 hover:shadow-[0_0_15px_rgba(142,45,226,0.15)] transition-all duration-300 overflow-hidden relative h-full">
      <div className="absolute inset-0 bg-grid-white/[0.03] [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
      
      {/* Purple accent top bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 via-purple-500 to-purple-700"></div>
      
      <CardHeader className="flex flex-row items-center justify-between pb-2 relative z-10">
        <CardTitle className="text-lg font-medium text-white flex items-center">
          <div className="p-1.5 bg-purple-800/40 backdrop-blur-sm rounded-md mr-3 border border-purple-700/30">
            <FileDown size={18} className="text-purple-300" />
          </div>
          <TranslatedText keyName="analytics.generateReports" fallback="Generate Reports" />
        </CardTitle>
      </CardHeader>
      <CardContent className="relative z-10 pt-4">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-6">
          {reportTypes.map((report) => (
            <button
              key={report.id}
              onClick={() => setSelectedReport(report.id)}
              className={`flex flex-col items-center justify-center p-4 rounded-lg transition-all duration-300 ${
                selectedReport === report.id
                  ? "bg-purple-700/40 border border-purple-600/60 text-white"
                  : "bg-charcoal-dark/30 border border-purple-900/20 text-gray-300 hover:bg-purple-900/20"
              }`}
            >
              <div className={`p-2 mb-2 rounded-full ${
                selectedReport === report.id
                  ? "bg-purple-500/30"
                  : "bg-purple-900/20"
              }`}>
                {report.icon}
              </div>
              <span className="text-xs font-medium">
                <TranslatedText keyName={report.name} fallback={report.fallback} />
              </span>
            </button>
          ))}
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-between bg-charcoal-dark/50 border border-purple-900/20 p-4 rounded-lg">
          <div className="flex items-center mb-4 md:mb-0">
            <FileText size={20} className="text-purple-400 mr-2" />
            <div>
              <h4 className="text-white text-sm font-medium">
                <TranslatedText 
                  keyName={`analytics.${selectedReport}ReportTitle`} 
                  fallback={`${selectedReport.charAt(0).toUpperCase() + selectedReport.slice(1)} Report`} 
                />
              </h4>
              <p className="text-xs text-gray-400">
                <TranslatedText 
                  keyName={`analytics.${selectedReport}ReportDescription`} 
                  fallback={`Comprehensive data for ${selectedReport} analysis`} 
                />
              </p>
            </div>
          </div>
          
          <Button
            onClick={handleGenerateReport}
            className={`bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white transition-all duration-300 border border-purple-500/30 shadow-md shadow-purple-900/20 ${
              generatedReport ? "bg-green-600 hover:bg-green-700" : ""
            }`}
          >
            {generatedReport ? (
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className="flex items-center"
              >
                <Check size={16} className="mr-1" />
                <TranslatedText keyName="analytics.generated" fallback="Generated" />
              </motion.div>
            ) : (
              <div className="flex items-center">
                <Download size={16} className="mr-1" />
                <TranslatedText keyName="analytics.generate" fallback="Generate" />
              </div>
            )}
          </Button>
        </div>
        
        <div className="mt-4 text-xs text-gray-500 text-center">
          <TranslatedText 
            keyName="analytics.reportNote" 
            fallback="Reports are generated in PDF format and can be downloaded instantly" 
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ReportGenerationCard;
