import { LoginController } from '@controllers/LoginController';
import { Router } from 'express';

const router = Router();
const loginController = new LoginController();

router.post('/', loginController.postAuthenticate);

export default router;