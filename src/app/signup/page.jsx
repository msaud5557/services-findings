"use client"

import { useState } from "react";
import ProgressIndicator from "@/components/signup/ProgressIndicator";
import AccountBasicsStep from "@/components/signup/AccountBasicsStep";
import TradeDetailsStep from "@/components/signup/TradeDetailsStep";
import ServiceAreaStep from "@/components/signup/ServiceAreaStep";
import VerificationStep from "@/components/signup/VerificationStep";

const steps = [
  { label: "Account Basics" },
  { label: "Trade Details" },
  { label: "Service Area" },
  { label: "Verification" },
];

export default function SignupPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});

  const goToStep = (step) => setCurrentStep(step);
  const nextStep = () => setCurrentStep((s) => Math.min(s + 1, steps.length - 1));
  const prevStep = () => setCurrentStep((s) => Math.max(s - 1, 0));

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center py-8 px-2">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-2xl p-8 animate-fade-in">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <span className="text-indigo-600 text-3xl">
            <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M7 21h10M12 17v4M4 7l8-4 8 4M4 7v4a8 8 0 0016 0V7"/></svg>
          </span>
          <span className="text-2xl font-bold text-indigo-900 tracking-tight">FixItPro</span>
        </div>
        <div className="text-gray-600 mb-8 text-center text-lg">Connect with clients and grow your business</div>

        {/* Progress Indicator */}
        <ProgressIndicator steps={steps} currentStep={currentStep} />

        {/* Step Content */}
        <div className="mt-8">
          {currentStep === 0 && (
            <AccountBasicsStep
              formData={formData}
              setFormData={setFormData}
              onContinue={nextStep}
            />
          )}
          {currentStep === 1 && (
            <TradeDetailsStep
              formData={formData}
              setFormData={setFormData}
              onContinue={nextStep}
              onBack={prevStep}
            />
          )}
          {currentStep === 2 && (
            <ServiceAreaStep
              formData={formData}
              setFormData={setFormData}
              onContinue={nextStep}
              onBack={prevStep}
            />
          )}
          {currentStep === 3 && (
            <VerificationStep
              formData={formData}
              setFormData={setFormData}
              onBack={prevStep}
            />
          )}
        </div>
      </div>
    </div>
  );
} 