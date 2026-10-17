import express from 'express';
import {
  getAdminStats,
  getJobPostings,
  addJobPosting,
  addIndustryReview,
  getCurriculumReviews,
} from '../controllers/adminController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.get('/stats', protect, authorize('admin', 'industry_reviewer'), getAdminStats);
router.get('/job-postings', protect, getJobPostings);
router.post('/job-postings', protect, authorize('admin'), addJobPosting);
router.post('/curricula/:id/review', protect, authorize('admin', 'industry_reviewer'), addIndustryReview);
router.get('/curricula/:id/reviews', getCurriculumReviews);

export default router;
