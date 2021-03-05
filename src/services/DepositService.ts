import { InvalidArgumentException } from "@helpers/errors/InvalidArgumentException";
import { Deposit, DepositCreationAttributes } from "@models/Deposit";
import DepositRepository from "@repositories/DepositRepository";

export default class DepositService {

    public depositRepository: DepositRepository;

    constructor(){
        this.depositRepository = new DepositRepository();
    }

    async create(account: DepositCreationAttributes): Promise<Deposit> {

        const createdDeposit = await this.depositRepository.add(account);

        return createdDeposit;
    }

    async getById(id: number): Promise<Deposit|null> {

        const account = await this.depositRepository.getById(id);

        return account;
    }

}