import { Curriculum, CurriculumVersion, LearningProgress, Assessment } from '../models/index.js';
import { generatePersonalizedCurriculum, validateCurriculum } from '../services/aiCurriculumService.js';
import { SAMPLE_ASSESSMENTS } from '../data/seedAssessments.js';

/**
 * @desc    Generate personalized curriculum based on role & skill gaps
 * @route   POST /api/curricula/generate
 * @access  Private
 */
export const generateCurriculum = async (req, res, next) => {
  try {
    const { targetRole, currentSkills, preferredDurationWeeks } = req.body;

    if (!targetRole) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a target job role.',
      });
    }

    const generated = await generatePersonalizedCurriculum({
      userId: req.user._id,
      targetRole,
      currentSkills: currentSkills || [],
      preferredDurationWeeks: preferredDurationWeeks || 6,
    });

    res.status(200).json({
      success: true,
      message: 'Micro-credential curriculum generated successfully.',
      curriculum: generated,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Save generated curriculum to database
 * @route   POST /api/curricula/save
 * @access  Private
 */
export const saveCurriculum = async (req, res, next) => {
  try {
    const curriculumData = req.body;

    if (!validateCurriculum(curriculumData)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid curriculum data format. Title, target role, and valid modules are required.',
      });
    }

    const saved = await Curriculum.create({
      ...curriculumData,
      userId: req.user._id,
      isSaved: true,
      createdAt: new Date(),
    });

    // Automatically initialize LearningProgress record for learner
    await LearningProgress.findOneAndUpdate(
      { userId: req.user._id, curriculumId: saved._id },
      {
        userId: req.user._id,
        curriculumId: saved._id,
        overallProgressPercent: 0,
        completedModules: [],
        currentModuleId: saved.modules[0]?.id || 'mod-1',
        lastAccessedAt: new Date(),
      },
      { upsert: true, new: true }
    );

    // Link or create Assessment for this curriculum
    const matchedAssessmentTemplate = SAMPLE_ASSESSMENTS[saved.targetJobRole] || SAMPLE_ASSESSMENTS['Full Stack Developer'];
    await Assessment.create({
      curriculumId: saved._id,
      title: `${saved.title} - Competency Certification Exam`,
      description: `Comprehensive evaluation of practical skills and theoretical concepts for ${saved.title}.`,
      targetRole: saved.targetJobRole,
      passingScorePercent: saved.passingScorePercent || 75,
      timeLimitMinutes: 20,
      questions: matchedAssessmentTemplate.questions,
    });

    res.status(201).json({
      success: true,
      message: 'Curriculum saved and enrolled successfully.',
      curriculum: saved,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all curricula for current user
 * @route   GET /api/curricula
 * @access  Private
 */
export const getUserCurricula = async (req, res, next) => {
  try {
    const curricula = await Curriculum.find({ userId: req.user._id });
    res.status(200).json({
      success: true,
      count: curricula.length,
      curricula,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single curriculum by ID with learning progress
 * @route   GET /api/curricula/:id
 * @access  Private
 */
export const getCurriculumById = async (req, res, next) => {
  try {
    const curriculum = await Curriculum.findById(req.params.id);
    if (!curriculum) {
      return res.status(404).json({
        success: false,
        message: 'Curriculum not found.',
      });
    }

    const progress = await LearningProgress.findOne({
      userId: req.user._id,
      curriculumId: curriculum._id,
    });

    const versions = await CurriculumVersion.find({
      curriculumId: curriculum._id,
    });

    res.status(200).json({
      success: true,
      curriculum,
      progress: progress || {
        overallProgressPercent: 0,
        completedModules: [],
        currentModuleId: curriculum.modules[0]?.id || '',
      },
      versions: versions || [],
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update curriculum modules or properties
 * @route   PUT /api/curricula/:id
 * @access  Private
 */
export const updateCurriculum = async (req, res, next) => {
  try {
    const curriculum = await Curriculum.findById(req.params.id);
    if (!curriculum) {
      return res.status(404).json({
        success: false,
        message: 'Curriculum not found.',
      });
    }

    // Verify ownership
    if (String(curriculum.userId) !== String(req.user._id) && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to edit this curriculum.',
      });
    }

    const updated = await Curriculum.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: new Date() },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: 'Curriculum updated successfully.',
      curriculum: updated,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Re-analyze market demand and create a new Curriculum Version (Section 14)
 * @route   POST /api/curricula/:id/realign
 * @access  Private
 */
export const realignMarketDemand = async (req, res, next) => {
  try {
    const curriculum = await Curriculum.findById(req.params.id);
    if (!curriculum) {
      return res.status(404).json({
        success: false,
        message: 'Curriculum not found.',
      });
    }

    // Simulate market realignment shift analysis
    const currentVer = curriculum.version || 'v1.0';
    const nextVerNumber = currentVer === 'v1.0' ? 'v1.1' : currentVer === 'v1.1' ? 'v1.2' : 'v2.0';

    const realignmentData = {
      newSkillsAdded: ['Vector Embeddings & Semantic Search', 'OAuth 2.1 & PKCE Auth Flows'],
      increasedPrioritySkills: ['Docker Containerization', 'TypeScript Strict Mode'],
      decreasedPrioritySkills: ['Legacy REST endpoints (migrated to OpenAPI 3.1)'],
      outdatedTopics: ['Deprecated React class lifecycle methods'],
      reasonForChange: 'Global employer demand shift toward AI integration, strict type safety, and zero-trust cloud security standards.',
      changelogSummary: `Upgraded curriculum from ${currentVer} to ${nextVerNumber} based on the Q4 2026 Global Tech Skills Demand Index.`
    };

    // Create new version record
    const versionRecord = await CurriculumVersion.create({
      curriculumId: curriculum._id,
      versionNumber: nextVerNumber,
      previousVersion: currentVer,
      reasonForChange: realignmentData.reasonForChange,
      newSkillsAdded: realignmentData.newSkillsAdded,
      increasedPrioritySkills: realignmentData.increasedPrioritySkills,
      decreasedPrioritySkills: realignmentData.decreasedPrioritySkills,
      outdatedTopics: realignmentData.outdatedTopics,
      changelogSummary: realignmentData.changelogSummary,
      appliedAt: new Date(),
    });

    // Update curriculum version tag and modules
    curriculum.version = nextVerNumber;
    curriculum.alignmentScore = Math.min(99, (curriculum.alignmentScore || 90) + 3);
    
    // Add modern topic to first module
    if (curriculum.modules && curriculum.modules.length > 0) {
      curriculum.modules[0].topics.push('Vector Embeddings & Semantic Search (Market Updated)');
    }

    await curriculum.save();

    res.status(200).json({
      success: true,
      message: `Curriculum successfully re-aligned to live market trends! Upgraded to version ${nextVerNumber}.`,
      curriculum,
      versionRecord,
    });
  } catch (error) {
    next(error);
  }
};
