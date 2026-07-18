import { Router } from 'express';
import { protect } from '../../middleware/auth.middleware';
import { validateCreateTask } from './task.validation';
import { createTask, getTasks } from './task.controller';

const router = Router();

router.post("/", protect, validateCreateTask, createTask );
router.get("/", protect, getTasks);
router.get("/:id", protect)

export default router;