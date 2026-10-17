import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  normalizedName: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  category: {
    type: String,
    enum: ['Technical', 'Domain-specific', 'Soft skills', 'Cloud & DevOps', 'AI & Machine Learning'],
    default: 'Technical',
  },
  aliases: [{
    type: String,
    trim: true,
  }],
  taxonomyCode: {
    type: String, // e.g. "ESCO-2512.1" or "O*NET-15-1252.00"
    default: '',
  },
  marketDemandScore: {
    type: Number,
    min: 0,
    max: 100,
    default: 75,
  },
  trend: {
    type: String,
    enum: ['high-demand', 'emerging', 'stable', 'declining'],
    default: 'high-demand',
  },
  demandFrequencyPercent: {
    type: Number,
    default: 60,
  },
  growthRatePercent: {
    type: Number,
    default: 12.5,
  },
  description: {
    type: String,
    default: '',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Skill || mongoose.model('Skill', skillSchema);
