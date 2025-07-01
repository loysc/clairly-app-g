'use client'

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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useState, useTransition } from 'react'

const formSchema = z.object({
  companyName: z.string().min(2, {
    message: 'Company name must be at least 2 characters.',
  }),
  siretNumber: z.string().length(14, {
    message: 'SIRET number must be 14 digits.',
  }),
  address: z.string().min(5, {
    message: 'Address must be at least 5 characters.',
  }),
})

export function AgencyOnboardingForm() {
  const [isPending, startTransition] = useTransition()
  const [inseeVerificationStatus, setInseeVerificationStatus] = useState<'idle' | 'verifying' | 'verified' | 'failed'>('idle')

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: '',
      siretNumber: '',
      address: '',
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      setInseeVerificationStatus('verifying')
      // Placeholder for INSEE API call
      console.log('Verifying SIRET with INSEE API:', values.siretNumber)
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))

      const isSiretValid = true; // Replace with actual INSEE API call result

      if (isSiretValid) {
        setInseeVerificationStatus('verified')
        console.log('SIRET verified. Proceeding with onboarding:', values)
        // TODO: Connect to database to store verified company data (Task 1.2.4)
      } else {
        setInseeVerificationStatus('failed')
        form.setError('siretNumber', { message: 'Invalid SIRET number or verification failed.' })
      }
    })
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Agency Onboarding</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Clairly Agency" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="siretNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>SIRET Number</FormLabel>
                  <FormControl>
                    <Input placeholder="12345678901234" {...field} />
                  </FormControl>
                  {inseeVerificationStatus === 'verifying' && (
                    <p className="text-sm text-muted-foreground">Verifying SIRET...</p>
                  )}
                  {inseeVerificationStatus === 'verified' && (
                    <p className="text-sm text-green-500">SIRET Verified!</p>
                  )}
                  {inseeVerificationStatus === 'failed' && (
                    <p className="text-sm text-destructive">SIRET verification failed.</p>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="123 Main St, Paris" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? 'Submitting...' : 'Complete Onboarding'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
