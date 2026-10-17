import express from 'express';
import {
  issueCredential,
  getMyCredentials,
  getCredentialById,
  verifyCredential,
} from '../controllers/credentialController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Public verification route
router.get('/verify/:credentialId', verifyCredential);
router.get('/public/:id', getCredentialById);

// Protected learner routes
router.post('/issue', protect, issueCredential);
router.get('/my-credentials', protect, getMyCredentials);

export default router;
