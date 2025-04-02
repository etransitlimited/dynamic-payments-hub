
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Mail } from "lucide-react";
import TranslatedText from "@/components/translation/TranslatedText";
import EditableField from "../account-info/EditableField";
import { useAccount } from "@/context/AccountContext";
import { motion } from "framer-motion";

const ContactInfoSection = () => {
  const { 
    phone, setPhone,
    email, setEmail,
    editing,
    profileCompletion
  } = useAccount();
  
  return (
    <Card className="border-purple-800/40 bg-gradient-to-br from-charcoal-light/40 to-charcoal-dark/40 shadow-xl shadow-purple-900/10 hover:shadow-[0_0_15px_rgba(142,45,226,0.15)] transition-all duration-300">
      <CardHeader className="border-b border-purple-900/20 pb-3">
        <CardTitle className="text-white text-lg flex justify-between items-center">
          <span>
            <TranslatedText keyName="accountInfo.contactDetails" fallback="Contact Details" />
          </span>
          <div className="flex items-center space-x-2">
            <span className="text-sm font-normal text-purple-300">
              <TranslatedText keyName="accountInfo.profileCompletion" fallback="Profile Completion" />:
            </span>
            <span className="text-sm font-medium text-neon-green">{profileCompletion}%</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <EditableField
            label="phone"
            icon={<Phone />}
            field="phone"
            value={phone}
            onChange={setPhone}
            isEditing={editing.phone}
          />
          
          <EditableField
            label="email"
            icon={<Mail />}
            field="email"
            value={email}
            onChange={setEmail}
            isEditing={editing.email}
          />
        </div>
        
        <div className="text-right mt-2 text-xs text-purple-300/70">
          <TranslatedText keyName="accountInfo.lastUpdated" fallback="Last updated" />: {new Date().toLocaleDateString()}
        </div>
        
        {/* Progress indicator */}
        <motion.div 
          className="mt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="w-full h-1.5 bg-purple-950/70 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-purple-600 to-neon-green rounded-full shine-effect"
              style={{ width: `${profileCompletion}%` }}
            />
          </div>
        </motion.div>
      </CardContent>
    </Card>
  );
};

export default ContactInfoSection;
