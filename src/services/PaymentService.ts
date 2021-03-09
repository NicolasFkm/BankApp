import { IPayment } from "@models/Payment";
import PaymentRepository from "@repositories/PaymentRepository";

export default class PaymentService {

    public paymentRepository: PaymentRepository;

    constructor(){
        this.paymentRepository = new PaymentRepository();
    }

    async create(account: IPayment): Promise<IPayment> {

        const createdPayment = await this.paymentRepository.add(account);

        return createdPayment;
    }

    async getById(id: number): Promise<IPayment|null> {

        const account = await this.paymentRepository.getById(id);

        return account;
    }

}