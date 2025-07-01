'use server'

import { auth } from '@clerk/nextjs/server'
import { supabase } from '@/lib/db'
import { redirect } from 'next/navigation'

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

export async function saveAgencyOnboardingData(data: AgencyData) {
  const { userId } = auth()

  if (!userId) {
    throw new Error('User not authenticated')
  }

  try {
    // Fetch existing agency data if any
    const { data: existingData, error: fetchError } = await supabase
      .from('agencies')
      .select('*')
      .eq('id', userId)
      .single()

    if (fetchError && fetchError.code !== 'PGRST116') { // PGRST116 means no rows found
      console.error('Supabase error fetching agency profile:', fetchError)
      throw new Error(`Failed to fetch agency profile: ${fetchError.message}`)
    }

    if (existingData) {
      // Update existing record
      const { error: updateError } = await supabase
        .from('agencies')
        .update({
          ...data,
          updated_at: new Date().toISOString(),
        })
        .eq('id', userId)

      if (updateError) {
        console.error('Supabase error updating agency profile:', updateError)
        throw new Error(`Failed to update agency profile: ${updateError.message}`)
      }
      console.log('Agency profile updated successfully for userId:', userId)
    } else {
      // Insert new record
      const { error: insertError } = await supabase.from('agencies').insert({
        id: userId,
        ...data,
      })

      if (insertError) {
        console.error('Supabase error inserting agency profile:', insertError)
        throw new Error(`Failed to insert agency profile: ${insertError.message}`)
      }
      console.log('Agency profile created successfully for userId:', userId)
    }

    // Redirect is handled by the client-side navigation in the forms
    // No redirect here as this is a partial save action

  } catch (dbError) {
    console.error('Database connection or operation error:', dbError)
    throw new Error('An unexpected error occurred while saving agency profile.')
  }
}
