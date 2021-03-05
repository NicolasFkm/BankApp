import { Payment, PaymentCreationAttributes } from "@models/Payment";
import PaymentRepository from "@repositories/PaymentRepository";

export default class PaymentService {

    public paymentRepository: PaymentRepository;

    constructor(){
        this.paymentRepository = new PaymentRepository();
    }

    async create(account: PaymentCreationAttributes): Promise<Payment> {

        const createdPayment = await this.paymentRepository.add(account);

        return createdPayment;
    }

    async getById(id: number): Promise<Payment|null> {

        const account = await this.paymentRepository.getById(id);

        return account;
    }

}