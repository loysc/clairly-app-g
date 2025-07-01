'use client'

import { useState, useTransition } from 'react'
import { useOnboarding, AgencyData } from '@/components/agency/onboarding-context'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { saveAgencyOnboardingData } from '@/app/agency/actions'

const addressSchema = z.object({
  address: z.string().min(5, {
    message: 'Address must be at least 5 characters.',
  }),
  additionalAddressDetails: z.string().optional(),
  zipCode: z.string().length(5, {
    message: 'Zip Code must be 5 digits.',
  }),
  city: z.string().min(2, {
    message: 'City must be at least 2 characters.',
  }),
})

export default function ManualAddressPage() {
  const [isPending, startTransition] = useTransition()
  const { goToNextStep, goToPreviousStep, agencyData, setAgencyData } = useOnboarding()

  const form = useForm<z.infer<typeof addressSchema>>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      address: agencyData.address || '',
      additionalAddressDetails: agencyData.additionalAddressDetails || '',
      zipCode: agencyData.zipCode || '',
      city: agencyData.city || '',
    },
  })

  async function onSubmit(values: z.infer<typeof addressSchema>) {
    startTransition(async () => {
      console.log('Manual address submitted:', values)
      const updatedAgencyData = {
        ...agencyData,
        address: values.address,
        additionalAddressDetails: values.additionalAddressDetails,
        zipCode: values.zipCode,
        city: values.city,
      };
      setAgencyData(updatedAgencyData);

      try {
        await saveAgencyOnboardingData(updatedAgencyData);
        goToNextStep();
      } catch (error: any) {
        console.error("Failed to save manual address data:", error);
        alert(`Failed to save manual address data: ${error.message || "An unexpected error occurred."}`);
      }
    })
  }

  const handleBack = () => {
    goToPreviousStep()
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Agency address</CardTitle>
          <CardDescription>Please enter your agency address details.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="additionalAddressDetails"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additionnal address details (optional)</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="zipCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Zip Code</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex gap-2">
                <Button type="submit" className="flex-1" disabled={isPending}>
                  {isPending ? 'Continuing...' : 'Continue'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={handleBack}
                  disabled={isPending}
                >
                  Back
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
