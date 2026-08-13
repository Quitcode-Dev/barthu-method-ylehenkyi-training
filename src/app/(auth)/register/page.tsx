'use client'

import { useState, useActionState } from 'react'
import Link from 'next/link'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { register } from './actions'

interface FieldErrors {
  first_name?: string
  last_name?: string
  email?: string
  password?: string
  confirm_password?: string
}

const PASSWORD_REGEX = /^(?=.*[0-9])(?=.*[!@#$%^&*])/

function validateFields(formData: FormData): FieldErrors {
  const errors: FieldErrors = {}

  const firstName = formData.get('first_name') as string
  const lastName = formData.get('last_name') as string
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const confirmPassword = formData.get('confirm_password') as string

  if (!firstName || firstName.trim() === '') {
    errors.first_name = 'First name is required'
  }

  if (!lastName || lastName.trim() === '') {
    errors.last_name = 'Last name is required'
  }

  if (!email || email.trim() === '') {
    errors.email = 'Email is required'
  }

  if (!password) {
    errors.password = 'Password is required'
  } else if (password.length < 8) {
    errors.password = 'Password must be at least 8 characters'
  } else if (!PASSWORD_REGEX.test(password)) {
    errors.password = 'Password must contain at least 1 number and 1 special character (!@#$%^&*)'
  }

  if (!confirmPassword) {
    errors.confirm_password = 'Please confirm your password'
  } else if (password && confirmPassword !== password) {
    errors.confirm_password = 'Passwords do not match'
  }

  return errors
}

export default function RegisterPage() {
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const [state, formAction, isPending] = useActionState(register, { error: undefined })

  function handleSubmit(formData: FormData) {
    const errors = validateFields(formData)
    setFieldErrors(errors)

    if (Object.keys(errors).length > 0) {
      return
    }

    formAction(formData)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your details below to create your account and get started.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={handleSubmit} className="space-y-4" noValidate>
          {state?.error && (
            <div className="rounded-md bg-destructive/10 p-3">
              <p className="text-sm text-destructive">{state.error}</p>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="first_name">First Name</Label>
            <Input
              id="first_name"
              name="first_name"
              type="text"
              placeholder="John"
              required
            />
            {fieldErrors.first_name && (
              <p className="text-sm text-destructive mt-1">{fieldErrors.first_name}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="last_name">Last Name</Label>
            <Input
              id="last_name"
              name="last_name"
              type="text"
              placeholder="Doe"
              required
            />
            {fieldErrors.last_name && (
              <p className="text-sm text-destructive mt-1">{fieldErrors.last_name}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="john@example.com"
              required
            />
            {fieldErrors.email && (
              <p className="text-sm text-destructive mt-1">{fieldErrors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              required
            />
            {fieldErrors.password && (
              <p className="text-sm text-destructive mt-1">{fieldErrors.password}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirm_password">Confirm Password</Label>
            <Input
              id="confirm_password"
              name="confirm_password"
              type="password"
              placeholder="••••••••"
              required
            />
            {fieldErrors.confirm_password && (
              <p className="text-sm text-destructive mt-1">{fieldErrors.confirm_password}</p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? 'Creating account...' : 'Create account'}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="justify-center">
        <p className="text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link href="/login" className="text-primary underline hover:text-primary/80">
            Log in
          </Link>
        </p>
      </CardFooter>
    </Card>
  )
}
