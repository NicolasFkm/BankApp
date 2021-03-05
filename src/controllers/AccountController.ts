import { HttpStatus } from '@enumerators/HttpStatus';
import { InvalidArgumentException } from '@helpers/errors/InvalidArgumentException';
import { AccountCreationAttributes } from '@models/Account';
import EntityCollectionResponse from '@models/responses/EntityCollectionResponse';
import EntityResponse from '@models/responses/EntityResponse';
import ErrorResponse from '@models/responses/ErrorResponse';
import AccountService from '@services/AccountService';
import { Response, Request } from 'express';

export default class AccountController {

    public accountService: AccountService;

    constructor(){
        this.accountService = new AccountService();;
    }

    public postCreate = async(req: Request, res: Response) : Promise<Response> => {
        try{
            let { name, accountNumber, password }: { name: string, accountNumber: number, password: string,}  = req.body;
            
            const account = {name, accountNumber, password} as AccountCreationAttributes;

            const createdAccount = await this.accountService.create(account);
            
            let response = new EntityResponse(createdAccount, req.url);
            
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

            return res.status(status).send(errorResponse);
        }
    }
    
    public getAll = async(req: Request, res: Response) : Promise<Response> => {
        try{
            const createdAccount = await this.accountService.getAll();
            
            let response = new EntityCollectionResponse(createdAccount, req.url);
            
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

            return res.status(status).send(errorResponse);
        }
    }


}
