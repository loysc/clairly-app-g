'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { ReactNode, useEffect, useState } from 'react'

interface OnboardingLayoutProps {
  children: ReactNode
}

export default function OnboardingLayout({ children }: OnboardingLayoutProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Define the order of onboarding steps
  const steps = [
    '/onboarding/agency/siret-search',
    '/onboarding/agency/confirm-address',
    '/onboarding/agency/manual-info',
    '/onboarding/agency/manual-address',
    '/onboarding/agency/finishing-setup',
  ]

  const currentStepIndex = steps.indexOf(pathname)

  // This component will primarily manage navigation and potentially pass down state
  // For now, it just renders children. Navigation logic will be added to individual pages.

  return <>{children}</>
}
