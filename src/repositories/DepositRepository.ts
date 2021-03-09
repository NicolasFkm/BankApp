import Deposit, { IDeposit } from "@models/Deposit";

export default class DepositRepository {

    async getById(id: number): Promise<IDeposit | null> {
        const deposit = await Deposit.findById(id)
            .populate("account");

        return deposit;
    }

    async add(deposit: IDeposit): Promise<IDeposit> {

        const createdDeposit = await Deposit.create(deposit);

        return createdDeposit;
    }

}