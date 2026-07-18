import { Router } from 'express';
import { protect } from '../../middleware/auth.middleware';
import { validateCreateTask } from './task.validation';

const router = Router();

router.post("/", protect, validateCreateTask );


export default router;