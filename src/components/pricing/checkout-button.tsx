'use client'

import { useState } from 'react'

import { Button } from '@/components/ui/button'

interface CheckoutButtonProps {
  priceId: string
}

export function CheckoutButton({ priceId }: CheckoutButtonProps) {
  const [loading, setLoading] = useState(false)

  async function handleCheckout() {
    setLoading(true)
    try {
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        body: JSON.stringify({ priceId }),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const data = (await response.json()) as { url?: string; error?: string }

      if (!response.ok) {
        throw new Error(data.error ?? 'Failed to create checkout session')
      }

      if (data.url) {
        window.location.href = data.url
      }
    } catch (error) {
      console.error('Checkout error:', error)
      setLoading(false)
    }
  }

  return (
    <Button
      size="lg"
      className="w-full"
      onClick={handleCheckout}
      disabled={loading}
    >
      {loading ? 'Redirecting…' : 'Subscribe Now'}
    </Button>
  )
}
