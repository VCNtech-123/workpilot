import { Router } from "express";
import { protect } from "../../middleware/auth.middleware";
import { createClient } from "./client.controller";
import { validateCreateClient } from "./client.validation";
import { getClients, getClientById } from './client.controller'

const router = Router();

router.post("/", protect, validateCreateClient, createClient);
router.get("/", protect, getClients);
router.get("/:id", protect, getClientById);
export default router;