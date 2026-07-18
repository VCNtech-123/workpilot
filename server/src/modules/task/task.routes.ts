import { Router } from 'express';
import { protect } from '../../middleware/auth.middleware';
import { validateCreateTask } from './task.validation';
import { createTask, getTasks, getTaskById } from './task.controller';

const router = Router();

router.post("/", protect, validateCreateTask, createTask );
router.get("/", protect, getTasks);
router.get("/:id", protect, getTaskById);
router.put("/:id", protect)

export default router;