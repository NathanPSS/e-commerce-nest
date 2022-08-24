import { ExecutionContext, Injectable,CanActivate } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";

@Injectable()
export class LocalAdminAuthGuard extends AuthGuard('local-admin') implements CanActivate{
    async canActivate(context: ExecutionContext) {
        
        const result = (await super.canActivate(context)) as boolean
        const request = context.switchToHttp().getRequest()

        await super.logIn(request)
        
        return result
    }
}