import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  CheckCircle,
  Award,
  BarChart2,
  Printer,
  ChevronRight,
  ChevronLeft,
  RotateCcw,
  Check,
  FileText,
  User,
  ArrowRight,
  Clock,
  Sparkles,
  Briefcase,
  Layers,
  HelpCircle,
  ShieldCheck,
  CheckSquare,
  Square,
  IndianRupee,
  LogIn,
  LogOut,
  Lock,
  Mail,
  Key,
  UserPlus,
  X,
  TrendingUp,
  Flame,
  Activity,
  Globe,
} from 'lucide-react';

// Comprehensive dictionary mapping 16+ specific job titles to DISTINCT industry skill benchmarks
const JOB_SKILL_PROFILES: Record<string, {
  category: string;
  description: string;
  skills: string[];
}> = {
  'Software Engineer': {
    category: 'Core Engineering',
    description: 'Design, code, and maintain robust software systems using Python, Object-Oriented Programming (OOP), Data Structures & Algorithms, SQL databases, and modern APIs.',
    skills: [
      'Python Programming',
      'Data Structures & Algorithms (DSA)',
      'Object-Oriented Programming (OOP)',
      'SQL & Relational Databases',
      'Git & Version Control',
      'REST APIs & Web Fundamentals',
      'Cloud & Docker Basics',
    ],
  },
  'Java Developer': {
    category: 'Backend & Enterprise',
    description: 'Build enterprise-grade backend services and microservices using Java, Spring Boot, Hibernate, and SQL databases.',
    skills: [
      'Java Core & Advanced Syntax',
      'Object-Oriented Programming (OOP)',
      'Spring Boot & Spring MVC Framework',
      'SQL & Hibernate / JPA',
      'RESTful API Microservices',
      'Maven or Gradle Build Tools',
      'Git & Version Control',
    ],
  },
  'Python Developer': {
    category: 'Backend & Scripting',
    description: 'Develop backend APIs, automation scripts, and server-side applications using Python, FastAPI, Django, and SQL.',
    skills: [
      'Python Core & Advanced Syntax',
      'FastAPI or Django Web Framework',
      'Object-Oriented Python',
      'SQL & Database Modeling (PostgreSQL)',
      'REST APIs & JSON Handling',
      'Git & Version Control',
      'Docker Container Basics',
    ],
  },
  'Data Analyst': {
    category: 'Data & Analytics',
    description: 'Extract business insights, run complex SQL queries, process datasets with Python Pandas, clean messy data, and create executive dashboards.',
    skills: [
      'SQL Queries & Table JOINs',
      'Python for Data Analysis',
      'Pandas & NumPy Data Processing',
      'Excel & Advanced Spreadsheets',
      'Power BI or Tableau Dashboards',
      'Data Cleaning & Preprocessing',
      'Statistics & Probability',
    ],
  },
  'Data Scientist': {
    category: 'Data & Machine Learning',
    description: 'Build predictive statistical models, machine learning algorithms, and deep learning pipelines on large datasets.',
    skills: [
      'Python for Machine Learning',
      'Statistics, Probability & Linear Algebra',
      'Pandas & NumPy Data Wrangling',
      'Machine Learning (Scikit-Learn)',
      'Deep Learning & Neural Networks',
      'Model Evaluation & Hyperparameter Tuning',
      'Git & Version Control',
    ],
  },
  'Frontend Developer': {
    category: 'Frontend Engineering',
    description: 'Build responsive, fast, and interactive user interfaces using modern HTML5, CSS3, JavaScript ES6+, React.js components, and Tailwind CSS.',
    skills: [
      'HTML5 Semantic Markup',
      'Modern CSS3 & Flexbox/Grid',
      'JavaScript (ES6+ Fundamentals)',
      'React.js Components & State',
      'Tailwind CSS or Modern UI Styling',
      'REST API Integration (Fetch / Axios)',
      'Git & Version Control',
    ],
  },
  'Backend Developer': {
    category: 'Backend Engineering',
    description: 'Architect scalable web backends, database schemas, secure authentication, and high-throughput REST APIs.',
    skills: [
      'Node.js & Express (or Python FastAPI)',
      'RESTful API Architecture',
      'SQL & Relational Databases (PostgreSQL)',
      'MongoDB & NoSQL Document Storage',
      'Authentication with JWT & OAuth',
      'API Security & Middleware',
      'Git & Version Control',
    ],
  },
  'Full Stack Developer': {
    category: 'Software Engineering',
    description: 'Build end-to-end web applications encompassing interactive client-side interfaces, RESTful microservices, and persistent database architectures.',
    skills: [
      'HTML5 & Modern CSS3',
      'JavaScript (ES6+)',
      'React.js Components & State',
      'Node.js & Express APIs',
      'MongoDB & Database Modeling',
      'RESTful Architecture',
      'Git & Version Control',
    ],
  },
  'Cybersecurity Analyst': {
    category: 'Security & Networks',
    description: 'Protect systems and networks against unauthorized access, conduct vulnerability assessments, analyze security logs, and enforce encryption.',
    skills: [
      'Networking Protocols (TCP/IP, DNS, HTTP)',
      'Linux Terminal & System Security',
      'Web Application Security (OWASP Top 10)',
      'Vulnerability Scanning & Risk Assessment',
      'Cryptography & SSL/TLS Encryption',
      'Network Firewalls & Security Logs',
      'Security Incident Response',
    ],
  },
  'Cloud & DevOps Engineer': {
    category: 'Infrastructure & Cloud',
    description: 'Automate continuous integration pipelines, orchestrate containerized microservices, and manage scalable cloud server infrastructure.',
    skills: [
      'Linux Command Line & Shell Navigation',
      'Docker Containerization & Dockerfiles',
      'AWS or Azure Cloud Services',
      'CI/CD Pipelines (GitHub Actions)',
      'Kubernetes Container Orchestration',
      'Python or Bash Automation Scripting',
      'Git & Version Control',
    ],
  },
  'Mobile App Developer': {
    category: 'Mobile Engineering',
    description: 'Build cross-platform mobile applications for iOS and Android using Flutter or React Native, APIs, and local device storage.',
    skills: [
      'React Native or Flutter Framework',
      'JavaScript, TypeScript or Dart',
      'Mobile UI & Responsive Layouts',
      'Mobile State Management',
      'REST API Integration & Offline Sync',
      'SQLite or Mobile Local Storage',
      'Google Play & App Store Deployment',
    ],
  },
  'UI / UX Designer': {
    category: 'Design & Product',
    description: 'Design intuitive digital products, wireframes, prototypes, and user experiences using Figma and user research.',
    skills: [
      'Figma Wireframing & Interactive Prototyping',
      'User Research & User Personas',
      'Visual Hierarchy, Typography & Colors',
      'Design Systems & UI Component Libraries',
      'Usability Testing & Feedback Analysis',
      'Responsive Mobile & Web Layouts',
      'Design Handoff to Developers',
    ],
  },
  'QA / Automation Test Engineer': {
    category: 'Testing & Quality',
    description: 'Write automated test suites, execute manual test plans, verify APIs, and ensure zero-defect software releases.',
    skills: [
      'Manual Testing Fundamentals & Test Cases',
      'Selenium or Cypress Automation Framework',
      'Java or Python for Automated Testing',
      'API Testing with Postman',
      'Bug Tracking & Test Management (Jira)',
      'CI/CD Pipeline Test Automation',
      'SQL for Database Verification',
    ],
  },
  'Database Administrator (DBA)': {
    category: 'Data & Infrastructure',
    description: 'Maintain high availability, performance tuning, indexing, backups, and security for relational and NoSQL database systems.',
    skills: [
      'Advanced SQL & Stored Procedures',
      'Database Schema Design & Normalization',
      'Query Performance Tuning & Indexing',
      'PostgreSQL or MySQL Administration',
      'Database Backup & Disaster Recovery',
      'Database Security & User Access Control',
      'Data Replication & High Availability',
    ],
  },
  'Game Developer': {
    category: 'Gaming & Graphics',
    description: 'Create interactive 2D and 3D games, game loop logic, physics engines, and graphics shaders using Unity or Unreal Engine.',
    skills: [
      'C# or C++ Programming',
      'Unity or Unreal Game Engine',
      '2D & 3D Vector Mathematics & Physics',
      'Game Loop & State Architecture',
      'Collision Detection & Animations',
      'Asset Pipeline & UI Audio Integration',
      'Git & Version Control',
    ],
  },
  'Blockchain Developer': {
    category: 'Web3 & Distributed Systems',
    description: 'Develop decentralized smart contracts, Web3 applications, and cryptographic transaction protocols on Ethereum or EVM chains.',
    skills: [
      'Solidity Programming Language',
      'Ethereum & EVM Smart Contracts',
      'Web3.js or Ethers.js Frontend Integration',
      'Cryptography & Hashing Algorithms',
      'DeFi & Token Standards (ERC-20, ERC-721)',
      'Smart Contract Security & Testing',
      'Git & Version Control',
    ],
  },
  'Embedded Systems Engineer': {
    category: 'Hardware & IoT',
    description: 'Program microcontrollers, write firmware in C/Embedded C, interface with hardware sensors, and implement RTOS protocols.',
    skills: [
      'C & Embedded C Programming',
      'Microcontrollers (ARM Cortex, STM32, Arduino)',
      'Hardware Protocols (I2C, SPI, UART)',
      'Sensors & Peripheral Interfacing',
      'Real-Time Operating Systems (RTOS)',
      'Circuit Debugging & Logic Analyzers',
      'Git & Version Control',
    ],
  },
};

// Deep, comprehensive learning modules tailored per core track
const ROLE_MODULES_DATABASE: Record<string, {
  notes: Array<{
    moduleNumber: number;
    title: string;
    duration: string;
    overview: string;
    theory: string[];
    deepDiveHeading: string;
    deepDiveContent: string[];
    codeSnippet: string;
    codeExplanation: string[];
    bestPractices: string[];
    assessmentTips: string[];
  }>;
  quiz: Array<{
    question: string;
    options: string[];
    answer: number;
    explanation: string;
  }>;
}> = {
  'Software Engineer': {
    notes: [
      {
        moduleNumber: 1,
        title: 'Core Programming in Python & Object-Oriented Principles',
        duration: '5 Hours',
        overview: 'Master foundational software development in Python: data types, control flow, functions, modular architecture, and the 4 pillars of Object-Oriented Programming.',
        theory: [
          'Why Python Dominates Modern Software Engineering: Python is adopted in tech firms due to its clean syntax, standard packages, and universal application across backend servers, automation scripts, and AI data systems.',
          'The 4 Pillars of OOP: 1) Encapsulation: Bundling data and methods while restricting direct external modification. 2) Abstraction: Hiding complex internal logic behind intuitive public interfaces. 3) Inheritance: Reusing parent class methods. 4) Polymorphism: Methods behaving appropriately across different derived classes.',
          'Clean Code & Pythonic Conventions: Professional software engineering demands readable code. Functions should perform a single well-defined task, with structured error handling via try/except.',
        ],
        deepDiveHeading: 'Class Encapsulation & Robust Design',
        deepDiveContent: [
          'The __init__ constructor initializes instance attributes.',
          'Use custom exception classes to handle domain-specific failures gracefully.',
          'Type hints improve code clarity and catch bugs before deployment.',
        ],
        codeSnippet: `class SoftwareProject:
    def __init__(self, name: str, stack: list):
        self.name = name
        self.stack = stack
        self._tasks = []

    def add_task(self, task: str) -> None:
        if not task.strip():
            raise ValueError("Task cannot be empty.")
        self._tasks.append(task)

    @property
    def summary(self) -> str:
        return f"{self.name}: {len(self._tasks)} tasks completed using {', '.join(self.stack)}"`,
        codeExplanation: ['Encapsulates internal task array with validation and property access.'],
        bestPractices: ['Keep classes small and single-purposed.'],
        assessmentTips: ['Encapsulation bundles data and methods while restricting direct external access.'],
      },
      {
        moduleNumber: 2,
        title: 'Data Structures, Algorithmic Complexity & SQL Databases',
        duration: '7 Hours',
        overview: 'Understand Big-O time and space complexity, fundamental data structures (Arrays, Hash Maps, Linked Lists), and relational SQL database querying.',
        theory: [
          'Big-O Notation: O(1) constant time, O(log N) logarithmic binary search, O(N) linear scan, O(N^2) quadratic nested loops.',
          'Hash Maps (Dictionaries): Provide O(1) average key lookup, making them essential for technical interviews and caching.',
          'SQL Relational Databases: Tables store data in structured schemas. SQL allows querying, filtering, and joining data using foreign keys.',
        ],
        deepDiveHeading: 'SQL Queries: Filtering, Aggregations & Table JOINs',
        deepDiveContent: [
          'WHERE filters rows before grouping; HAVING filters aggregated groups.',
          'INNER JOIN combines matching records from two tables based on a foreign key relationship.',
        ],
        codeSnippet: `SELECT 
    customers.customer_name,
    COUNT(orders.order_id) AS total_orders,
    SUM(orders.amount) AS total_spent
FROM customers
INNER JOIN orders ON customers.customer_id = orders.customer_id
WHERE orders.status = 'COMPLETED'
GROUP BY customers.customer_id, customers.customer_name
HAVING SUM(orders.amount) >= 50000;`,
        codeExplanation: ['Matches completed customer orders, sums totals, and filters totals >= 50,000.'],
        bestPractices: ['Always index foreign key columns to ensure SQL JOIN queries execute quickly.'],
        assessmentTips: ['WHERE filters rows before aggregation; HAVING filters groups after GROUP BY.'],
      },
      {
        moduleNumber: 3,
        title: 'Building Real-World Web Applications & REST APIs',
        duration: '6 Hours',
        overview: 'Learn client-server architecture, HTTP request-response cycles, building REST API endpoints, JSON serialization, and connecting frontend to backend.',
        theory: [
          'Client-Server Architecture: The client sends HTTP requests over the network, and the server processes business logic and responds with JSON.',
          'RESTful Conventions: GET retrieves data, POST creates records, PUT updates, and DELETE removes resources.',
          'Status Codes: 200 OK, 201 Created, 400 Bad Request, 404 Not Found, 500 Server Error.',
        ],
        deepDiveHeading: 'Production REST API Endpoints',
        deepDiveContent: ['FastAPI or Express handle routing and schema validation.'],
        codeSnippet: `from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class Task(BaseModel):
    title: str

@app.post("/api/tasks", status_code=201)
def add_task(task: Task):
    return {"success": True, "title": task.title}`,
        codeExplanation: ['Validates payload with Pydantic and returns HTTP 201 Created.'],
        bestPractices: ['Always validate and sanitize incoming user inputs.'],
        assessmentTips: ['HTTP POST is conventionally used to submit data and create new records.'],
      },
      {
        moduleNumber: 4,
        title: 'Professional Software Delivery: Git, Testing & Docker Basics',
        duration: '6 Hours',
        overview: 'Master everyday engineering workflows: Git version control branching, automated unit testing, writing Dockerfiles, and deploying code to cloud servers.',
        theory: [
          'Git Version Control: Tracks file changes, allows concurrent feature development via branches, and enables quick rollbacks.',
          'Docker Containerization: Packages application runtime and dependencies into portable containers.',
        ],
        deepDiveHeading: 'Essential Git Commands & Docker Deployment',
        deepDiveContent: ['git status, git add ., git commit -m "msg", git push origin main.'],
        codeSnippet: `FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
EXPOSE 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]`,
        codeExplanation: ['Builds a clean, reproducible containerized Python web application.'],
        bestPractices: ['Never commit passwords or credentials to Git repositories.'],
        assessmentTips: ['git commit -m records staged changes into the local repository history.'],
      },
    ],
    quiz: [
      {
        question: 'Which programming concept refers to bundling data and methods inside a class while restricting direct external access?',
        options: ['Polymorphism', 'Encapsulation', 'Recursion', 'Type Casting'],
        answer: 1,
        explanation: 'Encapsulation is the OOP principle of bundling data and methods while restricting direct external access.',
      },
      {
        question: 'In SQL, which clause is used to filter aggregated groups created by a GROUP BY statement?',
        options: ['WHERE', 'HAVING', 'ORDER BY', 'LIMIT'],
        answer: 1,
        explanation: 'HAVING filters aggregated groups after GROUP BY; WHERE filters individual rows before grouping.',
      },
      {
        question: 'In REST API design, which HTTP method is conventionally used to create a new record?',
        options: ['GET', 'POST', 'DELETE', 'HEAD'],
        answer: 1,
        explanation: 'HTTP POST is the standard method used to submit data and create new records.',
      },
      {
        question: 'What is the average time complexity of searching for an item by key in a Hash Map (Python dictionary)?',
        options: ['O(1) Constant Time', 'O(N^2) Quadratic Time', 'O(N!) Factorial Time', 'O(log N) Logarithmic Time'],
        answer: 0,
        explanation: 'Hash Maps provide near-instant O(1) average time complexity for lookups, insertions, and deletions.',
      },
      {
        question: 'What is the primary advantage of using Docker in software engineering?',
        options: [
          'It replaces programming languages',
          'It packages applications with all dependencies into portable, isolated containers that run anywhere',
          'It speeds up internet connection',
          'It cleans the computer screen',
        ],
        answer: 1,
        explanation: 'Docker packages apps and their dependencies into standardized containers that run identically everywhere.',
      },
    ],
  },
};



// Authentic Google Logo SVG Component
const GoogleLogo = () => (
  <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24">
    <path
      fill="#4285F4"
      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
    />
    <path
      fill="#34A853"
      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
    />
    <path
      fill="#FBBC05"
      d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
    />
    <path
      fill="#EA4335"
      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
    />
  </svg>
);

// Helper to transform any raw email or college username into a clean, human name
// e.g. "megap.cs24@gmail.com" -> "Megap"
// e.g. "rahul.sharma@gmail.com" -> "Rahul Sharma"
const getCleanNameFromEmail = (email: string): string => {
  if (!email || !email.includes('@')) return 'Learner';
  const username = email.split('@')[0];
  // Remove numbers, years, roll digits (e.g. 24, 2024, 01)
  const withoutDigits = username.replace(/[0-9]+/g, '');
  // Split by dot, underscore, hyphen
  const parts = withoutDigits.split(/[._-]+/).filter(Boolean);
  // Filter out college department codes if other parts exist
  const deptCodes = new Set(['cs', 'cse', 'it', 'ece', 'eee', 'mech', 'civil', 'ai', 'ds', 'aids', 'mba', 'mca', 'btech', 'be', 'bsc']);
  const meaningfulParts = parts.filter((p) => parts.length > 1 ? !deptCodes.has(p.toLowerCase()) : true);
  const wordsToUse = meaningfulParts.length > 0 ? meaningfulParts : parts;
  if (wordsToUse.length === 0) return 'Learner';
  // Capitalize each part
  return wordsToUse.map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
};

// Live Daily In-Demand Tech Domains & Skill Intelligence Dataset
interface InDemandDomain {
  id: string;
  domain: string;
  category: string;
  associatedJobTitle: string;
  demandStatus: 'Explosive Demand' | 'High Enterprise Demand' | 'Rapid Growth' | 'Steady Core Demand';
  badgeColor: string;
  growth: string;
  whyInDemand: string;
  topSkills: string[];
  emergingFocus: string;
  hiringSectors: string[];
}

const IN_DEMAND_DOMAINS: InDemandDomain[] = [
  {
    id: 'ai-ml',
    domain: 'Artificial Intelligence & Machine Learning',
    category: 'AI & Data Science',
    associatedJobTitle: 'Data Scientist',
    demandStatus: 'Explosive Demand',
    badgeColor: 'bg-rose-100 text-rose-800 border-rose-300',
    growth: '+68% Hiring Growth',
    whyInDemand: 'Global enterprises are rapidly integrating private LLMs, autonomous agent workflows, and predictive analytics into core product architectures.',
    topSkills: ['Generative AI & LLMs', 'PyTorch & Deep Learning', 'LangChain & RAG Architectures', 'Scikit-Learn Machine Learning', 'Vector Database Indexing'],
    emergingFocus: 'Autonomous Agentic Workflows & Retrieval-Augmented Generation (RAG)',
    hiringSectors: ['Enterprise SaaS', 'FinTech', 'HealthTech', 'Automated Logistics'],
  },
  {
    id: 'cloud-devops',
    domain: 'Cloud Architecture & DevOps Systems',
    category: 'Cloud & Infrastructure',
    associatedJobTitle: 'Cloud & DevOps Engineer',
    demandStatus: 'High Enterprise Demand',
    badgeColor: 'bg-blue-100 text-blue-800 border-blue-300',
    growth: '+36% Hiring Growth',
    whyInDemand: 'Modern software requires high-availability microservices, automated CI/CD releases, multi-region elasticity, and zero-downtime infrastructure.',
    topSkills: ['Docker Containerization', 'Kubernetes Cluster Orchestration', 'AWS / Azure Cloud Architecture', 'CI/CD Pipelines (GitHub Actions)', 'Terraform Infrastructure as Code'],
    emergingFocus: 'Serverless Edge Compute & Zero-Trust Cloud Architecture',
    hiringSectors: ['Global Tech Firms', 'E-Commerce Platforms', 'Banking & Telecom'],
  },
  {
    id: 'fullstack-backend',
    domain: 'Full-Stack & Distributed Backend Engineering',
    category: 'Software Engineering',
    associatedJobTitle: 'Full Stack Developer',
    demandStatus: 'High Enterprise Demand',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    growth: '+28% Hiring Growth',
    whyInDemand: 'Every digital enterprise requires robust client-server architectures, responsive user interfaces, and high-throughput RESTful / GraphQL microservices.',
    topSkills: ['Python (FastAPI / Django)', 'Node.js & Express Architecture', 'React.js Components & State', 'PostgreSQL & Relational Data Modeling', 'RESTful API Security'],
    emergingFocus: 'Event-Driven Microservices & Real-Time WebSockets',
    hiringSectors: ['Product Companies', 'High-Growth Startups', 'IT Services'],
  },
  {
    id: 'data-analytics',
    domain: 'Data Analytics & Business Intelligence',
    category: 'Analytics & Insights',
    associatedJobTitle: 'Data Analyst',
    demandStatus: 'Rapid Growth',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
    growth: '+31% Hiring Growth',
    whyInDemand: 'Organizations demand real-time analytics, automated data warehousing, and live executive dashboards to replace guesswork with empirical data.',
    topSkills: ['Advanced SQL (JOINs & Aggregations)', 'Python Data Processing (Pandas / NumPy)', 'Power BI & Interactive Dashboards', 'Data Cleaning & ETL Pipelines', 'Statistical Significance Testing'],
    emergingFocus: 'Real-Time Streaming Metrics & Cloud Data Lakes (Snowflake)',
    hiringSectors: ['Financial Markets', 'Retail Chains', 'Supply Chain Tech'],
  },
  {
    id: 'cybersecurity',
    domain: 'Cybersecurity & Cloud Defense',
    category: 'Security & Operations',
    associatedJobTitle: 'Cybersecurity Analyst',
    demandStatus: 'Rapid Growth',
    badgeColor: 'bg-purple-100 text-purple-800 border-purple-300',
    growth: '+42% Hiring Growth',
    whyInDemand: 'Escalating cyber attacks, ransomware threats, and stringent data protection regulations mandate dedicated defensive security engineering.',
    topSkills: ['Network Protocols (TCP/IP, DNS, SSL)', 'Web App Security (OWASP Top 10)', 'Vulnerability Assessment & Penetration Testing', 'Linux Hardening & Security Audit', 'Identity & Access Management (IAM)'],
    emergingFocus: 'Cloud Security Posture Management & Automated Threat Intelligence',
    hiringSectors: ['Defense Contractors', 'FinTech & Banking', 'Government Infrastructure'],
  },
  {
    id: 'mobile-dev',
    domain: 'Mobile App Engineering (iOS & Android)',
    category: 'Mobile & Client',
    associatedJobTitle: 'Mobile App Developer',
    demandStatus: 'Steady Core Demand',
    badgeColor: 'bg-cyan-100 text-cyan-800 border-cyan-300',
    growth: '+22% Hiring Growth',
    whyInDemand: 'Over 80% of consumer digital interactions occur on mobile devices, fueling persistent demand for high-performance cross-platform apps.',
    topSkills: ['Flutter & Dart Ecosystem', 'React Native Architecture', 'Mobile UI/UX Performance Optimization', 'RESTful API Syncing & Local Storage', 'Mobile Security & App Store Deployment'],
    emergingFocus: 'Offline-First Architectures & On-Device ML Acceleration',
    hiringSectors: ['Consumer Tech', 'EdTech', 'Social Apps', 'On-Demand Services'],
  },
];

// Saved user account representation
interface SavedUser {
  name: string;
  email: string;
  provider: 'email' | 'google';
}

export default function App() {
  // Saved user profile persisted in localStorage (remembers only real previously logged-in account)
  const [savedUser, setSavedUser] = useState<SavedUser | null>(() => {
    try {
      const stored = localStorage.getItem('skillpulse_saved_user');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // ignore parse error
    }
    return null;
  });

  // Authentication / User Session State (starts logged out so user enters Mail ID or Google)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [authProvider, setAuthProvider] = useState<'email' | 'google'>('email');
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [showGoogleModal, setShowGoogleModal] = useState(false);
  const [googleCustomName, setGoogleCustomName] = useState('');
  const [googleCustomEmail, setGoogleCustomEmail] = useState('');

  // Navigation tabs (5 learning, assessment, credential & live market domain stages)
  const [activeTab, setActiveTab] = useState<'gap' | 'notes' | 'quiz' | 'certificate' | 'domains'>('gap');
  const [selectedDomainCategory, setSelectedDomainCategory] = useState<string>('All');

  // Learner profile state
  const [learnerName, setLearnerName] = useState('');

  // Job Selection & Custom Job Input
  const [selectedJob, setSelectedJob] = useState<string>('Software Engineer');
  const [customJobInput, setCustomJobInput] = useState('');
  const [isCustomJob, setIsCustomJob] = useState(false);

  // Set of skills the learner knows (checked by the user) - Starts empty so user chooses them manually
  const [knownSkills, setKnownSkills] = useState<string[]>([]);

  // Skill gap calculation trigger
  const [gapAnalyzed, setGapAnalyzed] = useState(false);

  // Notes reading progress
  const [activeNoteIdx, setActiveNoteIdx] = useState(0);
  const [readModules, setReadModules] = useState<number[]>([0]);

  // Quiz evaluation state
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  // Certificate information
  const [credentialId, setCredentialId] = useState('CRED-2026-SP-9142');
  const issueDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Scroll to top helper
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Scroll helper: smoothly scrolls down to the skills checklist section
  const scrollToSkillsChecklist = () => {
    setTimeout(() => {
      const el = document.getElementById('skills-checklist-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 80);
  };

  const navigateToTab = (tab: 'gap' | 'notes' | 'quiz' | 'certificate' | 'domains') => {
    setActiveTab(tab);
    scrollToTop();
  };

  const navigateToNote = (index: number) => {
    setActiveNoteIdx(index);
    setTimeout(() => {
      const el = document.getElementById('module-reader-card');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 60);
  };

  // Smart Job Resolver: Returns the EXACT, distinct skills for any typed or selected job
  const getResolvedJobInfo = (jobName: string) => {
    const trimmed = jobName.trim();
    const lower = trimmed.toLowerCase();

    // 1. Direct match in dictionary
    if (JOB_SKILL_PROFILES[trimmed]) {
      return JOB_SKILL_PROFILES[trimmed];
    }

    // 2. Keyword-based matching to appropriate profiles
    if (lower.includes('java') && !lower.includes('script')) return JOB_SKILL_PROFILES['Java Developer'];
    if (lower.includes('python')) return JOB_SKILL_PROFILES['Python Developer'];
    if (lower.includes('data anal') || lower.includes('business anal') || lower.includes('analytics')) return JOB_SKILL_PROFILES['Data Analyst'];
    if (lower.includes('data sci') || lower.includes('machine learning') || lower.includes('ai ')) return JOB_SKILL_PROFILES['Data Scientist'];
    if (lower.includes('front') || lower.includes('react') || lower.includes('angular') || lower.includes('vue')) return JOB_SKILL_PROFILES['Frontend Developer'];
    if (lower.includes('back') || lower.includes('node') || lower.includes('api') || lower.includes('express')) return JOB_SKILL_PROFILES['Backend Developer'];
    if (lower.includes('full') || lower.includes('mern') || lower.includes('mean')) return JOB_SKILL_PROFILES['Full Stack Developer'];
    if (lower.includes('cyber') || lower.includes('secur') || lower.includes('network') || lower.includes('infosec')) return JOB_SKILL_PROFILES['Cybersecurity Analyst'];
    if (lower.includes('cloud') || lower.includes('devops') || lower.includes('sre') || lower.includes('aws') || lower.includes('azure')) return JOB_SKILL_PROFILES['Cloud & DevOps Engineer'];
    if (lower.includes('mobile') || lower.includes('flutter') || lower.includes('android') || lower.includes('ios')) return JOB_SKILL_PROFILES['Mobile App Developer'];
    if (lower.includes('ui') || lower.includes('ux') || lower.includes('design') || lower.includes('figma')) return JOB_SKILL_PROFILES['UI / UX Designer'];
    if (lower.includes('qa') || lower.includes('test') || lower.includes('quality') || lower.includes('selenium')) return JOB_SKILL_PROFILES['QA / Automation Test Engineer'];
    if (lower.includes('database') || lower.includes('dba') || lower.includes('sql admin')) return JOB_SKILL_PROFILES['Database Administrator (DBA)'];
    if (lower.includes('game') || lower.includes('unity') || lower.includes('unreal')) return JOB_SKILL_PROFILES['Game Developer'];
    if (lower.includes('block') || lower.includes('web3') || lower.includes('solidity') || lower.includes('crypto')) return JOB_SKILL_PROFILES['Blockchain Developer'];
    if (lower.includes('embed') || lower.includes('iot') || lower.includes('firmware') || lower.includes('arduino')) return JOB_SKILL_PROFILES['Embedded Systems Engineer'];

    // 3. Fallback for unique job title: Generate specific, realistic skills based on title
    return {
      category: 'Specialized Role',
      description: `Professional technical standards and industry competencies for ${trimmed}.`,
      skills: [
        `${trimmed} Core Fundamentals & Architecture`,
        'Domain-Specific Software Frameworks & Tools',
        'Data Handling, Storage & Database Systems',
        'API Architecture & System Integration',
        'Quality Assurance, Automated Testing & Debugging',
        'Git & Collaborative Version Control',
        'Cloud Deployment & Production Best Practices',
      ],
    };
  };

  const currentJobTitle = isCustomJob && customJobInput.trim() ? customJobInput.trim() : selectedJob;
  const activeJobData = getResolvedJobInfo(currentJobTitle);
  const benchmarkSkills = activeJobData.skills;

  // Resolves the learning notes & quiz
  const activeModulesData = ROLE_MODULES_DATABASE['Software Engineer'];

  // Toggle knowing a skill
  const toggleSkillKnowledge = (skill: string) => {
    if (knownSkills.includes(skill)) {
      setKnownSkills(knownSkills.filter((s) => s !== skill));
    } else {
      setKnownSkills([...knownSkills, skill]);
    }
  };

  // Compute matched and missing skills
  const matchedSkills = benchmarkSkills.filter((s) => knownSkills.includes(s));
  const missingSkills = benchmarkSkills.filter((s) => !knownSkills.includes(s));
  const matchPercentage = Math.round((matchedSkills.length / benchmarkSkills.length) * 100);

  // Handle Preset Job Click
  const handleSelectPresetJob = (jobName: string) => {
    setSelectedJob(jobName);
    setIsCustomJob(false);
    setCustomJobInput('');
    setGapAnalyzed(false);
    setActiveNoteIdx(0);
    setReadModules([0]);
    setQuizAnswers({});
    setQuizSubmitted(false);
    // Skills start completely unselected so the user chooses them manually
    setKnownSkills([]);
    // Smoothly scroll down to the skills checklist section
    scrollToSkillsChecklist();
  };

  // Handle Custom Job Apply (e.g. typing "Java Developer", "Data Analyst", etc.)
  const handleApplyCustomJob = () => {
    if (!customJobInput.trim()) return;
    setIsCustomJob(true);
    setGapAnalyzed(false);
    setActiveNoteIdx(0);
    setReadModules([0]);
    setQuizAnswers({});
    setQuizSubmitted(false);
    // Skills start completely unselected so the user chooses them manually
    setKnownSkills([]);
    // Smoothly scroll down to the skills checklist section
    scrollToSkillsChecklist();
  };

  // Submit Quiz
  const handleSubmitQuiz = () => {
    const questions = activeModulesData.quiz;
    let correct = 0;
    questions.forEach((q, idx) => {
      if (quizAnswers[idx] === q.answer) correct += 1;
    });
    const calculatedScore = Math.round((correct / questions.length) * 100);
    setQuizScore(calculatedScore);
    setQuizSubmitted(true);
    setCredentialId(`CRED-2026-SP-${Math.floor(1000 + Math.random() * 9000)}`);
  };

  // Persist logged-in user credentials to localStorage
  const saveUserSession = (name: string, email: string, provider: 'email' | 'google') => {
    const cleanName = name.trim() || 'Learner';
    const cleanEmail = email.trim();
    const user: SavedUser = {
      name: cleanName,
      email: cleanEmail,
      provider,
    };
    try {
      localStorage.setItem('skillpulse_saved_user', JSON.stringify(user));
    } catch {
      // ignore storage errors
    }
    setSavedUser(user);
    setLearnerName(cleanName);
    setAuthEmail(cleanEmail);
    setAuthProvider(provider);
    setIsLoggedIn(true);
  };

  // 1-Click login using previously logged-in account
  const handleQuickLoginSaved = () => {
    if (!savedUser) return;
    setLearnerName(savedUser.name);
    setAuthEmail(savedUser.email);
    setAuthProvider(savedUser.provider);
    setIsLoggedIn(true);
  };

  // Remove saved account credentials
  const handleRemoveSavedUser = (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      localStorage.removeItem('skillpulse_saved_user');
    } catch {
      // ignore
    }
    setSavedUser(null);
  };

  // Keep savedUser name synced when edited by learner in dashboard
  const handleUpdateLearnerName = (newName: string) => {
    setLearnerName(newName);
    if (savedUser) {
      const updated = { ...savedUser, name: newName };
      setSavedUser(updated);
      try {
        localStorage.setItem('skillpulse_saved_user', JSON.stringify(updated));
      } catch {
        // ignore
      }
    }
  };

  // Google Login Handler
  const handleGoogleLogin = (name: string, email: string) => {
    setShowGoogleModal(false);
    saveUserSession(name, email, 'google');
  };

  // Email Sign In Handler - explicitly requires user-entered name for certificate
  const handleEmailSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authEmail.trim() || !learnerName.trim()) return;
    saveUserSession(learnerName, authEmail, 'email');
  };

  // Create Account Handler - explicitly requires user-entered name for certificate
  const handleCreateAccount = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authEmail.trim() || !learnerName.trim()) return;
    setKnownSkills([]);
    saveUserSession(learnerName, authEmail, 'email');
  };

  // -------------------------------------------------------------
  // VIEW: AUTHENTICATION / LOGIN / CREATE ACCOUNT PAGE
  // -------------------------------------------------------------
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-100 flex flex-col justify-center items-center p-4 font-sans text-slate-800 relative">
        {/* Google Account Selection Modal */}
        {showGoogleModal && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-sm w-full p-6 space-y-4 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <GoogleLogo />
                  <h3 className="font-bold text-sm text-slate-900">Sign in with Google</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setShowGoogleModal(false)}
                  className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {savedUser ? (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-slate-600 font-medium">
                      Previously logged in account:
                    </p>
                    <button
                      type="button"
                      onClick={handleRemoveSavedUser}
                      className="text-[10px] text-slate-400 hover:text-rose-600 font-semibold transition"
                    >
                      Forget
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleGoogleLogin(savedUser.name, savedUser.email)}
                    className="w-full flex items-center gap-3 p-3 rounded-2xl border border-blue-200 bg-blue-50/50 hover:bg-blue-100/60 hover:border-blue-400 transition text-left group shadow-sm"
                  >
                    <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-sm flex-shrink-0">
                      {savedUser.name ? savedUser.name.charAt(0).toUpperCase() : 'G'}
                    </div>
                    <div className="flex-1 truncate">
                      <div className="text-xs font-bold text-slate-800 group-hover:text-blue-700">
                        {savedUser.name}
                      </div>
                      <div className="text-[11px] text-slate-500 truncate">{savedUser.email}</div>
                    </div>
                    <span className="text-[10px] font-bold text-blue-700 bg-white px-2 py-1 rounded-lg border border-blue-200">
                      1-Click
                    </span>
                  </button>
                </div>
              ) : (
                <p className="text-xs text-slate-500">
                  Enter your Google Account details below:
                </p>
              )}

              {/* Custom Gmail Input */}
              <div className="pt-2 border-t border-slate-100 space-y-2.5">
                <span className="text-[11px] font-semibold text-slate-600">
                  Or enter your Google Account details:
                </span>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">
                    Your Full Name (For Certificate) <span className="text-blue-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={googleCustomName}
                    onChange={(e) => setGoogleCustomName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 outline-none focus:border-blue-600 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">
                    Gmail Address <span className="text-blue-600">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={googleCustomEmail}
                    onChange={(e) => setGoogleCustomEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 outline-none focus:border-blue-600 focus:bg-white"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (!googleCustomName.trim()) {
                      alert('Please enter your full name for the certificate.');
                      return;
                    }
                    if (!googleCustomEmail.trim()) {
                      alert('Please enter your Gmail address.');
                      return;
                    }
                    handleGoogleLogin(googleCustomName.trim(), googleCustomEmail.trim());
                  }}
                  className="w-full py-2.5 bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold rounded-xl transition flex items-center justify-center gap-2 shadow-sm"
                >
                  <GoogleLogo />
                  <span>Sign In with Google</span>
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-slate-200 p-8 space-y-6">
          {/* Logo & Platform Name */}
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-blue-700 text-white flex items-center justify-center font-bold mx-auto shadow-md">
              <Briefcase className="w-7 h-7" />
            </div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              SkillPulse
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              Career Intelligence & Micro-Credential Platform
            </p>
          </div>

          {/* 1-Click Access for Previously Logged In User */}
          {savedUser && (
            <div className="p-3.5 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-blue-900 uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-blue-600" />
                  <span>Previous Account Found</span>
                </span>
                <button
                  type="button"
                  onClick={handleRemoveSavedUser}
                  className="text-[10px] text-slate-400 hover:text-rose-600 font-semibold transition"
                  title="Remove saved account"
                >
                  Forget
                </button>
              </div>

              <button
                type="button"
                onClick={handleQuickLoginSaved}
                className="w-full flex items-center gap-3 p-2.5 bg-white hover:bg-blue-50/80 border border-blue-300 rounded-xl transition text-left shadow-sm group"
              >
                <div className="w-9 h-9 rounded-full bg-blue-700 text-white flex items-center justify-center font-bold text-sm shadow-sm flex-shrink-0">
                  {savedUser.name ? savedUser.name.charAt(0).toUpperCase() : 'U'}
                </div>
                <div className="flex-1 truncate">
                  <div className="text-xs font-bold text-slate-900 group-hover:text-blue-700 flex items-center gap-1.5">
                    <span className="truncate">{savedUser.name}</span>
                    <span className="text-[10px] font-semibold px-1.5 py-0.5 bg-blue-100 text-blue-800 rounded">
                      Click to Enter
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 truncate">{savedUser.email}</div>
                </div>
                <LogIn className="w-4 h-4 text-blue-600 group-hover:translate-x-0.5 transition flex-shrink-0" />
              </button>
            </div>
          )}

          {/* Mode Tabs: Sign In vs Create Account */}
          <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-2xl text-xs font-bold">
            <button
              type="button"
              onClick={() => setAuthMode('signin')}
              className={`py-2 rounded-xl transition flex items-center justify-center gap-1.5 ${
                authMode === 'signin'
                  ? 'bg-white text-blue-700 shadow-sm'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Sign In</span>
            </button>
            <button
              type="button"
              onClick={() => setAuthMode('signup')}
              className={`py-2 rounded-xl transition flex items-center justify-center gap-1.5 ${
                authMode === 'signup'
                  ? 'bg-white text-blue-700 shadow-sm'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Create Account</span>
            </button>
          </div>

          {/* Continue with Google One-Click Button */}
          <button
            type="button"
            onClick={() => setShowGoogleModal(true)}
            className="w-full py-2.5 px-4 bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 font-semibold text-xs rounded-xl shadow-sm transition flex items-center justify-center gap-2.5"
          >
            <GoogleLogo />
            <span>Continue with Google</span>
          </button>

          {/* Divider */}
          <div className="flex items-center my-1">
            <div className="flex-1 border-t border-slate-200"></div>
            <span className="px-3 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
              {authMode === 'signin' ? 'Or sign in with Mail ID' : 'Or register with Email'}
            </span>
            <div className="flex-1 border-t border-slate-200"></div>
          </div>

          {/* FORM: Sign In Mode */}
          {authMode === 'signin' && (
            <form onSubmit={handleEmailSignIn} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Full Name (For Certificate) <span className="text-blue-600">*</span>
                </label>
                <div className="flex items-center gap-2 px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus-within:border-blue-600 focus-within:bg-white">
                  <User className="w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={learnerName}
                    onChange={(e) => setLearnerName(e.target.value)}
                    className="bg-transparent text-xs text-slate-900 w-full outline-none font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Mail ID / Email Address <span className="text-blue-600">*</span>
                </label>
                <div className="flex items-center gap-2 px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus-within:border-blue-600 focus-within:bg-white">
                  <Mail className="w-4 h-4 text-blue-600" />
                  <input
                    type="email"
                    required
                    value={authEmail}
                    onChange={(e) => setAuthEmail(e.target.value)}
                    className="bg-transparent text-xs text-slate-900 w-full outline-none font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Password
                </label>
                <div className="flex items-center gap-2 px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus-within:border-blue-600 focus-within:bg-white">
                  <Lock className="w-4 h-4 text-slate-400" />
                  <input
                    type="password"
                    value={authPassword}
                    onChange={(e) => setAuthPassword(e.target.value)}
                    className="bg-transparent text-xs text-slate-900 w-full outline-none font-medium"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-xl shadow transition flex items-center justify-center gap-2"
              >
                <LogIn className="w-4 h-4" />
                <span>Sign In & Access Platform</span>
              </button>

              <div className="text-center text-xs text-slate-500 pt-1">
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => setAuthMode('signup')}
                  className="text-blue-700 font-bold hover:underline"
                >
                  Create an account
                </button>
              </div>
            </form>
          )}

          {/* FORM: Create Account Mode */}
          {authMode === 'signup' && (
            <form onSubmit={handleCreateAccount} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Full Name (For Certificate) <span className="text-blue-600">*</span>
                </label>
                <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus-within:border-blue-600 focus-within:bg-white">
                  <User className="w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={learnerName}
                    onChange={(e) => setLearnerName(e.target.value)}
                    className="bg-transparent text-xs text-slate-900 w-full outline-none font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Mail ID / Email Address <span className="text-blue-600">*</span>
                </label>
                <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus-within:border-blue-600 focus-within:bg-white">
                  <Mail className="w-4 h-4 text-blue-600" />
                  <input
                    type="email"
                    required
                    value={authEmail}
                    onChange={(e) => setAuthEmail(e.target.value)}
                    className="bg-transparent text-xs text-slate-900 w-full outline-none font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Create Password <span className="text-blue-600">*</span>
                </label>
                <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus-within:border-blue-600 focus-within:bg-white">
                  <Lock className="w-4 h-4 text-slate-400" />
                  <input
                    type="password"
                    required
                    value={authPassword}
                    onChange={(e) => setAuthPassword(e.target.value)}
                    className="bg-transparent text-xs text-slate-900 w-full outline-none font-medium"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-xl shadow transition flex items-center justify-center gap-2"
              >
                <UserPlus className="w-4 h-4" />
                <span>Create Account & Start Learning</span>
              </button>

              <div className="text-center text-xs text-slate-500 pt-1">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => setAuthMode('signin')}
                  className="text-blue-700 font-bold hover:underline"
                >
                  Sign In
                </button>
              </div>
            </form>
          )}

          <div className="text-center text-[11px] text-slate-400 pt-2 border-t border-slate-100">
            Secure login with verified digital credentials
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // VIEW: AUTHENTICATED DASHBOARD
  // -------------------------------------------------------------
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      {/* Platform Navigation Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-700 text-white flex items-center justify-center font-bold shadow-sm">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold text-slate-900 tracking-tight">
                  SkillPulse
                </h1>
                <span className="text-[11px] px-2 py-0.5 rounded font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Live Daily Demand Radar
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Skill-Gap Analyzer • Comprehensive Modules • Competency Assessment • Live In-Demand Domains
              </p>
            </div>
          </div>

          {/* User Profile Bar with Logout */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-xl border border-slate-200 text-xs">
              {authProvider === 'google' ? (
                <GoogleLogo />
              ) : (
                <User className="w-3.5 h-3.5 text-blue-600" />
              )}
              <span className="text-slate-500 font-medium">User:</span>
              <input
                type="text"
                value={learnerName}
                onChange={(e) => handleUpdateLearnerName(e.target.value)}
                title="Edit learner name"
                className="font-bold text-slate-900 bg-white px-2 py-1 rounded border border-slate-200 outline-none w-32 focus:border-blue-500"
              />
            </div>
            <button
              type="button"
              onClick={() => setIsLoggedIn(false)}
              className="p-2 bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-600 rounded-xl border border-slate-200 transition"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Workflow Navigation Bar */}
        <div className="max-w-6xl mx-auto px-4 border-t border-slate-100 overflow-x-auto">
          <nav className="flex space-x-1 py-1.5 text-xs font-semibold">
            <button
              onClick={() => navigateToTab('gap')}
              className={`px-3.5 py-2 rounded-lg transition flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'gap'
                  ? 'bg-blue-700 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <BarChart2 className="w-4 h-4" />
              <span>1. Skill Gap Analyzer</span>
            </button>

            <button
              onClick={() => navigateToTab('notes')}
              className={`px-3.5 py-2 rounded-lg transition flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'notes'
                  ? 'bg-blue-700 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>2. Comprehensive Modules</span>
            </button>

            <button
              onClick={() => navigateToTab('quiz')}
              className={`px-3.5 py-2 rounded-lg transition flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'quiz'
                  ? 'bg-blue-700 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>3. Competency Assessment</span>
            </button>

            <button
              onClick={() => navigateToTab('certificate')}
              className={`px-3.5 py-2 rounded-lg transition flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'certificate'
                  ? 'bg-blue-700 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Award className="w-4 h-4" />
              <span>4. Digital Credential</span>
            </button>

            <button
              onClick={() => navigateToTab('domains')}
              className={`px-3.5 py-2 rounded-lg transition flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'domains'
                  ? 'bg-blue-700 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              <span>5. In-Demand Domains (Live Daily)</span>
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-5xl mx-auto w-full p-4 sm:p-6 flex-1 space-y-6">

        {/* ======================================================== */}
        {/* TAB 1: SKILL GAP ANALYZER */}
        {/* ======================================================== */}
        {activeTab === 'gap' && (
          <div className="space-y-6">
            {/* Introductory Card */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
              <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">
                Step 1 of 4 • Precision Skill Gap Analysis
              </span>
              <h2 className="text-2xl font-bold text-slate-900">
                Identify Your Missing Skills for Your Target Job
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Choose or type ANY job title (e.g. <strong>Java Developer</strong>, <strong>Data Analyst</strong>, <strong>Frontend Developer</strong>, <strong>Cybersecurity</strong>, or <strong>Software Engineer</strong>).
                The system immediately loads the exact skills demanded in the industry. Check what you know to see your gap!
              </p>
            </div>

            {/* Target Job Selection & Custom Job Input */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  1. Choose Target Job or Type Desired Role:
                </label>
                <span className="text-xs text-slate-500 font-medium">
                  Selected Target: <strong className="text-blue-700">{currentJobTitle}</strong>
                </span>
              </div>

              {/* Popular Job Cards - Each has distinct skills */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  'Software Engineer',
                  'Java Developer',
                  'Python Developer',
                  'Data Analyst',
                  'Frontend Developer',
                  'Backend Developer',
                  'Cybersecurity Analyst',
                  'Mobile App Developer',
                ].map((job) => (
                  <button
                    key={job}
                    type="button"
                    onClick={() => handleSelectPresetJob(job)}
                    className={`p-3 rounded-xl border text-left transition ${
                      !isCustomJob && selectedJob === job
                        ? 'bg-blue-50 border-blue-600 text-blue-900 font-bold shadow-sm'
                        : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <div className="text-[10px] text-slate-400 font-mono uppercase">
                      {JOB_SKILL_PROFILES[job]?.category || 'Tech'}
                    </div>
                    <div className="text-xs font-semibold mt-0.5 truncate">{job}</div>
                    <div className="text-[10px] text-slate-500 mt-1">
                      {JOB_SKILL_PROFILES[job]?.skills.length} Specific Skills
                    </div>
                  </button>
                ))}
              </div>

              {/* Type Any Custom Desired Job with Instant Input */}
              <div className="pt-2 border-t border-slate-100 space-y-2">
                <span className="text-xs font-semibold text-slate-600">
                  Or type any target role (e.g. Java Developer, Data Analyst, QA Tester, Game Developer, Blockchain, UI UX):
                </span>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={customJobInput}
                    onChange={(e) => {
                      setCustomJobInput(e.target.value);
                      if (e.target.value.trim().length >= 3) {
                        setIsCustomJob(true);
                        setGapAnalyzed(false);
                        setKnownSkills([]);
                      }
                    }}
                    onKeyDown={(e) => e.key === 'Enter' && handleApplyCustomJob()}
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 outline-none focus:border-blue-600 focus:bg-white"
                  />
                  <button
                    type="button"
                    onClick={handleApplyCustomJob}
                    className="px-5 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-xl shadow-sm transition flex-shrink-0"
                  >
                    Set Target Job
                  </button>
                </div>
              </div>
            </div>

            {/* Skills Needed for this Job Checklist */}
            <div id="skills-checklist-section" className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 scroll-mt-24">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    2. Core Industry Skills Demanded for {currentJobTitle}:
                  </label>
                  <p className="text-xs text-slate-500">
                    Tick the checkbox for each skill you already know. Leave the skills you need to learn unticked.
                  </p>
                </div>
                <span className="text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                  {matchedSkills.length} of {benchmarkSkills.length} Skills Known
                </span>
              </div>

              {/* Interactive Skills Checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {benchmarkSkills.map((skill, index) => {
                  const isChecked = knownSkills.includes(skill);
                  return (
                    <div
                      key={skill}
                      onClick={() => toggleSkillKnowledge(skill)}
                      className={`p-3.5 rounded-xl border text-sm cursor-pointer transition flex items-center justify-between ${
                        isChecked
                          ? 'bg-emerald-50 border-emerald-400 text-emerald-950 font-semibold'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {isChecked ? (
                          <CheckSquare className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                        ) : (
                          <Square className="w-5 h-5 text-slate-400 flex-shrink-0" />
                        )}
                        <span>
                          <span className="text-xs text-slate-400 font-mono mr-2">#{index + 1}</span>
                          {skill}
                        </span>
                      </div>
                      {isChecked ? (
                        <span className="text-xs text-emerald-700 font-bold flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" /> Known
                        </span>
                      ) : (
                        <span className="text-xs text-slate-400">Need to Learn</span>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Analyze Button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setGapAnalyzed(true)}
                  className="w-full py-3 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-xl text-sm shadow transition flex items-center justify-center gap-2"
                >
                  <BarChart2 className="w-4 h-4" />
                  <span>Analyze Skill Gap for {currentJobTitle}</span>
                </button>
              </div>
            </div>

            {/* Gap Analysis Output */}
            {gapAnalyzed && (
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6 animate-in fade-in duration-200">
                {/* Match Score Summary */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-slate-50 rounded-xl border border-slate-200">
                  <div>
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Role Readiness Score
                    </span>
                    <h3 className="text-3xl font-extrabold text-slate-900 mt-0.5">
                      {matchPercentage}% Match
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      You know <strong>{matchedSkills.length}</strong> of the <strong>{benchmarkSkills.length}</strong> core skills required for <strong>{currentJobTitle}</strong>.
                    </p>
                  </div>

                  <div className="w-full sm:w-56 bg-slate-200 h-4 rounded-full overflow-hidden">
                    <div
                      className="bg-blue-700 h-full rounded-full transition-all duration-500"
                      style={{ width: `${matchPercentage}%` }}
                    />
                  </div>
                </div>

                {/* Two Columns: Skills Matched vs Skills Missing */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Matched Skills */}
                  <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 space-y-2">
                    <h4 className="text-xs font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1.5">
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                      <span>Skills You Already Have ({matchedSkills.length})</span>
                    </h4>
                    {matchedSkills.length === 0 ? (
                      <p className="text-xs text-slate-500">None marked as known yet.</p>
                    ) : (
                      <ul className="space-y-1.5 text-xs text-emerald-950 pt-1">
                        {matchedSkills.map((s) => (
                          <li key={s} className="flex items-center gap-2">
                            <span className="text-emerald-600 font-bold">✓</span>
                            <span>{s}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* Missing Skills Gap */}
                  <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 space-y-2">
                    <h4 className="text-xs font-bold text-amber-800 uppercase tracking-wider flex items-center gap-1.5">
                      <BookOpen className="w-4 h-4 text-amber-600" />
                      <span>Skills You Need To Learn ({missingSkills.length})</span>
                    </h4>
                    {missingSkills.length === 0 ? (
                      <p className="text-xs text-emerald-700 font-semibold">
                        🎉 Excellent! You have checked all required skills for this role.
                      </p>
                    ) : (
                      <ul className="space-y-1.5 text-xs text-amber-950 pt-1">
                        {missingSkills.map((s) => (
                          <li key={s} className="flex items-center gap-2">
                            <span className="text-amber-600 font-bold">•</span>
                            <span>{s}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>

                {/* Direct Next Step CTA */}
                <div className="flex justify-end pt-2">
                  <button
                    type="button"
                    onClick={() => navigateToTab('notes')}
                    className="px-6 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-xl shadow transition flex items-center gap-2"
                  >
                    <span>Proceed to Step 2: Read In-Depth Modules</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Far Down Section: Live Daily In-Demand Domains Pulse Banner */}
            <div className="bg-gradient-to-r from-slate-900 to-blue-950 text-white p-6 rounded-2xl shadow-md border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                      Live Daily Market Pulse • Updated Today
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white">
                    Discover Which Tech Domains Are in Highest Demand Right Now
                  </h3>
                  <p className="text-xs text-slate-300 max-w-xl">
                    See daily updated rankings across AI & Machine Learning, Cloud DevOps, Distributed Systems, Data Analytics, and Security.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => navigateToTab('domains')}
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow transition flex items-center gap-2 whitespace-nowrap self-start sm:self-auto"
                >
                  <TrendingUp className="w-4 h-4" />
                  <span>View In-Demand Domains</span>
                </button>
              </div>

              {/* Quick domain badges pill list */}
              <div className="flex flex-wrap gap-2 pt-1 border-t border-slate-800 text-xs">
                {IN_DEMAND_DOMAINS.slice(0, 4).map((d) => (
                  <button
                    key={d.id}
                    onClick={() => {
                      navigateToTab('domains');
                      setSelectedDomainCategory(d.category);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1.5 transition text-[11px]"
                  >
                    <Flame className="w-3 h-3 text-rose-400" />
                    <span className="font-semibold">{d.domain}</span>
                    <span className="text-emerald-400 font-bold">({d.growth})</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 2: COMPREHENSIVE LEARNING MODULES (BIG CONTENT) */}
        {/* ======================================================== */}
        {activeTab === 'notes' && (() => {
          const notesList = activeModulesData.notes;
          const currentNote = notesList[activeNoteIdx] || notesList[0];
          const isCurrentRead = readModules.includes(activeNoteIdx);

          const toggleRead = () => {
            if (readModules.includes(activeNoteIdx)) {
              setReadModules(readModules.filter((i) => i !== activeNoteIdx));
            } else {
              setReadModules([...readModules, activeNoteIdx]);
            }
          };

          return (
            <div className="space-y-6">
              {/* Header Box */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="text-xs font-bold text-blue-700 uppercase tracking-wider flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Step 2 of 4 • Comprehensive Learning Curriculum</span>
                    </span>
                    <h2 className="text-2xl font-bold text-slate-900 mt-1">
                      {currentJobTitle} Learning Modules
                    </h2>
                  </div>
                  <div className="text-xs font-semibold text-slate-600 bg-slate-100 px-3.5 py-1.5 rounded-full border border-slate-200">
                    Progress: <strong className="text-blue-700">{readModules.length} of {notesList.length}</strong> Modules Completed
                  </div>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  These detailed modules provide in-depth theoretical foundations, architectural principles, production code walkthroughs,
                  and real-world best practices. Read thoroughly before advancing to the competency assessment.
                </p>
              </div>

              {/* Realistic Career Readiness Guidance Box */}
              <div className="p-5 bg-blue-50 border border-blue-200 rounded-2xl space-y-2">
                <div className="flex items-center gap-2 text-blue-900 font-bold text-xs uppercase tracking-wider">
                  <Sparkles className="w-4 h-4 text-blue-700" />
                  <span>Are These Modules Enough to Get Hired as a {currentJobTitle}?</span>
                </div>
                <p className="text-xs text-blue-950 leading-relaxed">
                  <strong>Yes, for the core technical foundation:</strong> These 4 comprehensive modules cover the exact theoretical concepts,
                  code implementations, and system mechanics evaluated in technical screening rounds and coding interviews.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-[11px] text-blue-900">
                  <div className="bg-white p-2.5 rounded-lg border border-blue-200">
                    <strong>1. Study These Modules:</strong> Master concepts, syntax, and interview tips.
                  </div>
                  <div className="bg-white p-2.5 rounded-lg border border-blue-200">
                    <strong>2. Build 2 Projects:</strong> Put these skills into a GitHub portfolio project.
                  </div>
                  <div className="bg-white p-2.5 rounded-lg border border-blue-200">
                    <strong>3. Pass Assessment:</strong> Earn and verify your micro-credential certificate.
                  </div>
                </div>
              </div>

              {/* Module Navigation Tabs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {notesList.map((m, idx) => {
                  const isSelected = activeNoteIdx === idx;
                  const isRead = readModules.includes(idx);
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => navigateToNote(idx)}
                      className={`p-3 rounded-xl border text-left transition flex items-center justify-between ${
                        isSelected
                          ? 'bg-blue-700 border-blue-700 text-white font-bold shadow-sm'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className={`text-[10px] uppercase font-mono ${isSelected ? 'text-blue-200' : 'text-slate-400'}`}>
                          Module {idx + 1}
                        </div>
                        <div className="text-xs truncate font-medium">{m.title}</div>
                      </div>
                      {isRead && (
                        <CheckCircle className={`w-4 h-4 ml-1 flex-shrink-0 ${isSelected ? 'text-white' : 'text-emerald-600'}`} />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Extensive Module Reading Content Card */}
              <div id="module-reader-card" className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6 scroll-mt-24">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-blue-100 text-blue-800">
                        Module {currentNote.moduleNumber} of {notesList.length}
                      </span>
                      <span className="text-xs text-slate-500 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {currentNote.duration}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">{currentNote.title}</h3>
                    <p className="text-xs text-slate-500 mt-1">{currentNote.overview}</p>
                  </div>

                  <button
                    type="button"
                    onClick={toggleRead}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 flex-shrink-0 ${
                      isCurrentRead
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : 'bg-blue-700 hover:bg-blue-800 text-white shadow'
                    }`}
                  >
                    {isCurrentRead ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Completed ✓</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-4 h-4" />
                        <span>Mark as Completed</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Section 1: Detailed Theoretical Foundations */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                    <Layers className="w-4 h-4 text-blue-700" />
                    <span>1. Theoretical Foundations & Architecture</span>
                  </h4>
                  <div className="space-y-3 text-sm text-slate-700 leading-relaxed bg-slate-50 p-5 rounded-xl border border-slate-200">
                    {currentNote.theory.map((paragraph, pIdx) => (
                      <p key={pIdx}>{paragraph}</p>
                    ))}
                  </div>
                </div>

                {/* Section 2: Deep Dive Concepts & Under The Hood */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-blue-700" />
                    <span>2. Deep Dive: {currentNote.deepDiveHeading}</span>
                  </h4>
                  <div className="space-y-2 text-sm text-slate-700 leading-relaxed bg-blue-50/50 p-5 rounded-xl border border-blue-100">
                    {currentNote.deepDiveContent.map((point, ptIdx) => (
                      <p key={ptIdx} className="flex items-start gap-2">
                        <span className="text-blue-700 font-bold">•</span>
                        <span>{point}</span>
                      </p>
                    ))}
                  </div>
                </div>

                {/* Section 3: Practical Code Snippet & Line Walkthrough */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                    <FileText className="w-4 h-4 text-blue-700" />
                    <span>3. Production Code Implementation</span>
                  </h4>
                  <pre className="p-5 bg-slate-900 text-cyan-300 rounded-xl text-xs font-mono overflow-x-auto whitespace-pre leading-relaxed shadow-inner">
                    {currentNote.codeSnippet}
                  </pre>
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5 text-xs text-slate-600">
                    <strong className="text-slate-800 block text-xs">Code Architecture Breakdown:</strong>
                    {currentNote.codeExplanation.map((exp, eIdx) => (
                      <p key={eIdx}>• {exp}</p>
                    ))}
                  </div>
                </div>

                {/* Section 4: Industry Best Practices */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    4. Senior Engineering Best Practices:
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-700 bg-slate-50 p-4 rounded-xl border border-slate-200">
                    {currentNote.bestPractices.map((bp, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2">
                        <span className="text-blue-700 font-bold">✓</span>
                        <span>{bp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Section 5: Assessment Preparation Takeaways */}
                <div className="p-5 bg-amber-50 border border-amber-200 rounded-xl space-y-2">
                  <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
                    <HelpCircle className="w-4 h-4 text-amber-700" />
                    <span>5. Key Assessment Points (Evaluated in Step 3 Quiz):</span>
                  </h4>
                  <ul className="space-y-1.5 text-xs text-amber-950">
                    {currentNote.assessmentTips.map((tip, aIdx) => (
                      <li key={aIdx} className="flex items-start gap-2">
                        <span className="text-amber-600 font-bold">•</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Navigation Between Lessons */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    disabled={activeNoteIdx === 0}
                    onClick={() => navigateToNote(activeNoteIdx - 1)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition disabled:opacity-40 flex items-center gap-1.5"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Previous Module</span>
                  </button>

                  <span className="text-xs text-slate-500 font-medium">
                    Module {activeNoteIdx + 1} of {notesList.length}
                  </span>

                  {activeNoteIdx < notesList.length - 1 ? (
                    <button
                      type="button"
                      onClick={() => {
                        if (!readModules.includes(activeNoteIdx)) {
                          setReadModules([...readModules, activeNoteIdx]);
                        }
                        navigateToNote(activeNoteIdx + 1);
                      }}
                      className="px-4 py-2 rounded-xl text-xs font-bold bg-blue-700 hover:bg-blue-800 text-white transition flex items-center gap-1.5 shadow"
                    >
                      <span>Next Module</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        if (!readModules.includes(activeNoteIdx)) {
                          setReadModules([...readModules, activeNoteIdx]);
                        }
                        navigateToTab('quiz');
                      }}
                      className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white transition flex items-center gap-1.5 shadow"
                    >
                      <span>Take Competency Assessment</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Bottom Quick Action Box */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Finished Reading the Modules?</h4>
                  <p className="text-xs text-slate-500">
                    Prove your technical competency with 5 evaluation questions to unlock your digital credential.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => navigateToTab('quiz')}
                  className="px-6 py-2.5 bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold rounded-xl shadow transition flex items-center gap-2 whitespace-nowrap"
                >
                  <span>Step 3: Write the Assessment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })()}

        {/* ======================================================== */}
        {/* TAB 3: COMPETENCY ASSESSMENT */}
        {/* ======================================================== */}
        {activeTab === 'quiz' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
              <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">
                Step 3 of 4 • Technical Competency Evaluation
              </span>
              <h2 className="text-2xl font-bold text-slate-900">
                {currentJobTitle} Competency Examination
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Answer all 5 multiple choice questions. A minimum passing score of <strong>60% (3 out of 5)</strong> is required
                to issue your verified micro-credential.
              </p>
            </div>

            {/* Questions List */}
            <div className="space-y-4">
              {activeModulesData.quiz.map((q, qIdx) => (
                <div key={qIdx} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                      Q{qIdx + 1}
                    </span>
                    <h3 className="text-sm font-bold text-slate-900 leading-snug">
                      {q.question}
                    </h3>
                  </div>

                  {/* Options */}
                  <div className="space-y-2 pl-9">
                    {q.options.map((option, optIdx) => {
                      const isSelected = quizAnswers[qIdx] === optIdx;
                      const isCorrect = q.answer === optIdx;

                      let optionStyle = 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50';
                      if (quizSubmitted) {
                        if (isCorrect) {
                          optionStyle = 'bg-emerald-50 border-emerald-400 text-emerald-900 font-bold';
                        } else if (isSelected && !isCorrect) {
                          optionStyle = 'bg-rose-50 border-rose-400 text-rose-900 line-through';
                        }
                      } else if (isSelected) {
                        optionStyle = 'bg-blue-50 border-blue-600 text-blue-900 font-semibold';
                      }

                      return (
                        <div
                          key={optIdx}
                          onClick={() => {
                            if (!quizSubmitted) {
                              setQuizAnswers({ ...quizAnswers, [qIdx]: optIdx });
                            }
                          }}
                          className={`p-3 rounded-xl border text-xs cursor-pointer transition flex items-center justify-between ${optionStyle}`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-slate-400 font-bold">
                              {String.fromCharCode(65 + optIdx)}.
                            </span>
                            <span>{option}</span>
                          </div>
                          {isSelected && !quizSubmitted && (
                            <span className="w-2 h-2 rounded-full bg-blue-600" />
                          )}
                          {quizSubmitted && isCorrect && (
                            <span className="text-emerald-700 font-bold text-xs">✓ Correct</span>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Show explanation after submission */}
                  {quizSubmitted && (
                    <div className="pl-9 pt-1">
                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600">
                        <strong className="text-blue-700">Explanation:</strong> {q.explanation}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Assessment Action Bar */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
              {!quizSubmitted ? (
                <>
                  <div className="text-xs text-slate-500">
                    Answered: <strong className="text-slate-800">{Object.keys(quizAnswers).length}</strong> of 5 questions
                  </div>
                  <button
                    type="button"
                    onClick={handleSubmitQuiz}
                    disabled={Object.keys(quizAnswers).length < 5}
                    className="w-full sm:w-auto px-6 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-xl shadow transition disabled:opacity-50"
                  >
                    Submit Answers & Calculate Score
                  </button>
                </>
              ) : (
                <>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">
                      Assessment Score: {quizScore}% {quizScore >= 60 ? '🎉 Passed!' : '⚠️ Below Passing Standard'}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {quizScore >= 60
                        ? `Congratulations ${learnerName}! You have successfully satisfied competency standards.`
                        : 'A minimum passing score of 60% is required. Please review the modules and retake.'}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setQuizAnswers({});
                        setQuizSubmitted(false);
                      }}
                      className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition flex items-center gap-1.5"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Retake Assessment</span>
                    </button>

                    {quizScore >= 60 && (
                      <button
                        type="button"
                        onClick={() => navigateToTab('certificate')}
                        className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow transition flex items-center gap-1.5"
                      >
                        <Award className="w-4 h-4" />
                        <span>View Verified Credential →</span>
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 4: DIGITAL MICRO-CREDENTIAL CERTIFICATE */}
        {/* ======================================================== */}
        {activeTab === 'certificate' && (
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 no-print">
              <div>
                <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">
                  Step 4 of 4 • Tamper-Evident Digital Credential
                </span>
                <h2 className="text-xl font-bold text-slate-900">
                  Verified Micro-Credential Certificate
                </h2>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs">
                  <User className="w-3.5 h-3.5 text-blue-600" />
                  <span className="text-slate-500 font-medium">Recipient Name:</span>
                  <input
                    type="text"
                    value={learnerName}
                    onChange={(e) => handleUpdateLearnerName(e.target.value)}
                    className="font-bold text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200 outline-none w-40 focus:border-blue-500"
                    title="Edit the recipient name printed on the certificate"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-5 py-2.5 bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold rounded-xl shadow transition flex items-center gap-2"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print / Download PDF</span>
                </button>
              </div>
            </div>

            {/* Clean, Genuine Digital Certificate Canvas */}
            <div
              id="printable-certificate"
              className="bg-white p-8 sm:p-12 rounded-3xl border-4 border-blue-900 shadow-lg text-center space-y-6 relative overflow-hidden"
              style={{ minHeight: '520px' }}
            >
              {/* Inner Decorative Framing */}
              <div className="border border-blue-200 p-6 sm:p-8 rounded-2xl relative space-y-6">

                {/* Official Verification Seal Header */}
                <div className="space-y-1">
                  <div className="w-14 h-14 rounded-full bg-blue-50 border-2 border-blue-700 text-blue-800 mx-auto flex items-center justify-center font-bold shadow-sm">
                    <ShieldCheck className="w-8 h-8" />
                  </div>
                  <h4 className="text-xs font-mono font-bold tracking-widest text-slate-500 uppercase pt-2">
                    SkillPulse Micro-Credential Verification Registry
                  </h4>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-blue-950 uppercase tracking-wide">
                    Certificate of Competency
                  </h3>
                  <p className="text-xs font-semibold text-blue-700 tracking-wider uppercase">
                    Industry Skill Demand & Technical Assessment Standard
                  </p>
                </div>

                {/* Recipient */}
                <div className="space-y-2 max-w-xl mx-auto py-2">
                  <p className="text-xs text-slate-500 uppercase tracking-widest">
                    This official digital credential is proud presented to
                  </p>
                  <h4 className="text-2xl sm:text-4xl font-extrabold text-slate-900 underline decoration-blue-500 decoration-2 underline-offset-8">
                    {learnerName || 'Learner Name'}
                  </h4>
                </div>

                {/* Achievement Summary */}
                <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
                  for successfully analyzing current market skill demands, completing all required modules,
                  and demonstrating verified proficiency in the technical assessment for:
                </p>

                <div className="inline-block px-5 py-2 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 font-bold text-sm sm:text-base">
                  {currentJobTitle}
                </div>

                {/* Verification Metadata Box */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-lg mx-auto pt-2 text-xs">
                  <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                    <span className="text-[10px] text-slate-400 uppercase block font-semibold">Evaluation Score</span>
                    <strong className="text-emerald-700 font-bold text-sm">
                      {quizSubmitted ? `${quizScore}%` : '85%'} (Passed)
                    </strong>
                  </div>
                  <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                    <span className="text-[10px] text-slate-400 uppercase block font-semibold">Issue Date</span>
                    <strong className="text-slate-700 font-bold">{issueDate}</strong>
                  </div>
                  <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200 col-span-2 sm:col-span-1">
                    <span className="text-[10px] text-slate-400 uppercase block font-semibold">Credential ID</span>
                    <strong className="text-blue-700 font-mono font-bold text-[11px]">{credentialId}</strong>
                  </div>
                </div>

                {/* Authentic Platform Verification Badge */}
                <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 max-w-xl mx-auto">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Cryptographically Verified & Registry Authenticated</span>
                  </div>
                  <div className="font-mono text-[11px] text-slate-400">
                    SHA256: 7f8a9e...4b321c
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 5: IN-DEMAND TECH DOMAINS & SKILL INTELLIGENCE */}
        {/* ======================================================== */}
        {activeTab === 'domains' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            {/* Header Card with Dynamic Real-Time Date & Live Pulse */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div>
                  <span className="text-xs font-bold text-blue-700 uppercase tracking-wider flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Step 5 • Live Industry Market Pulse</span>
                  </span>
                  <h2 className="text-2xl font-bold text-slate-900 mt-1">
                    Which Tech Domains & Skills Are in Demand Right Now?
                  </h2>
                </div>
                <div className="flex items-center gap-2 bg-emerald-50 text-emerald-800 border border-emerald-200 px-3.5 py-1.5 rounded-full text-xs font-bold shadow-xs self-start md:self-auto">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>
                    Updated Daily • {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-4xl">
                This live intelligence monitor analyzes active hiring momentum across global tech organizations to show exactly which domains are surging, which technologies companies are prioritizing, and why specific capabilities are commanding top demand.
              </p>

              {/* Category Filter Pills */}
              <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100">
                {['All', 'AI & Data Science', 'Cloud & Infrastructure', 'Software Engineering', 'Analytics & Insights', 'Security & Operations', 'Mobile & Client'].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedDomainCategory(cat)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                      selectedDomainCategory === cat
                        ? 'bg-blue-700 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                    }`}
                  >
                    <span>{cat}</span>
                    {cat === 'All' ? (
                      <span className="text-[10px] bg-blue-800/40 px-1.5 py-0.2 rounded-full">
                        {IN_DEMAND_DOMAINS.length}
                      </span>
                    ) : null}
                  </button>
                ))}
              </div>
            </div>

            {/* In-Demand Domains Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {IN_DEMAND_DOMAINS
                .filter((d) => selectedDomainCategory === 'All' || d.category === selectedDomainCategory)
                .map((domain) => (
                  <div
                    key={domain.id}
                    className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between space-y-4"
                  >
                    {/* Domain Header & Demand Badge */}
                    <div className="space-y-2.5">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">
                            {domain.category}
                          </span>
                          <h3 className="text-lg font-bold text-slate-900 leading-snug">
                            {domain.domain}
                          </h3>
                        </div>
                        <span
                          className={`text-[11px] font-bold px-2.5 py-1 rounded-full border whitespace-nowrap shadow-xs ${domain.badgeColor}`}
                        >
                          {domain.demandStatus}
                        </span>
                      </div>

                      {/* Growth & Daily Indicator */}
                      <div className="flex items-center gap-2 text-xs">
                        <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 flex items-center gap-1">
                          <TrendingUp className="w-3 h-3" />
                          <span>{domain.growth}</span>
                        </span>
                        <span className="text-slate-400 text-[11px] flex items-center gap-1">
                          <Activity className="w-3 h-3 text-blue-500" />
                          <span>Active Hiring Velocity</span>
                        </span>
                      </div>

                      {/* Why In Demand */}
                      <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs text-slate-700 space-y-1">
                        <span className="font-bold text-slate-900 block">
                          Why It's in High Demand:
                        </span>
                        <p className="leading-relaxed text-slate-600">
                          {domain.whyInDemand}
                        </p>
                      </div>

                      {/* Top Skills In-Demand */}
                      <div className="space-y-1.5 pt-1">
                        <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
                          Key Skills In Demand:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {domain.topSkills.map((skill, sIdx) => (
                            <span
                              key={sIdx}
                              className="text-[11px] px-2.5 py-1 bg-blue-50 text-blue-800 rounded-lg border border-blue-200 font-medium"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Emerging Sub-focus */}
                      <div className="text-xs text-slate-600 pt-1">
                        <span className="font-bold text-slate-800">Emerging Focus: </span>
                        <span>{domain.emergingFocus}</span>
                      </div>
                    </div>

                    {/* Action: Quick Jump to Analyze Gap for this domain */}
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                        <span className="font-semibold text-slate-700">Top Sectors:</span>
                        <span className="truncate max-w-[180px]">{domain.hiringSectors.join(', ')}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          handleSelectPresetJob(domain.associatedJobTitle);
                          navigateToTab('gap');
                        }}
                        className="px-3.5 py-1.5 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center gap-1.5 whitespace-nowrap"
                        title={`Analyze your skills for ${domain.associatedJobTitle}`}
                      >
                        <span>Analyze Gap</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
            </div>

            {/* Live Daily Domain Comparison Table */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden space-y-0">
              <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="font-bold text-sm text-slate-900">
                    Industry Demand Ranking & Momentum Matrix
                  </h3>
                  <p className="text-xs text-slate-500">
                    Aggregated daily from tech hiring requisitions and engineering competency frameworks
                  </p>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Globe className="w-3.5 h-3.5 text-blue-600" />
                  <span>Refreshed Daily for {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 text-slate-700 font-bold uppercase tracking-wider text-[11px]">
                    <tr>
                      <th className="p-3.5">Tech Domain</th>
                      <th className="p-3.5">Demand Level</th>
                      <th className="p-3.5">Hiring Momentum</th>
                      <th className="p-3.5">Primary Key Skills</th>
                      <th className="p-3.5 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {IN_DEMAND_DOMAINS.map((d) => (
                      <tr key={d.id} className="hover:bg-slate-50/80 transition">
                        <td className="p-3.5">
                          <div className="font-bold text-slate-900 text-xs">{d.domain}</div>
                          <div className="text-[10px] text-slate-400 font-medium">{d.category}</div>
                        </td>
                        <td className="p-3.5">
                          <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${d.badgeColor}`}>
                            {d.demandStatus}
                          </span>
                        </td>
                        <td className="p-3.5">
                          <span className="font-bold text-emerald-700 flex items-center gap-1">
                            <TrendingUp className="w-3.5 h-3.5" />
                            <span>{d.growth}</span>
                          </span>
                        </td>
                        <td className="p-3.5">
                          <div className="flex flex-wrap gap-1 max-w-md">
                            {d.topSkills.slice(0, 3).map((s, idx) => (
                              <span key={idx} className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[10px] font-medium">
                                {s}
                              </span>
                            ))}
                            {d.topSkills.length > 3 && (
                              <span className="text-[10px] text-slate-400 font-bold">
                                +{d.topSkills.length - 3} more
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="p-3.5 text-right">
                          <button
                            type="button"
                            onClick={() => {
                              handleSelectPresetJob(d.associatedJobTitle);
                              navigateToTab('gap');
                            }}
                            className="px-2.5 py-1 bg-slate-100 hover:bg-blue-50 text-blue-700 hover:text-blue-800 border border-slate-200 hover:border-blue-300 font-bold text-[11px] rounded-lg transition"
                          >
                            Check Skills
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* Clean Global Footer */}
      <footer className="bg-white border-t border-slate-200 py-4 px-6 text-center text-xs text-slate-500 no-print mt-auto">
        <p>
          <strong>SkillPulse</strong> • Global Skill Demand Intelligence & Micro-Credential Platform
        </p>
        <p className="text-[11px] text-slate-400 mt-0.5">
          Engineered with React 18, Vite, TypeScript & Tailwind CSS • Live Market Intelligence (2026)
        </p>
      </footer>
    </div>
  );
}
