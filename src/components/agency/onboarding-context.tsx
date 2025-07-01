'use client'

import { createContext, useContext, useState, ReactNode, useCallback } from 'react'
import { useRouter, usePathname } from 'next/navigation'

interface AgencyData {
  companyName?: string;
  siretNumber?: string;
  address?: string;
  additionalAddressDetails?: string;
  zipCode?: string;
  city?: string;
  legalName?: string;
  legalForms?: string[];
  siretSirenNumber?: string;
  registrationDate?: string;
  proofOfRegistrationUrl?: string;
  rentalSoftware?: string;
  otherRentalSoftware?: string;
  unitsManaged?: string;
}

interface OnboardingContextType {
  currentStep: number;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  agencyData: AgencyData;
  setAgencyData: React.Dispatch<React.SetStateAction<AgencyData>>;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

interface OnboardingProviderProps {
  children: ReactNode;
  steps: string[]; // Array of page paths in order
}

export function OnboardingProvider({ children, steps }: OnboardingProviderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [currentStepIndex, setCurrentStepIndex] = useState(() => steps.indexOf(pathname));
  const [agencyData, setAgencyData] = useState<AgencyData>({}); // State to store agency data

  const goToNextStep = useCallback(() => {
    const nextIndex = currentStepIndex + 1;
    if (nextIndex < steps.length) {
      setCurrentStepIndex(nextIndex);
      router.push(steps[nextIndex]);
    }
  }, [currentStepIndex, router, steps]);

  const goToPreviousStep = useCallback(() => {
    const prevIndex = currentStepIndex - 1;
    if (prevIndex >= 0) {
      setCurrentStepIndex(prevIndex);
      router.push(steps[prevIndex]);
    }
  }, [currentStepIndex, router, steps]);

  const value = {
    currentStep: currentStepIndex + 1, // 1-based for display
    goToNextStep,
    goToPreviousStep,
    agencyData,
    setAgencyData,
  };

  return (
    <OnboardingContext.Provider value={value}>
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
}
