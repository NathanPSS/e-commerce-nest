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
exports.ApiPedidosController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const NotFoundRequestSwagger_1 = require("../../../helpers/swagger/NotFoundRequestSwagger");
const CreatePedidoDto_1 = require("../../dto/CreatePedidoDto");
const UpdatePedidoDto_1 = require("../../dto/UpdatePedidoDto");
const IPedidoBD_entity_1 = require("../../entities/IPedidoBD.entity");
const pedidos_service_1 = require("../../pedidos.service");
let ApiPedidosController = class ApiPedidosController {
    constructor(pedidosService) {
        this.pedidosService = pedidosService;
    }
    async create(dto) {
        return await this.pedidosService.createByApi(dto);
    }
    async findAll() {
        return await this.pedidosService.findAll();
    }
    async findById(id) {
        return await this.pedidosService.findById(id);
    }
    async delete(id) {
        return await this.pedidosService.remove(id);
    }
    async update(id, dto) {
        return await this.pedidosService.updatePedidoByApi(id, dto);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Cria um novo Pedido via API' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Pedido criado com sucesso', type: IPedidoBD_entity_1.IPedidoBD }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Produto ou Cliente não encontrados', type: NotFoundRequestSwagger_1.NotFoundSwagger }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreatePedidoDto_1.CreatePedidoApiDto]),
    __metadata("design:returntype", Promise)
], ApiPedidosController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Retorna todos os produtos cadastrados' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Produtos retornados com sucesso', type: IPedidoBD_entity_1.IPedidoBD, isArray: true }),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ApiPedidosController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Retorna um pedido especifico fornecendo o id dele' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Pedido Retornado com Sucesso', type: IPedidoBD_entity_1.IPedidoBD }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'O pedido não foi encontrado', type: NotFoundRequestSwagger_1.NotFoundSwagger }),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ApiPedidosController.prototype, "findById", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Deleta um pedido fornercendo o id dele' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Pedido deletado com sucesso', type: IPedidoBD_entity_1.IPedidoBD }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'O pedido não foi encontrado', type: NotFoundRequestSwagger_1.NotFoundSwagger }),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ApiPedidosController.prototype, "delete", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Atualiza um pedido fornecendo o id' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Pedido atualizado com sucesso', type: IPedidoBD_entity_1.IPedidoBD }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'O pedido não foi encontrado', type: NotFoundRequestSwagger_1.NotFoundSwagger }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, UpdatePedidoDto_1.UpdatePedidoApiDto]),
    __metadata("design:returntype", Promise)
], ApiPedidosController.prototype, "update", null);
ApiPedidosController = __decorate([
    (0, swagger_1.ApiTags)('Api-Pedidos'),
    (0, common_1.Controller)('api/pedidos'),
    __metadata("design:paramtypes", [pedidos_service_1.PedidosService])
], ApiPedidosController);
exports.ApiPedidosController = ApiPedidosController;
//# sourceMappingURL=api-pedidos.controller.js.map