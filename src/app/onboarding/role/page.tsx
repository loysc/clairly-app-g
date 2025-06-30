'use client'

import { useTransition } from 'react'
import { updateUserRole } from './actions'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { useUser } from '@clerk/nextjs'

const roles = [
  {
    name: 'Tenant',
    description: 'Find and manage your rental properties.',
    role: 'tenant',
  },
  {
    name: 'Landlord',
    description: 'Manage your properties and tenants.',
    role: 'landlord',
  },
  {
    name: 'Agency',
    description: 'Manage properties on behalf of landlords.',
    role: 'agency',
  },
]

export default function RoleSelectionPage() {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  const { user } = useUser()

  const handleRoleSelection = (role: string) => {
    startTransition(async () => {
      await updateUserRole(role)
      await user?.reload()
      router.push('/')
    })
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <h1 className="text-4xl font-bold text-center mb-2">Choose Your Role</h1>
        <p className="text-muted-foreground text-center mb-12">To get started, please select your role.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {roles.map((role) => (
            <Card key={role.name} className="w-full max-w-sm">
              <CardHeader>
                <CardTitle>{role.name}</CardTitle>
                <CardDescription>{role.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  className="w-full"
                  onClick={() => handleRoleSelection(role.role)}
                  disabled={isPending}
                >
                  {isPending ? 'Selecting...' : `I am a ${role.name}`}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}