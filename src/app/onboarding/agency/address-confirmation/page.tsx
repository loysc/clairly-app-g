'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
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

export default function AddressConfirmationPage() {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  // Simulate pre-filled data (will come from API or previous manual step)
  const prefilledData = {
    address: '41 Cours Gambetta',
    additionalAddressDetails: '',
    zipCode: '69003',
    city: 'Lyon',
  }

  const form = useForm<z.infer<typeof addressSchema>>({
    resolver: zodResolver(addressSchema),
    defaultValues: prefilledData,
  })

  async function onSubmit(values: z.infer<typeof addressSchema>) {
    startTransition(async () => {
      console.log('Confirmed address:', values)
      // TODO: Save address data to database (Task 1.2.4.3)
      await new Promise(resolve => setTimeout(resolve, 1500))
      router.push('/onboarding/agency/finishing-setup') // Next step
    })
  }

  const handleBack = () => {
    router.back()
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Agency address</CardTitle>
          <CardDescription>Make sure the information is the same as on the proof of registration.</CardDescription>
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
              <p className="text-sm text-muted-foreground">
                You can change your address in your account settings later. This would require a new proof of registration.
              </p>
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
