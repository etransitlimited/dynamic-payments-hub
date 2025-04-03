
import React, { useState, useCallback, useMemo } from "react";
import PageTitle from "./components/PageTitle";
import PersonalInfoCard from "./components/PersonalInfoCard";
import ApplicationGuideCard from "./components/ApplicationGuideCard";
import CardInfoCard from "./components/CardInfoCard";
import { motion } from "framer-motion";
import { CheckCircle, ArrowRight, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import TranslatedText from "@/components/translation/TranslatedText";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { usePageLanguage } from "@/hooks/use-page-language";

const ApplyCard = () => {
  const { language, forceUpdateKey } = usePageLanguage("cards.apply.title", "Apply for Card");
  const [birthdate, setBirthdate] = useState<Date | undefined>(undefined);
  const [currentStep, setCurrentStep] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const totalSteps = 2;
  
  // Memoize container and item animation variants to prevent re-renders
  const containerVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }), []);

  const itemVariants = useMemo(() => ({
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 }
    }
  }), []);

  // Use useCallback for event handlers to prevent unnecessary re-renders
  const handleNextStep = useCallback(() => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleSubmit();
    }
  }, [currentStep, totalSteps]);

  const handlePrevStep = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  }, [currentStep]);

  const handleSubmit = useCallback(() => {
    const loadingToast = toast.loading("Processing your application...");
    
    // Simulate API call with a fixed timeout to avoid potential memory leaks
    setTimeout(() => {
      toast.dismiss(loadingToast);
      toast.success("Application submitted successfully!");
      setShowSuccess(true);
    }, 2000);
  }, []);
  
  if (showSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="container px-4 mx-auto py-16 flex flex-col items-center justify-center h-[80vh]"
      >
        <div className="w-full max-w-2xl bg-gradient-to-br from-purple-900/40 to-charcoal-dark rounded-xl border border-purple-900/30 p-10 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/[0.02] [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-neon-green/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-600/20 rounded-full blur-3xl"></div>
          
          <div className="relative z-10">
            <div className="bg-green-500/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={40} className="text-green-400" />
            </div>
            
            <h2 className="text-3xl font-bold text-white mb-6">
              <TranslatedText keyName="cards.apply.applicationSubmitted" fallback="Application Submitted" />
            </h2>
            
            <p className="text-purple-200/80 mb-8 text-lg">
              <TranslatedText keyName="cards.apply.applicationSubmittedMessage" fallback="Your card application has been successfully submitted. Please wait for processing results, we will notify you via email." />
            </p>
            
            <Button
              className="bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white px-8 py-2.5 rounded-lg shadow-lg shadow-purple-900/30 border border-purple-500/30"
              onClick={() => setShowSuccess(false)}
            >
              <TranslatedText keyName="common.back" fallback="Back to Application" />
            </Button>
          </div>
        </div>
      </motion.div>
    );
  }
  
  return (
    <motion.div
      key={forceUpdateKey}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="container px-4 mx-auto py-6 space-y-6"
      data-language={language}
    >
      <div className="w-full mb-2">
        <PageTitle title={<TranslatedText keyName="cards.apply.title" fallback="Apply for Card" />} />
      </div>
      
      {/* Progress Bar */}
      <motion.div variants={itemVariants} className="w-full max-w-3xl mx-auto mb-8">
        <div className="flex justify-between items-center mb-2">
          <p className="text-sm text-purple-300/80">
            <TranslatedText 
              keyName="cards.apply.stepNOfTotal" 
              fallback="Step {{current}} of {{total}}"
              values={{ current: currentStep, total: totalSteps }}
            />
          </p>
          <p className="text-sm text-purple-300/80">
            {Math.round((currentStep / totalSteps) * 100)}%
          </p>
        </div>
        <Progress value={(currentStep / totalSteps) * 100} className="h-2" />
      </motion.div>
      
      {/* Step 1: Personal Info and Application Guide */}
      {currentStep === 1 && (
        <motion.div 
          variants={itemVariants}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          <div className="lg:col-span-2">
            <PersonalInfoCard 
              birthdate={birthdate} 
              setBirthdate={setBirthdate} 
            />
          </div>
          <div>
            <ApplicationGuideCard />
          </div>
        </motion.div>
      )}
      
      {/* Step 2: Card Info */}
      {currentStep === 2 && (
        <motion.div 
          variants={itemVariants}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
        >
          <CardInfoCard />
        </motion.div>
      )}
      
      {/* Navigation Buttons */}
      <motion.div 
        variants={itemVariants}
        className="flex justify-end gap-4 mt-8 w-full"
      >
        {currentStep > 1 && (
          <Button 
            variant="outline"
            onClick={handlePrevStep}
            className="border-purple-600/60 text-white hover:bg-purple-800/50 transition-colors"
          >
            <TranslatedText keyName="cards.apply.previous" fallback="Previous" />
          </Button>
        )}
        
        <Button 
          onClick={handleNextStep}
          className="gap-2 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white shadow-md shadow-purple-600/30 border border-purple-500/30"
        >
          {currentStep === totalSteps ? (
            <TranslatedText keyName="cards.apply.submit" fallback="Submit Application" />
          ) : (
            <>
              <TranslatedText keyName="cards.apply.next" fallback="Next" />
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </Button>
      </motion.div>
      
      {/* Information Note */}
      <motion.div 
        variants={itemVariants}
        className="w-full mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-md"
      >
        <div className="flex items-start">
          <AlertCircle className="h-5 w-5 text-blue-400 mr-2 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-blue-300/90">
            All your information is secure and encrypted. We value your privacy and will never share your details with third parties.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default React.memo(ApplyCard);
