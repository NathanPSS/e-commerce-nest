"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PedidosModule = void 0;
const common_1 = require("@nestjs/common");
const pedidos_service_1 = require("./pedidos.service");
const cache_module_1 = require("../cache/cache.module");
const api_pedidos_controller_1 = require("./controller/api-pedidos/api-pedidos.controller");
const clients_module_1 = require("../clients/clients.module");
const ValidateProduto_service_1 = require("../produtos/validators/ValidateProduto.service");
let PedidosModule = class PedidosModule {
};
PedidosModule = __decorate([
    (0, common_1.Module)({
        imports: [cache_module_1.CacheModuleLocal, clients_module_1.ClientsModule],
        controllers: [api_pedidos_controller_1.ApiPedidosController],
        providers: [pedidos_service_1.PedidosService, ValidateProduto_service_1.default],
        exports: [pedidos_service_1.PedidosService]
    })
], PedidosModule);
exports.PedidosModule = PedidosModule;
//# sourceMappingURL=pedidos.module.js.map