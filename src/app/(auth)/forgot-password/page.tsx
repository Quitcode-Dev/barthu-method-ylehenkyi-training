'use client'

import Link from 'next/link'
import { FormEvent, useState } from 'react'

import { resetPassword } from './actions'

import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)
    setSuccess(false)

    const trimmed = email.trim()
    if (!trimmed) {
      setError('Please enter your email address')
      return
    }

    setIsSubmitting(true)

    const result = await resetPassword({ email: trimmed })

    if (result?.error) {
      setError(result.error)
    } else {
      setSuccess(true)
    }

    setIsSubmitting(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Reset your password</CardTitle>
      </CardHeader>
      <CardContent>
        {error ? (
          <Alert variant='destructive' className='mb-4'>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : null}

        {success ? (
          <Alert className='mb-4'>
            <AlertDescription>Check your email for a password reset link</AlertDescription>
          </Alert>
        ) : null}

        {!success ? (
          <form className='space-y-4' onSubmit={onSubmit}>
            <div>
              <Label htmlFor='email'>Email</Label>
              <Input
                id='email'
                name='email'
                type='email'
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>

            <Button type='submit' className='w-full' disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Send Reset Link'}
            </Button>
          </form>
        ) : null}

        <p className='text-sm mt-4 text-center'>
          Remember your password?{' '}
          <Link href='/login' className='underline underline-offset-4'>
            Sign in
          </Link>
        </p>
      </CardContent>
    </Card>
  )
}
