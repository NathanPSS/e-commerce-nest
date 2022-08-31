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
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const postgree_service_service_1 = require("../clients/postgree-service/postgree-service.service");
const exception_service_1 = require("../exceptions/bad-request-exception/exception.service");
const hash_data_service_1 = require("../hash/hash-data/hash-data.service");
let AdminService = class AdminService {
    constructor(BD, encrypt, execptions) {
        this.BD = BD;
        this.encrypt = encrypt;
        this.execptions = execptions;
    }
    async create(createAdminDto) {
        createAdminDto.password = await this.encrypt.hashData(createAdminDto.password, 10);
        const admin = await this.BD.admin.create({
            data: createAdminDto
        });
        return admin;
    }
    findAll() {
        return `This action returns all admin`;
    }
    async findOne(username) {
        try {
            const admin = await this.BD.admin.findUniqueOrThrow({
                where: {
                    username: username
                }
            });
            return admin;
        }
        catch (error) {
            this.execptions.throwNotFoundException('', 'Administrador não encontrado');
        }
    }
    async findOneById(id) {
        try {
            const admin = await this.BD.admin.findUniqueOrThrow({
                where: {
                    id: id
                }
            });
            return admin;
        }
        catch (error) {
            this.execptions.throwNotFoundException('', 'Administrador não encontrado');
        }
    }
    async update(id, updateAdminDto) {
        if (updateAdminDto.password !== undefined) {
            updateAdminDto.password = await this.encrypt.hashData(updateAdminDto.password, 10);
        }
        const updatedAdmin = await this.BD.admin.update({
            where: {
                id: id
            },
            data: updateAdminDto
        });
        return updatedAdmin;
    }
    async remove(id) {
        const removedAdmin = await this.BD.admin.delete({
            where: {
                id: id
            }
        });
        return removedAdmin;
    }
};
AdminService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [postgree_service_service_1.PostgreSqlService,
        hash_data_service_1.HashDataService,
        exception_service_1.ExceptionService])
], AdminService);
exports.AdminService = AdminService;
//# sourceMappingURL=admin.service.js.map