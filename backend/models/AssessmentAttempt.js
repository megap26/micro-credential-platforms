import mongoose from 'mongoose';

const answerRecordSchema = new mongoose.Schema({
  questionIndex: { type: Number, required: true },
  selectedOptionIndex: { type: Number, required: true },
  isCorrect: { type: Boolean, required: true },
}, { _id: false });

const assessmentAttemptSchema = new mongoose.Schema({
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
  assessmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Assessment',
    required: true,
  },
  attemptNumber: {
    type: Number,
    default: 1,
  },
  answers: [answerRecordSchema],
  scorePercent: {
    type: Number,
    required: true,
  },
  passed: {
    type: Boolean,
    required: true,
  },
  timeSpentSeconds: {
    type: Number,
    default: 0,
  },
  feedback: {
    type: String,
    default: '',
  },
  completedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.AssessmentAttempt || mongoose.model('AssessmentAttempt', assessmentAttemptSchema);
