import Link from 'next/link'

import { CheckoutButton } from '@/components/pricing/checkout-button'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { MEMBERSHIP_PLANS } from '@/lib/stripe/config'
import { hasActiveSubscription } from '@/lib/stripe/helpers'
import { createClient } from '@/lib/supabase/server'

const FEATURES = [
  'Personalized exercise programs',
  'Video-guided sessions',
  'Progress tracking',
  'Post-session feedback',
]

export default async function PricingPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const isSubscribed = user
    ? await hasActiveSubscription(supabase, user.id)
    : false

  // If the user has an active subscription, fetch subscription details
  if (isSubscribed && user) {
    const { data: subscription } = await supabase
      .from('subscriptions')
      .select('stripe_price_id, current_period_end, status')
      .eq('user_id', user.id)
      .eq('status', 'active')
      .limit(1)
      .single()

    const plan = MEMBERSHIP_PLANS.find(
      (p) => p.price_id === subscription?.stripe_price_id
    )

    const renewalDate = subscription?.current_period_end
      ? new Date(subscription.current_period_end).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })
      : null

    return (
      <div className="max-w-md mx-auto">
        <Card className="border-2 border-primary">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">You are a member ✓</CardTitle>
            <CardDescription>
              Your membership is active
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center space-y-2">
              <p className="text-lg font-semibold">
                {plan?.name ?? 'Membership Plan'}
              </p>
              <p className="text-4xl font-bold">
                {plan?.price_display ?? '$29/month'}
              </p>
              {renewalDate && (
                <p className="text-sm text-muted-foreground">
                  Renews on {renewalDate}
                </p>
              )}
            </div>
          </CardContent>
          <CardFooter className="justify-center">
            <Link href="/account">
              <Button variant="outline">Manage Subscription</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    )
  }

  // Non-subscriber pricing view
  const plan = MEMBERSHIP_PLANS[0]

  return (
    <div className="max-w-md mx-auto">
      <Card className="border-2 border-primary">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">{plan.name}</CardTitle>
          <CardDescription>
            Everything you need for your recovery journey
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <span className="text-4xl font-bold">{plan.price_display}</span>
          </div>
          <ul className="space-y-3">
            {FEATURES.map((feature) => (
              <li key={feature} className="flex items-center gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter>
          {plan.price_id ? (
            <CheckoutButton priceId={plan.price_id} />
          ) : (
            <Button size="lg" className="w-full" disabled>
              Coming Soon
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}
