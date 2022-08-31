import { ExecutionContext, CanActivate } from "@nestjs/common";
declare const LocalAdminAuthGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class LocalAdminAuthGuard extends LocalAdminAuthGuard_base implements CanActivate {
    canActivate(context: ExecutionContext): Promise<boolean>;
}
export {};
