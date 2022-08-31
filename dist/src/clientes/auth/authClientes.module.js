"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthClientesModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const clients_module_1 = require("../../clients/clients.module");
const exceptions_module_1 = require("../../exceptions/exceptions.module");
const hash_module_1 = require("../../hash/hash.module");
const clientes_module_1 = require("../clientes.module");
const check_authencation_guard_1 = require("./guards/check-authencation.guard");
const LocalStrategy_1 = require("./utils/LocalStrategy");
const session_serializer_1 = require("./utils/session.serializer");
let AuthClientesModule = class AuthClientesModule {
};
AuthClientesModule = __decorate([
    (0, common_1.Module)({
        imports: [hash_module_1.HashModule, clients_module_1.ClientsModule, clientes_module_1.ClientesModule, exceptions_module_1.ExceptionsModule, jwt_1.JwtModule.register({}), passport_1.PassportModule],
        controllers: [],
        providers: [LocalStrategy_1.LocalClienteStrategy, check_authencation_guard_1.CheckClienteAuthenticationGuard, session_serializer_1.SessionSerializer]
    })
], AuthClientesModule);
exports.AuthClientesModule = AuthClientesModule;
//# sourceMappingURL=authClientes.module.js.map