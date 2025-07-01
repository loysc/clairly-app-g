'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { useOnboarding } from '@/components/agency/onboarding-context'
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

const siretSearchSchema = z.object({
  siretNumber: z.string()
    .refine(val => /^[0-9]{9}$/.test(val) || /^[0-9]{14}$/.test(val), {
      message: 'Please enter a valid 9-digit SIREN or 14-digit SIRET number.',
    }),
})

export default function SiretSearchPage() {
  const [isPending, startTransition] = useTransition()
  const { goToNextStep } = useOnboarding()
  const router = useRouter()

  const form = useForm<z.infer<typeof siretSearchSchema>>({
    resolver: zodResolver(siretSearchSchema),
    defaultValues: {
      siretNumber: '',
    },
  })

  async function onSubmit(values: z.infer<typeof siretSearchSchema>) {
    startTransition(async () => {
      console.log('Searching SIREN/SIRET:', values.siretNumber)
      // TODO: Implement INSEE API call (Task 1.2.4.1)
      // For now, simulate success and redirect to a placeholder page
      await new Promise(resolve => setTimeout(resolve, 1500))
      goToNextStep()
    })
  }

  const handleManualEntry = () => {
    router.push('/onboarding/agency/manual-info') // Placeholder for manual path
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Agency information</CardTitle>
          <CardDescription>Find your agency by entering its SIREN / SIRET number we will automatically retrieve the informations necessary for the following steps.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="siretNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company name or SIREN/SIRET number</FormLabel>
                    <FormControl>
                      <Input placeholder="12345678901234" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? 'Searching...' : 'Search'}
              </Button>
            </form>
          </Form>
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or
              </span>
            </div>
          </div>
          <Button
            variant="outline"
            className="w-full"
            onClick={handleManualEntry}
            disabled={isPending}
          >
            Enter my details manually
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
