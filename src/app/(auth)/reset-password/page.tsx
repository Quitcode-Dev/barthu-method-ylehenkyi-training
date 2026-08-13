'use client'

import Link from 'next/link'
import { FormEvent, useState } from 'react'

import { updatePassword } from './actions'

import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const PASSWORD_SPECIAL_AND_NUMBER_REGEX = /^(?=.*[0-9])(?=.*[!@#$%^&*])/

type FormValues = {
  new_password: string
  confirm_password: string
}

type FormErrors = Partial<Record<keyof FormValues, string>> & { form?: string }

const initialValues: FormValues = {
  new_password: '',
  confirm_password: '',
}

export default function ResetPasswordPage() {
  const [values, setValues] = useState<FormValues>(initialValues)
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validate = (current: FormValues) => {
    const nextErrors: FormErrors = {}

    if (current.new_password.length < 8) {
      nextErrors.new_password = 'Password must be at least 8 characters'
    } else if (!PASSWORD_SPECIAL_AND_NUMBER_REGEX.test(current.new_password)) {
      nextErrors.new_password = 'Password must include at least 1 number and 1 special character'
    }

    if (current.confirm_password !== current.new_password) {
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

    const result = await updatePassword({ password: values.new_password })

    if (result?.error) {
      setErrors((previous) => ({ ...previous, form: result.error }))
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Set a new password</CardTitle>
      </CardHeader>
      <CardContent>
        {errors.form ? (
          <Alert variant='destructive' className='mb-4'>
            <AlertDescription>{errors.form}</AlertDescription>
          </Alert>
        ) : null}

        <form className='space-y-4' onSubmit={onSubmit}>
          <div>
            <Label htmlFor='new_password'>New Password</Label>
            <Input
              id='new_password'
              name='new_password'
              type='password'
              value={values.new_password}
              onChange={(event) =>
                setValues((previous) => ({ ...previous, new_password: event.target.value }))
              }
            />
            {errors.new_password ? (
              <p className='text-sm text-destructive mt-1'>{errors.new_password}</p>
            ) : null}
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

          <Button type='submit' className='w-full' disabled={isSubmitting}>
            {isSubmitting ? 'Updating password...' : 'Update Password'}
          </Button>
        </form>

        <p className='text-sm mt-4 text-center'>
          <Link href='/login' className='underline underline-offset-4'>
            Back to sign in
          </Link>
        </p>
      </CardContent>
    </Card>
  )
}
