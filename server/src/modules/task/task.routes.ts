import { Router } from 'express';
import { protect } from '../../middleware/auth.middleware';
import { validateCreateTask } from './task.validation';
import { createTask } from './task.controller';

const router = Router();

router.post("/", protect, validateCreateTask, createTask );
    
export default router;