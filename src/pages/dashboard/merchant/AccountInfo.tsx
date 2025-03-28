import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building, MapPin, Phone, Mail } from "lucide-react";
import PageHeader from "./components/PageHeader";

const AccountInfo = () => {
  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <PageHeader title="Account Information" />
      
      <Card className="bg-gradient-to-br from-blue-900 to-blue-950 border-blue-900/50 shadow-lg shadow-blue-900/10 hover:shadow-[0_0_15px_rgba(0,243,255,0.15)] transition-all duration-300 overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
        <CardHeader className="relative z-10 pb-3">
          <CardTitle className="text-white flex items-center">
            <span className="bg-blue-500/20 p-2 rounded-full mr-2">
              <Building size={18} className="text-blue-400" />
            </span>
            Company Information
          </CardTitle>
          <CardDescription className="text-blue-200/80">
            Details about your company profile
          </CardDescription>
        </CardHeader>
        <CardContent className="relative z-10">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Building className="h-5 w-5 text-blue-400" />
              <div className="space-y-1">
                <p className="text-sm font-medium text-white">Company Name</p>
                <p className="text-sm text-blue-200/80">Acme Corp</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="h-5 w-5 text-blue-400" />
              <div className="space-y-1">
                <p className="text-sm font-medium text-white">Address</p>
                <p className="text-sm text-blue-200/80">123 Main St, Anytown</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-green-900 to-green-950 border-green-900/50 shadow-lg shadow-green-900/10 hover:shadow-[0_0_15px_rgba(0,243,255,0.15)] transition-all duration-300 overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
        <CardHeader className="relative z-10 pb-3">
          <CardTitle className="text-white flex items-center">
            <span className="bg-green-500/20 p-2 rounded-full mr-2">
              <MapPin size={18} className="text-green-400" />
            </span>
            Contact Details
          </CardTitle>
          <CardDescription className="text-green-200/80">
            Contact information for your account
          </CardDescription>
        </CardHeader>
        <CardContent className="relative z-10">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Phone className="h-5 w-5 text-green-400" />
              <div className="space-y-1">
                <p className="text-sm font-medium text-white">Phone</p>
                <p className="text-sm text-green-200/80">+1 (555) 123-4567</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-green-400" />
              <div className="space-y-1">
                <p className="text-sm font-medium text-white">Email</p>
                <p className="text-sm text-green-200/80">info@example.com</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountInfo;
