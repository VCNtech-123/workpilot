import { Router } from 'express';
import { protect } from '../../middleware/auth.middleware';

const router = Router();

router.post("/", protect);


export default router;