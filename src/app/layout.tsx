// app/layout.tsx (Server Component)
import type { Metadata } from 'next'
import ClientLayout from '@/components/clientLayout/clientLayout'
import "./globals.css"
import pocketedMetadata from './metadata'

export const metadata : Metadata = pocketedMetadata
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {


  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}