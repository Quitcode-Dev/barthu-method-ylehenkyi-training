'use client'

import Link from 'next/link'
import { FormEvent, useState } from 'react'

import { registerUser } from './actions'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const PASSWORD_SPECIAL_AND_NUMBER_REGEX = /^(?=.*[0-9])(?=.*[!@#$%^&*])/

type FormValues = {
  first_name: string
  last_name: string
  email: string
  password: string
  confirm_password: string
}

type FormErrors = Partial<Record<keyof FormValues, string>> & { form?: string }

const initialValues: FormValues = {
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  confirm_password: '',
}

export default function RegisterPage() {
  const [values, setValues] = useState<FormValues>(initialValues)
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validate = (current: FormValues) => {
    const nextErrors: FormErrors = {}

    if (!current.first_name.trim()) nextErrors.first_name = 'First name is required'
    if (!current.last_name.trim()) nextErrors.last_name = 'Last name is required'
    if (!current.email.trim()) nextErrors.email = 'Email is required'
    if (current.password.length < 8) nextErrors.password = 'Password must be at least 8 characters'
    else if (!PASSWORD_SPECIAL_AND_NUMBER_REGEX.test(current.password)) {
      nextErrors.password = 'Password must include at least 1 number and 1 special character'
    }
    if (current.confirm_password !== current.password) {
      nextErrors.confirm_password = 'Passwords do not match'
    }

    return nextErrors
  }

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const nextErrors = validate(values)
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      return
    }

    setErrors({})
    setIsSubmitting(true)

    const result = await registerUser({
      first_name: values.first_name.trim(),
      last_name: values.last_name.trim(),
      email: values.email.trim(),
      password: values.password,
    })

    if (result?.error) {
      setErrors((previous) => ({ ...previous, form: result.error }))
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create your account</CardTitle>
      </CardHeader>
      <CardContent>
        <form className='space-y-4' onSubmit={onSubmit}>
          <div>
            <Label htmlFor='first_name'>First Name</Label>
            <Input
              id='first_name'
              name='first_name'
              value={values.first_name}
              onChange={(event) => setValues((previous) => ({ ...previous, first_name: event.target.value }))}
            />
            {errors.first_name ? <p className='text-sm text-destructive mt-1'>{errors.first_name}</p> : null}
          </div>

          <div>
            <Label htmlFor='last_name'>Last Name</Label>
            <Input
              id='last_name'
              name='last_name'
              value={values.last_name}
              onChange={(event) => setValues((previous) => ({ ...previous, last_name: event.target.value }))}
            />
            {errors.last_name ? <p className='text-sm text-destructive mt-1'>{errors.last_name}</p> : null}
          </div>

          <div>
            <Label htmlFor='email'>Email</Label>
            <Input
              id='email'
              name='email'
              type='email'
              value={values.email}
              onChange={(event) => setValues((previous) => ({ ...previous, email: event.target.value }))}
            />
            {errors.email ? <p className='text-sm text-destructive mt-1'>{errors.email}</p> : null}
          </div>

          <div>
            <Label htmlFor='password'>Password</Label>
            <Input
              id='password'
              name='password'
              type='password'
              value={values.password}
              onChange={(event) => setValues((previous) => ({ ...previous, password: event.target.value }))}
            />
            {errors.password ? <p className='text-sm text-destructive mt-1'>{errors.password}</p> : null}
          </div>

          <div>
            <Label htmlFor='confirm_password'>Confirm Password</Label>
            <Input
              id='confirm_password'
              name='confirm_password'
              type='password'
              value={values.confirm_password}
              onChange={(event) =>
                setValues((previous) => ({ ...previous, confirm_password: event.target.value }))
              }
            />
            {errors.confirm_password ? (
              <p className='text-sm text-destructive mt-1'>{errors.confirm_password}</p>
            ) : null}
          </div>

          {errors.form ? <p className='text-sm text-destructive mt-1'>{errors.form}</p> : null}

          <Button type='submit' className='w-full' disabled={isSubmitting}>
            {isSubmitting ? 'Creating account...' : 'Create account'}
          </Button>
        </form>

        <p className='text-sm mt-4 text-center'>
          Already have an account?{' '}
          <Link href='/login' className='underline underline-offset-4'>
            Log in
          </Link>
        </p>
      </CardContent>
    </Card>
  )
}
