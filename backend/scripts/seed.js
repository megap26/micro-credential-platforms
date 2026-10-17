import bcrypt from 'bcryptjs';
import {
  User,
  LearnerProfile,
  Skill,
  JobPosting,
  Curriculum,
  CurriculumVersion,
  LearningProgress,
  Assessment,
  AssessmentAttempt,
  Credential,
  IndustryReview,
} from '../models/index.js';
import { SEED_SKILLS, SEED_JOB_POSTINGS } from '../data/seedData.js';
import { SAMPLE_ASSESSMENTS } from '../data/seedAssessments.js';
import { generateVerificationHash } from '../services/credentialService.js';

export const seedDatabase = async () => {
  try {
    const existingSkillsCount = await Skill.countDocuments();
    if (existingSkillsCount > 0) {
      console.log(`ℹ️ Database already contains ${existingSkillsCount} skills. Skipping re-seed.`);
      return;
    }

    console.log('🌱 Seeding SkillPulse database with demonstration datasets...');

    // 1. Seed Skills
    await Skill.insertMany(SEED_SKILLS);
    console.log(`✅ Seeded ${SEED_SKILLS.length} standardized skills.`);

    // 2. Seed Job Postings
    await JobPosting.insertMany(SEED_JOB_POSTINGS);
    console.log(`✅ Seeded ${SEED_JOB_POSTINGS.length} job postings.`);

    // 3. Seed Users
    const hashedPassword = await bcrypt.hash('Password123!', 10);
    const adminHashed = await bcrypt.hash('AdminSecret2026!', 10);

    const learnerUser = await User.create({
      name: 'Alex Vance',
      email: 'alex.dev@example.com',
      password: hashedPassword,
      role: 'learner',
    });

    const adminUser = await User.create({
      name: 'Dr. Marcus Vance (Admin)',
      email: 'admin@skillpulse.ai',
      password: adminHashed,
      role: 'admin',
    });

    const reviewerUser = await User.create({
      name: 'Elena Rostova (Industry Reviewer)',
      email: 'reviewer@cloudstandards.org',
      password: adminHashed,
      role: 'industry_reviewer',
    });

    console.log('✅ Seeded demo users (Learner, Admin, Reviewer).');

    // 4. Seed Learner Profile for Alex
    await LearnerProfile.create({
      userId: learnerUser._id,
      targetCareer: 'Full Stack Developer',
      currentSkills: [
        { name: 'JavaScript', category: 'Technical', proficiency: 'Advanced', yearsOfExperience: 3 },
        { name: 'HTML5 & CSS3', category: 'Technical', proficiency: 'Advanced', yearsOfExperience: 3 },
        { name: 'React', category: 'Technical', proficiency: 'Intermediate', yearsOfExperience: 1 },
        { name: 'Node.js', category: 'Technical', proficiency: 'Beginner', yearsOfExperience: 1 },
        { name: 'Git / GitHub', category: 'Technical', proficiency: 'Intermediate', yearsOfExperience: 2 },
        { name: 'Problem Solving', category: 'Soft skills', proficiency: 'Advanced', yearsOfExperience: 3 },
      ],
      preferredLocation: 'Remote Global',
      learningGoals: 'Master production full-stack engineering and cloud micro-credential certification.',
      overallMatchScore: 68,
    });

    // 5. Seed an active Curriculum for Alex
    const demoCurriculum = await Curriculum.create({
      userId: learnerUser._id,
      title: 'Full Stack Developer: Modern Cloud-Native Engineering & Micro-Credentials',
      shortDescription: 'Master production-grade React, Node.js RESTful APIs, containerized deployments, and resilient database architectures.',
      targetJobRole: 'Full Stack Developer',
      badgeLevel: 'Specialist',
      alignmentScore: 94,
      prerequisites: ['JavaScript ES6 fundamentals', 'Web browser architecture', 'Terminal commands'],
      targetCompetencies: [
        'Component Architecture & Reactive State Management',
        'Secure RESTful API Design & JWT Session Handling',
        'Containerization & Cloud Infrastructure (Docker & AWS)',
        'Schema Modeling & Query Optimization with MongoDB & PostgreSQL',
      ],
      learningOutcomes: [
        'Architect scalable frontend applications using React 18 and TypeScript',
        'Build performant, authenticated backend services using Express and Mongoose',
        'Deploy containerized full-stack applications with Docker and CI/CD pipelines',
      ],
      modules: [
        {
          id: 'mod-1',
          title: 'Advanced React 18 & State Architecture',
          description: 'Deep dive into modern React paradigms, custom hooks, memoization, and complex state management.',
          estimatedHours: 6,
          topics: ['React Fiber & Concurrent Modes', 'Custom Hooks & Reusable Logic', 'Context API vs Zustand', 'DevTools Performance Profiling'],
          practicalExercises: ['Implement useDebounce and useLocalStorage', 'Refactor state to Zustand store'],
          miniProject: {
            title: 'Real-Time Analytical Dashboard',
            instructions: 'Build a multi-widget dashboard displaying dynamic streaming charts.',
            submissionCriteria: 'Clean modular components, responsive layout, zero console errors.'
          },
          status: 'completed'
        },
        {
          id: 'mod-2',
          title: 'Secure Node.js & Express RESTful API Engineering',
          description: 'Design robust microservices with schema validation, rate-limiting, and cryptographic authentication.',
          estimatedHours: 6,
          topics: ['Express Middleware Pipelines', 'JWT Lifecycle & HTTP-only Cookies', 'NoSQL Injection Prevention', 'OpenAPI Documentation'],
          practicalExercises: ['Build authentication route with bcrypt', 'Implement centralized error handling'],
          miniProject: {
            title: 'Resilient Microservice Auth Gateway',
            instructions: 'Construct an authentication microservice with JWT issuance and role-based access.',
            submissionCriteria: 'Sanitized request bodies, rate limiting, and 80%+ test coverage.'
          },
          status: 'completed'
        },
        {
          id: 'mod-3',
          title: 'Modern Persistence: MongoDB & Relational Database Design',
          description: 'Master NoSQL document modeling, indexing strategies, ACID transactions, and hybrid relational queries.',
          estimatedHours: 5,
          topics: ['Document Modeling: Embedding vs Referencing', 'Compound Indexes & Execution Plans', 'MongoDB Aggregation Pipelines', 'PostgreSQL Schema Joins'],
          practicalExercises: ['Design an e-commerce schema', 'Optimize aggregation query with explain()'],
          miniProject: {
            title: 'High-Throughput Analytics Aggregation Pipeline',
            instructions: 'Develop an aggregation pipeline calculating real-time sales trends and rolling averages.',
            submissionCriteria: 'Execution time under 50ms with compound index verification.'
          },
          status: 'completed'
        },
        {
          id: 'mod-4',
          title: 'Containerization, DevOps & Production Cloud Delivery',
          description: 'Package applications into lightweight OCI containers and deploy with automated CI/CD workflows.',
          estimatedHours: 7,
          topics: ['Multi-Stage Dockerfiles', 'Docker Compose Multi-Service', 'GitHub Actions CI/CD Pipeline', 'AWS Cloud Deployment'],
          practicalExercises: ['Author multi-stage Dockerfile shrinking image size', 'Configure local compose stack'],
          miniProject: {
            title: 'Production-Ready CI/CD Automated Deployment',
            instructions: 'Containerize a full-stack web application with automated GitHub Actions pipeline.',
            submissionCriteria: 'Passes automated CI builds, uses non-root container users.'
          },
          status: 'completed'
        }
      ],
      totalEstimatedDurationHours: 24,
      passingScorePercent: 75,
      version: 'v1.0',
      generatedBy: 'rule_engine_demonstration',
      isSaved: true,
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    });

    // 6. Seed Learning Progress (100% completed so user can test certificate issuance or retake)
    await LearningProgress.create({
      userId: learnerUser._id,
      curriculumId: demoCurriculum._id,
      overallProgressPercent: 100,
      completedModules: ['mod-1', 'mod-2', 'mod-3', 'mod-4'],
      currentModuleId: 'mod-4',
      notes: 'Completed all 4 modules. Ready for final micro-credential certification exam.',
      lastAccessedAt: new Date(),
    });

    // 7. Seed Assessment
    const assessment = await Assessment.create({
      curriculumId: demoCurriculum._id,
      title: `${demoCurriculum.title} - Competency Certification Exam`,
      description: 'Comprehensive evaluation of practical skills and theoretical concepts for Full Stack Developer.',
      targetRole: 'Full Stack Developer',
      passingScorePercent: 75,
      timeLimitMinutes: 20,
      questions: SAMPLE_ASSESSMENTS['Full Stack Developer'].questions,
    });

    // 8. Seed Passed Assessment Attempt
    await AssessmentAttempt.create({
      userId: learnerUser._id,
      curriculumId: demoCurriculum._id,
      assessmentId: assessment._id,
      attemptNumber: 1,
      scorePercent: 100,
      passed: true,
      timeSpentSeconds: 420,
      feedback: 'Outstanding performance! You scored 100% and fulfilled all micro-credential verification criteria.',
      completedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    });

    // 9. Seed Verified Credential
    const credentialId = 'CRED-2026-F9A2-881B';
    const issueDate = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000);
    const verificationHash = generateVerificationHash({
      credentialId,
      learnerEmail: learnerUser.email,
      microCredentialTitle: demoCurriculum.title,
      scorePercent: 100,
      issueDate,
    });

    await Credential.create({
      credentialId,
      userId: learnerUser._id,
      learnerName: learnerUser.name,
      learnerEmail: learnerUser.email,
      curriculumId: demoCurriculum._id,
      microCredentialTitle: demoCurriculum.title,
      targetRole: demoCurriculum.targetJobRole,
      competencies: demoCurriculum.targetCompetencies,
      scorePercent: 100,
      issueDate,
      issuingPlatform: 'SkillPulse Global Credential Registry',
      verificationHash,
      status: 'valid',
      badgeTier: 'Diamond',
    });

    // 10. Seed Industry Review
    await IndustryReview.create({
      curriculumId: demoCurriculum._id,
      reviewerId: reviewerUser._id,
      reviewerName: reviewerUser.name,
      reviewerOrganization: 'Global Cloud Talent Standards Consortium',
      rating: 5,
      relevanceScore: 98,
      marketAlignmentFeedback: 'Curriculum exhibits outstanding fidelity to live employer tech stacks in 2026, notably combining React 18, container security, and schema optimization.',
      approvedStamp: true,
      reviewedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    });

    console.log(`✅ Sample credential generated: ${credentialId}`);
    console.log('🎉 Database seeding completed successfully.');
  } catch (err) {
    console.error('❌ Seeding error:', err);
  }
};
