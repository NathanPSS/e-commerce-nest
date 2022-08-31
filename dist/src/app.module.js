"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const pedidos_module_1 = require("./pedidos/pedidos.module");
const clientes_module_1 = require("./clientes/clientes.module");
const produtos_module_1 = require("./produtos/produtos.module");
const clients_module_1 = require("./clients/clients.module");
const config_1 = require("@nestjs/config");
const hash_module_1 = require("./hash/hash.module");
const cache_module_1 = require("./cache/cache.module");
const authClientes_module_1 = require("./clientes/auth/authClientes.module");
const admin_module_1 = require("./admin/admin.module");
const auth_admin_module_1 = require("./admin/auth-admin/auth-admin.module");
const home_controller_1 = require("./home.controller");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            pedidos_module_1.PedidosModule,
            clientes_module_1.ClientesModule,
            produtos_module_1.ProdutosModule,
            clients_module_1.ClientsModule,
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            hash_module_1.HashModule,
            cache_module_1.CacheModuleLocal,
            authClientes_module_1.AuthClientesModule,
            auth_admin_module_1.AuthAdminModule,
            admin_module_1.AdminModule,
        ],
        controllers: [home_controller_1.HomeController],
        providers: [],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map