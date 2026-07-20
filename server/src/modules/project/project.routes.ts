import { Router } from 'express';
import { protect } from '../../middleware/auth.middleware';
import { createProject, getProjectById, getProjects, updateProject, deleteProject } from './project.controller';
import { validateCreateProject } from './project.validation';

const router = Router();

router.post("/", protect, validateCreateProject, createProject);
router.get("/", protect, getProjects);
router.get("/:id", protect, getProjectById);
router.put("/:id", protect, updateProject);
router.delete("/:id", protect, deleteProject);
router.patch("/:id/restore", protect)

export default router;


