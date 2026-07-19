import { Router } from 'express';
import { protect } from '../../middleware/auth.middleware';

const router = Router();

router.get("/", protect);

export default router;