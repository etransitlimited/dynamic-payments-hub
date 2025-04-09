
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileText, BarChart2, Calendar } from "lucide-react";
import TranslatedText from "@/components/translation/TranslatedText";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSafeTranslation } from "@/hooks/use-safe-translation";

const ReportGenerationCard: React.FC = () => {
  const { t } = useSafeTranslation();
  
  return (
    <Card className="border-blue-800/20 bg-gradient-to-br from-blue-950/40 to-indigo-950/30 overflow-hidden relative">
      <div className="absolute inset-0 bg-grid-white/[0.02] [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)]"></div>
      <CardHeader className="relative z-10 pb-2">
        <CardTitle className="text-lg font-semibold">
          <TranslatedText keyName="analytics.generateReports" fallback="Generate Reports" />
        </CardTitle>
      </CardHeader>
      <CardContent className="relative z-10 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-blue-300">
              <TranslatedText keyName="analytics.reportType" fallback="Report Type" />
            </label>
            <Select>
              <SelectTrigger className="bg-blue-950/50 border-blue-800/30 text-white">
                <SelectValue placeholder={<TranslatedText keyName="analytics.summary" fallback="Summary" />} />
              </SelectTrigger>
              <SelectContent className="bg-slate-900 border-blue-800/30">
                <SelectItem value="summary" className="text-blue-100 hover:bg-blue-900/20 focus:bg-blue-900/20">
                  <TranslatedText keyName="analytics.summary" fallback="Summary" />
                </SelectItem>
                <SelectItem value="detailed" className="text-blue-100 hover:bg-blue-900/20 focus:bg-blue-900/20">
                  <TranslatedText keyName="analytics.monthlyData" fallback="Monthly Data" />
                </SelectItem>
                <SelectItem value="metrics" className="text-blue-100 hover:bg-blue-900/20 focus:bg-blue-900/20">
                  <TranslatedText keyName="analytics.growthMetrics" fallback="Growth Metrics" />
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-blue-300">
              <TranslatedText keyName="analytics.reportPeriod" fallback="Report Period" />
            </label>
            <Select>
              <SelectTrigger className="bg-blue-950/50 border-blue-800/30 text-white">
                <SelectValue placeholder={<TranslatedText keyName="analytics.thisMonth" fallback="This Month" />} />
              </SelectTrigger>
              <SelectContent className="bg-slate-900 border-blue-800/30">
                <SelectItem value="this-month" className="text-blue-100 hover:bg-blue-900/20 focus:bg-blue-900/20">
                  <TranslatedText keyName="analytics.thisMonth" fallback="This Month" />
                </SelectItem>
                <SelectItem value="last-month" className="text-blue-100 hover:bg-blue-900/20 focus:bg-blue-900/20">
                  <TranslatedText keyName="analytics.lastMonth" fallback="Last Month" />
                </SelectItem>
                <SelectItem value="this-quarter" className="text-blue-100 hover:bg-blue-900/20 focus:bg-blue-900/20">
                  <TranslatedText keyName="analytics.thisWeek" fallback="This Week" />
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2 md:mt-auto">
            <Button className="w-full gap-2 bg-blue-700 hover:bg-blue-600">
              <Download size={16} />
              <TranslatedText keyName="analytics.downloadPDF" fallback="Download PDF" />
            </Button>
          </div>
        </div>
        
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-blue-900/20 border-blue-800/30">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="bg-blue-800/30 p-2 rounded-lg">
                <FileText size={16} className="text-blue-400" />
              </div>
              <div>
                <h4 className="text-sm font-medium text-white">
                  <TranslatedText keyName="analytics.summary" fallback="Summary" />
                </h4>
                <p className="text-xs text-blue-300">PDF, CSV</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-blue-900/20 border-blue-800/30">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="bg-blue-800/30 p-2 rounded-lg">
                <BarChart2 size={16} className="text-blue-400" />
              </div>
              <div>
                <h4 className="text-sm font-medium text-white">
                  <TranslatedText keyName="analytics.charts" fallback="Charts" />
                </h4>
                <p className="text-xs text-blue-300">PNG, SVG</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-blue-900/20 border-blue-800/30">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="bg-blue-800/30 p-2 rounded-lg">
                <Calendar size={16} className="text-blue-400" />
              </div>
              <div>
                <h4 className="text-sm font-medium text-white">
                  <TranslatedText keyName="analytics.yearToDate" fallback="Year to Date" />
                </h4>
                <p className="text-xs text-blue-300">XLSX, CSV</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReportGenerationCard;
