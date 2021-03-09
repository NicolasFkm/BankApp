import { HttpStatus } from '@enumerators/HttpStatus';
import { DataNotFoundException } from '@helpers/errors/DataNotFoundException';
import { InvalidArgumentException } from '@helpers/errors/InvalidArgumentException';
import { IAccount } from '@models/Account';
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
            let { name, password }: { name: string, password: string,}  = req.body;
            
            const account = {name, password} as IAccount;

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
            console.log("ERROR get All: " + error);
            let status = HttpStatus.INTERNAL_SERVER_ERROR;
            let errorResponse = new ErrorResponse(req.url);
            
            if(error instanceof InvalidArgumentException){
                status = HttpStatus.BAD_REQUEST;
                errorResponse.message = error.message;
            }

            return res.status(status).send(errorResponse);
        }
    }

    public getById = async(req: Request, res: Response) : Promise<Response> => {
        try{
            let { id } = req.params;
            
            const account = await this.accountService.getById(+id);
            
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

    public getPayments = async(req: Request, res: Response) : Promise<Response> => {
        try{
            let { id } = req.params;
            
            const payments = await this.accountService.getAccountPaymentsById(+id);
            
            if(payments == undefined || payments.length ==  0){
                throw new DataNotFoundException();
            }

            let response = new EntityCollectionResponse(payments, req.url);
            
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

    public getDeposits = async(req: Request, res: Response) : Promise<Response> => {
        try{
            let { id } = req.params;
            
            const deposits = await this.accountService.getAccountDepositsById(+id);
            
            if(deposits == undefined || deposits.length == 0 ){
                throw new DataNotFoundException();
            }

            let response = new EntityCollectionResponse(deposits, req.url);
            
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

    public getWithdrawals = async(req: Request, res: Response) : Promise<Response> => {
        try{
            let { id } = req.params;
            
            const withdrawals = await this.accountService.getAccountWithdrawalsById(+id);
            
            if(withdrawals == undefined || withdrawals.length == 0){
                throw new DataNotFoundException();
            }

            let response = new EntityCollectionResponse(withdrawals, req.url);
            
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
