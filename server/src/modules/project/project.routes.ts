import { Router } from 'express';
import { protect } from '../../middleware/auth.middleware';
import { createProject } from './project.controller';
import { validateCreateProject } from './project.validation';

const router = Router();

router.post("/", protect, validateCreateProject, createProject);

export default router;


