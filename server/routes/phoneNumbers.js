import { Router } from 'express';
import PhoneNumberController from '../controllers/PhoneNumberController';

const router = Router();

router.get('/phonenumbers', PhoneNumberController.getPhoneNumbers);

export default router;
