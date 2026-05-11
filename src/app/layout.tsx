import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { siteConfig } from '@/lib/siteConfig'
import JsonLd from '@/components/ui/JsonLd'
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
  colorScheme: 'dark',
}

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),

  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,

  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,

  // Canonical
  alternates: {
    canonical: siteConfig.url,
  },

  // OpenGraph
  openGraph: {
    type: 'profile',
    locale: 'en_US',
    url: siteConfig.url,
    siteName: `${siteConfig.name} — Portfolio`,
    title: siteConfig.title,
    description: siteConfig.description,
    images: [
      {
        url: '/og-image.png',      // add a 1200×630 screenshot to /public/
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} — Frontend Developer`,
        type: 'image/png',
      },
    ],
    firstName: 'Dipesh',
    lastName: 'Chaulagain',
    username: 'dipesh-chaulagain',
    gender: 'male',
  },

  // Twitter / X
  twitter: {
    card: 'summary_large_image',
    site: '@dipesh_dev',
    creator: '@dipesh_dev',
    title: siteConfig.title,
    description: siteConfig.description,
    images: ['/og-image.png'],
  },

  // Robots
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // Verification — add your tokens once verified
  verification: {
    // google: 'YOUR_GOOGLE_SEARCH_CONSOLE_TOKEN',
    // yandex: 'YOUR_YANDEX_TOKEN',
  },

  // App / PWA hints
  category: 'technology',
  classification: 'Portfolio',
  referrer: 'origin-when-cross-origin',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <JsonLd />
        {/* Preconnect to external image CDN */}
        <link rel="preconnect" href="https://images.unsplash.com" />
        {/* Geo meta */}
        <meta name="geo.region" content="NP-BA" />
        <meta name="geo.placename" content="Kathmandu" />
        <meta name="geo.position" content="27.7172;85.3240" />
        <meta name="ICBM" content="27.7172, 85.3240" />
      </head>
      <body className="bg-navy text-text-primary antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  )
}
