import Link from 'next/link'
import { redirect } from 'next/navigation'

import { buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { createClient } from '@/lib/supabase/server'
import { cn } from '@/lib/utils'

export default async function HomePage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    redirect('/dashboard')
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="min-h-[70vh] flex items-center justify-center bg-gradient-to-b from-primary/5 to-background">
        <div className="max-w-3xl mx-auto text-center px-4">
          <h1 className="text-5xl font-bold tracking-tight">The Barthu Method</h1>
          <p className="text-xl text-muted-foreground mt-4">
            Personalized nervous system regulation and movement restoration
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/register"
              className={cn(buttonVariants({ variant: 'default', size: 'lg' }))}
            >
              Get Started
            </Link>
            <a
              href="#features"
              className={cn(buttonVariants({ variant: 'outline', size: 'lg' }))}
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Personalized Assessment</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Complete our NSR assessment to receive a program tailored to your needs
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Expert-Guided Exercises</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Follow video-guided sessions designed by clinical specialists
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Track Your Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Monitor your journey and see measurable improvements over time
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary/5 text-center px-4">
        <h2 className="text-3xl font-bold tracking-tight">Ready to start your journey?</h2>
        <div className="mt-8">
          <Link
            href="/register"
            className={cn(buttonVariants({ variant: 'default', size: 'lg' }))}
          >
            Create Your Account
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 text-center text-sm text-muted-foreground">
        &copy; 2025 Barthu Method. All rights reserved.
      </footer>
    </div>
  )
}
