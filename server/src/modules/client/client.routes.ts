import { Router } from "express";
import { protect } from "../../middleware/auth.middleware";
import { createClient } from "./client.controller";
import { validateCreateClient } from "./client.validation";

const router = Router();

router.post("/", protect, validateCreateClient, createClient);

export default router;