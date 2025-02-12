import type { Metadata } from 'next'
import { ThemeProvider } from '@/context/ThemeContext'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: 'TradePro - Advanced Trading Platform',
  description: 'Professional trading platform with advanced analytics and AI-powered insights',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}