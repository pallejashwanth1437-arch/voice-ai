import express from 'express';
import { convertTextToSpeech, getHistory, deleteHistoryItem } from '../controllers/ttsController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/convert', authenticateToken, convertTextToSpeech);
router.get('/history', authenticateToken, getHistory);
router.delete('/history/:id', authenticateToken, deleteHistoryItem);

export default router;