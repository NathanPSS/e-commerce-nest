"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProdutosModule = void 0;
const common_1 = require("@nestjs/common");
const produtos_service_1 = require("./produtos.service");
const produtos_controller_1 = require("./produtos.controller");
const exceptions_module_1 = require("../exceptions/exceptions.module");
const ValidateProduto_service_1 = require("./validators/ValidateProduto.service");
const cache_module_1 = require("../cache/cache.module");
const admin_module_1 = require("../admin/admin.module");
const api_produtos_controller_1 = require("./controller/api-produtos/api-produtos.controller");
const postgree_service_service_1 = require("../clients/postgree-service/postgree-service.service");
let ProdutosModule = class ProdutosModule {
};
ProdutosModule = __decorate([
    (0, common_1.Module)({
        imports: [exceptions_module_1.ExceptionsModule, cache_module_1.CacheModuleLocal, admin_module_1.AdminModule],
        controllers: [produtos_controller_1.ProdutosController, api_produtos_controller_1.ApiProdutosController],
        providers: [produtos_service_1.ProdutosService, ValidateProduto_service_1.default, postgree_service_service_1.PostgreSqlService],
        exports: [ValidateProduto_service_1.default, produtos_service_1.ProdutosService]
    })
], ProdutosModule);
exports.ProdutosModule = ProdutosModule;
//# sourceMappingURL=produtos.module.js.map