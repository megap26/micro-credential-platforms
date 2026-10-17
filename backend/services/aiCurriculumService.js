import { analyzeSkillGap } from './skillGapService.js';

/**
 * High-quality domain knowledge base for curriculum modules across target roles
 */
const DOMAIN_CURRICULA = {
  'Full Stack Developer': {
    title: 'Modern Full-Stack Cloud-Native Engineering & Micro-Credentials',
    shortDescription: 'Master production-grade React, Node.js RESTful APIs, containerized deployments, and resilient database architectures.',
    badgeLevel: 'Specialist',
    alignmentScore: 94,
    prerequisites: ['Basic JavaScript ES6 syntax', 'Fundamental web browser concepts', 'Terminal usage'],
    targetCompetencies: [
      'Component Architecture & Reactive State Management',
      'Secure RESTful API Design & JWT Session Handling',
      'Containerization & Cloud Infrastructure (Docker & AWS)',
      'Schema Modeling & Query Optimization with MongoDB & PostgreSQL',
      'Automated Testing & Continuous Delivery Pipelines'
    ],
    learningOutcomes: [
      'Architect scalable frontend applications using React 18 and TypeScript',
      'Build performant, authenticated backend services using Express and Mongoose',
      'Deploy containerized full-stack applications with Docker and CI/CD pipelines',
      'Design comprehensive automated unit and integration tests'
    ],
    modules: [
      {
        id: 'mod-1',
        title: 'Advanced React 18 & State Architecture',
        description: 'Deep dive into modern React paradigms, custom hooks, memoization, and complex state management.',
        estimatedHours: 6,
        topics: [
          'React Fiber & Concurrent Rendering Modes',
          'Custom Hooks & Reusable Logic Patterns',
          'Global State: Context API vs Zustand vs Redux Toolkit',
          'Performance Profiling and Rendering Optimization'
        ],
        practicalExercises: [
          'Implement a custom useDebounce and useLocalStorage hook',
          'Refactor a prop-drilled dashboard into an atomic Zustand state store',
          'Identify and eliminate unnecessary re-renders using React DevTools Profiler'
        ],
        miniProject: {
          title: 'Real-Time Interactive Analytical Dashboard',
          instructions: 'Build a multi-widget dashboard displaying dynamic streaming charts with debounced search filters and theme toggling.',
          submissionCriteria: 'Deliverable must include clean modular React components, typed props, zero lint warnings, and responsive layout.'
        },
        status: 'not-started'
      },
      {
        id: 'mod-2',
        title: 'Secure Node.js & Express RESTful API Engineering',
        description: 'Design robust microservices with schema validation, rate-limiting, and cryptographic authentication.',
        estimatedHours: 6,
        topics: [
          'Express Middleware Pipelines & Error Propagation',
          'JWT Token Lifecycle, Refresh Tokens & Cookie Security',
          'Input Sanitization and Defense against NoSQL Injection & XSS',
          'API Versioning and OpenAPI (Swagger) Documentation'
        ],
        practicalExercises: [
          'Build an Express authentication route with bcrypt hashing and rate limiting',
          'Implement centralized error handling middleware capturing operational vs programmer errors',
          'Write integration tests for API endpoints using Supertest'
        ],
        miniProject: {
          title: 'Resilient Microservice Auth Gateway',
          instructions: 'Construct a standalone authentication microservice with JWT issuance, blacklist revocation, and role-based access control.',
          submissionCriteria: 'Unit test coverage above 80%, sanitized request bodies, and secure HTTP-only cookies.'
        },
        status: 'not-started'
      },
      {
        id: 'mod-3',
        title: 'Modern Persistence: MongoDB & Relational Database Design',
        description: 'Master NoSQL document modeling, indexing strategies, ACID transactions, and hybrid relational queries.',
        estimatedHours: 5,
        topics: [
          'Document Modeling Patterns: Embedding vs Referencing',
          'Compound Indexes, Execution Plans & Query Optimization',
          'MongoDB Aggregation Pipelines for Analytical Reporting',
          'PostgreSQL Schema Design & Relational Joins for Hybrid Workloads'
        ],
        practicalExercises: [
          'Design an e-commerce schema supporting 10,000 queries per second',
          'Optimize a slow aggregation query using compound indexes and explain()',
          'Implement a multi-document ACID transaction in Mongoose'
        ],
        miniProject: {
          title: 'High-Throughput Analytics Aggregation Pipeline',
          instructions: 'Develop an aggregation pipeline calculating real-time sales trends, user retention metrics, and rolling revenue averages.',
          submissionCriteria: 'Execution time under 50ms on a 50,000 record dataset with explain plan verification.'
        },
        status: 'not-started'
      },
      {
        id: 'mod-4',
        title: 'Containerization, DevOps & Production Cloud Delivery',
        description: 'Package applications into lightweight OCI containers and deploy with automated CI/CD workflows.',
        estimatedHours: 7,
        topics: [
          'Multi-Stage Dockerfiles for Production Optimization',
          'Docker Compose for Local Multi-Service Development',
          'GitHub Actions CI/CD for Automated Linting, Testing & Image Pushing',
          'Cloud Deployment to AWS / Container Platforms with Environment Secrets'
        ],
        practicalExercises: [
          'Author a multi-stage Dockerfile that shrinks Node.js image size from 900MB to 120MB',
          'Configure a Docker Compose environment linking React, Express, and MongoDB',
          'Create a GitHub Actions workflow triggering on push with automated test gates'
        ],
        miniProject: {
          title: 'Production-Ready CI/CD Automated Deployment',
          instructions: 'Containerize a full-stack web application, orchestrate services with compose, and configure automated GitHub Actions pipeline.',
          submissionCriteria: 'Passes automated CI builds, uses non-root container users, and has documented setup instructions.'
        },
        status: 'not-started'
      }
    ]
  },
  'AI Engineer': {
    title: 'Generative AI & LLM Systems Engineering Micro-Credential',
    shortDescription: 'Build end-to-end AI applications leveraging Large Language Models, Retrieval-Augmented Generation (RAG), and vector stores.',
    badgeLevel: 'Specialist',
    alignmentScore: 96,
    prerequisites: ['Proficiency in Python', 'Basic understanding of linear algebra', 'REST APIs'],
    targetCompetencies: [
      'LLM Prompt Engineering & Chain-of-Thought Workflows',
      'Retrieval-Augmented Generation (RAG) Architecture',
      'Vector Embeddings & High-Dimensional Semantic Search',
      'Agentic Tool Use, Function Calling & Multi-Agent Coordination',
      'Model Evaluation, Hallucination Mitigation & Guardrails'
    ],
    learningOutcomes: [
      'Implement production-grade RAG pipelines over proprietary documents',
      'Integrate vector databases (ChromaDB / Pinecone) with semantic chunking',
      'Build autonomous AI agents capable of external API tool execution',
      'Evaluate model hallucination rates and implement strict guardrails'
    ],
    modules: [
      {
        id: 'mod-1',
        title: 'LLM Foundations & Advanced Prompt Engineering',
        description: 'Master system prompts, few-shot conditioning, structured output schema, and reasoning chains.',
        estimatedHours: 5,
        topics: ['Transformer Architecture Overview', 'Few-Shot & Chain-of-Thought Prompting', 'Structured JSON Output Guarantees', 'Context Window Economics'],
        practicalExercises: ['Craft robust prompts that return 100% compliant JSON', 'Benchmark few-shot vs zero-shot classification accuracy'],
        miniProject: {
          title: 'Structured Information Extraction Pipeline',
          instructions: 'Extract structured metadata from unstructured technical documents using prompt engineering and JSON mode.',
          submissionCriteria: 'Strict schema adherence and graceful handling of ambiguous inputs.'
        },
        status: 'not-started'
      },
      {
        id: 'mod-2',
        title: 'Semantic Search & Vector Database Architecture',
        description: 'Generate high-dimensional embeddings and index documents in vector stores.',
        estimatedHours: 6,
        topics: ['Embedding Models & Cosine Distance', 'Chunking Strategies: Recursive vs Semantic', 'Vector Indexing (HNSW & IVF)', 'Metadata Filtering'],
        practicalExercises: ['Build a text chunker with sliding overlap', 'Index 1,000 technical articles in ChromaDB and run semantic queries'],
        miniProject: {
          title: 'High-Performance Semantic Documentation Search',
          instructions: 'Build a fast vector search engine with hybrid keyword-semantic reranking.',
          submissionCriteria: 'Sub-50ms search latency and top-3 precision above 85%.'
        },
        status: 'not-started'
      },
      {
        id: 'mod-3',
        title: 'Production RAG & Autonomous Agent Tool Calling',
        description: 'Construct retrieval-augmented question answering pipelines and agentic tool dispatchers.',
        estimatedHours: 7,
        topics: ['RAG Pipeline Architecture', 'Context Injection & Hallucination Guardrails', 'Function Calling & Tool Execution', 'Agentic Loops & Self-Correction'],
        practicalExercises: ['Implement a query re-writer before document retrieval', 'Build an agent that executes SQL queries safely'],
        miniProject: {
          title: 'Enterprise Knowledge Copilot',
          instructions: 'Develop an end-to-end RAG assistant that answers questions from uploaded PDF manuals with citations.',
          submissionCriteria: 'Includes source attribution, citation line numbers, and fallback handling for missing knowledge.'
        },
        status: 'not-started'
      }
    ]
  },
  'Cloud DevOps Engineer': {
    title: 'Cloud DevOps & Site Reliability Engineering Micro-Credential',
    shortDescription: 'Master Infrastructure as Code, Kubernetes cluster orchestration, and automated GitOps continuous deployment.',
    badgeLevel: 'Specialist',
    alignmentScore: 92,
    prerequisites: ['Linux system administration', 'Networking basics (TCP/IP, DNS, TLS)', 'Git basics'],
    targetCompetencies: [
      'Docker Containerization & Multi-Stage Builds',
      'Kubernetes Deployment, Services & Ingress Controllers',
      'Infrastructure as Code (IaC) with Terraform',
      'Observability, Metrics & Distributed Tracing (Prometheus & Grafana)',
      'Automated CI/CD Pipeline Automation with GitHub Actions'
    ],
    learningOutcomes: [
      'Deploy and scale resilient Kubernetes workloads with health probes',
      'Provision reproducible cloud resources with modular Terraform',
      'Build end-to-end GitOps delivery pipelines'
    ],
    modules: [
      {
        id: 'mod-1',
        title: 'Production Kubernetes Cluster Management',
        description: 'Deploy, configure, and manage scalable microservices inside Kubernetes clusters.',
        estimatedHours: 7,
        topics: ['Pods, Deployments, and ReplicaSets', 'ClusterIP, NodePort, and Ingress routing', 'ConfigMaps and Secrets management', 'Liveness & Readiness probes'],
        practicalExercises: ['Write declarative manifests for a high-availability web service', 'Implement zero-downtime rolling updates'],
        miniProject: {
          title: 'Zero-Downtime Microservice Orchestration',
          instructions: 'Deploy a multi-service web app to a local Minikube/K8s cluster with ingress and auto-scaling.',
          submissionCriteria: 'Demonstrates automated pod recovery and zero-downtime rolling updates.'
        },
        status: 'not-started'
      },
      {
        id: 'mod-2',
        title: 'Infrastructure as Code (IaC) with Terraform',
        description: 'Automate cloud infrastructure provisioning using declarative HCL configuration.',
        estimatedHours: 6,
        topics: ['Terraform State Management & Backends', 'Modular Architecture & Input Variables', 'Cloud VPC & Security Group Provisioning', 'Drift Detection'],
        practicalExercises: ['Write reusable Terraform modules for AWS VPC and ECS', 'Configure remote S3 state storage with DynamoDB state locking'],
        miniProject: {
          title: 'Automated Multi-Tier Cloud Infrastructure',
          instructions: 'Provision a complete isolated VPC with public/private subnets and database clusters using Terraform.',
          submissionCriteria: 'Clean terraform validate, parameterized variables, and clean terraform destroy execution.'
        },
        status: 'not-started'
      }
    ]
  }
};

/**
 * Validates that curriculum object conforms strictly to required structure
 */
export const validateCurriculum = (curriculum) => {
  if (!curriculum.title || typeof curriculum.title !== 'string') return false;
  if (!curriculum.targetJobRole || typeof curriculum.targetJobRole !== 'string') return false;
  if (!Array.isArray(curriculum.modules) || curriculum.modules.length === 0) return false;
  for (const mod of curriculum.modules) {
    if (!mod.title || !mod.description || !Array.isArray(mod.topics)) return false;
  }
  return true;
};

/**
 * Generates personalized curriculum using LLM if API key exists,
 * or using intelligent domain fallback engine.
 */
export const generatePersonalizedCurriculum = async ({
  userId,
  targetRole,
  currentSkills = [],
  preferredDurationWeeks = 6,
}) => {
  // First calculate skill gaps to personalize curriculum
  const gapAnalysis = analyzeSkillGap(targetRole, currentSkills);

  const geminiKey = process.env.GEMINI_API_KEY;
  const openaiKey = process.env.OPENAI_API_KEY;

  let generatedCurriculum = null;
  let generatedBy = 'rule_engine_demonstration';

  // 1. Attempt Real LLM Generation if Google Gemini Key is available
  if (geminiKey && geminiKey.trim() !== '' && geminiKey !== 'your_gemini_api_key_here') {
    try {
      console.log('🤖 Invoking Google Gemini AI API for curriculum generation...');
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are an expert curriculum architect and AI educator. Generate a personalized micro-credential curriculum tailored to bridge a learner's skill gap.
Target Role: ${targetRole}
Identified Missing Skills: ${gapAnalysis.missingSkills.map(s => s.name).join(', ') || 'Advanced specialization'}
Skills needing Improvement: ${gapAnalysis.skillsToImprove.map(s => s.name).join(', ') || 'Deepening existing skills'}
Target Duration: ${preferredDurationWeeks} weeks

Respond with ONLY valid JSON with this exact schema:
{
  "title": "String",
  "shortDescription": "String",
  "badgeLevel": "Specialist",
  "alignmentScore": 95,
  "prerequisites": ["String"],
  "targetCompetencies": ["String"],
  "learningOutcomes": ["String"],
  "modules": [
    {
      "id": "mod-1",
      "title": "String",
      "description": "String",
      "estimatedHours": 6,
      "topics": ["Topic 1", "Topic 2"],
      "practicalExercises": ["Exercise 1"],
      "miniProject": {
        "title": "String",
        "instructions": "String",
        "submissionCriteria": "String"
      },
      "status": "not-started"
    }
  ]
}`
            }]
          }],
          generationConfig: {
            temperature: 0.2,
            responseMimeType: 'application/json'
          }
        })
      });

      if (response.ok) {
        const data = await response.json();
        const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (rawText) {
          const parsed = JSON.parse(rawText);
          if (validateCurriculum(parsed)) {
            generatedCurriculum = parsed;
            generatedBy = 'ai_gemini';
          }
        }
      }
    } catch (llmErr) {
      console.warn('⚠️ Gemini AI API call failed or timed out. Falling back to rule-based engine:', llmErr.message);
    }
  }

  // 2. Fallback to Rule-Based Domain Knowledge Generator if LLM not configured
  if (!generatedCurriculum) {
    const template = DOMAIN_CURRICULA[targetRole] || DOMAIN_CURRICULA['Full Stack Developer'];

    // Tailor the template based on missing skills
    const customModules = JSON.parse(JSON.stringify(template.modules));
    
    // If specific high priority gaps exist, customize first module focus
    if (gapAnalysis.highPriorityGaps.length > 0) {
      const topGap = gapAnalysis.highPriorityGaps[0].name;
      customModules[0].title = `Core Mastery: ${topGap.toUpperCase()} Foundations & Integration`;
      customModules[0].topics.unshift(`Mastering ${topGap} Core Architecture & Syntax`);
      customModules[0].practicalExercises.unshift(`Build a working test application demonstrating ${topGap} competency`);
    }

    generatedCurriculum = {
      title: `${targetRole}: ${template.title}`,
      shortDescription: template.shortDescription,
      badgeLevel: template.badgeLevel,
      alignmentScore: Math.min(99, Math.max(85, gapAnalysis.matchPercentage + 25)),
      prerequisites: template.prerequisites,
      targetCompetencies: template.targetCompetencies,
      learningOutcomes: template.learningOutcomes,
      modules: customModules,
    };
    generatedBy = 'rule_engine_demonstration';
  }

  const totalDuration = generatedCurriculum.modules.reduce((sum, m) => sum + (m.estimatedHours || 5), 0);

  return {
    userId,
    title: generatedCurriculum.title,
    shortDescription: generatedCurriculum.shortDescription,
    targetJobRole: targetRole,
    badgeLevel: generatedCurriculum.badgeLevel || 'Specialist',
    alignmentScore: generatedCurriculum.alignmentScore || 92,
    prerequisites: generatedCurriculum.prerequisites,
    targetCompetencies: generatedCurriculum.targetCompetencies,
    learningOutcomes: generatedCurriculum.learningOutcomes,
    modules: generatedCurriculum.modules,
    totalEstimatedDurationHours: totalDuration,
    passingScorePercent: 75,
    version: 'v1.0',
    generatedBy,
    isSaved: false,
    gapAnalysisSummary: {
      matchPercentage: gapAnalysis.matchPercentage,
      missingCount: gapAnalysis.missingSkills.length,
      improveCount: gapAnalysis.skillsToImprove.length,
    }
  };
};
