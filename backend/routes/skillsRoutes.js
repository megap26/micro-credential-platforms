import express from 'express';
import { getAllSkills, getSkillDemandAnalytics, extractSkills, performGapAnalysis } from '../controllers/skillsController.js';

const router = express.Router();

router.get('/', getAllSkills);
router.get('/analytics', getSkillDemandAnalytics);
router.post('/extract', extractSkills);
router.post('/gap-analysis', performGapAnalysis);

export default router;
