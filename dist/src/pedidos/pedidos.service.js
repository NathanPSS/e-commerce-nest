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
exports.PedidosService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const runtime_1 = require("@prisma/client/runtime");
const cache_del_service_1 = require("../cache/cache-del/cache-del.service");
const cache_get_service_1 = require("../cache/cache-get/cache-get.service");
const cache_normalize_service_1 = require("../cache/cache-normalize/cache-normalize.service");
const cache_set_service_1 = require("../cache/cache-set/cache-set.service");
const postgree_service_service_1 = require("../clients/postgree-service/postgree-service.service");
const exception_service_1 = require("../exceptions/bad-request-exception/exception.service");
const ValidateProduto_service_1 = require("../produtos/validators/ValidateProduto.service");
let PedidosService = class PedidosService {
    constructor(BD, cacheSet, cacheGet, cacheNormalize, cacheDelete, validateProduto, execptions) {
        this.BD = BD;
        this.cacheSet = cacheSet;
        this.cacheGet = cacheGet;
        this.cacheNormalize = cacheNormalize;
        this.cacheDelete = cacheDelete;
        this.validateProduto = validateProduto;
        this.execptions = execptions;
    }
    async createByCache(id) {
        try {
            let totalPedido = 0;
            const cache = await this.cacheGet.get(id);
            if (!cache) {
                throw new Error;
            }
            const normalizedCache = this.cacheNormalize.cacheStringToObject(cache);
            let element;
            for (let i = 0; i < normalizedCache.length; i++) {
                element = normalizedCache[i];
                let precoProduto = await this.BD.produto.findUniqueOrThrow({
                    select: {
                        preco: true
                    },
                    where: {
                        codigo: element.codigo
                    }
                });
                let { quantidade } = element;
                let { preco } = precoProduto;
                totalPedido = totalPedido + (preco * quantidade);
            }
            const codPedido = Math.floor(10000 * (Math.random() + 1));
            const idNumber = parseInt(id);
            const pedido = await this.BD.pedido.create({
                data: {
                    clientID: idNumber,
                    id: codPedido,
                    total: totalPedido
                }
            });
            normalizedCache.forEach(async (produto) => {
                await this.BD.produtos_em_pedidos.create({
                    data: {
                        id_pedido: codPedido,
                        id_produto: produto.codigo,
                        quantidadeEmPedido: parseInt(produto.quantidade)
                    }
                });
                await this.cacheDelete.del(id);
            });
        }
        catch (error) {
        }
    }
    async createByApi(createPedidoApiDto) {
        try {
            await this.BD.cliente.findUniqueOrThrow({
                where: {
                    id: createPedidoApiDto.clientID
                }
            });
        }
        catch (error) {
            if (error instanceof runtime_1.NotFoundError) {
                return this.execptions.throwNotFoundException('Cliente Inexistente', 'Coloque um id no campo clienteID valido');
            }
        }
        try {
            const codPedido = Math.floor(10000 * (Math.random() + 1));
            let totalPedido = 0;
            let element;
            for (let i = 0; i < createPedidoApiDto.produtos.length; i++) {
                element = createPedidoApiDto.produtos[i];
                let precoProduto = await this.BD.produto.findUniqueOrThrow({
                    select: {
                        preco: true
                    },
                    where: {
                        codigo: element.codigo
                    }
                });
                let { quantidade } = element;
                let { preco } = precoProduto;
                totalPedido = totalPedido + (preco * quantidade);
            }
            const pedido = await this.BD.pedido.create({
                data: {
                    id: codPedido,
                    total: totalPedido,
                    clientID: createPedidoApiDto.clientID
                }
            });
            let produtos = [];
            for (let i = 0; i < createPedidoApiDto.produtos.length; i++) {
                element = createPedidoApiDto.produtos[i];
                let produto = await this.BD.produtos_em_pedidos.create({
                    data: {
                        id_pedido: codPedido,
                        id_produto: element.codigo,
                        quantidadeEmPedido: element.quantidade
                    }
                });
                produtos.push(produto);
            }
            const pedidoBD = {
                pedido: pedido,
                produtos: produtos
            };
            return pedidoBD;
        }
        catch (error) {
            if (error instanceof runtime_1.NotFoundError) {
                return this.execptions.throwNotFoundException('Produto não encontrado', 'Verifique o codigo do produto');
            }
        }
    }
    async createCache(id, produto) {
        try {
            await this.validateProduto.validate(produto.codigo);
            const produtoString = JSON.stringify(produto);
            await this.cacheSet.set(id, produtoString);
        }
        catch (error) {
            return this.execptions.throwNotFoundException('', 'Produto não encontrado');
        }
    }
    async findAll() {
        const allPedidos = await this.BD.pedido.findMany();
        for (let i = 0; i < allPedidos.length; i++) {
            let element = allPedidos[i];
            let produtos = await this.BD.produtos_em_pedidos.findMany({
                where: {
                    id_pedido: element.id
                }
            });
            allPedidos[i]["produtos"] = produtos;
        }
        return allPedidos;
    }
    async findAllByIdCliente(id) {
        const idNumber = parseInt(id);
        let pedidos = [];
        const allClientePedidos = await this.BD.pedido.findMany({
            select: {
                id: true,
                total: true,
            },
            where: {
                clientID: idNumber
            }
        });
        for (let i = 0; i < allClientePedidos.length; i++) {
            let codigoPedido = allClientePedidos[i].id;
            let rows = await this.BD.$queryRaw(client_1.Prisma.sql `
          SELECT nome
          FROM produto,pedido,produtos_em_pedidos
          WHERE produtos_em_pedidos.id_pedido = ${codigoPedido} and produtos_em_pedidos.id_produto=produto.codigo GROUP BY nome`);
            let { id, total } = allClientePedidos[i];
            pedidos.push({
                id: id,
                total: total,
                produtos: rows
            });
        }
        return pedidos;
    }
    async findById(id) {
        try {
            const pedido = await this.BD.pedido.findUniqueOrThrow({
                where: {
                    id: id
                }
            });
            const produto = await this.BD.produtos_em_pedidos.findMany({
                where: {
                    id_pedido: id
                }
            });
            pedido["produtos"] = produto;
            return pedido;
        }
        catch (error) {
            if (error instanceof runtime_1.NotFoundError) {
                return this.execptions.throwNotFoundException('Pedido não encontrado', 'Verifique novamente o codigo do pedido');
            }
        }
    }
    async remove(id) {
        try {
            const idNumber = parseInt(id);
            const removedPedido = await this.BD.pedido.delete({
                where: {
                    id: idNumber
                }
            });
            return removedPedido;
        }
        catch (error) {
            console.log(error);
            if (error.code === 'P2025') {
                return this.execptions.throwNotFoundException('', 'Pedido não encontrado');
            }
        }
    }
    async updatePedidoByApi(id, updatePedidoDto) {
        try {
            const pedidoAtualizado = await this.BD.pedido.update({
                where: {
                    id: id
                },
                data: {
                    clientID: updatePedidoDto.clientID
                }
            });
            let totalPedido = 0;
            let produtosAtt = [];
            if (updatePedidoDto.produtos !== undefined) {
                for (let i = 0; i < updatePedidoDto.produtos.length; i++) {
                    let produto = await this.BD.produto.findUniqueOrThrow({
                        where: {
                            codigo: updatePedidoDto.produtos[i].codigo
                        }
                    });
                    let produtos = await this.BD.produtos_em_pedidos.update({
                        where: {
                            id_pedido_id_produto: {
                                id_pedido: pedidoAtualizado.id,
                                id_produto: produto.codigo
                            }
                        },
                        data: {
                            id_pedido: pedidoAtualizado.id,
                            id_produto: produto.codigo,
                            quantidadeEmPedido: produto.quantidade
                        }
                    });
                    produtosAtt.push(produtos);
                    totalPedido = totalPedido + (updatePedidoDto.produtos[i].quantidade * produto.preco);
                }
                const pedidoFinal = await this.BD.pedido.update({
                    where: {
                        id: id
                    },
                    data: {
                        total: totalPedido
                    }
                });
                pedidoFinal["produtos"] = produtosAtt;
                return pedidoFinal;
            }
        }
        catch (error) {
            if (error instanceof runtime_1.NotFoundError) {
                return this.execptions.throwNotFoundException('Produto não encontrado no pedido', 'Verifique o codigo do produto');
            }
        }
    }
};
PedidosService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [postgree_service_service_1.PostgreSqlService,
        cache_set_service_1.CacheSetService,
        cache_get_service_1.CacheGetService,
        cache_normalize_service_1.CacheNormalizeService,
        cache_del_service_1.CacheDelService,
        ValidateProduto_service_1.default,
        exception_service_1.ExceptionService])
], PedidosService);
exports.PedidosService = PedidosService;
//# sourceMappingURL=pedidos.service.js.map