import { CanActivate, ExecutionContext } from "@nestjs/common";
import { ExceptionService } from "../../../exceptions/bad-request-exception/exception.service";
declare const CheckClienteAuthenticationGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class CheckClienteAuthenticationGuard extends CheckClienteAuthenticationGuard_base implements CanActivate {
    private exceptions;
    constructor(exceptions: ExceptionService);
    canActivate(context: ExecutionContext): Promise<any>;
}
export {};
