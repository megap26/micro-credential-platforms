import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  id: { type: String, required: true },
  questionText: { type: String, required: true },
  codeSnippet: { type: String, default: '' },
  options: [{ type: String, required: true }],
  correctOptionIndex: { type: Number, required: true },
  explanation: { type: String, required: true },
  competencyTag: { type: String, default: 'Core Competency' },
  difficulty: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], default: 'Intermediate' },
}, { _id: false });

const assessmentSchema = new mongoose.Schema({
  curriculumId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Curriculum',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  targetRole: {
    type: String,
    required: true,
  },
  passingScorePercent: {
    type: Number,
    default: 75,
  },
  timeLimitMinutes: {
    type: Number,
    default: 20,
  },
  questions: [questionSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Assessment || mongoose.model('Assessment', assessmentSchema);
