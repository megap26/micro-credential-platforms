import mongoose from 'mongoose';

const skillItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, default: 'Technical' },
  proficiency: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert'],
    default: 'Intermediate',
  },
  yearsOfExperience: { type: Number, default: 1 },
}, { _id: false });

const learnerProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  targetCareer: {
    type: String,
    default: 'Full Stack Developer',
  },
  currentSkills: [skillItemSchema],
  preferredLocation: {
    type: String,
    default: 'Remote Global',
  },
  learningGoals: {
    type: String,
    default: 'Master modern full-stack development and cloud native deployment.',
  },
  overallMatchScore: {
    type: Number,
    default: 0,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.LearnerProfile || mongoose.model('LearnerProfile', learnerProfileSchema);
