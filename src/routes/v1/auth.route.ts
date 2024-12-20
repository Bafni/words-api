import express, { Router } from 'express';
import { validate } from '../../modules/validate';
import { authValidation, authController } from '../../modules/auth';


const router: Router = express.Router();

router.post('/register', validate(authValidation.register), authController.register)

export default router;