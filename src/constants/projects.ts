import type { Project } from '@/types/project'

export const privateProjects: Project[] = [
  {
    id: 'pp-001',
    title: 'GuardianCare Pro',
    description:
      'A production-grade healthcare support platform featuring complex shift scheduling, incident reporting, and a multi-tenant RBAC system.',
    image: '/images/gcp-1.png',
    stack: ['React Native', 'NestJS', 'PostgreSQL', 'Prisma', 'TypeScript'],
    category: 'fullstack',
    github: null,
    demo: 'https://linktoapp.com',
    tags: ['Healthcare', 'Role-Based Access', 'Incident Management', 'Admin Panel','Shift Scheduling', 'Chat'],
    featured: true,
    architecture: {
      systemDesign: 'Monolithic NestJS backend with a clear separation of concerns using the Service Layer pattern. Designed for high reliability in healthcare environments.',
      storageStrategy: 'PostgreSQL with Prisma ORM. Complex relational modeling for shift-staff-client associations and audit-trailed incident reports.',
      authStrategy: 'JWT-based authentication with strict RBAC (Admin, Operator, Specialist, User) and secure session management.',
      scalability: 'Service-oriented internal architecture ready for microservices migration. Optimized for high-frequency shift updates and real-time notifications.'
    }
  },
  {
    id: 'pp-002',
    title: 'Cashworx',
    description:
      'A multi-role fintech platform for automated tax processing, featuring state-level modeling and high-priority notification systems.',
    image: '/images/cashworx.png',
    stack: ['Laravel', 'MariaDB', 'OneSignal', 'Next.js', 'Tailwind', 'Flutter','BloC'],
    category: 'fullstack',
    github: null,
    demo: null,
    tags: ['Fintech', 'Tax Processing', 'Role-Based Access', 'Notifications'],
    featured: true,
    architecture: {
      systemDesign: 'Laravel-based API-first architecture following the "Django Philosophy" for rapid, structured development and predictable API contracts.',
      storageStrategy: 'MariaDB for financial record integrity, utilizing advanced SQL modeling for multi-state tax logic and user-specific accounting.',
      authStrategy: 'Multi-guard authentication with deep RBAC for operators and specialized tax accountants.',
      scalability: 'Queue-based background jobs for heavy tax calculations and OneSignal integration for real-time notification broadcasting.'
    }
  },
  {
    id: 'pp-003',
    title: 'Jollivry',
    description:
      'A scalable food delivery ecosystem with vendor-specific onboarding and optimized location-based service integration.',
    image: '/images/foodly.png',
    stack: ['React Native', 'NestJS', 'MongoDB', 'Google Maps API', 'TypeScript'],
    category: 'mobile',
    github: null,
    demo: null,
    tags: ['Food Ordering', 'Delivery', 'Vendor Onboarding', 'Location-Based Services'],
    featured: true,
    architecture: {
      systemDesign: 'Event-driven architecture for real-time order tracking and vendor status updates. API-first design supporting both vendor and customer mobile apps.',
      storageStrategy: 'MongoDB for flexible product/menu schemas and Geospatial indexing for efficient vendor discovery.',
      authStrategy: 'Secure vendor onboarding flow with multi-step identity verification and OAuth2 social login options.',
      scalability: 'Horizontal scaling via Docker/AWS. Redis-based caching for frequent menu and vendor-status queries.'
    }
  },
  {
    id: 'pp-004',
    title: 'Snap2Shop AI',
    description:
      'An experimental AI shopping assistant utilizing computer vision to match real-world products with local e-commerce listings.',
    image: '/images/snap2shop.png',
    stack: ['Next.js', 'Python', 'TensorFlow', 'TypeScript', 'PostgreSQL'],
    category: 'ai',
    github: null,
    demo: null,
    tags: ['AI', 'E-commerce', 'Product Recommendation', 'Web Scraping'],
    featured: false,
    architecture: {
      systemDesign: 'Microservice-oriented with a Python-based AI core and a Next.js frontend, communicating via RESTful APIs.',
      storageStrategy: 'PostgreSQL for cataloging scraped metadata and TensorFlow-processed vector embeddings for visual search.',
      authStrategy: 'Standard JWT authentication for user profile persistence and personalized recommendations.',
      scalability: 'Distributed scraping nodes and GPU-accelerated inference workers for real-time image processing.'
    }
  },
  
]
