import { Withdraw, WithdrawCreationAttributes } from "@models/Withdraw";
import WithdrawRepository from "@repositories/WithdrawRepository";

export default class WithdrawService {

    public withdrawRepository: WithdrawRepository;

    constructor(){
        this.withdrawRepository = new WithdrawRepository();
    }

    async create(account: WithdrawCreationAttributes): Promise<Withdraw> {

        const createdWithdraw = await this.withdrawRepository.add(account);

        return createdWithdraw;
    }

    async getById(id: number): Promise<Withdraw|null> {

        const account = await this.withdrawRepository.getById(id);

        return account;
    }

}