import { Skill, SkillDemand, JobPosting } from '../models/index.js';
import { extractSkillsFromText, normalizeSkillName } from '../services/skillExtractorService.js';
import { analyzeSkillGap, ROLE_REQUIREMENTS } from '../services/skillGapService.js';

/**
 * @desc    Get all standardized skills with search & category filters
 * @route   GET /api/skills
 * @access  Public
 */
export const getAllSkills = async (req, res, next) => {
  try {
    const { category, trend, search } = req.query;
    const filter = {};

    if (category && category !== 'All') {
      filter.category = category;
    }
    if (trend && trend !== 'All') {
      filter.trend = trend;
    }
    if (search) {
      filter.name = { $regex: search, $options: 'i' };
    }

    const skills = await Skill.find(filter);
    res.status(200).json({
      success: true,
      count: skills.length,
      skills,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get comprehensive global job-market skill demand analytics
 * @route   GET /api/skills/analytics
 * @access  Public
 */
export const getSkillDemandAnalytics = async (req, res, next) => {
  try {
    const { role = 'Full Stack Developer', industry = 'All' } = req.query;

    const allSkills = await Skill.find();
    const jobPostings = await JobPosting.find();

    // Top demanded skills sorted by demand score
    const topInDemand = [...allSkills]
      .sort((a, b) => b.marketDemandScore - a.marketDemandScore)
      .slice(0, 10);

    // Emerging skills
    const emergingSkills = allSkills.filter(s => s.trend === 'emerging');

    // Stable skills
    const stableSkills = allSkills.filter(s => s.trend === 'stable' || s.trend === 'high-demand');

    // Declining skills
    const decliningSkills = allSkills.filter(s => s.trend === 'declining');

    // Industry specific breakdown
    const industryBreakdown = [
      { industry: 'Enterprise SaaS', highDemandSkills: ['React', 'Node.js', 'PostgreSQL', 'Docker', 'AWS'], demandIndex: 94 },
      { industry: 'FinTech & Banking', highDemandSkills: ['Java / Spring Boot', 'Python', 'Kubernetes', 'PostgreSQL', 'System Design'], demandIndex: 91 },
      { industry: 'AI & Data Services', highDemandSkills: ['Python', 'LLM Integration', 'Vector Databases', 'PyTorch', 'FastAPI'], demandIndex: 98 },
      { industry: 'HealthTech', highDemandSkills: ['TypeScript', 'Python', 'AWS', 'Docker', 'HIPAA Compliance'], demandIndex: 87 },
      { industry: 'E-commerce & Retail', highDemandSkills: ['React', 'Next.js', 'Node.js', 'MongoDB', 'Redis'], demandIndex: 89 },
    ];

    // Geographic demand variation
    const geographicDemand = [
      { region: 'North America', topRoles: ['AI Engineer', 'Full Stack Developer', 'Cloud DevOps'], remoteShare: '62%' },
      { region: 'Europe', topRoles: ['Backend Architect', 'Cloud DevOps', 'Full Stack Developer'], remoteShare: '54%' },
      { region: 'Asia-Pacific', topRoles: ['Full Stack Developer', 'Data Analyst', 'AI Specialist'], remoteShare: '48%' },
      { region: 'Remote Global', topRoles: ['Full Stack Developer', 'AI Engineer', 'DevOps Specialist'], remoteShare: '100%' },
    ];

    // Available career paths
    const availableRoles = Object.keys(ROLE_REQUIREMENTS);

    res.status(200).json({
      success: true,
      metadata: {
        dataSource: 'Demonstration Job-Market Intelligence Corpus (ESCO & O*NET Aligned)',
        totalJobsAnalyzed: jobPostings.length || 150,
        lastUpdated: new Date(),
        disclaimer: 'Data derived from structured job-posting demonstration index and labor taxonomy standards.',
      },
      topInDemand,
      emergingSkills,
      stableSkills,
      decliningSkills,
      industryBreakdown,
      geographicDemand,
      availableRoles,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Extract and normalize skills from pasted job description
 * @route   POST /api/skills/extract
 * @access  Public
 */
export const extractSkills = async (req, res, next) => {
  try {
    const { jobDescriptionText } = req.body;

    if (!jobDescriptionText || jobDescriptionText.trim().length < 20) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid job description text (at least 20 characters) for analysis.',
      });
    }

    const extraction = extractSkillsFromText(jobDescriptionText);

    res.status(200).json({
      success: true,
      extraction: {
        totalExtracted: extraction.allExtractedSkills.length,
        technicalSkills: extraction.technicalSkills,
        cloudSkills: extraction.cloudSkills,
        aiSkills: extraction.aiSkills,
        softSkills: extraction.softSkills,
        qualifications: extraction.qualifications,
        experienceRequirement: extraction.experienceRequirement,
        allSkills: extraction.allExtractedSkills,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Perform skill-gap analysis for a learner
 * @route   POST /api/skills/gap-analysis
 * @access  Public
 */
export const performGapAnalysis = async (req, res, next) => {
  try {
    const { targetRole, currentSkills } = req.body;

    if (!targetRole) {
      return res.status(400).json({
        success: false,
        message: 'Please specify targetRole (e.g., Full Stack Developer, AI Engineer, Cloud DevOps Engineer).',
      });
    }

    const gapResult = analyzeSkillGap(targetRole, currentSkills || []);

    res.status(200).json({
      success: true,
      analysis: gapResult,
    });
  } catch (error) {
    next(error);
  }
};
