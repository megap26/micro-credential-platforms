export const SEED_SKILLS = [
  // Technical & Languages
  { name: 'React', normalizedName: 'react', category: 'Technical', taxonomyCode: 'ESCO-2512.1.4', marketDemandScore: 96, trend: 'high-demand', demandFrequencyPercent: 88, growthRatePercent: 14.2, description: 'Modern declarative frontend UI library with hooks, concurrent mode, and virtual DOM.' },
  { name: 'TypeScript', normalizedName: 'typescript', category: 'Technical', taxonomyCode: 'ESCO-2512.2.1', marketDemandScore: 95, trend: 'high-demand', demandFrequencyPercent: 84, growthRatePercent: 22.8, description: 'Strict syntactical superset of JavaScript adding static typing and scalable tooling.' },
  { name: 'Node.js', normalizedName: 'node.js', category: 'Technical', taxonomyCode: 'ESCO-2512.3.2', marketDemandScore: 92, trend: 'high-demand', demandFrequencyPercent: 79, growthRatePercent: 11.5, description: 'Asynchronous event-driven JavaScript runtime built on Chrome V8 engine.' },
  { name: 'Python', normalizedName: 'python', category: 'Technical', taxonomyCode: 'O*NET-15-1251.00', marketDemandScore: 98, trend: 'high-demand', demandFrequencyPercent: 91, growthRatePercent: 19.4, description: 'High-level multipurpose programming language dominating data science, AI, and backend services.' },
  { name: 'PostgreSQL', normalizedName: 'postgresql', category: 'Technical', taxonomyCode: 'ESCO-2521.1.2', marketDemandScore: 90, trend: 'high-demand', demandFrequencyPercent: 74, growthRatePercent: 16.0, description: 'Advanced open-source relational database supporting ACID transactions and JSONB indexing.' },
  { name: 'MongoDB', normalizedName: 'mongodb', category: 'Technical', taxonomyCode: 'ESCO-2521.1.5', marketDemandScore: 84, trend: 'stable', demandFrequencyPercent: 65, growthRatePercent: 8.5, description: 'Document-oriented NoSQL database providing high availability and dynamic schemas.' },
  { name: 'GraphQL', normalizedName: 'graphql', category: 'Technical', taxonomyCode: 'ESCO-2512.4.2', marketDemandScore: 78, trend: 'stable', demandFrequencyPercent: 52, growthRatePercent: 6.2, description: 'Query language for APIs providing declarative data fetching and schema definitions.' },
  { name: 'RESTful APIs', normalizedName: 'restful apis', category: 'Technical', taxonomyCode: 'ESCO-2512.4.1', marketDemandScore: 94, trend: 'stable', demandFrequencyPercent: 92, growthRatePercent: 4.1, description: 'Stateless architectural style utilizing HTTP protocols for distributed client-server systems.' },
  { name: 'Tailwind CSS', normalizedName: 'tailwind css', category: 'Technical', taxonomyCode: 'ESCO-2512.1.8', marketDemandScore: 86, trend: 'high-demand', demandFrequencyPercent: 68, growthRatePercent: 24.5, description: 'Utility-first CSS framework for rapid responsive user interface design.' },
  { name: 'FastAPI', normalizedName: 'fastapi', category: 'Technical', taxonomyCode: 'O*NET-15-1251.02', marketDemandScore: 87, trend: 'emerging', demandFrequencyPercent: 58, growthRatePercent: 31.0, description: 'Modern, high-performance web framework for building APIs with Python and type hints.' },
  { name: 'System Design', normalizedName: 'system design', category: 'Technical', taxonomyCode: 'ESCO-2511.1.0', marketDemandScore: 95, trend: 'high-demand', demandFrequencyPercent: 82, growthRatePercent: 15.0, description: 'Architecting distributed, scalable, fault-tolerant, and high-throughput software systems.' },

  // Cloud & DevOps
  { name: 'Docker', normalizedName: 'docker', category: 'Cloud & DevOps', taxonomyCode: 'ESCO-2519.2.1', marketDemandScore: 93, trend: 'high-demand', demandFrequencyPercent: 85, growthRatePercent: 18.0, description: 'Industry-standard OS-level virtualization platform for packaging apps into containers.' },
  { name: 'Kubernetes', normalizedName: 'kubernetes', category: 'Cloud & DevOps', taxonomyCode: 'ESCO-2519.2.3', marketDemandScore: 91, trend: 'high-demand', demandFrequencyPercent: 71, growthRatePercent: 21.4, description: 'Automated container orchestration system for deploying, scaling, and managing containerized applications.' },
  { name: 'AWS', normalizedName: 'aws', category: 'Cloud & DevOps', taxonomyCode: 'O*NET-15-1244.00', marketDemandScore: 95, trend: 'high-demand', demandFrequencyPercent: 89, growthRatePercent: 17.5, description: 'Comprehensive cloud computing platform offering compute, storage, databases, and serverless APIs.' },
  { name: 'CI/CD Pipelines', normalizedName: 'ci/cd pipelines', category: 'Cloud & DevOps', taxonomyCode: 'ESCO-2519.2.5', marketDemandScore: 89, trend: 'high-demand', demandFrequencyPercent: 78, growthRatePercent: 13.8, description: 'Automated software delivery practice enabling rapid code integration, testing, and continuous deployment.' },
  { name: 'Terraform', normalizedName: 'terraform', category: 'Cloud & DevOps', taxonomyCode: 'ESCO-2519.2.7', marketDemandScore: 88, trend: 'high-demand', demandFrequencyPercent: 64, growthRatePercent: 19.0, description: 'Declarative Infrastructure as Code (IaC) tool for provisioning multi-cloud resources.' },

  // AI & Machine Learning
  { name: 'Machine Learning', normalizedName: 'machine learning', category: 'AI & Machine Learning', taxonomyCode: 'ESCO-2519.4.1', marketDemandScore: 97, trend: 'high-demand', demandFrequencyPercent: 87, growthRatePercent: 28.5, description: 'Algorithms and statistical models that computer systems use to perform specific tasks without explicit instructions.' },
  { name: 'LLM Integration', normalizedName: 'llm integration', category: 'AI & Machine Learning', taxonomyCode: 'O*NET-15-1221.00', marketDemandScore: 99, trend: 'emerging', demandFrequencyPercent: 76, growthRatePercent: 68.0, description: 'Building software leveraging Large Language Models, prompt chains, function calling, and agentic workflows.' },
  { name: 'Vector Databases', normalizedName: 'vector databases', category: 'AI & Machine Learning', taxonomyCode: 'O*NET-15-1221.01', marketDemandScore: 91, trend: 'emerging', demandFrequencyPercent: 62, growthRatePercent: 54.0, description: 'Databases optimized for storing and querying high-dimensional embedding vectors for semantic similarity.' },
  { name: 'Prompt Engineering', normalizedName: 'prompt engineering', category: 'AI & Machine Learning', taxonomyCode: 'O*NET-15-1221.02', marketDemandScore: 84, trend: 'emerging', demandFrequencyPercent: 59, growthRatePercent: 42.0, description: 'Techniques for designing effective inputs and constraints to guide generative AI outputs.' },

  // Soft Skills
  { name: 'Agile / Scrum', normalizedName: 'agile / scrum', category: 'Soft skills', taxonomyCode: 'ESCO-2421.2.2', marketDemandScore: 82, trend: 'stable', demandFrequencyPercent: 72, growthRatePercent: 2.1, description: 'Iterative project management methodology facilitating rapid delivery and continuous adaptation.' },
  { name: 'Technical Communication', normalizedName: 'technical communication', category: 'Soft skills', taxonomyCode: 'ESCO-0002.3.1', marketDemandScore: 90, trend: 'high-demand', demandFrequencyPercent: 88, growthRatePercent: 8.4, description: 'Conveying complex technical architecture clearly to cross-functional stakeholders and teams.' },
  { name: 'Problem Solving', normalizedName: 'problem solving', category: 'Soft skills', taxonomyCode: 'ESCO-0001.1.1', marketDemandScore: 96, trend: 'high-demand', demandFrequencyPercent: 95, growthRatePercent: 5.0, description: 'Root-cause analytical diagnosis and systematic resolution of complex software defects.' },

  // Declining / Legacy for comparative analytics
  { name: 'jQuery', normalizedName: 'jquery', category: 'Technical', taxonomyCode: 'ESCO-2512.9.1', marketDemandScore: 32, trend: 'declining', demandFrequencyPercent: 14, growthRatePercent: -18.5, description: 'Legacy JavaScript DOM manipulation library increasingly superseded by modern reactive frameworks.' },
  { name: 'Perl', normalizedName: 'perl', category: 'Technical', taxonomyCode: 'ESCO-2512.9.2', marketDemandScore: 28, trend: 'declining', demandFrequencyPercent: 9, growthRatePercent: -22.0, description: 'General-purpose scripting language largely replaced by Python in modern cloud architectures.' },
];

export const SEED_JOB_POSTINGS = [
  {
    title: 'Senior Full Stack Software Engineer',
    company: 'Stripe Innovation Labs',
    location: 'Remote, US',
    workplaceType: 'remote',
    industry: 'FinTech',
    salaryRange: '$145,000 - $185,000 USD',
    experienceLevel: 'Senior',
    rawDescription: `We are seeking a Senior Full Stack Software Engineer to build high-scale payment processing interfaces.
Requirements:
- 5+ years of software engineering experience.
- Expert proficiency in React, TypeScript, and modern state architecture.
- Strong backend experience with Node.js and Express.js RESTful APIs.
- Experience with PostgreSQL and MongoDB schema modeling and query optimization.
- Familiarity with Docker containerization, AWS cloud deployments, and CI/CD pipelines.
- Bachelor's Degree in Computer Science or equivalent practical experience.
- Strong problem solving and technical communication in an Agile / Scrum environment.`,
    extractedSkills: ['React', 'TypeScript', 'Node.js', 'RESTful APIs', 'PostgreSQL', 'MongoDB', 'Docker', 'AWS', 'CI/CD Pipelines', 'Agile / Scrum', 'Problem Solving', 'Technical Communication'],
    source: 'Demonstration Global Job Market Index',
    postedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
  },
  {
    title: 'AI Solutions Engineer (LLM & RAG)',
    company: 'Anthropic Ecosystems',
    location: 'San Francisco, CA / Remote',
    workplaceType: 'hybrid',
    industry: 'AI Services',
    salaryRange: '$160,000 - $210,000 USD',
    experienceLevel: 'Senior',
    rawDescription: `Join our team to develop enterprise generative AI applications.
Responsibilities & Skills:
- 3+ years of experience in Python and machine learning systems.
- Demonstrated experience with LLM integration, prompt engineering, and RAG architectures.
- Hands-on experience with vector databases (Pinecone, ChromaDB) and semantic search.
- Knowledge of FastAPI microservices and Docker container deployment.
- Bachelor's or Master's Degree in CS, AI, or Mathematics.`,
    extractedSkills: ['Python', 'Machine Learning', 'LLM Integration', 'Prompt Engineering', 'Vector Databases', 'FastAPI', 'Docker'],
    source: 'Demonstration Global Job Market Index',
    postedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
  },
  {
    title: 'Cloud DevOps & Site Reliability Engineer',
    company: 'Datadog Platforms',
    location: 'Remote Global',
    workplaceType: 'remote',
    industry: 'Enterprise SaaS',
    salaryRange: '$135,000 - $175,000 USD',
    experienceLevel: 'Mid-Level',
    rawDescription: `Looking for a Cloud DevOps Engineer to maintain 99.99% uptime for global SaaS infrastructure.
Qualifications:
- 3+ years in DevOps and cloud infrastructure.
- In-depth mastery of Docker and Kubernetes cluster management.
- Infrastructure as code using Terraform on AWS or Google Cloud.
- Building resilient CI/CD pipelines with GitHub Actions.
- Scripting in Python or Go, with strong system design skills.`,
    extractedSkills: ['Docker', 'Kubernetes', 'AWS', 'Terraform', 'CI/CD Pipelines', 'Python', 'System Design'],
    source: 'Demonstration Global Job Market Index',
    postedDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
  },
  {
    title: 'Full Stack Web Developer',
    company: 'Shopify Partners',
    location: 'Toronto, Canada / Remote',
    workplaceType: 'remote',
    industry: 'E-commerce',
    salaryRange: '$105,000 - $135,000 USD',
    experienceLevel: 'Mid-Level',
    rawDescription: `We need a creative Full Stack Developer to engineer custom e-commerce experiences.
Key requirements:
- Proficiency in React, Tailwind CSS, TypeScript, and Node.js.
- Experience integrating third-party RESTful APIs and payment gateways.
- Database experience with MongoDB and Redis caching.
- Git / GitHub version control and unit & integration testing.`,
    extractedSkills: ['React', 'Tailwind CSS', 'TypeScript', 'Node.js', 'RESTful APIs', 'MongoDB', 'Git / GitHub', 'Unit & Integration Testing'],
    source: 'Demonstration Global Job Market Index',
    postedDate: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
  }
];
