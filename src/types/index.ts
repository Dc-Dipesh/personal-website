export interface Project {
  id: number
  title: string
  description: string
  tags: string[]
  image: string
  link: string
  github?: string
}

export interface ExperienceItem {
  id: number
  role: string
  company: string
  companyUrl?: string
  period: string
  location: string
  type: string
  achievements: string[]
  metric?: string
}

export interface TechItem {
  name: string
  category: 'frontend' | 'web3' | 'tools' | 'testing'
  icon: string
  color: string
}

export interface NavLink {
  label: string
  href: string
}
