import { Router } from 'express';
import { signUp } from '../controllers/authController';

const router = Router();
// @ts-ignore
router.post('/signup', signUp);

export default router;
