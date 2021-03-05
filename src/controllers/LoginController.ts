import { HttpStatus } from '@enumerators/HttpStatus';
import { InvalidArgumentException } from '@helpers/errors/InvalidArgumentException';
import Login from '@models/Login';
import ErrorResponse from '@models/responses/ErrorResponse';
import StatusResponse from '@models/responses/StatusResponse';
import LoginService from '@services/LoginService';
import { Response, Request } from 'express';

export default class LoginController {

    public loginService: LoginService;

    constructor(){
        this.loginService = new LoginService();
    }

    async postAuthenticate(req: Request, res: Response) : Promise<void> {
        try{
            let { login, ...body}: {login: Login, body: any}  = req.body;
            
            const isAuthenticated = await this.loginService.authenticate(login);
            
            let response = new StatusResponse(req.url, isAuthenticated);
            
            let status = (isAuthenticated)? 
            HttpStatus.SUCCESS: 
            HttpStatus.UNAUTHORIZED;
            
            res.status(status).send(response);
        }
        catch(error){
            let status = HttpStatus.INTERNAL_SERVER_ERROR;
            let errorResponse = new ErrorResponse(req.url);
            errorResponse.message = error.message;
            
            if(error instanceof InvalidArgumentException){
                status = HttpStatus.BAD_REQUEST;
            }

            res.status(status).send(errorResponse);
        }
    }


}
