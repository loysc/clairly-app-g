'use client'

import { useState, useTransition } from 'react'
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
import { Checkbox } from '@/components/ui/checkbox' // Assuming you have a Checkbox component

const legalFormOptions = [
  { id: 'sas', label: 'SAS' },
  { id: 'sarl', label: 'SARL' },
  { id: 'sasu', label: 'SASU' },
]

const manualInfoSchema = z.object({
  legalName: z.string().min(2, {
    message: 'Legal name must be at least 2 characters.',
  }),
  legalForms: z.array(z.string()).min(1, {
    message: 'Please select at least one legal form.',
  }),
  siretSirenNumber: z.string()
    .refine(val => /^[0-9]{9}$/.test(val) || /^[0-9]{14}$/.test(val), {
      message: 'Please enter a valid 9-digit SIREN or 14-digit SIRET number.',
    }),
  registrationDate: z.string()
    .regex(/^\d{2}\/\d{2}\/\d{4}$/, 'Date must be in DD/MM/YYYY format')
    .refine((val) => {
      const [day, month, year] = val.split('/').map(Number);
      const date = new Date(year, month - 1, day);
      return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
    }, 'Invalid date'),
  proofOfRegistration: z.any(), // File upload will be handled separately
})

export default function ManualAgencyInfoPage() {
  const [isPending, startTransition] = useTransition()
  const { goToNextStep, goToPreviousStep } = useOnboarding()

  const form = useForm<z.infer<typeof manualInfoSchema>>({
    resolver: zodResolver(manualInfoSchema),
    defaultValues: {
      legalName: '',
      legalForms: [],
      siretSirenNumber: '',
      registrationDate: '',
    },
  })

  async function onSubmit(values: z.infer<typeof manualInfoSchema>) {
    startTransition(async () => {
      console.log('Manual agency info submitted:', values)
      // TODO: Save data to database (Task 1.2.4.3)
      // TODO: Handle file upload (Task 1.2.4.2)
      await new Promise(resolve => setTimeout(resolve, 1500))
      goToNextStep() // Next step in manual path
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
          <CardDescription>Please enter your agency details manually.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="legalName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Legal Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your Agency Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="legalForms"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Legal Form</FormLabel>
                    <div className="flex flex-col space-y-2">
                      {legalFormOptions.map((option) => (
                        <FormField
                          key={option.id}
                          control={form.control}
                          name="legalForms"
                          render={({ field: innerField }) => {
                            return (
                              <FormItem
                                key={option.id}
                                className="flex flex-row items-start space-x-3 space-y-0"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={innerField.value?.includes(option.id)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? innerField.onChange([...(innerField.value || []), option.id])
                                        : innerField.onChange(
                                            innerField.value?.filter(
                                              (value) => value !== option.id
                                            )
                                          )
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  {option.label}
                                </FormLabel>
                              </FormItem>
                            )
                          }}
                        />
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="siretSirenNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>SIRET / SIREN</FormLabel>
                    <FormControl>
                      <Input placeholder="123456789" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="registrationDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Registration Date (DD/MM/YYYY)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="DD/MM/YYYY"
                        {...field}
                        onChange={(e) => {
                          let value = e.target.value.replace(/[^\d]/g, ''); // Remove non-digits
                          if (value.length > 8) value = value.substring(0, 8);
                          if (value.length > 4) value = value.replace(/(\d{2})(\d{2})(\d{4})/, '$1/$2/$3');
                          else if (value.length > 2) value = value.replace(/(\d{2})(\d{2})/, '$1/$2');
                          field.onChange(value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* TODO: File upload component for proofOfRegistration (Task 1.2.4.2) */}
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
