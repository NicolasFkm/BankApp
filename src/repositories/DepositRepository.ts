import { Deposit, DepositCreationAttributes } from "@models/Deposit";

export default class DepositRepository {

    async getById(id: number): Promise<Deposit | null> {
        const deposit = await Deposit.findByPk(id, { include: [{ all: true }] });

        return deposit;
    }

    async add(account: DepositCreationAttributes): Promise<Deposit> {

        const createdDeposit = await Deposit.create(account);

        return createdDeposit;
    }

}