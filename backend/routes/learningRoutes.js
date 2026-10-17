import express from 'express';
import { getLearningProgress, updateModuleProgress } from '../controllers/learningController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/:curriculumId', protect, getLearningProgress);
router.post('/:curriculumId/module', protect, updateModuleProgress);

export default router;
