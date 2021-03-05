import { InvalidArgumentException } from "@helpers/errors/InvalidArgumentException";
import { Account, AccountAttributes, AccountCreationAttributes } from "@models/Account";
import validator from 'validator';
import bcrypt from 'bcrypt';
import AccountRepository from '@repositories/AccountRepository'; 
import Login from "@models/Login";

export default class LoginService {

    private _salt: number = 12;
    public accountRepository: AccountRepository;

    constructor(){
        this.accountRepository = new AccountRepository();
    }

    async authenticate(login: Login) : Promise<boolean> {
        let hashPassword = await bcrypt.hash(login.password, this._salt);

        const account = await this.accountRepository.getByLoginData(login.accountNumber, hashPassword);

        return account != null;
    }
}