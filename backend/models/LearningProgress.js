import mongoose from 'mongoose';

const submissionSchema = new mongoose.Schema({
  moduleId: { type: String, required: true },
  submissionText: { type: String, default: '' },
  repoUrl: { type: String, default: '' },
  status: { type: String, enum: ['submitted', 'reviewed', 'passed'], default: 'submitted' },
  submittedAt: { type: Date, default: Date.now },
}, { _id: false });

const learningProgressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  curriculumId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Curriculum',
    required: true,
  },
  overallProgressPercent: {
    type: Number,
    default: 0,
    min: 0,
    max: 100,
  },
  completedModules: [{
    type: String, // module ids
  }],
  currentModuleId: {
    type: String,
    default: '',
  },
  notes: {
    type: String,
    default: '',
  },
  practicalSubmissions: [submissionSchema],
  lastAccessedAt: {
    type: Date,
    default: Date.now,
  },
});

learningProgressSchema.index({ userId: 1, curriculumId: 1 }, { unique: true });

export default mongoose.models.LearningProgress || mongoose.model('LearningProgress', learningProgressSchema);
