import mongoose from 'mongoose';

const curriculumVersionSchema = new mongoose.Schema({
  curriculumId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Curriculum',
    required: true,
  },
  versionNumber: {
    type: String,
    required: true, // e.g. "v1.1"
  },
  previousVersion: {
    type: String,
    default: 'v1.0',
  },
  reasonForChange: {
    type: String,
    required: true,
  },
  newSkillsAdded: [{
    type: String,
  }],
  increasedPrioritySkills: [{
    type: String,
  }],
  decreasedPrioritySkills: [{
    type: String,
  }],
  outdatedTopics: [{
    type: String,
  }],
  changelogSummary: {
    type: String,
    default: '',
  },
  snapshotModules: [{
    type: Object,
  }],
  appliedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.CurriculumVersion || mongoose.model('CurriculumVersion', curriculumVersionSchema);
