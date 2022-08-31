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
exports.AdminController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const UnthorizadedSwagger_1 = require("../helpers/swagger/UnthorizadedSwagger");
const admin_service_1 = require("./admin.service");
const check_admin_guard_1 = require("./auth-admin/guards/check-admin.guard");
const create_admin_dto_1 = require("./dto/create-admin.dto");
const update_admin_dto_1 = require("./dto/update-admin.dto");
const admin_entity_1 = require("./entities/admin.entity");
let AdminController = class AdminController {
    constructor(adminService) {
        this.adminService = adminService;
    }
    create(createAdminDto) {
        return this.adminService.create(createAdminDto);
    }
    update(req, updateAdminDto) {
        const id = req.user.admin;
        return this.adminService.update(+id, updateAdminDto);
    }
    remove(req) {
        const id = req.user.admin;
        return this.adminService.remove(+id);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Cria um Admin' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Criado um Admin', type: admin_entity_1.AdminBD }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_admin_dto_1.CreateAdminDto]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(check_admin_guard_1.CheckAdminAuthenticationGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Atualiza um Admin' }),
    (0, swagger_1.ApiBasicAuth)('basic'),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Admin atualizado com sucesso', type: admin_entity_1.AdminBD }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Admin não logado', type: UnthorizadedSwagger_1.UnauthorizedRequestSwagger }),
    (0, common_1.Get)('update'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_admin_dto_1.UpdateAdminDto]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(check_admin_guard_1.CheckAdminAuthenticationGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Remove um Admin' }),
    (0, swagger_1.ApiBasicAuth)('basic'),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Admin não logado', type: UnthorizadedSwagger_1.UnauthorizedRequestSwagger }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Admin Removido' }),
    (0, common_1.Get)('delete'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "remove", null);
AdminController = __decorate([
    (0, swagger_1.ApiTags)('Admin'),
    (0, common_1.Controller)('admin'),
    __metadata("design:paramtypes", [admin_service_1.AdminService])
], AdminController);
exports.AdminController = AdminController;
//# sourceMappingURL=admin.controller.js.map