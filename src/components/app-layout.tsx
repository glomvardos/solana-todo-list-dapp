'use client'

import { ThemeProvider } from './theme-provider'
import { Toaster } from './ui/sonner'
import { AppHeader } from '@/components/app-header'

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <div className="flex flex-col min-h-screen">
        <AppHeader />
        <main className="grow container mx-auto p-4 flex flex-col">{children}</main>
      </div>
      <Toaster />
    </ThemeProvider>
  )
}
