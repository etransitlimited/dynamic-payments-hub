
import React from 'react';
import { CheckCircle, Circle, ArrowRight } from 'lucide-react';
import TranslatedText from "@/components/translation/TranslatedText";

interface VerificationStepperProps {
  steps: string[];
  currentStep: number;
  completedSteps: number[];
}

const VerificationStepper: React.FC<VerificationStepperProps> = ({
  steps,
  currentStep,
  completedSteps
}) => {
  return (
    <div className="flex flex-col space-y-3">
      {steps.map((step, index) => {
        const isActive = index === currentStep;
        const isCompleted = completedSteps.includes(index);
        
        return (
          <div 
            key={index}
            className={`relative flex items-center p-3 rounded-md transition-colors
              ${isActive ? 'bg-blue-900/30 border border-blue-500/30' : 
                isCompleted ? 'text-green-400' : 'text-gray-400'}`}
          >
            <div className="mr-3 flex-shrink-0">
              {isCompleted ? (
                <CheckCircle className="h-5 w-5 text-green-400" />
              ) : (
                <div className={`flex items-center justify-center w-5 h-5 rounded-full 
                  ${isActive ? 'bg-blue-500 text-white' : 'border border-gray-500'}`}>
                  {isActive ? (
                    <span className="text-xs font-medium">{index + 1}</span>
                  ) : (
                    <Circle className={`h-5 w-5 ${isActive ? 'text-blue-300' : ''}`} />
                  )}
                </div>
              )}
            </div>
            <span className={`text-sm ${isActive ? 'font-medium text-blue-300' : isCompleted ? 'text-green-400' : ''}`}>
              <TranslatedText keyName={`verification_step_${step}`} fallback={step} />
            </span>
            {isActive && (
              <div className="absolute right-2 w-2 h-2 rounded-full bg-blue-400 animate-pulse"></div>
            )}
            {index < steps.length - 1 && !isActive && !isCompleted && (
              <ArrowRight className="absolute right-2 h-3 w-3 text-gray-500" />
            )}
            {index < steps.length - 1 && isCompleted && !isActive && (
              <ArrowRight className="absolute right-2 h-3 w-3 text-green-400" />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default VerificationStepper;
