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
Object.defineProperty(exports, "__esModule", { value: true });
exports.IPedidoBD = void 0;
const swagger_1 = require("@nestjs/swagger");
const ProdutosEmPedido_1 = require("./ProdutosEmPedido");
class IPedidoBD {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], IPedidoBD.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], IPedidoBD.prototype, "clientID", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], IPedidoBD.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], IPedidoBD.prototype, "updateAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: ProdutosEmPedido_1.ProdutosEmPedidos, isArray: true }),
    __metadata("design:type", Array)
], IPedidoBD.prototype, "produtos", void 0);
exports.IPedidoBD = IPedidoBD;
//# sourceMappingURL=IPedidoBD.entity.js.map