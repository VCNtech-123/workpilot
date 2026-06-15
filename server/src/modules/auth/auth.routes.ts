import { Router } from 'express';
import { register } from './auth.controller';

const router = Router();
console.log("Auth routes loaded");
router.post('/register', register);

export default router;

