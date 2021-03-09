import { InvalidArgumentException } from "@helpers/errors/InvalidArgumentException";
import { IDeposit } from "@models/Deposit";
import DepositRepository from "@repositories/DepositRepository";

export default class DepositService {

    public depositRepository: DepositRepository;

    constructor(){
        this.depositRepository = new DepositRepository();
    }

    async create(account: IDeposit): Promise<IDeposit> {

        const createdDeposit = await this.depositRepository.add(account);

        return createdDeposit;
    }

    async getById(id: number): Promise<IDeposit|null> {

        const account = await this.depositRepository.getById(id);

        return account;
    }

}