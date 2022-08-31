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
exports.ApiProdutosController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const NotFoundRequestSwagger_1 = require("../../../helpers/swagger/NotFoundRequestSwagger");
const create_api_produto_dto_1 = require("../../dto/create-api-produto.dto");
const update_api_produto_dto_1 = require("../../dto/update-api-produto.dto");
const IProduto_entity_1 = require("../../entities/IProduto.entity");
const produtos_service_1 = require("../../produtos.service");
let ApiProdutosController = class ApiProdutosController {
    constructor(produtosService) {
        this.produtosService = produtosService;
    }
    async create(createProdutoDto) {
        return await this.produtosService.createByAPI(createProdutoDto);
    }
    async findByCodigo(codigo) {
        return await this.produtosService.findOne(codigo);
    }
    async findAll() {
        return await this.produtosService.findAll();
    }
    async delete(codigo) {
        return await this.produtosService.remove(codigo);
    }
    async update(codigo, updateProdutoDto) {
        return await this.produtosService.updateByApi(codigo, updateProdutoDto);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Cria um produto' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Produto criado com sucesso' }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_api_produto_dto_1.CreateProdutoApiDto]),
    __metadata("design:returntype", Promise)
], ApiProdutosController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Retorna um produto fornecendo seu ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'O produto foi encontrado com sucesso', type: IProduto_entity_1.ProdutoBD }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'O produto não foi encontrado', type: NotFoundRequestSwagger_1.NotFoundSwagger }),
    (0, common_1.Get)(':codigo'),
    __param(0, (0, common_1.Param)('codigo')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ApiProdutosController.prototype, "findByCodigo", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Retorna todos os produtos cadastrados' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Produtos Retornados com sucesso', type: IProduto_entity_1.ProdutoBD, isArray: true }),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ApiProdutosController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Deleta um produto fornecendo o seu ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Produto encontrado com sucesso', type: IProduto_entity_1.ProdutoBD }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'O produto não foi encontrado', type: NotFoundRequestSwagger_1.NotFoundSwagger }),
    (0, common_1.Delete)(':codigo'),
    __param(0, (0, common_1.Param)('codigo')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ApiProdutosController.prototype, "delete", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Atualiza um produto' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'O produto foi atualizado com sucesso', type: IProduto_entity_1.ProdutoBD }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'O produto não foi encontrado', type: NotFoundRequestSwagger_1.NotFoundSwagger }),
    (0, common_1.Patch)(':codigo'),
    __param(0, (0, common_1.Param)('codigo')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_api_produto_dto_1.UpdateApiProdutoDto]),
    __metadata("design:returntype", Promise)
], ApiProdutosController.prototype, "update", null);
ApiProdutosController = __decorate([
    (0, swagger_1.ApiTags)('Api-Produtos'),
    (0, common_1.Controller)('api/produtos'),
    __metadata("design:paramtypes", [produtos_service_1.ProdutosService])
], ApiProdutosController);
exports.ApiProdutosController = ApiProdutosController;
//# sourceMappingURL=api-produtos.controller.js.map