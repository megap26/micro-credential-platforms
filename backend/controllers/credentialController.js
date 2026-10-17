import { Credential, Curriculum, AssessmentAttempt } from '../models/index.js';
import { generateCredentialId, generateVerificationHash, computeBadgeTier } from '../services/credentialService.js';

/**
 * @desc    Issue a verified digital micro-credential after passing assessment
 * @route   POST /api/credentials/issue
 * @access  Private
 */
export const issueCredential = async (req, res, next) => {
  try {
    const { curriculumId } = req.body;

    if (!curriculumId) {
      return res.status(400).json({
        success: false,
        message: 'Please provide curriculumId to issue credential.',
      });
    }

    const curriculum = await Curriculum.findById(curriculumId);
    if (!curriculum) {
      return res.status(404).json({
        success: false,
        message: 'Curriculum not found.',
      });
    }

    // Check if user already holds a valid credential for this curriculum
    const existing = await Credential.findOne({
      userId: req.user._id,
      curriculumId,
      status: 'valid',
    });

    if (existing) {
      return res.status(200).json({
        success: true,
        message: 'Micro-credential was already issued for this curriculum.',
        credential: existing,
      });
    }

    // Verify server-side that the learner actually passed an assessment attempt!
    const attempts = await AssessmentAttempt.find({
      userId: req.user._id,
      curriculumId,
      passed: true,
    });

    if (!attempts || attempts.length === 0) {
      return res.status(403).json({
        success: false,
        message: 'Credential issuance denied. You must successfully pass the competency assessment with a passing score before digital credentials can be awarded.',
      });
    }

    // Find best passing score
    const bestAttempt = attempts.reduce((best, curr) => (curr.scorePercent > best.scorePercent ? curr : best), attempts[0]);

    const credentialId = generateCredentialId();
    const issueDate = new Date();
    const verificationHash = generateVerificationHash({
      credentialId,
      learnerEmail: req.user.email,
      microCredentialTitle: curriculum.title,
      scorePercent: bestAttempt.scorePercent,
      issueDate,
    });

    const badgeTier = computeBadgeTier(bestAttempt.scorePercent);

    const credential = await Credential.create({
      credentialId,
      userId: req.user._id,
      learnerName: req.user.name,
      learnerEmail: req.user.email,
      curriculumId: curriculum._id,
      microCredentialTitle: curriculum.title,
      targetRole: curriculum.targetJobRole,
      competencies: curriculum.targetCompetencies || [],
      scorePercent: bestAttempt.scorePercent,
      issueDate,
      issuingPlatform: 'SkillPulse Global Credential Registry',
      verificationHash,
      status: 'valid',
      badgeTier,
    });

    res.status(201).json({
      success: true,
      message: '🎉 Congratulations! Your verified micro-credential has been officially generated and recorded in the global registry.',
      credential,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all earned credentials for logged-in learner
 * @route   GET /api/credentials/my-credentials
 * @access  Private
 */
export const getMyCredentials = async (req, res, next) => {
  try {
    const credentials = await Credential.find({ userId: req.user._id });
    res.status(200).json({
      success: true,
      count: credentials.length,
      credentials,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get credential by ID for viewing/preview
 * @route   GET /api/credentials/:id
 * @access  Public
 */
export const getCredentialById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const credential = await Credential.findOne({
      $or: [{ credentialId: id }, { _id: id }],
    });

    if (!credential) {
      return res.status(404).json({
        success: false,
        message: 'Credential not found.',
      });
    }

    res.status(200).json({
      success: true,
      credential,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Public verification endpoint (Recruiter & Visitor verification)
 * @route   GET /api/credentials/verify/:credentialId
 * @access  Public
 */
export const verifyCredential = async (req, res, next) => {
  try {
    const { credentialId } = req.params;

    const credential = await Credential.findOne({
      $or: [
        { credentialId: credentialId.trim().toUpperCase() },
        { verificationHash: credentialId.trim() },
      ],
    });

    if (!credential) {
      return res.status(404).json({
        success: false,
        isValid: false,
        status: 'not_found',
        message: `No digital credential was found matching identifier "${credentialId}". Please check the ID or contact the issuing authority.`,
      });
    }

    if (credential.status === 'revoked') {
      return res.status(200).json({
        success: true,
        isValid: false,
        status: 'revoked',
        message: 'This credential was revoked by the issuing authority and is no longer valid.',
        credential: {
          credentialId: credential.credentialId,
          microCredentialTitle: credential.microCredentialTitle,
          learnerName: credential.learnerName,
          status: 'revoked',
        },
      });
    }

    res.status(200).json({
      success: true,
      isValid: true,
      status: 'valid',
      message: 'Verified Credential. This digital credential is authentic, recorded in the registry, and tamper-evident.',
      credential: {
        credentialId: credential.credentialId,
        learnerName: credential.learnerName,
        microCredentialTitle: credential.microCredentialTitle,
        targetRole: credential.targetRole,
        competencies: credential.competencies,
        scorePercent: credential.scorePercent,
        badgeTier: credential.badgeTier,
        issueDate: credential.issueDate,
        expirationDate: credential.expirationDate,
        issuingPlatform: credential.issuingPlatform,
        verificationHash: credential.verificationHash,
        status: credential.status,
      },
    });
  } catch (error) {
    next(error);
  }
};
