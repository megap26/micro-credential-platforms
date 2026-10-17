import mongoose from 'mongoose';

const moduleSchema = new mongoose.Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  estimatedHours: { type: Number, default: 4 },
  topics: [{ type: String }],
  practicalExercises: [{ type: String }],
  miniProject: {
    title: { type: String, default: '' },
    instructions: { type: String, default: '' },
    submissionCriteria: { type: String, default: '' },
  },
  status: {
    type: String,
    enum: ['not-started', 'in-progress', 'completed'],
    default: 'not-started',
  },
}, { _id: false });

const curriculumSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  shortDescription: {
    type: String,
    required: true,
  },
  targetJobRole: {
    type: String,
    required: true,
  },
  badgeLevel: {
    type: String,
    enum: ['Associate', 'Specialist', 'Professional', 'Master'],
    default: 'Specialist',
  },
  alignmentScore: {
    type: Number,
    default: 92,
  },
  prerequisites: [{
    type: String,
  }],
  targetCompetencies: [{
    type: String,
  }],
  learningOutcomes: [{
    type: String,
  }],
  modules: [moduleSchema],
  totalEstimatedDurationHours: {
    type: Number,
    default: 24,
  },
  passingScorePercent: {
    type: Number,
    default: 80,
  },
  version: {
    type: String,
    default: 'v1.0',
  },
  generatedBy: {
    type: String,
    enum: ['ai_gemini', 'ai_openai', 'rule_engine_demonstration'],
    default: 'rule_engine_demonstration',
  },
  isSaved: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Curriculum || mongoose.model('Curriculum', curriculumSchema);
