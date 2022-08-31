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
exports.AuthAdminController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const NotFoundRequestSwagger_1 = require("../../helpers/swagger/NotFoundRequestSwagger");
const local_admin_guard_1 = require("./guards/local-admin.guard");
let AuthAdminController = class AuthAdminController {
    login() { }
    renderLoginAdmin(res) {
        res.render('loginAdmin');
    }
};
__decorate([
    (0, common_1.UseGuards)(local_admin_guard_1.LocalAdminAuthGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Autentica um Admin' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Admin autenticado' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Admin não encontrado', type: NotFoundRequestSwagger_1.NotFoundSwagger }),
    (0, common_1.Post)('/login'),
    (0, common_1.Redirect)('http://localhost:3000/admin/produtos'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AuthAdminController.prototype, "login", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Rendeniza o Login do Admin' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Rendizou com sucesso' }),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthAdminController.prototype, "renderLoginAdmin", null);
AuthAdminController = __decorate([
    (0, swagger_1.ApiTags)('Admin'),
    (0, common_1.Controller)('admin')
], AuthAdminController);
exports.AuthAdminController = AuthAdminController;
//# sourceMappingURL=auth-admin.controller.js.map