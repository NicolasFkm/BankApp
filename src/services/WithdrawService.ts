import { IWithdraw } from "@models/Withdraw";
import WithdrawRepository from "@repositories/WithdrawRepository";

export default class WithdrawService {

    public withdrawRepository: WithdrawRepository;

    constructor(){
        this.withdrawRepository = new WithdrawRepository();
    }

    async create(account: IWithdraw): Promise<IWithdraw> {

        const createdWithdraw = await this.withdrawRepository.add(account);

        return createdWithdraw;
    }

    async getById(id: number): Promise<IWithdraw|null> {

        const account = await this.withdrawRepository.getById(id);

        return account;
    }

}