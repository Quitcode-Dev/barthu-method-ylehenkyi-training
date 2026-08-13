import type { Metadata } from 'next'
import { ReactNode } from 'react'

import './globals.css'

export const metadata: Metadata = {
  title: 'App',
  description: 'Application',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='en'>
      <body className='bg-background text-foreground antialiased'>
        {children}
      </body>
    </html>
  )
}
