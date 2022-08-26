import { ExecutionContext, Injectable,CanActivate } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { NextFunction } from "express";


@Injectable()
export class LocalClienteAuthGuard extends AuthGuard('local-cliente') implements CanActivate{
    async canActivate(context: ExecutionContext) {
        
        const result = (await super.canActivate(context)) as boolean
        const request = context.switchToHttp().getRequest()
        await super.logIn(request)
        return result
    }
}