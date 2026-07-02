import { Router } from 'express';
import { protect } from '../../middleware/auth.middleware';
import { createProject, getProjectById, getProjects, updateProject } from './project.controller';
import { validateCreateProject } from './project.validation';

const router = Router();

router.post("/", protect, validateCreateProject, createProject);
router.get("/", protect, getProjects);
router.get("/:id", protect, getProjectById);
router.put("/:id", protect, updateProject)

export default router;


