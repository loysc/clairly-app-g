'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { useOnboarding, AgencyData } from '@/components/agency/onboarding-context'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { saveAgencyOnboardingData } from '@/app/agency/actions'

export default function ConfirmAddressPage() {
  const [isPending, startTransition] = useTransition()
  const { goToNextStep, goToPreviousStep, agencyData } = useOnboarding()
  const router = useRouter()

  // Simulate API result for now
  const agencyData = {
    companyName: 'L2a immo',
    siretNumber: '79364393300047',
    address: '41 Cours Gambetta',
    zipCode: '69003',
    city: 'LYON',
  }

  const handleConfirm = async () => {
    startTransition(async () => {
      try {
        await saveAgencyOnboardingData(agencyData);
        goToNextStep();
      } catch (error) {
        console.error("Failed to save agency data:", error);
        alert("Failed to save agency data. Please try again.");
      }
    });
  }

  const handleManualEntry = () => {
    startTransition(() => {
      router.push('/onboarding/agency/manual-info') // Manual path
    })
  }

  const handleBack = () => {
    router.back()
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Agency information</CardTitle>
          <CardDescription>Please confirm your agency details.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <p className="text-sm text-muted-foreground">SIRET Number: {agencyData.siretNumber}</p>
            <Card
              className="mt-2 cursor-pointer hover:bg-accent"
              onClick={handleConfirm}
              disabled={isPending}
            >
              <CardContent className="py-4">
                <p className="font-semibold">{agencyData.companyName} - {agencyData.siretNumber}</p>
            <p className="text-sm text-muted-foreground">{agencyData.address} - {agencyData.zipCode} {agencyData.city}</p>
              </CardContent>
            </Card>
            <p className="text-sm text-muted-foreground mt-2">
              Information from the official trade register. Is this not your agency?
            </p>
          </div>

          <div className="space-y-2">
            <Button
              variant="outline"
              className="w-full"
              onClick={handleManualEntry}
              disabled={isPending}
            >
              Enter my details manually
            </Button>
            <Button
              variant="ghost"
              className="w-full"
              onClick={handleBack}
              disabled={isPending}
            >
              Back
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
