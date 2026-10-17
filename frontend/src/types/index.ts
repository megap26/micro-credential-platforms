export interface User {
  id: string;
  name: string;
  email: string;
  role: 'learner' | 'admin' | 'industry_reviewer';
}

export interface SkillItem {
  name: string;
  category?: string;
  proficiency: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  yearsOfExperience?: number;
}

export interface LearnerProfile {
  _id?: string;
  userId: string;
  targetCareer: string;
  currentSkills: SkillItem[];
  preferredLocation: string;
  learningGoals: string;
  overallMatchScore: number;
  updatedAt?: string;
}

export interface Skill {
  _id?: string;
  name: string;
  normalizedName: string;
  category: 'Technical' | 'Domain-specific' | 'Soft skills' | 'Cloud & DevOps' | 'AI & Machine Learning';
  taxonomyCode: string;
  marketDemandScore: number;
  trend: 'high-demand' | 'emerging' | 'stable' | 'declining';
  demandFrequencyPercent: number;
  growthRatePercent: number;
  description: string;
}

export interface JobPosting {
  _id?: string;
  title: string;
  company: string;
  location: string;
  workplaceType: 'remote' | 'hybrid' | 'on-site';
  industry: string;
  experienceLevel: string;
  salaryRange: string;
  rawDescription: string;
  extractedSkills: string[];
  source: string;
  postedDate: string;
}

export interface CurriculumModule {
  id: string;
  title: string;
  description: string;
  estimatedHours: number;
  topics: string[];
  practicalExercises: string[];
  miniProject: {
    title: string;
    instructions: string;
    submissionCriteria: string;
  };
  status?: 'not-started' | 'in-progress' | 'completed';
}

export interface Curriculum {
  _id?: string;
  userId?: string;
  title: string;
  shortDescription: string;
  targetJobRole: string;
  badgeLevel: 'Associate' | 'Specialist' | 'Professional' | 'Master';
  alignmentScore: number;
  prerequisites: string[];
  targetCompetencies: string[];
  learningOutcomes: string[];
  modules: CurriculumModule[];
  totalEstimatedDurationHours: number;
  passingScorePercent: number;
  version: string;
  generatedBy: 'ai_gemini' | 'ai_openai' | 'rule_engine_demonstration';
  isSaved?: boolean;
  createdAt?: string;
}

export interface CurriculumVersion {
  _id: string;
  curriculumId: string;
  versionNumber: string;
  previousVersion: string;
  reasonForChange: string;
  newSkillsAdded: string[];
  increasedPrioritySkills: string[];
  decreasedPrioritySkills: string[];
  outdatedTopics: string[];
  changelogSummary: string;
  appliedAt: string;
}

export interface LearningProgress {
  _id?: string;
  userId: string;
  curriculumId: string;
  overallProgressPercent: number;
  completedModules: string[];
  currentModuleId: string;
  notes?: string;
  lastAccessedAt: string;
}

export interface AssessmentQuestion {
  index: number;
  id: string;
  questionText: string;
  codeSnippet?: string;
  options: string[];
  competencyTag: string;
  difficulty: string;
}

export interface AssessmentData {
  _id: string;
  curriculumId: string;
  title: string;
  description: string;
  targetRole: string;
  passingScorePercent: number;
  timeLimitMinutes: number;
  questionsCount: number;
  questions: AssessmentQuestion[];
}

export interface GradedDetail {
  questionIndex: number;
  questionText: string;
  options: string[];
  selectedOptionIndex: number;
  correctOptionIndex: number;
  isCorrect: boolean;
  explanation: string;
  competencyTag: string;
}

export interface AssessmentAttemptResult {
  _id: string;
  attemptNumber: number;
  scorePercent: number;
  passed: boolean;
  passingScorePercent: number;
  correctCount: number;
  totalQuestions: number;
  timeSpentSeconds: number;
  feedback: string;
  gradedDetails: GradedDetail[];
}

export interface Credential {
  _id?: string;
  credentialId: string;
  userId?: string;
  learnerName: string;
  learnerEmail?: string;
  curriculumId: string;
  microCredentialTitle: string;
  targetRole: string;
  competencies: string[];
  scorePercent: number;
  badgeTier: 'Silver' | 'Gold' | 'Platinum' | 'Diamond';
  issueDate: string;
  expirationDate: string;
  issuingPlatform: string;
  verificationHash: string;
  status: 'valid' | 'revoked';
}

export interface IndustryReview {
  _id?: string;
  curriculumId: string;
  reviewerName: string;
  reviewerOrganization: string;
  rating: number;
  relevanceScore: number;
  marketAlignmentFeedback: string;
  approvedStamp: boolean;
  reviewedAt: string;
}
