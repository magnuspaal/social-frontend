import { StoreProvider } from '@/store/store-provider'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { LanguageProvider } from '@/lang/language-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Social Application'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full bg-background">
      <body className={`${inter.className} h-full`}>
        <LanguageProvider>
          <StoreProvider>
            {children}
          </StoreProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
