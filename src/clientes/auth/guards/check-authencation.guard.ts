import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ExceptionService } from "src/exceptions/bad-request-exception/exception.service";



@Injectable()
export class CheckClienteAuthenticationGuard extends AuthGuard('local-cliente') implements CanActivate{
    constructor(
        private exceptions : ExceptionService
    ){
        super()
    }
    async canActivate(context: ExecutionContext){
        const request = context.switchToHttp().getRequest()
        try{
        if(request.user.cliente === undefined){
            throw new Error()
        }
    }catch (error){
        this.exceptions.throwUnauthorizedException('','Faça o Login no Sistema')
    }
        await super.logIn(request)
        return request.isAuthenticated()
    }
}