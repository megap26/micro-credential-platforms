import mongoose from 'mongoose';

const industryReviewSchema = new mongoose.Schema({
  curriculumId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Curriculum',
    required: true,
  },
  reviewerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  reviewerName: {
    type: String,
    required: true,
  },
  reviewerOrganization: {
    type: String,
    required: true, // e.g. "Google Cloud Talent Advisory", "FinTech Standards Board"
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
  relevanceScore: {
    type: Number,
    min: 0,
    max: 100,
    default: 90,
  },
  marketAlignmentFeedback: {
    type: String,
    required: true,
  },
  approvedStamp: {
    type: Boolean,
    default: true,
  },
  reviewedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.IndustryReview || mongoose.model('IndustryReview', industryReviewSchema);
