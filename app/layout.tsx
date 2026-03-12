import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import './globals.css'
import { ClientProviders } from './providers'
import Layout from '@/components/Layout'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-display', weight: '600' })

export const metadata: Metadata = {
  title: 'MBA - MartNorth Basketball Association',
  description: 'Official website of the MartNorth Basketball Association. Follow fixtures, results, standings, teams, and players.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="font-sans antialiased">
        <ClientProviders>
          <Layout>
            {children}
          </Layout>
        </ClientProviders>
      </body>
    </html>
  )
}
