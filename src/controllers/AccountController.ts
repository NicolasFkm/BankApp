import { HttpStatus } from '@enumerators/HttpStatus';
import { InvalidArgumentException } from '@helpers/errors/InvalidArgumentException';
import { AccountCreationAttributes } from '@models/Account';
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
            errorResponse.message = error.message;
            
            if(error instanceof InvalidArgumentException){
                status = HttpStatus.BAD_REQUEST;
            }

            return res.status(status).send(errorResponse);
        }
    }


}
