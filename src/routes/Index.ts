import { Router, Request, Response } from 'express';
import AccountRoute from '@routes/AccountRoute'
import { HttpStatus } from '@enumerators/HttpStatus';
import LoginRoute from './LoginRoute';

const router = Router();

router.use("/login", LoginRoute);
router.use("/account", AccountRoute);
// router.use("/account/payment", PaymentRoute);
// router.use("/account/withdraw", WithdrawRoute);
// router.use("/account/deposit", DepositRoute);

router.all('*', (req: Request, res: Response) => {
    res.sendStatus(HttpStatus.NOT_FOUND);
});

module.exports = router;
