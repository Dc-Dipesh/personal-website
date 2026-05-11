import { siteConfig } from '@/lib/siteConfig'

export default function JsonLd() {
  const person = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${siteConfig.url}/#person`,
    name: siteConfig.name,
    url: siteConfig.url,
    email: siteConfig.email,
    jobTitle: 'Frontend Developer',
    description: siteConfig.description,
    image: `${siteConfig.url}/og-image.png`,
    sameAs: [siteConfig.linkedin, siteConfig.github],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Kathmandu',
      addressCountry: 'NP',
    },
    knowsAbout: [
      'React',
      'Next.js',
      'TypeScript',
      'Web3',
      'Polkadot',
      'Cardano',
      'End-to-End Encryption',
      'Tailwind CSS',
      'React Query',
      'Framer Motion',
      'REST APIs',
      'SEO',
    ],
    worksFor: {
      '@type': 'Organization',
      name: 'Vola Solution Pvt. Ltd.',
    },
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'University of Sunderland',
      sameAs: 'https://www.sunderland.ac.uk',
    },
  }

  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteConfig.url}/#website`,
    url: siteConfig.url,
    name: `${siteConfig.name} — Portfolio`,
    description: siteConfig.tagline,
    publisher: { '@id': `${siteConfig.url}/#person` },
    inLanguage: 'en-US',
  }

  const webpage = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': `${siteConfig.url}/#webpage`,
    url: siteConfig.url,
    name: siteConfig.title,
    description: siteConfig.description,
    isPartOf: { '@id': `${siteConfig.url}/#website` },
    about: { '@id': `${siteConfig.url}/#person` },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: siteConfig.url,
        },
      ],
    },
    mainEntity: { '@id': `${siteConfig.url}/#person` },
    inLanguage: 'en-US',
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webpage) }}
      />
    </>
  )
}
