
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2 } from "lucide-react";
import CompanyInfoCard from "./CompanyInfoCard";

interface CompanyInfoProps {
  editing: Record<string, boolean>;
  handleEdit: (field: string) => void;
  handleSave: (field: string) => void;
  handleCancel: (field: string) => void;
}

const CompanyInfoSection = ({
  editing,
  handleEdit,
  handleSave,
  handleCancel
}: CompanyInfoProps) => {
  const companyFields = [
    { id: 'company-name', label: '企业名称', value: '北京优卡科技有限公司' },
    { id: 'business-license', label: '营业执照号', value: '91110105MA00F4XL9B' },
    { id: 'tax-id', label: '统一社会信用代码', value: '91110105MA00F4XL9B' },
  ];

  const addressFields = [
    { id: 'address', label: '企业地址', value: '北京市海淀区中关村大街1号' },
    { id: 'industry', label: '所属行业', value: '金融科技' },
    { id: 'register-date', label: '注册日期', value: '2020-05-18', isReadOnly: true },
  ];

  return (
    <Card className="bg-gradient-to-br from-blue-900/90 to-blue-950/90 border-blue-800/30 shadow-lg shadow-blue-900/20 backdrop-blur-sm overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
      <CardHeader className="relative z-10 pb-3">
        <CardTitle className="text-white flex items-center">
          <span className="bg-blue-500/20 p-2 rounded-full mr-2">
            <Building2 size={18} className="text-blue-400" />
          </span>
          企业基本信息
        </CardTitle>
        <CardDescription className="text-blue-200/80">
          查看和管理您的企业账户基本信息
        </CardDescription>
      </CardHeader>
      <CardContent className="relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <CompanyInfoCard
              fields={companyFields}
              editing={editing}
              handleEdit={handleEdit}
              handleSave={handleSave}
              handleCancel={handleCancel}
            />
          </div>
          
          <div>
            <CompanyInfoCard
              fields={addressFields}
              editing={editing}
              handleEdit={handleEdit}
              handleSave={handleSave}
              handleCancel={handleCancel}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CompanyInfoSection;
