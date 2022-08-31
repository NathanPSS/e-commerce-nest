import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ExceptionService } from "../../../exceptions/bad-request-exception/exception.service";



@Injectable()
export class CheckClienteAuthenticationApiGuard extends AuthGuard('local-cliente') implements CanActivate{
    constructor(
        private exceptions : ExceptionService
    ){
        super()
    }
    async canActivate(context: ExecutionContext){
        
        const request = context.switchToHttp().getRequest()
        try{
        const id = request.url.replace(/[^0-9]/g,'')
        const idReq = request.user.cliente.toString()
        if(idReq !== id){
            throw new Error()
        }
    }catch (error){
        this.exceptions.throwUnauthorizedException('','Usuario não encontrado faça o Login no Sistema')
    }
        await super.logIn(request)
        return request.isAuthenticated()
    }
}