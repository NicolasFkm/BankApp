import { Account, AccountCreationAttributes } from "@models/Account";

export default class AccountRepository {

    async getById(id: number): Promise<Account | null> {
        const account = await Account.findByPk(id, { include: [{ all: true }] });

        return account;
    }

    async getAll(): Promise<Account[]> {
        const account = await Account.findAll({ include: [{ all: true }] });

        return account;
    }

    async add(account: AccountCreationAttributes): Promise<Account> {

        const createdAccount = await Account.create(account);

        return createdAccount;
    }

    async update(account: Account, updateData: Partial<AccountCreationAttributes>): Promise<Account | undefined> {
        const updatedAccount = await account?.update(updateData)

        return updatedAccount;
    }

}