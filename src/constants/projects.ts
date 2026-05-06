import type { Project } from '@/types/project'

export const privateProjects: Project[] = [
  {
    id: 'pp-001',
    title: 'Support24',
    description:
      'A production-grade healthcare support platform featuring complex shift scheduling, incident reporting, and a multi-tenant RBAC system.',
    image: '/images/gcp-1.png',
    stack: ['React Native', 'Node.js', 'Express', 'MongoDB', 'TypeScript'],
    category: 'fullstack',
    github: null,
    demo: 'https://linktoapp.com',
    tags: ['Healthcare', 'Role-Based Access', 'Incident Management', 'Admin Panel','Shift Scheduling', 'Chat'],
    featured: true,
    architecture: {
      systemDesign: 'Monolithic Express backend with a clear separation of concerns using the Service Layer pattern. Designed for high reliability in healthcare environments.',
      storageStrategy: 'MongoDB with Mongoose. Document-based modeling for shift-staff-client associations and audit-trailed incident reports.',
      authStrategy: 'JWT-based authentication with strict RBAC (Admin, Operator, Specialist, User) and secure session management.',
      scalability: 'Service-oriented internal architecture ready for microservices migration. Optimized for high-frequency shift updates and real-time notifications.'
    },
    caseStudy: {
      problem: 'Healthcare facilities often struggle with fragmented shift management and unreliable incident reporting, leading to communication gaps and compliance risks. The business goal was to centralize these operations into a single, reliable platform.',
      role: 'Lead Fullstack Developer. Responsible for architecting the Node.js/Express backend and developing the React Native mobile application for staff.',
      keyEngineeringDecisions: [
        {
          title: 'Modular Express Architecture',
          description: 'Implemented a strict service layer pattern to isolate business logic, ensuring that complex shift validation rules remain maintainable and testable.'
        },
        {
          title: 'Audit-Trailed Document Modeling',
          description: 'Designed a MongoDB schema that tracks every change to incident reports and shift assignments, meeting strict healthcare compliance standards.'
        }
      ],
      outcomes: 'Successfully deployed a stable platform that supports real-time scheduling updates and multi-tenant access control for different facility roles.',
      learned: 'Deepened understanding of RBAC and the importance of data integrity in high-stakes environments like healthcare.'
    }
  },
  {
    id: 'pp-002',
    title: 'Cashworx',
    description:
      'A government-scale tax and service payment platform architected to centralize fragmented fiscal channels into a secure, transparent ecosystem.',
    image: '/images/cashworx.png',
    stack: ['Laravel', 'Next.js', 'Flutter', 'PostgreSQL', 'Redis', 'JWT', 'Docker'],
    category: 'fullstack',
    github: null,
    demo: null,
    tags: ['Fintech', 'Government Tech', 'Tax Processing', 'Scalable Architecture'],
    featured: true,
    architecture: {
      systemDesign: 'Strategy-based API architecture utilizing a decoupled PaymentGatewayManager. Built with Laravel 11 for strict API contracts and enterprise-grade reliability.',
      storageStrategy: 'Relational modeling (PostgreSQL) optimized for multi-state tax logic and high-integrity financial auditing.',
      authStrategy: 'Stateless JWT authentication paired with a deep RBAC system (Admin, Operator, Tax Accountant) and OAuth integration.',
      scalability: 'Asynchronous queue-based processing for heavy tax calculations and OneSignal/FCM integration for high-priority notification broadcasting.'
    },
    caseStudy: {
      problem: 'Tax collection and service payments for the Nigerian government were historically fragmented, leading to revenue leakage and a poor user experience for citizens. The business goal was to centralize these disparate payment channels into a single, secure, and transparent platform.',
      role: 'Single-handedly architected and implemented the entire ecosystem: Laravel 11 API, Next.js Admin Dashboard, and Flutter Mobile Application.',
      keyEngineeringDecisions: [
        {
          title: 'Strategy-Based Payment Abstraction',
          description: 'Implemented a PaymentGatewayInterface and PaymentGatewayManager in the Laravel core. This decoupled business logic from specific providers, allowing for zero-downtime switching between processors.'
        },
        {
          title: 'Feature-First Clean Architecture (Flutter)',
          description: 'Adopted a domain-driven approach using BLoC. By isolating business rules in a pure domain layer, I ensured the app could handle complex state transitions without UI regressions.'
        }
      ],
      outcomes: 'Successfully built and staged the full technical suite. The project reached a "ready-for-deployment" status with complete CI/CD pipelines and containerized environments.',
      learned: 'Solidified the necessity of rigorous abstraction. Building a government-scale system solo taught me that clean architecture isn\'t just a best practice—it\'s a survival requirement for maintaining complex relational models over time.'
    }
  },
  {
    id: 'pp-003',
    title: 'Jollivry',
    description:
      'A high-performance food delivery ecosystem featuring location-aware service discovery, real-time order tracking, and multi-gateway payment integration.',
    image: '/images/foodly.png',
    stack: ['React Native', 'Expo', 'Zustand', 'TypeScript', 'TanStack Query', 'NativeWind', 'Firebase'],
    category: 'mobile',
    github: null,
    demo: null,
    tags: ['Food Delivery', 'Real-time Systems', 'Mobile App', 'UI/UX Design'],
    featured: true,
    architecture: {
      systemDesign: 'Reactive mobile architecture powered by React Native and Expo. Leverages Orval for type-safe API synchronization and Zustand for decoupled state logic.',
      storageStrategy: 'Dual-layer persistence strategy: Redis-cached menu queries for speed and localized AsyncStorage/Zustand persistence for offline-first performance.',
      authStrategy: 'Biometric-secured authentication (Facial/Fingerprint) with JWT token rotation and secure session hydration.',
      scalability: 'EAS-managed CI/CD with OTA (Over-The-Air) update capabilities and geospatial indexing for dynamic vendor discovery.'
    },
    caseStudy: {
      problem: 'Localized food delivery lacked accuracy in fee calculation and robust tools for restaurant partners. Jollivry bridges this gap with a location-aware ecosystem tailored for high operational efficiency.',
      role: 'Lead Mobile Engineer and UI/UX Designer. Designed the interface from scratch and architected the notification and geospatial fee engines.',
      keyEngineeringDecisions: [
        {
          title: 'Reactive Notification Pipeline',
          description: 'Synchronized Firebase/FCM pushes with a localized Zustand store, ensuring restaurant partners receive real-time alerts even when the app is in the background.'
        },
        {
          title: 'Geospatial Fee Calculation',
          description: 'Developed a custom engine leveraging expo-location and Google Places API to dynamically calculate delivery fees based on real-time distance from the restaurant.'
        }
      ],
      outcomes: 'Delivered a production-ready ecosystem for consumers and partners, featuring biometric security and real-time order tracking.',
      learned: 'Learned that developer-led design accelerates TTM. By building a reusable component library from day one, I was able to iterate on dual apps in parallel without duplicating logic.'
    }
  },
  {
    id: 'pp-004',
    title: 'SnapShop AI',
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
    },
    caseStudy: {
      problem: 'Users often see products in the real world but struggle to find the exact or similar items on local e-commerce platforms using text search.',
      role: 'AI/Fullstack Engineer. Developed the computer vision pipeline and the web scraping infrastructure to build the product catalog.',
      keyEngineeringDecisions: [
        {
          title: 'Vector-Based Visual Search',
          description: 'Leveraged TensorFlow to generate product embeddings, stored in a vector-capable database to enable sub-second visual similarity matching.'
        },
        {
          title: 'Distributed Scraping Architecture',
          description: 'Built a resilient scraping system using Python to aggregate product data from multiple local vendors, handling rate limits and dynamic content.'
        }
      ],
      outcomes: 'Created a functional proof-of-concept that demonstrates the power of AI in bridging the gap between physical and digital retail.',
      learned: 'Gained significant experience in scaling AI inference and managing large-scale data ingestion pipelines.'
    }
  },
  
]
