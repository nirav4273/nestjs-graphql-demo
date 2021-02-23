import { HttpException } from "@nestjs/common";

export class CustomResponse{
    msg: string;
    success: boolean;
    data: any;

    constructor(response: IResponse){
        this.msg = response.msg;
        this.success = response.success;        
        this.data = response.data;
    }
}

interface IResponse{
    msg: string;
    success: boolean;
    data?: any;
    code?: number;
}

interface IErrorResponse{
    msg: string;
    code?: number;
}

export class CustomErrorResponse extends HttpException{
    msg: string;
    
    constructor(res: IErrorResponse) {
        super({
            msg: res.msg,
            success: false
        }, res.code)
    }
}
