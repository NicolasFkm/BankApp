export default class Login{
    public accountNumber: number;
    public password: string;

    constructor(accountNumber: number, password: string){
        this.accountNumber = accountNumber;
        this.password = password;
    }
}