import { Router } from 'express';
import { protect } from '../../middleware/auth.middleware';
import { createProject, getProjectById, getProjects } from './project.controller';
import { validateCreateProject } from './project.validation';

const router = Router();

router.post("/", protect, validateCreateProject, createProject);
router.get(":id", protect, getProjectById);

export default router;


