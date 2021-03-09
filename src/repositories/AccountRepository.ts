import Account, { IAccount } from "@models/Account";

export default class AccountRepository {

    async getById(id: number): Promise<IAccount | null> {
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

    async update(id: number, updateData: IAccount): Promise<boolean> {
        const updatedResult = await Account.updateOne({id}, updateData);

        return updatedResult.nModified > 0;
    }

}