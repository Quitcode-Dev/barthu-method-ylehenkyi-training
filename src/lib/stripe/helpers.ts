import type Stripe from 'stripe'
import type { SupabaseClient } from '@supabase/supabase-js'

/**
 * Looks up an existing Stripe customer by email, or creates a new one.
 * Returns the Stripe customer ID.
 */
export async function getOrCreateStripeCustomer(
  stripe: Stripe,
  email: string,
  userId: string,
): Promise<string> {
  // Search for an existing customer with this email
  const existingCustomers = await stripe.customers.list({
    email,
    limit: 1,
  })

  if (existingCustomers.data.length > 0) {
    return existingCustomers.data[0].id
  }

  // Create a new customer
  const customer = await stripe.customers.create({
    email,
    metadata: {
      supabase_user_id: userId,
    },
  })

  return customer.id
}

/**
 * Checks whether a user has an active subscription by querying
 * the `subscriptions` table in Supabase.
 */
export async function hasActiveSubscription(
  supabase: SupabaseClient,
  userId: string,
): Promise<boolean> {
  const { data, error } = await supabase
    .from('subscriptions')
    .select('id')
    .eq('user_id', userId)
    .eq('status', 'active')
    .limit(1)

  if (error) {
    console.error('Error checking subscription status:', error.message)
    return false
  }

  return (data?.length ?? 0) > 0
}
