export interface Project {
  id: string
  title: string
  description: string
  image: string
  stack: string[]
  category: 'fullstack' | 'mobile' | 'web' | 'api'| 'ai'|string
  github?: string | null
  demo?: string | null
  tags: string[]
  featured?: boolean
  stats?: {
    stars?: number
    forks?: number
    lastUpdated?: string
  }
  architecture?: {
    diagram?: string // Optional diagram image path
    systemDesign: string // Description of the architectural approach
    storageStrategy: string // Rationale for DB choice and modeling
    authStrategy: string // JWT, OAuth, RBAC etc
    scalability: string // How it scales (Redis, Queues etc)
  }
}
