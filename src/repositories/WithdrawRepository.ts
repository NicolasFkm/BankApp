import { Withdraw, WithdrawCreationAttributes } from "@models/Withdraw";

export default class WithdrawRepository {

    async getById(id: number): Promise<Withdraw | null> {
        const withdraw = await Withdraw.findByPk(id, { include: [{ all: true }] });

        return withdraw;
    }

    async add(account: WithdrawCreationAttributes): Promise<Withdraw> {

        const createdWithdraw = await Withdraw.create(account);

        return createdWithdraw;
    }

}