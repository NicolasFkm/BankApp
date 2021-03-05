import { Exception } from "./Exception";

export class InvalidArgumentException extends Exception{
    constructor(args: any){
        super(args);
        this.name = "InvalidArgumentException"
    }
}