import Payment, { IPayment } from "@models/Payment";

export default class PaymentRepository {

    async getById(id: number): Promise<IPayment | null> {
        const withdraw = await Payment.findById(id)
            .populate("account");

        return withdraw;
    }

    async add(payment: IPayment): Promise<IPayment> {

        const createdPayment = await Payment.create(payment);

        return createdPayment;
    }

}