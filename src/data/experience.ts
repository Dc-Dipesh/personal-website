import type { ExperienceItem } from '@/types'

export const experiences: ExperienceItem[] = [
  {
    id: 1,
    role: 'Frontend Developer',
    company: 'Vola Solution Pvt. Ltd.',
    period: 'Feb 2025 – Present',
    location: 'United Arab Emirates',
    type: 'Remote',
    achievements: [
      'Built and shipped client-facing web projects using React, Next.js and TypeScript, translating Figma mockups into responsive, production-ready components.',
      'Developed Web3-integrated frontend features including Vola Wallet connectivity and dApps, leveraging Polkadot and Cardano ecosystems for smart contract interactions.',
      'Implemented End-to-End Encryption (E2EE) for a secure cloud drive application, ensuring encrypted file storage, upload and access with full user privacy.',
      'Collaborated with cross-functional teams to integrate REST APIs, ensuring high-quality, accessible and performant user interfaces.',
      'Implemented best practices for performance optimisation and accessibility compliance.',
    ],
  },
  {
    id: 2,
    role: 'Frontend Developer',
    company: 'Bidhee Pvt. Ltd.',
    period: 'Aug 2023 – Aug 2024',
    location: 'Kathmandu, Nepal',
    type: 'On-site',
    metric: 'Reduced load times by 30%',
    achievements: [
      'Led frontend development for furniturehub.com.np, a large-scale e-commerce platform serving thousands of customers.',
      'Implemented SEO-friendly pages using Next.js, improving organic search rankings significantly.',
      'Utilised React Query for efficient server-state management, reducing load times by 30%.',
      'Applied Tailwind CSS to build a consistent, responsive design system across the platform.',
      'Worked closely with backend developers to ensure seamless API integration and data flow.',
    ],
  },
  {
    id: 3,
    role: 'Frontend Developer',
    company: 'Saptacode Technology Pvt. Ltd.',
    period: 'Mar 2022 – Aug 2023',
    location: 'Kathmandu, Nepal',
    type: 'Full-time',
    achievements: [
      'Developed interactive React.js web applications for enterprise clients across multiple industries.',
      'Leveraged React Query for state management and data fetching across multiple projects.',
      'Collaborated with designers to convert wireframes into clean, maintainable code.',
      'Participated in code reviews and contributed to improving team coding standards.',
      'Assisted in scoping and estimating frontend tasks for project planning and delivery.',
    ],
  },
]
