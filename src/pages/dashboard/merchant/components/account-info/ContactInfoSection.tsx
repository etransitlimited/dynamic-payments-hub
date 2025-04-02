
import React from "react";
import { Phone, Mail, Clock, UserCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import EditableField from "./EditableField";
import { useAccount } from "@/context/AccountContext";
import TranslatedText from "@/components/translation/TranslatedText";
import { motion } from "framer-motion";
import { format } from "date-fns";

const ContactInfoSection = () => {
  const { phone, setPhone, email, setEmail, editing } = useAccount();
  
  const gradientBorder = "border-purple-800/30 hover:border-purple-600/40 transition-all duration-300";
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
    >
      <Card className={`bg-charcoal-light/30 backdrop-blur-md shadow-lg ${gradientBorder} overflow-hidden relative`}>
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/5 to-transparent"></div>
        
        <CardContent className="p-6 relative z-10">
          <div className="flex items-center mb-4">
            <div className="p-1.5 bg-purple-800/40 backdrop-blur-sm rounded-md mr-3 border border-purple-700/30">
              <UserCheck size={18} className="text-purple-300" />
            </div>
            <h3 className="text-lg font-medium text-white">
              <TranslatedText keyName="accountInfo.contactDetails" fallback="Contact Details" />
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <EditableField
              label="phone"
              icon={<Phone size={14} />}
              field="phone"
              value={phone}
              onChange={setPhone}
              isEditing={editing.phone}
            />
            
            <EditableField
              label="email"
              icon={<Mail size={14} />}
              field="email"
              value={email}
              onChange={setEmail}
              isEditing={editing.email}
            />
            
            <div className="flex flex-col relative">
              <label className="flex items-center space-x-2 text-purple-300 text-sm mb-1.5">
                <span><Clock size={14} /></span>
                <span><TranslatedText keyName="accountInfo.lastUpdated" fallback="Last Updated" /></span>
              </label>
              <div className="text-white py-2 text-base">
                {format(new Date(), 'yyyy-MM-dd HH:mm')}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ContactInfoSection;
