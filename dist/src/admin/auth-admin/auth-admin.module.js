"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthAdminModule = void 0;
const common_1 = require("@nestjs/common");
const hash_module_1 = require("../../hash/hash.module");
const admin_module_1 = require("../admin.module");
const auth_admin_controller_1 = require("./auth-admin.controller");
const LocalAdminStrategy_1 = require("./utils/LocalAdminStrategy");
let AuthAdminModule = class AuthAdminModule {
};
AuthAdminModule = __decorate([
    (0, common_1.Module)({
        controllers: [auth_admin_controller_1.AuthAdminController],
        providers: [LocalAdminStrategy_1.LocalAdminStrategy],
        imports: [admin_module_1.AdminModule, hash_module_1.HashModule]
    })
], AuthAdminModule);
exports.AuthAdminModule = AuthAdminModule;
//# sourceMappingURL=auth-admin.module.js.map