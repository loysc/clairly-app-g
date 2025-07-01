'use server'

import { auth, clerkClient } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'

export async function updateUserRole(role: string) {
  const { userId, sessionClaims, getToken } = await auth()

  if (!userId || !sessionClaims?.sub) {
    throw new Error("User not found or Supabase ID missing")
  }

  const client = await clerkClient()
  
  // Get user details from Clerk
  const user = await client.users.getUser(userId)
  const firstName = user.firstName || ''
  const lastName = user.lastName || ''
  const email = user.emailAddresses[0]?.emailAddress || ''

  // Create an authenticated Supabase client
  const supabaseAuth = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      global: {
        headers: { Authorization: `Bearer ${await getToken({ template: 'supabase' })}` },
      },
    }
  )
  
  await client.users.updateUser(userId, {
    publicMetadata: { role },
  })

  console.log(`[updateUserRole] Set role '${role}' for userId: ${userId}`)

  // Debug the JWT token
  const token = await getToken({ template: 'supabase' })
  console.log('[DEBUG] JWT token:', token)
  
  // Test auth with a simple query first
  const { data: authTest, error: authError } = await supabaseAuth
    .from('tenants')
    .select('id')
    .limit(1)
  
  console.log('[DEBUG] Auth test result:', authTest)
  console.log('[DEBUG] Auth test error:', authError)

  if (role === 'tenant') {
    try {
      console.log('[DEBUG] sessionClaims.sub:', sessionClaims.sub)
      console.log('[DEBUG] userId:', userId)
      
      const { error } = await supabaseAuth.from('tenants').insert({
        id: userId, // Use userId instead of sessionClaims.sub
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
      const { error } = await supabaseAuth.from('landlords').insert({
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
