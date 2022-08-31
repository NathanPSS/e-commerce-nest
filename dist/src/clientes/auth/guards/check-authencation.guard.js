"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckClienteAuthenticationGuard = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const exception_service_1 = require("../../../exceptions/bad-request-exception/exception.service");
let CheckClienteAuthenticationGuard = class CheckClienteAuthenticationGuard extends (0, passport_1.AuthGuard)('local-cliente') {
    constructor(exceptions) {
        super();
        this.exceptions = exceptions;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        try {
            if (request.user.cliente === undefined) {
                throw new Error();
            }
        }
        catch (error) {
            this.exceptions.throwUnauthorizedException('', 'Faça o Login no Sistema');
        }
        await super.logIn(request);
        return request.isAuthenticated();
    }
};
CheckClienteAuthenticationGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [exception_service_1.ExceptionService])
], CheckClienteAuthenticationGuard);
exports.CheckClienteAuthenticationGuard = CheckClienteAuthenticationGuard;
//# sourceMappingURL=check-authencation.guard.js.map