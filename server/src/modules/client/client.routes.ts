import { Router } from "express";
import { protect } from "../../middleware/auth.middleware";
import { createClient } from "./client.controller";
import { validateCreateClient } from "./client.validation";
import { getClients, getClientById, updateClient, deleteClient } from './client.controller'

const router = Router();

router.post("/", protect, validateCreateClient, createClient);
router.get("/", protect, getClients);
router.get("/:id", protect, getClientById);
router.put("/:id", protect, updateClient);
router.delete("/:id", protect, deleteClient);
export default router;