import { Payment, PaymentCreationAttributes } from "@models/Payment";

export default class PaymentRepository {

    async getById(id: number): Promise<Payment | null> {
        const withdraw = await Payment.findByPk(id, { include: [{ all: true }] });

        return withdraw;
    }

    async add(account: PaymentCreationAttributes): Promise<Payment> {

        const createdPayment = await Payment.create(account);

        return createdPayment;
    }

}