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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiClientesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const clientes_service_1 = require("../../clientes.service");
const create_cliente_dto_1 = require("../../dto/create-cliente.dto");
const update_cliente_dto_1 = require("../../dto/update-cliente.dto");
const iClientBD_entity_1 = require("../../entities/iClientBD.entity");
const BadResquestSwagger_1 = require("../../../helpers/swagger/BadResquestSwagger");
let ApiClientesController = class ApiClientesController {
    constructor(clientesService) {
        this.clientesService = clientesService;
    }
    async create(createClienteDto) {
        return await this.clientesService.create(createClienteDto);
    }
    async findById(id) {
        return await this.clientesService.findOneById(id);
    }
    async findAll() {
        return await this.clientesService.findAll();
    }
    async delete(id) {
        return await this.clientesService.remove(id);
    }
    async update(id, updateCliente) {
        return await this.clientesService.update(id, updateCliente);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Criação de Clientes via API' }),
    (0, swagger_1.ApiResponse)({
        status: 201, description: 'Cliente Criado com sucesso', type: iClientBD_entity_1.IClientBD
    }),
    (0, swagger_1.ApiResponse)({
        status: 400, description: 'Dados Invalidos Passados', type: BadResquestSwagger_1.BadResquestSwagger
    }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_cliente_dto_1.CreateClienteDto]),
    __metadata("design:returntype", Promise)
], ApiClientesController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Recuperação de dados dos Clientes via API' }),
    (0, swagger_1.ApiResponse)({
        status: 200, description: 'Dados do Cliente recuperado com sucesso', type: iClientBD_entity_1.IClientBD
    }),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ApiClientesController.prototype, "findById", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Recupera os dados dos Clientes via API'
    }),
    (0, swagger_1.ApiResponse)({
        status: 200, description: 'Recupera todos os clientes', type: iClientBD_entity_1.IClientBD, isArray: true
    }),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ApiClientesController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Deleta o Cliente' }),
    (0, swagger_1.ApiResponse)({
        status: 200, description: 'Cliente Deletado', type: iClientBD_entity_1.IClientBD
    }),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ApiClientesController.prototype, "delete", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Atualiza a os Dados do Cliente'
    }),
    (0, swagger_1.ApiResponse)({
        status: 200, description: 'Clitente atualizado com sucesso', type: iClientBD_entity_1.IClientBD
    }),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_cliente_dto_1.UpdateClienteDto]),
    __metadata("design:returntype", Promise)
], ApiClientesController.prototype, "update", null);
ApiClientesController = __decorate([
    (0, swagger_1.ApiTags)('Api-Clientes'),
    (0, common_1.Controller)('api/clientes'),
    __metadata("design:paramtypes", [clientes_service_1.ClientesService])
], ApiClientesController);
exports.ApiClientesController = ApiClientesController;
//# sourceMappingURL=api-clientes.controller.js.map