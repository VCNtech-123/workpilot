import { Router } from 'express';
import { register } from './auth.controller';
import { validateRegister } from './auth.validation';

const router = Router();
console.log("Auth routes loaded");
router.post('/register', validateRegister, register);

export default router;

