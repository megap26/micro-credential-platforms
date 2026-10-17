import jwt from 'jsonwebtoken';
import { User, LearnerProfile } from '../models/index.js';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'skillpulse_secret_jwt_key_2026_dev_secure', {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
};

/**
 * @desc    Register a new user
 * @route   POST /api/auth/register
 * @access  Public
 */
export const register = async (req, res, next) => {
  try {
    const { name, email, password, targetCareer, currentSkills, preferredLocation } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email, and password.',
      });
    }

    // Check if user already exists
    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'An account with this email address already exists.',
      });
    }

    // Create user
    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password,
      role: 'learner',
    });

    // Create associated learner profile
    const profile = await LearnerProfile.create({
      userId: user._id,
      targetCareer: targetCareer || 'Full Stack Developer',
      currentSkills: currentSkills || [
        { name: 'JavaScript', category: 'Technical', proficiency: 'Intermediate', yearsOfExperience: 2 },
        { name: 'HTML5 & CSS3', category: 'Technical', proficiency: 'Advanced', yearsOfExperience: 2 },
        { name: 'React', category: 'Technical', proficiency: 'Beginner', yearsOfExperience: 1 },
      ],
      preferredLocation: preferredLocation || 'Remote Global',
      learningGoals: 'Earn verified micro-credentials aligned to market demand.',
      overallMatchScore: 45,
    });

    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      profile,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Login user & get token
 * @route   POST /api/auth/login
 * @access  Public
 */
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both email and password.',
      });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password credentials.',
      });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password credentials.',
      });
    }

    const profile = await LearnerProfile.findOne({ userId: user._id });
    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      profile,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get current logged in user & profile
 * @route   GET /api/auth/me
 * @access  Private
 */
export const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    const profile = await LearnerProfile.findOne({ userId: req.user._id });

    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      profile,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update learner profile
 * @route   PUT /api/auth/profile
 * @access  Private
 */
export const updateProfile = async (req, res, next) => {
  try {
    const { targetCareer, currentSkills, preferredLocation, learningGoals, overallMatchScore } = req.body;

    let profile = await LearnerProfile.findOne({ userId: req.user._id });
    if (!profile) {
      profile = await LearnerProfile.create({
        userId: req.user._id,
        targetCareer,
        currentSkills,
        preferredLocation,
        learningGoals,
        overallMatchScore,
      });
    } else {
      if (targetCareer) profile.targetCareer = targetCareer;
      if (currentSkills) profile.currentSkills = currentSkills;
      if (preferredLocation) profile.preferredLocation = preferredLocation;
      if (learningGoals) profile.learningGoals = learningGoals;
      if (overallMatchScore !== undefined) profile.overallMatchScore = overallMatchScore;
      profile.updatedAt = new Date();
      await profile.save();
    }

    res.status(200).json({
      success: true,
      message: 'Learner profile updated successfully.',
      profile,
    });
  } catch (error) {
    next(error);
  }
};
