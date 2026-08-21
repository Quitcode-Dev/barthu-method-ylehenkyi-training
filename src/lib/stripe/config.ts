export interface MembershipPlan {
  id: string
  name: string
  price_id: string | undefined
  interval: string
  price_display: string
}

export const MEMBERSHIP_PLANS: MembershipPlan[] = [
  {
    id: 'monthly',
    name: 'Monthly Membership',
    price_id: process.env.STRIPE_MONTHLY_PRICE_ID,
    interval: 'month',
    price_display: '$29/month',
  },
]
