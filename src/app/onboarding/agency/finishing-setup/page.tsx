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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group' // Assuming you have a RadioGroup component
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select' // Assuming you have a Select component
import { Input } from '@/components/ui/input'

const rentalSoftwareOptions = [
  { label: 'Sweepbright', value: 'sweepbright' },
  { label: 'Hecktor', value: 'hecktor' },
  { label: 'AC3', value: 'ac3' },
  { label: 'Other', value: 'other' },
]

const unitsManagedOptions = [
  { label: '10 to 100', value: '10-100' },
  { label: '100 to 300', value: '100-300' },
  { label: '300+', value: '300+' },
]

const finishingSetupSchema = z.object({
  rentalSoftware: z.string().min(1, { message: 'Please select a rental software.' }),
  otherRentalSoftware: z.string().optional(),
  unitsManaged: z.string().min(1, { message: 'Please select how many units you manage.' }),
}).refine((data) => {
  if (data.rentalSoftware === 'other' && !data.otherRentalSoftware) {
    return false; // If 'Other' is selected, 'otherRentalSoftware' must be provided
  }
  return true;
}, {
  message: "Please specify your rental software.",
  path: ["otherRentalSoftware"],
});

export default function FinishingSetupPage() {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const form = useForm<z.infer<typeof finishingSetupSchema>>({
    resolver: zodResolver(finishingSetupSchema),
    defaultValues: {
      rentalSoftware: '',
      unitsManaged: '',
    },
  })

  const selectedRentalSoftware = form.watch('rentalSoftware')

  async function onSubmit(values: z.infer<typeof finishingSetupSchema>) {
    startTransition(async () => {
      console.log('Finishing setup data:', values)
      // TODO: Save data to database (Task 1.2.4.3)
      await new Promise(resolve => setTimeout(resolve, 1500))
      router.push('/agency/dashboard') // Redirect to agency dashboard
    })
  }

  const handleBack = () => {
    router.back()
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Finishing set up</CardTitle>
          <CardDescription>These informations will help us build your custom dashboard and better assist you.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="rentalSoftware"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Which real estate software do you use?</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a software" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {rentalSoftwareOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {selectedRentalSoftware === 'other' && (
                <FormField
                  control={form.control}
                  name="otherRentalSoftware"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Please specify</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              <FormField
                control={form.control}
                name="unitsManaged"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>How many units do you manage?</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        {unitsManagedOptions.map((option) => (
                          <FormItem key={option.value} className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value={option.value} />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {option.label}
                            </FormLabel>
                          </FormItem>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex gap-2">
                <Button type="submit" className="flex-1" disabled={isPending}>
                  {isPending ? 'Finishing...' : 'Go to my dashboard'}
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
