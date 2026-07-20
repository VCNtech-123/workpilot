import { Router } from 'express';
import { protect } from '../../middleware/auth.middleware';
import { validateCreateTask } from './task.validation';
import { createTask, getTasks, getTaskById, updateTaskById, deleteTask, restoreTask } from './task.controller';

const router = Router();

router.post("/", protect, validateCreateTask, createTask );
router.get("/", protect, getTasks);
router.get("/:id", protect, getTaskById);
router.put("/:id", protect, updateTaskById);
router.delete("/:id", protect, deleteTask);
router.patch(":id/restore", protect, restoreTask)

export default router;