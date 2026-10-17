import express from 'express';
import {
  generateCurriculum,
  saveCurriculum,
  getUserCurricula,
  getCurriculumById,
  updateCurriculum,
  realignMarketDemand,
} from '../controllers/curriculumController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/generate', protect, generateCurriculum);
router.post('/save', protect, saveCurriculum);
router.get('/', protect, getUserCurricula);
router.get('/:id', protect, getCurriculumById);
router.put('/:id', protect, updateCurriculum);
router.post('/:id/realign', protect, realignMarketDemand);

export default router;
