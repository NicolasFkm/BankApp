import { InvalidArgumentException } from "@helpers/errors/InvalidArgumentException";
import { Account, AccountAttributes, AccountCreationAttributes } from "@models/Account";
import validator from 'validator';
import bcrypt from 'bcrypt';
import AccountRepository from '@repositories/AccountRepository';

export default class AccountService {

    private _salt: number = 12;
    public accountRepository: AccountRepository;

    constructor(){
        this.accountRepository = new AccountRepository();
    }

    async create(account: AccountCreationAttributes): Promise<Account> {

        this.validate(account);

        account.password = await bcrypt.hash(account.password, this._salt);

        const createdAccount = await this.accountRepository.add(account);

        return createdAccount;
    }

    async getAll(): Promise<Account[]> {

        const accounts = await this.accountRepository.getAll();

        return accounts;
    }

    async getById(id: number): Promise<Account|null> {

        const account = await this.accountRepository.getById(id);

        return account;
    }

    async update(id: number, updateData: Partial<AccountCreationAttributes>): Promise<Account | undefined> {
        const account = await this.accountRepository.getById(id);

        if(account == null) 
            throw new InvalidArgumentException("Invalid account identifier.");

        let accountData: AccountCreationAttributes = { ...account, ...updateData } as AccountCreationAttributes;

        this.validate(accountData);

        const updatedAccount = await this.accountRepository.update(account!, accountData)

        return updatedAccount;
    }


    validate(account: AccountCreationAttributes | AccountAttributes): void {

        if (validator.isEmpty(account.name!))
            throw new InvalidArgumentException("Account name invalid.");

        if (!validator.isStrongPassword(account.password!, { minLength: 6, minLowercase: 1, minNumbers: 1, minUppercase: 1, minSymbols: 0 }))
            throw new InvalidArgumentException("Account password invalid.");
    }

}