import { HttpStatus } from '@enumerators/HttpStatus';
import { DataNotFoundException } from '@helpers/errors/DataNotFoundException';
import { InvalidArgumentException } from '@helpers/errors/InvalidArgumentException';
import { PaymentCreationAttributes } from '@models/Payment';
import EntityResponse from '@models/responses/EntityResponse';
import ErrorResponse from '@models/responses/ErrorResponse';
import PaymentService from '@services/PaymentService';
import { Response, Request } from 'express';

export default class PaymentController {

    public paymentService: PaymentService;

    constructor() {
        this.paymentService = new PaymentService();
    }

    public postCreate = async (req: Request, res: Response): Promise<Response> => {
        try {
            let { value, description }: { value: number, description?: string } = req.body;

            const payment = { value, description } as PaymentCreationAttributes;

            const createdPayment = await this.paymentService.create(payment);

            let response = new EntityResponse(createdPayment, req.url);

            let status = HttpStatus.SUCCESS;

            return res.status(status).send(response);
        }
        catch (error) {
            let status = HttpStatus.INTERNAL_SERVER_ERROR;
            let errorResponse = new ErrorResponse(req.url);

            if (error instanceof InvalidArgumentException) {
                status = HttpStatus.BAD_REQUEST;
                errorResponse.message = error.message;
            }

            return res.status(status).send(errorResponse);
        }
    }

    public getById = async(req: Request, res: Response) : Promise<Response> => {
        try{
            let { id } = req.params;
            
            const account = await this.paymentService.getById(+id);
            
            if(account == null){
                throw new DataNotFoundException();
            }

            let response = new EntityResponse(account, req.url);
            
            let status = HttpStatus.SUCCESS;
            
            return res.status(status).send(response);
        }
        catch(error){
            let status = HttpStatus.INTERNAL_SERVER_ERROR;
            let errorResponse = new ErrorResponse(req.url);
            
            if(error instanceof InvalidArgumentException){
                status = HttpStatus.BAD_REQUEST;
                errorResponse.message = error.message;
            }
            
            if(error instanceof DataNotFoundException){
                status = HttpStatus.NOT_FOUND;
                errorResponse.message = error.message;
            }

            return res.status(status).send(errorResponse);
        }
    }


}
