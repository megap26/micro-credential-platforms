import mongoose from 'mongoose';

const skillDemandEntrySchema = new mongoose.Schema({
  skillName: { type: String, required: true },
  category: { type: String, default: 'Technical' },
  frequencyPercent: { type: Number, required: true },
  demandLevel: {
    type: String,
    enum: ['High', 'Moderate', 'Emerging', 'Specialized'],
    default: 'High',
  },
  growthRatePercent: { type: Number, default: 10 },
  priority: {
    type: String,
    enum: ['Critical', 'High', 'Medium', 'Optional'],
    default: 'High',
  },
}, { _id: false });

const skillDemandSchema = new mongoose.Schema({
  roleTitle: {
    type: String,
    required: true,
  },
  industry: {
    type: String,
    default: 'All Tech Industries',
  },
  location: {
    type: String,
    default: 'Global',
  },
  topSkills: [skillDemandEntrySchema],
  totalJobsAnalyzed: {
    type: Number,
    default: 120,
  },
  versionTag: {
    type: String,
    default: 'v1.0',
  },
  lastAnalyzedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.SkillDemand || mongoose.model('SkillDemand', skillDemandSchema);
