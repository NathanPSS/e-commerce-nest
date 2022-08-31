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
exports.ProdutosController = void 0;
const common_1 = require("@nestjs/common");
const produtos_service_1 = require("./produtos.service");
const create_produto_dto_1 = require("./dto/create-produto.dto");
const update_produto_dto_1 = require("./dto/update-produto.dto");
const check_admin_guard_1 = require("../admin/auth-admin/guards/check-admin.guard");
const swagger_1 = require("@nestjs/swagger");
const IProduto_entity_1 = require("./entities/IProduto.entity");
const UnthorizadedSwagger_1 = require("../helpers/swagger/UnthorizadedSwagger");
const NotFoundRequestSwagger_1 = require("../helpers/swagger/NotFoundRequestSwagger");
const admin_service_1 = require("../admin/admin.service");
let ProdutosController = class ProdutosController {
    constructor(produtosService, adminService) {
        this.produtosService = produtosService;
        this.adminService = adminService;
    }
    async create(createProdutoDto) {
        return await this.produtosService.createByApp(createProdutoDto);
    }
    async renderDashboardAdmin(res, req) {
        const id = req.user.admin;
        const dataAdmin = await this.adminService.findOneById(+id);
        const produtos = await this.produtosService.findAll();
        res.render('dashBoardAdmin', { dataAdmin: dataAdmin, produtos: produtos });
    }
    update(updateProdutoDto) {
        console.log(updateProdutoDto);
        return this.produtosService.update(updateProdutoDto);
    }
    async remove(codigo) {
        return await this.produtosService.remove(codigo.codigo);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Cria um novo produto' }),
    (0, swagger_1.ApiBasicAuth)('basic'),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Produto criado com sucesso', type: IProduto_entity_1.ProdutoBD }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'O administrador não estar logado', type: UnthorizadedSwagger_1.UnauthorizedRequestSwagger }),
    (0, common_1.Post)(),
    (0, common_1.Redirect)('http://localhost:3000/admin/produtos'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_produto_dto_1.CreateProdutoDto]),
    __metadata("design:returntype", Promise)
], ProdutosController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Rendeniza o Dashboard do Admin' }),
    (0, swagger_1.ApiBasicAuth)('basic'),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Rendenizado com sucesso' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Admin não logado', type: UnthorizadedSwagger_1.UnauthorizedRequestSwagger }),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProdutosController.prototype, "renderDashboardAdmin", null);
__decorate([
    (0, swagger_1.ApiBasicAuth)('basic'),
    (0, swagger_1.ApiOperation)({ summary: 'Atualiza os dados do produto' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Produto deletado com sucesso', type: IProduto_entity_1.ProdutoBD }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'O administrador não estar logado', type: UnthorizadedSwagger_1.UnauthorizedRequestSwagger }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Produto não encontrado', type: NotFoundRequestSwagger_1.NotFoundSwagger }),
    (0, common_1.Post)('/atualiza'),
    (0, common_1.Redirect)('http://localhost:3000/admin/produtos'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_produto_dto_1.UpdateProdutoDto]),
    __metadata("design:returntype", void 0)
], ProdutosController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiBasicAuth)('basic'),
    (0, swagger_1.ApiOperation)({ summary: 'Deleta o produto' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'O administrador não estar logado', type: UnthorizadedSwagger_1.UnauthorizedRequestSwagger }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Produto atualizado com sucesso' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Produto não encontrado', type: NotFoundRequestSwagger_1.NotFoundSwagger }),
    (0, common_1.Post)('/deleta'),
    (0, common_1.Redirect)('http://localhost:3000/admin/produtos'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [IProduto_entity_1.ProdutoId]),
    __metadata("design:returntype", Promise)
], ProdutosController.prototype, "remove", null);
ProdutosController = __decorate([
    (0, swagger_1.ApiTags)('Admin-Produtos'),
    (0, common_1.UseGuards)(check_admin_guard_1.CheckAdminAuthenticationGuard),
    (0, common_1.Controller)('admin/produtos'),
    __metadata("design:paramtypes", [produtos_service_1.ProdutosService,
        admin_service_1.AdminService])
], ProdutosController);
exports.ProdutosController = ProdutosController;
//# sourceMappingURL=produtos.controller.js.map