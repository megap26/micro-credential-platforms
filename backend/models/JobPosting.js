import mongoose from 'mongoose';

const normalizedSkillItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, default: 'Technical' },
  importance: { type: String, enum: ['Required', 'Preferred'], default: 'Required' },
  frequency: { type: Number, default: 1 },
}, { _id: false });

const jobPostingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  company: {
    type: String,
    required: true,
    trim: true,
  },
  location: {
    type: String,
    default: 'Remote',
  },
  workplaceType: {
    type: String,
    enum: ['remote', 'hybrid', 'on-site'],
    default: 'remote',
  },
  industry: {
    type: String,
    default: 'Enterprise SaaS',
  },
  experienceLevel: {
    type: String,
    enum: ['Entry', 'Mid-Level', 'Senior', 'Lead'],
    default: 'Mid-Level',
  },
  salaryRange: {
    type: String,
    default: '$110,000 - $145,000 USD',
  },
  rawDescription: {
    type: String,
    required: true,
  },
  extractedSkills: [{
    type: String,
  }],
  normalizedSkills: [normalizedSkillItemSchema],
  source: {
    type: String,
    default: 'Demonstration Job-Market Feed (ESCO & O*NET Aligned)',
  },
  postedDate: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.JobPosting || mongoose.model('JobPosting', jobPostingSchema);
