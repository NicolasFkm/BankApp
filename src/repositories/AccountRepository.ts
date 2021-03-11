import Account, { IAccount } from "@models/Account";
import {Types} from 'mongoose';

export default class AccountRepository {

    async getById(id: string): Promise<IAccount | null> {
        const account = await Account.findById(id)
            .populate("Deposits")
            .populate("Payments")
            .populate("Withdrawals")

        return account;
    }

    async getAll(): Promise<IAccount[]> {
        const account = await Account.find();

        return account;
    }

    async add(account: IAccount): Promise<IAccount> {

        const createdAccount = await Account.create(account);

        return createdAccount;
    }

    async update(id: string, updateData: IAccount): Promise<boolean> {
        const account = await Account.findById(id)

        if(account == null) return false;

        account!.balance = updateData.balance;
        account.save();

        return account != null;
    }

}