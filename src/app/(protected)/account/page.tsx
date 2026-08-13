import { redirect } from 'next/navigation'

import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default async function AccountPage() {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    redirect('/login')
  }

  const firstName = user.user_metadata?.first_name ?? ''
  const lastName = user.user_metadata?.last_name ?? ''
  const email = user.email ?? ''
  const createdAt = new Date(user.created_at).toLocaleDateString()

  return (
    <div className='space-y-6'>
      <h1 className='text-3xl font-bold'>Account Settings</h1>

      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='grid grid-cols-2 gap-4'>
            <div className='text-sm font-medium text-muted-foreground'>First Name</div>
            <div className='text-sm'>{firstName}</div>

            <div className='text-sm font-medium text-muted-foreground'>Last Name</div>
            <div className='text-sm'>{lastName}</div>

            <div className='text-sm font-medium text-muted-foreground'>Email</div>
            <div className='text-sm'>{email}</div>

            <div className='text-sm font-medium text-muted-foreground'>Registration Date</div>
            <div className='text-sm'>{createdAt}</div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Membership</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='grid grid-cols-2 gap-4'>
            <div className='text-sm font-medium text-muted-foreground'>Membership Status</div>
            <div className='text-sm'>Free</div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
