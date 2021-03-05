import { AccountController } from '@controllers/AccountController';
import { Router } from 'express';

const router = Router();
const accountController = new AccountController()
console.log(JSON.stringify(accountController));

router.post('/', accountController.postCreate);
// router.get('/:id', );
// router.get('/', );

export default router;