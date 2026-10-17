import express from 'express';
import { getAssessmentByCurriculum, submitAssessmentAttempt } from '../controllers/assessmentController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/curriculum/:curriculumId', protect, getAssessmentByCurriculum);
router.post('/:assessmentId/submit', protect, submitAssessmentAttempt);

export default router;
