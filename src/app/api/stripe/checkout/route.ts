import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { stripe } from '@/lib/stripe/client'
import { getOrCreateStripeCustomer } from '@/lib/stripe/helpers'

export async function POST(request: Request) {
  try {
    const { priceId } = (await request.json()) as { priceId?: string }

    if (!priceId) {
      return NextResponse.json(
        { error: 'Price ID is required' },
        { status: 400 },
      )
    }

    // Authenticate user via Supabase
    const supabase = await createClient()
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 },
      )
    }

    // Get or create Stripe customer
    const customerId = await getOrCreateStripeCustomer(
      stripe,
      user.email!,
      user.id,
    )

    // Build success/cancel URLs from the request origin
    const origin = new URL(request.url).origin

    // Create Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: 'subscription',
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${origin}/dashboard?payment=success`,
      cancel_url: `${origin}/pricing?payment=cancelled`,
      metadata: {
        userId: user.id,
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Error creating checkout session:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 },
    )
  }
}
