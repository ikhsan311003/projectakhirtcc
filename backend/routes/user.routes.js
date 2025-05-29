import express from 'express';
import { register, login, getMe } from '../controllers/user.controller.js';
import verifyToken from '../middleware/verifyToken.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

// ✅ Tambahkan route ini
router.get('/me', verifyToken, getMe);

export default router;
