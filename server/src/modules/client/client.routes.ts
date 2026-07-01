import { Router } from "express";
import { protect } from "../../middleware/auth.middleware";
import { createClient } from "./client.controller";
import { validateCreateClient } from "./client.validation";
import { getClients } from './client.controller'

const router = Router();

router.post("/", protect, validateCreateClient, createClient);
router.get("/", protect, getClients);
export default router;