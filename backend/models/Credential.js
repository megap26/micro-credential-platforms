import mongoose from 'mongoose';

const credentialSchema = new mongoose.Schema({
  credentialId: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  learnerName: {
    type: String,
    required: true,
  },
  learnerEmail: {
    type: String,
    required: true,
  },
  curriculumId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Curriculum',
    required: true,
  },
  microCredentialTitle: {
    type: String,
    required: true,
  },
  targetRole: {
    type: String,
    required: true,
  },
  competencies: [{
    type: String,
  }],
  scorePercent: {
    type: Number,
    required: true,
  },
  issueDate: {
    type: Date,
    default: Date.now,
  },
  expirationDate: {
    type: Date,
    default: () => new Date(+new Date() + 3 * 365 * 24 * 60 * 60 * 1000), // 3 years validity
  },
  issuingPlatform: {
    type: String,
    default: 'SkillPulse Global Credential Registry',
  },
  verificationHash: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['valid', 'revoked'],
    default: 'valid',
  },
  badgeTier: {
    type: String,
    enum: ['Silver', 'Gold', 'Platinum', 'Diamond'],
    default: 'Gold',
  },
});

export default mongoose.models.Credential || mongoose.model('Credential', credentialSchema);
