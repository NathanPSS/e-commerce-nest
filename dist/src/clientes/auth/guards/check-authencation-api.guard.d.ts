import { CanActivate, ExecutionContext } from "@nestjs/common";
import { ExceptionService } from "../../../exceptions/bad-request-exception/exception.service";
declare const CheckClienteAuthenticationApiGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class CheckClienteAuthenticationApiGuard extends CheckClienteAuthenticationApiGuard_base implements CanActivate {
    private exceptions;
    constructor(exceptions: ExceptionService);
    canActivate(context: ExecutionContext): Promise<any>;
}
export {};
