import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0A192F',
}

export const metadata: Metadata = {
  title: 'Dipesh Chaulagain — Frontend Developer · React / Next.js / Web3',
  description:
    'Frontend Developer with 3+ years building scalable web applications and Web3 solutions. Specialising in React, Next.js, TypeScript, Polkadot, Cardano, and End-to-End Encryption.',
  keywords: [
    'Dipesh Chaulagain',
    'Frontend Developer',
    'React Developer',
    'Next.js',
    'TypeScript',
    'Web3',
    'Blockchain',
    'Polkadot',
    'Cardano',
    'Nepal',
    'Remote Developer',
  ],
  authors: [{ name: 'Dipesh Chaulagain' }],
  creator: 'Dipesh Chaulagain',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'Dipesh Chaulagain — Frontend Developer',
    description: 'Building Secure, Scalable Web3 & Frontend Solutions with React, Next.js, and TypeScript.',
    siteName: 'Dipesh Chaulagain Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dipesh Chaulagain — Frontend Developer',
    description: 'Building Secure, Scalable Web3 & Frontend Solutions.',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-navy text-text-primary antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  )
}
