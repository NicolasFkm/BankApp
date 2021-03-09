import { InvalidArgumentException } from "@helpers/errors/InvalidArgumentException";
import { IAccount } from "@models/Account";
import validator from 'validator';
import bcrypt from 'bcrypt';
import AccountRepository from '@repositories/AccountRepository';
import { IPayment } from "@models/Payment";
import { IDeposit } from "@models/Deposit";
import { IWithdraw } from "@models/Withdraw";

export default class AccountService {

    private _salt: number = 12;
    public accountRepository: AccountRepository;

    constructor(){
        this.accountRepository = new AccountRepository();
    }

    async create(account: IAccount): Promise<IAccount> {

        this.validate(account);

        account.password = await bcrypt.hash(account.password, this._salt);

        const createdAccount = await this.accountRepository.add(account);

        return createdAccount;
    }

    async getAll(): Promise<IAccount[]> {

        const accounts = await this.accountRepository.getAll();

        return accounts;
    }

    async getById(id: number): Promise<IAccount|null> {

        const account = await this.accountRepository.getById(id);

        return account;
    }

    async getAccountPaymentsById(id: number): Promise<IPayment[]|undefined> {

        const account = await this.accountRepository.getById(id);

        return account?.payments;
    }

    async getAccountDepositsById(id: number): Promise<IDeposit[]|undefined> {

        const account = await this.accountRepository.getById(id);

        return account?.deposits;
    }

    async getAccountWithdrawalsById(id: number): Promise<IWithdraw[]|undefined> {

        const account = await this.accountRepository.getById(id);

        return account?.withdrawals;
    }

    async update(id: number, updateData: Partial<IAccount>): Promise<boolean | undefined> {
        const account = await this.accountRepository.getById(id);

        if(account == null) 
            throw new InvalidArgumentException("Invalid account identifier.");

        let accountData: IAccount = { ...account, ...updateData } as IAccount;

        this.validate(accountData);

        const isUpdated = await this.accountRepository.update(id, account!)

        return isUpdated;
    }


    validate(account: IAccount): void {

        if (validator.isEmpty(account.name!))
            throw new InvalidArgumentException("Account name invalid.");

        if (!validator.isStrongPassword(account.password!, { minLength: 6, minLowercase: 1, minNumbers: 1, minUppercase: 1, minSymbols: 0 }))
            throw new InvalidArgumentException("Account password invalid.");
    }

}