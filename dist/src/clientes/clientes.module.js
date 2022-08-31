"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientesModule = void 0;
const common_1 = require("@nestjs/common");
const clientes_service_1 = require("./clientes.service");
const clientes_controller_1 = require("./clientes.controller");
const clients_module_1 = require("../clients/clients.module");
const hash_module_1 = require("../hash/hash.module");
const pedidos_module_1 = require("../pedidos/pedidos.module");
const exceptions_module_1 = require("../exceptions/exceptions.module");
const produtos_module_1 = require("../produtos/produtos.module");
const api_clientes_controller_1 = require("./controllers/api-clientes/api-clientes.controller");
let ClientesModule = class ClientesModule {
};
ClientesModule = __decorate([
    (0, common_1.Module)({
        imports: [clients_module_1.ClientsModule, pedidos_module_1.PedidosModule, hash_module_1.HashModule, exceptions_module_1.ExceptionsModule, produtos_module_1.ProdutosModule],
        controllers: [clientes_controller_1.ClientesController, api_clientes_controller_1.ApiClientesController],
        providers: [clientes_service_1.ClientesService],
        exports: [clientes_service_1.ClientesService]
    })
], ClientesModule);
exports.ClientesModule = ClientesModule;
//# sourceMappingURL=clientes.module.js.map