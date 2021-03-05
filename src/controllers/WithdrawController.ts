import { HttpStatus } from '@enumerators/HttpStatus';
import { DataNotFoundException } from '@helpers/errors/DataNotFoundException';
import { InvalidArgumentException } from '@helpers/errors/InvalidArgumentException';
import { WithdrawCreationAttributes } from '@models/Withdraw';
import EntityResponse from '@models/responses/EntityResponse';
import ErrorResponse from '@models/responses/ErrorResponse';
import WithdrawService from '@services/WithdrawService';
import { Response, Request } from 'express';

export default class WithdrawController {

    public withdrawService: WithdrawService;

    constructor() {
        this.withdrawService = new WithdrawService();
    }

    public postCreate = async (req: Request, res: Response): Promise<Response> => {
        try {
            let { value }: { value: number } = req.body;

            const withdraw = { value } as WithdrawCreationAttributes;

            const createdWithdraw = await this.withdrawService.create(withdraw);

            let response = new EntityResponse(createdWithdraw, req.url);

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
            
            const account = await this.withdrawService.getById(+id);
            
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
