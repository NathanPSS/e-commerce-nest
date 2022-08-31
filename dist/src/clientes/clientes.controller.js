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
exports.ClientesController = void 0;
const common_1 = require("@nestjs/common");
const pedidos_service_1 = require("../pedidos/pedidos.service");
const clientes_service_1 = require("./clientes.service");
const create_cliente_dto_1 = require("./dto/create-cliente.dto");
const update_cliente_dto_1 = require("./dto/update-cliente.dto");
const local_guard_1 = require("./auth/guards/local.guard");
const check_authencation_guard_1 = require("./auth/guards/check-authencation.guard");
const create_produto_cache_dto_1 = require("../produtos/dto/create-produto-cache.dto");
const swagger_1 = require("@nestjs/swagger");
const produtos_service_1 = require("../produtos/produtos.service");
const IndexClientBD_swagger_1 = require("./swagger/IndexClientBD.swagger");
const ForbiddenSwagger_1 = require("../helpers/swagger/ForbiddenSwagger");
const BadResquestSwagger_1 = require("../helpers/swagger/BadResquestSwagger");
const login_cliente_dto_1 = require("./dto/login-cliente.dto");
const UnthorizadedSwagger_1 = require("../helpers/swagger/UnthorizadedSwagger");
const NotFoundRequestSwagger_1 = require("../helpers/swagger/NotFoundRequestSwagger");
const iClientBD_entity_1 = require("./entities/iClientBD.entity");
const IPedidoBD_entity_1 = require("../pedidos/entities/IPedidoBD.entity");
const CodigoPedidoDto_1 = require("../pedidos/dto/CodigoPedidoDto");
let ClientesController = class ClientesController {
    constructor(clientesService, pedidosService, produtosService) {
        this.clientesService = clientesService;
        this.pedidosService = pedidosService;
        this.produtosService = produtosService;
    }
    async create(createClienteDto) {
        await this.clientesService.create(createClienteDto);
        return;
    }
    renderCadastro(res) {
        return res.render('cadastrar');
    }
    renderLogin(res) {
        return res.render('login');
    }
    login(loginClienteDto) { }
    async renderDashborad(req, res) {
        const dadosCliente = await this.clientesService.findOneById(req.user.cliente);
        const pedidosCliente = await this.pedidosService.findAllByIdCliente(req.user.cliente);
        res.render('dashboard', { dadosCliente: dadosCliente, pedidosCliente: pedidosCliente });
    }
    async renderClienteAtualiza(res, req) {
        const infoCliente = await this.clientesService.findOneById(req.user.cliente);
        return res.render('atualizaCadastroCliente', { infoCliente: infoCliente });
    }
    update(updateClienteDto, req) {
        const id = req.user.cliente;
        return this.clientesService.update(+id, updateClienteDto);
    }
    remove(req) {
        const id = req.user.cliente;
        return this.clientesService.remove(+id);
    }
    async pedidosRender(res, req) {
        console.log(req.user.cliente);
        const produtos = await this.produtosService.retireToCache(req.user.cliente);
        return res.render('pedidos', { produtos: produtos });
    }
    pedidosCache(createProdutoDto, req) {
        return this.pedidosService.createCache(req.user.cliente, createProdutoDto);
    }
    async fazerPedidos(req) {
        return this.pedidosService.createByCache(req.user.cliente);
    }
    async deletarPedidos(idProduto) {
        return await this.pedidosService.remove(idProduto.id);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Rota para cria clientes' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Cria um Cliente', type: IndexClientBD_swagger_1.IndexClientBDSwagger }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Cliente já cadastrado', type: ForbiddenSwagger_1.ForbiddenSwagger }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Dados Invalidos', type: BadResquestSwagger_1.BadResquestSwagger }),
    (0, common_1.Post)(),
    (0, common_1.Redirect)('http://localhost:3000/clientes/login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_cliente_dto_1.CreateClienteDto]),
    __metadata("design:returntype", Promise)
], ClientesController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Rendeniza o a Pagina de Cadastro' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Rendenizado com sucesso' }),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ClientesController.prototype, "renderCadastro", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Rendeniza a Pagina de Login' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Rendenizado com sucesso' }),
    (0, common_1.Get)('login'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ClientesController.prototype, "renderLogin", null);
__decorate([
    (0, common_1.UseGuards)(local_guard_1.LocalClienteAuthGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Autentica o Usuario com username e password' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Usuário Autenticado' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Cliente não achado', type: NotFoundRequestSwagger_1.NotFoundSwagger }),
    (0, common_1.Post)('/login'),
    (0, common_1.Redirect)('http://localhost:3000/clientes/dashboard'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_cliente_dto_1.LoginClienteDto]),
    __metadata("design:returntype", void 0)
], ClientesController.prototype, "login", null);
__decorate([
    (0, swagger_1.ApiBasicAuth)('basic'),
    (0, swagger_1.ApiOperation)({ summary: 'Rendeniza o dashboard do usuário' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Rendenizado com sucesso' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Cliente não logado no sistema', type: UnthorizadedSwagger_1.UnauthorizedRequestSwagger }),
    (0, common_1.UseGuards)(check_authencation_guard_1.CheckClienteAuthenticationGuard),
    (0, common_1.Get)('dashboard'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ClientesController.prototype, "renderDashborad", null);
__decorate([
    (0, swagger_1.ApiBasicAuth)('basic'),
    (0, swagger_1.ApiOperation)({ summary: 'Rendeniza a pagina de Atualizar o Cadastro' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Cliente não logado no sistema', type: UnthorizadedSwagger_1.UnauthorizedRequestSwagger }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Rendenizado com sucesso' }),
    (0, common_1.UseGuards)(check_authencation_guard_1.CheckClienteAuthenticationGuard),
    (0, common_1.Get)('atualiza'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ClientesController.prototype, "renderClienteAtualiza", null);
__decorate([
    (0, swagger_1.ApiBasicAuth)('basic'),
    (0, swagger_1.ApiOperation)({ summary: 'Atualiza os dados do cliente logado' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Cliente não logado no sistema', type: UnthorizadedSwagger_1.UnauthorizedRequestSwagger }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Dados Atualizados com sucesso', type: iClientBD_entity_1.IClientBD }),
    (0, common_1.UseGuards)(check_authencation_guard_1.CheckClienteAuthenticationGuard),
    (0, common_1.Post)('/atualiza'),
    (0, common_1.Redirect)('http://localhost:3000/clientes/dashboard'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_cliente_dto_1.UpdateClienteDto, Object]),
    __metadata("design:returntype", void 0)
], ClientesController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiBasicAuth)('basic'),
    (0, swagger_1.ApiOperation)({ summary: 'Remove o usuario do sistema' }),
    (0, common_1.UseGuards)(check_authencation_guard_1.CheckClienteAuthenticationGuard),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Cliente não logado no sistema', type: UnthorizadedSwagger_1.UnauthorizedRequestSwagger }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Usuario Removido' }),
    (0, common_1.Get)('/delete'),
    (0, common_1.Redirect)('http://localhost:3000'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ClientesController.prototype, "remove", null);
__decorate([
    (0, swagger_1.ApiBasicAuth)('basic'),
    (0, swagger_1.ApiOperation)({ summary: 'Rendeniza a pagina dos pedidos' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Cliente não logado no sistema', type: UnthorizadedSwagger_1.UnauthorizedRequestSwagger }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Rendenizado com sucesso' }),
    (0, common_1.UseGuards)(check_authencation_guard_1.CheckClienteAuthenticationGuard),
    (0, common_1.Get)('/pedidos'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ClientesController.prototype, "pedidosRender", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Adiciona produtos ao cache do pedido' }),
    (0, swagger_1.ApiBasicAuth)('basic'),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Cliente não logado no sistema', type: UnthorizadedSwagger_1.UnauthorizedRequestSwagger }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Produto não encontrado', type: NotFoundRequestSwagger_1.NotFoundSwagger }),
    (0, swagger_1.ApiCreatedResponse)({ description: 'Produtos salvos em cache' }),
    (0, common_1.UseGuards)(check_authencation_guard_1.CheckClienteAuthenticationGuard),
    (0, common_1.Post)('/pedidos'),
    (0, common_1.Redirect)('http://localhost:3000/clientes/pedidos'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_produto_cache_dto_1.CreateProdutoCacheDto, Object]),
    __metadata("design:returntype", void 0)
], ClientesController.prototype, "pedidosCache", null);
__decorate([
    (0, swagger_1.ApiBasicAuth)('basic'),
    (0, swagger_1.ApiOperation)({ summary: 'Retira o pedido do cache e salva no BD' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Cliente não logado no sistema', type: UnthorizadedSwagger_1.UnauthorizedRequestSwagger }),
    (0, swagger_1.ApiCreatedResponse)({ description: 'Pedidos Salvos no BD', type: IPedidoBD_entity_1.IPedidoBD }),
    (0, common_1.UseGuards)(check_authencation_guard_1.CheckClienteAuthenticationGuard),
    (0, common_1.Get)('pedidos/fazer_pedidos'),
    (0, common_1.Redirect)('http://localhost:3000/clientes/dashboard'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ClientesController.prototype, "fazerPedidos", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Deleta o Pedido' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Pedido Deletado', type: IPedidoBD_entity_1.IPedidoBD }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Pedido não Encontrado', type: NotFoundRequestSwagger_1.NotFoundSwagger }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Cliente não logado no sistema', type: UnthorizadedSwagger_1.UnauthorizedRequestSwagger }),
    (0, swagger_1.ApiBasicAuth)('basic'),
    (0, common_1.UseGuards)(check_authencation_guard_1.CheckClienteAuthenticationGuard),
    (0, common_1.Post)('/pedidos/deletar'),
    (0, common_1.Redirect)('http://localhost:3000/clientes/dashboard'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CodigoPedidoDto_1.CodigoPedidoDto]),
    __metadata("design:returntype", Promise)
], ClientesController.prototype, "deletarPedidos", null);
ClientesController = __decorate([
    (0, swagger_1.ApiTags)('Clientes'),
    (0, common_1.Controller)('clientes'),
    __metadata("design:paramtypes", [clientes_service_1.ClientesService,
        pedidos_service_1.PedidosService,
        produtos_service_1.ProdutosService])
], ClientesController);
exports.ClientesController = ClientesController;
//# sourceMappingURL=clientes.controller.js.map