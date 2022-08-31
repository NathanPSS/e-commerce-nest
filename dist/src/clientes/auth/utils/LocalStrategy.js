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
exports.LocalClienteStrategy = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const passport_local_1 = require("passport-local");
const clientes_service_1 = require("../../clientes.service");
const exception_service_1 = require("../../../exceptions/bad-request-exception/exception.service");
const compare_hash_data_service_1 = require("../../../hash/compare-hash-data/compare-hash-data.service");
let LocalClienteStrategy = class LocalClienteStrategy extends (0, passport_1.PassportStrategy)(passport_local_1.Strategy, 'local-cliente') {
    constructor(clientsService, hash, exceptions) {
        super();
        this.clientsService = clientsService;
        this.hash = hash;
        this.exceptions = exceptions;
    }
    async validate(username, password) {
        const user = await this.clientsService.findOneByEmail(username);
        if (user === null) {
            return this.exceptions.throwNotFoundException('', 'Email não cadastrado');
        }
        const result = await this.checkPassword(password, user.password);
        if (!result) {
            return this.exceptions.throwNotFoundException('', 'Usuario ou Senha Errados');
        }
        return { cliente: user.id };
    }
    async checkPassword(passsword, hash) {
        const result = await this.hash.compareHash(passsword, hash);
        return result;
    }
};
LocalClienteStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [clientes_service_1.ClientesService,
        compare_hash_data_service_1.CompareHashDataService,
        exception_service_1.ExceptionService])
], LocalClienteStrategy);
exports.LocalClienteStrategy = LocalClienteStrategy;
//# sourceMappingURL=LocalStrategy.js.map