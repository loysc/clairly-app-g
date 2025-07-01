'use server'

import { auth, clerkClient } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { supabase } from '@/lib/db'

export async function updateUserRole(role: string) {
  const { userId, sessionClaims } = await auth()

  if (!userId || !sessionClaims?.sub) {
    throw new Error("User not found or Supabase ID missing")
  }

  const client = await clerkClient()
  
  // Get user details from Clerk
  const user = await client.users.getUser(userId)
  const firstName = user.firstName || ''
  const lastName = user.lastName || ''
  const email = user.emailAddresses[0]?.emailAddress || ''
  
  await client.users.updateUser(userId, {
    publicMetadata: { role },
  })

  console.log(`[updateUserRole] Set role '${role}' for userId: ${userId}`)

  if (role === 'tenant') {
    try {
      const { error } = await supabase.from('tenants').insert({
        id: sessionClaims.sub,
        first_name: firstName,
        last_name: lastName,
        email: email,
      })

      if (error) {
        console.error('Supabase error:', error)
        // For now, continue to dashboard even if DB insert fails
        console.log('Continuing to dashboard despite DB error...')
      }
    } catch (dbError) {
      console.error('Database connection error:', dbError)
      // Continue to dashboard even if database is unavailable
    }
    redirect('/tenant/dashboard')
  } else if (role === 'landlord') {
    try {
      const { error } = await supabase.from('landlords').insert({
        id: sessionClaims.sub,
        first_name: firstName,
        last_name: lastName,
        email: email,
      })

      if (error) {
        console.error('Supabase error:', error)
        console.log('Continuing to dashboard despite DB error...')
      }
    } catch (dbError) {
      console.error('Database connection error:', dbError)
    }
    redirect('/landlord/dashboard')
  } else if (role === 'agency') {
    redirect('/agency/dashboard')
  } else {
    // Fallback for any other unexpected role
    redirect('/dashboard')
  }
}
