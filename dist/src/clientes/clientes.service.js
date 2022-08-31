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
exports.ClientesService = void 0;
const common_1 = require("@nestjs/common");
const postgree_service_service_1 = require("../clients/postgree-service/postgree-service.service");
const exception_service_1 = require("../exceptions/bad-request-exception/exception.service");
const hash_data_service_1 = require("../hash/hash-data/hash-data.service");
let ClientesService = class ClientesService {
    constructor(BD, encrypt, execeptions) {
        this.BD = BD;
        this.encrypt = encrypt;
        this.execeptions = execeptions;
    }
    async create(createClienteDto) {
        const { email, nome, password, telefone } = createClienteDto;
        const hashedPassword = await this.encrypt.hashData(password, 10);
        try {
            const userCreated = await this.BD.cliente.create({
                data: {
                    email: email,
                    telefone: telefone,
                    nome: nome,
                    password: hashedPassword
                }
            });
            return userCreated;
        }
        catch (error) {
            if (error.code == 'P2002') {
                this.execeptions.throwForbiddenException('Email já cadastrado');
            }
        }
    }
    async findAll() {
        const users = await this.BD.cliente.findMany({});
        return users;
    }
    async findOneById(id) {
        try {
            const user = await this.BD.cliente.findUniqueOrThrow({
                where: {
                    id: id
                }
            });
            return user;
        }
        catch (error) {
            console.log(error);
            return this.execeptions.throwNotFoundException();
        }
    }
    async findOneByEmail(email) {
        const user = await this.BD.cliente.findUnique({
            where: {
                email: email
            }
        });
        return user;
    }
    async update(id, updateClienteDto) {
        if (updateClienteDto.password !== undefined) {
            updateClienteDto.password = await this.encrypt.hashData(updateClienteDto.password, 10);
        }
        const clienteAtualizado = await this.BD.cliente.update({
            where: {
                id: id
            },
            data: updateClienteDto
        });
        return clienteAtualizado;
    }
    async remove(id) {
        const removedCliente = await this.BD.cliente.delete({
            where: {
                id: id
            }
        });
        return removedCliente;
    }
};
ClientesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [postgree_service_service_1.PostgreSqlService,
        hash_data_service_1.HashDataService,
        exception_service_1.ExceptionService])
], ClientesService);
exports.ClientesService = ClientesService;
//# sourceMappingURL=clientes.service.js.map