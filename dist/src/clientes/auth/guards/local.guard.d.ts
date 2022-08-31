import { ExecutionContext, CanActivate } from "@nestjs/common";
declare const LocalClienteAuthGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class LocalClienteAuthGuard extends LocalClienteAuthGuard_base implements CanActivate {
    canActivate(context: ExecutionContext): Promise<boolean>;
}
export {};
