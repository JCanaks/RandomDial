import { Router } from 'express';
import phoneNumberRouter from './phoneNumbers';

const router = Router();
router.use('/', phoneNumberRouter);

export default router;
