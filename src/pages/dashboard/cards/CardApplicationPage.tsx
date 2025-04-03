
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { getDirectTranslation } from "@/utils/translationHelpers";
import CardSearchHeader from "./components/CardSearchHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLocation } from "react-router-dom";

const CardApplicationPage: React.FC = () => {
  const { language } = useLanguage();
  const [forceUpdateKey, setForceUpdateKey] = useState(`card-application-${language}-${Date.now()}`);
  const location = useLocation();
  
  // Form state
  const [formStep, setFormStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    idNumber: "",
    address: "",
    cardType: "",
    cardCurrency: ""
  });

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle select changes
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Force re-render when language changes OR when navigating to this page
  useEffect(() => {
    console.log(`CardApplicationPage detected language: ${language}, path: ${location.pathname}`);
    setForceUpdateKey(`card-application-${language}-${Date.now()}`);
    
    // Update page title
    document.title = `${getDirectTranslation("cards.apply.title", language, "Apply for Card")} | Dashboard`;
  }, [language, location.pathname]);

  // Get translations
  const pageTitle = getDirectTranslation("cards.apply.title", language, "Apply for Card");
  const pageSubtitle = getDirectTranslation("cards.apply.subtitle", language, "Fill in the form to apply for a new card");
  
  const personalInfoTitle = getDirectTranslation("cards.apply.personalInfo", language, "Personal Information");
  const personalInfoDesc = getDirectTranslation("cards.apply.personalInfoDesc", language, "Enter applicant's basic information");
  
  const nameLabel = getDirectTranslation("cards.apply.name", language, "Name");
  const namePlace = getDirectTranslation("cards.apply.enterName", language, "Please enter your real name");
  
  const phoneLabel = getDirectTranslation("cards.apply.phone", language, "Phone Number");
  const phonePlace = getDirectTranslation("cards.apply.enterPhone", language, "Please enter your phone number");
  
  const idLabel = getDirectTranslation("cards.apply.idNumber", language, "ID Number");
  const idPlace = getDirectTranslation("cards.apply.enterId", language, "Please enter your ID number");
  
  const addressLabel = getDirectTranslation("cards.apply.address", language, "Address");
  const addressPlace = getDirectTranslation("cards.apply.enterAddress", language, "Please enter your detailed address");
  
  const cardInfoTitle = getDirectTranslation("cards.apply.cardInfo", language, "Card Information");
  const cardInfoDesc = getDirectTranslation("cards.apply.cardInfoDesc", language, "Select the type of card you want to apply for");
  
  const cardTypeLabel = getDirectTranslation("cards.apply.cardType", language, "Card Type");
  const cardTypePlace = getDirectTranslation("cards.apply.selectCardType", language, "Please select card type");
  
  const standardCard = getDirectTranslation("cards.apply.standardCard", language, "Standard Card");
  const goldCard = getDirectTranslation("cards.apply.goldCard", language, "Gold Card");
  const platinumCard = getDirectTranslation("cards.apply.platinumCard", language, "Platinum Card");
  
  const currencyLabel = getDirectTranslation("cards.apply.cardCurrency", language, "Card Currency");
  const currencyPlace = getDirectTranslation("cards.apply.selectCurrency", language, "Please select currency");
  
  const cny = getDirectTranslation("cards.apply.cny", language, "Chinese Yuan (CNY)");
  const usd = getDirectTranslation("cards.apply.usd", language, "US Dollar (USD)");
  const eur = getDirectTranslation("cards.apply.eur", language, "Euro (EUR)");
  
  const nextButton = getDirectTranslation("cards.apply.next", language, "Next");
  const prevButton = getDirectTranslation("cards.apply.previous", language, "Previous");
  const submitButton = getDirectTranslation("cards.apply.submitApplication", language, "Submit Application");
  const draftButton = getDirectTranslation("cards.apply.saveDraft", language, "Save Draft");

  return (
    <motion.div
      key={forceUpdateKey}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
      data-language={language}
    >
      <CardSearchHeader 
        title={pageTitle}
        subtitle={pageSubtitle}
      />
      
      {formStep === 1 && (
        <Card className="border-blue-900/30 bg-blue-950/20 backdrop-blur-sm overflow-hidden shadow-lg">
          <CardContent className="p-6 space-y-4">
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-white">{personalInfoTitle}</h3>
              <p className="text-blue-300">{personalInfoDesc}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-blue-100">{nameLabel}</Label>
                <Input 
                  id="name"
                  name="name"
                  placeholder={namePlace}
                  value={formData.name}
                  onChange={handleInputChange}
                  className="bg-blue-950/70 border-blue-800/50 text-white"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-blue-100">{phoneLabel}</Label>
                <Input 
                  id="phone"
                  name="phone"
                  placeholder={phonePlace}
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="bg-blue-950/70 border-blue-800/50 text-white"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="idNumber" className="text-blue-100">{idLabel}</Label>
                <Input 
                  id="idNumber"
                  name="idNumber"
                  placeholder={idPlace}
                  value={formData.idNumber}
                  onChange={handleInputChange}
                  className="bg-blue-950/70 border-blue-800/50 text-white"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="address" className="text-blue-100">{addressLabel}</Label>
                <Input 
                  id="address"
                  name="address"
                  placeholder={addressPlace}
                  value={formData.address}
                  onChange={handleInputChange}
                  className="bg-blue-950/70 border-blue-800/50 text-white"
                />
              </div>
            </div>
            
            <div className="flex justify-end pt-4">
              <Button 
                onClick={() => setFormStep(2)}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                {nextButton}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
      
      {formStep === 2 && (
        <Card className="border-blue-900/30 bg-blue-950/20 backdrop-blur-sm overflow-hidden shadow-lg">
          <CardContent className="p-6 space-y-4">
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-white">{cardInfoTitle}</h3>
              <p className="text-blue-300">{cardInfoDesc}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="cardType" className="text-blue-100">{cardTypeLabel}</Label>
                <Select
                  value={formData.cardType}
                  onValueChange={(value) => handleSelectChange("cardType", value)}
                >
                  <SelectTrigger className="bg-blue-950/70 border-blue-800/50 text-white">
                    <SelectValue placeholder={cardTypePlace} />
                  </SelectTrigger>
                  <SelectContent className="bg-blue-900 border-blue-700 text-white">
                    <SelectItem value="standard">{standardCard}</SelectItem>
                    <SelectItem value="gold">{goldCard}</SelectItem>
                    <SelectItem value="platinum">{platinumCard}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="cardCurrency" className="text-blue-100">{currencyLabel}</Label>
                <Select
                  value={formData.cardCurrency}
                  onValueChange={(value) => handleSelectChange("cardCurrency", value)}
                >
                  <SelectTrigger className="bg-blue-950/70 border-blue-800/50 text-white">
                    <SelectValue placeholder={currencyPlace} />
                  </SelectTrigger>
                  <SelectContent className="bg-blue-900 border-blue-700 text-white">
                    <SelectItem value="cny">{cny}</SelectItem>
                    <SelectItem value="usd">{usd}</SelectItem>
                    <SelectItem value="eur">{eur}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="flex justify-between pt-4">
              <Button 
                onClick={() => setFormStep(1)}
                variant="outline"
                className="border-blue-700 text-blue-300 hover:bg-blue-900/50"
              >
                {prevButton}
              </Button>
              
              <div className="space-x-2">
                <Button 
                  variant="outline"
                  className="border-blue-700 text-blue-300 hover:bg-blue-900/50"
                >
                  {draftButton}
                </Button>
                <Button 
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {submitButton}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </motion.div>
  );
};

export default CardApplicationPage;
