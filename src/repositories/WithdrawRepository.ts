import Withdraw, { IWithdraw } from "@models/Withdraw";

export default class WithdrawRepository {

    async getById(id: number): Promise<IWithdraw | null> {
        const withdraw = await Withdraw.findById(id);

        return withdraw;
    }

    async add(withdraw: IWithdraw): Promise<IWithdraw> {

        const createdWithdraw = await Withdraw.create(withdraw);

        return createdWithdraw;
    }

}