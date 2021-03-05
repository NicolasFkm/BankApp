import { InvalidArgumentException } from "@helpers/errors/InvalidArgumentException";
import { Account, AccountAttributes, AccountCreationAttributes } from "@models/Account";
import validator from 'validator';
import bcrypt from 'bcrypt';
import AccountRepository from '@repositories/AccountRepository'; 
import Login from "@models/Login";

export default class LoginService {

    public accountRepository: AccountRepository;

    constructor(){
        this.accountRepository = new AccountRepository();
    }

    public authenticate = async(login: Login) : Promise<boolean> => {
        const account = await this.accountRepository.getById(login.id);
        
        if(account == null){
            return false;
        }

        const isValid = bcrypt.compareSync(login.password, account?.password!);
        
        return isValid;
    }
}