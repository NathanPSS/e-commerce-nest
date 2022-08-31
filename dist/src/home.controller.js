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
exports.HomeController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const produtos_service_1 = require("./produtos/produtos.service");
let HomeController = class HomeController {
    constructor(produtosService) {
        this.produtosService = produtosService;
    }
    async home(res) {
        const produtos = await this.produtosService.findAll();
        return res.render('home', { produtos: produtos });
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Rendeniza a Home Page' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Rendenizado com Sucesso' }),
    (0, common_1.Get)(''),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], HomeController.prototype, "home", null);
HomeController = __decorate([
    (0, swagger_1.ApiTags)('Home'),
    (0, common_1.Controller)(''),
    __metadata("design:paramtypes", [produtos_service_1.ProdutosService])
], HomeController);
exports.HomeController = HomeController;
//# sourceMappingURL=home.controller.js.map