import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Barthu Method',
  description: 'Personalized Workout Recommendation Platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  )
}
