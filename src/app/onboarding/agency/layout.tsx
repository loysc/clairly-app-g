'use client'

import { OnboardingProvider } from '@/components/agency/onboarding-context'
import { ReactNode } from 'react'

const agencyOnboardingSteps = [
  '/onboarding/agency/siret-search',
  '/onboarding/agency/confirm-address',
  '/onboarding/agency/manual-info',
  '/onboarding/agency/manual-address',
  '/onboarding/agency/finishing-setup',
]

export default function AgencyOnboardingLayout({ children }: { children: ReactNode }) {
  return (
    <OnboardingProvider steps={agencyOnboardingSteps}>
      {children}
    </OnboardingProvider>
  )
}
