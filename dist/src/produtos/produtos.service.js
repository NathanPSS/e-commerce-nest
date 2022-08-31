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
exports.ProdutosService = void 0;
const common_1 = require("@nestjs/common");
const cache_get_service_1 = require("../cache/cache-get/cache-get.service");
const cache_normalize_service_1 = require("../cache/cache-normalize/cache-normalize.service");
const postgree_service_service_1 = require("../clients/postgree-service/postgree-service.service");
const exception_service_1 = require("../exceptions/bad-request-exception/exception.service");
let ProdutosService = class ProdutosService {
    constructor(BD, execptions, cacheGet, cacheNormalize) {
        this.BD = BD;
        this.execptions = execptions;
        this.cacheGet = cacheGet;
        this.cacheNormalize = cacheNormalize;
    }
    async createByApp(createProdutoDto) {
        const quantidade = parseInt(createProdutoDto.quantidade);
        const preco = parseFloat(createProdutoDto.preco);
        const produto = await this.BD.produto.create({
            data: {
                codigo: createProdutoDto.codigo,
                nome: createProdutoDto.nome,
                descricao: createProdutoDto.descricao,
                tipo: createProdutoDto.tipo,
                quantidade: quantidade,
                preco: preco
            }
        });
        return produto;
    }
    async createByAPI(creteProdutoApi) {
        try {
            const produto = await this.BD.produto.create({
                data: creteProdutoApi
            });
            return produto;
        }
        catch (error) {
            const mapedEro = error;
            console.log(mapedEro.message);
            if (error.code === 'P2002') {
                this.execptions.throwForbiddenException('', 'Produto ja cadastrado');
            }
        }
    }
    async findAll() {
        const produtos = await this.BD.produto.findMany();
        return produtos;
    }
    async findOne(codigo) {
        try {
            const produto = await this.BD.produto.findUniqueOrThrow({
                where: {
                    codigo: codigo
                }
            });
            return produto;
        }
        catch (error) {
            this.execptions.throwNotFoundException('');
        }
    }
    async update(updateProdutoDto) {
        const quantidade = parseInt(updateProdutoDto.quantidade);
        const preco = parseFloat(updateProdutoDto.preco);
        const produtoAtualizado = await this.BD.produto.update({
            where: {
                codigo: updateProdutoDto.codigo
            },
            data: {
                nome: updateProdutoDto.nome,
                quantidade: quantidade,
                preco: preco
            }
        });
        return produtoAtualizado;
    }
    async updateByApi(codigo, updateProdutoDto) {
        const produto = await this.BD.produto.update({
            where: {
                codigo: codigo
            },
            data: updateProdutoDto
        });
        return produto;
    }
    async remove(codigo) {
        try {
            const produtoRemovido = await this.BD.produto.delete({
                where: {
                    codigo: codigo
                }
            });
            return produtoRemovido;
        }
        catch (error) {
            if (error.code === 'P2003') {
                this.execptions.throwForbiddenException('', 'Produto não pode ser Excluido pois pertece a pedidos abertos');
            }
            this.execptions.throwNotFoundException('', 'Produto não encontrado');
        }
    }
    async retireToCache(id) {
        try {
            let totalPedido = 0;
            let arrayProdutos = [];
            const cache = await this.cacheGet.get(id);
            if (!cache) {
                throw new Error();
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
                let preco = precoProduto.preco;
                totalPedido = totalPedido + (preco * quantidade);
                let produto = {
                    codigo: element.codigo,
                    preco: preco,
                    quantidade: quantidade
                };
                arrayProdutos.push(produto);
            }
            const produtos = {
                total: totalPedido,
                produtos: arrayProdutos
            };
            return produtos;
        }
        catch (error) {
        }
    }
};
ProdutosService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [postgree_service_service_1.PostgreSqlService,
        exception_service_1.ExceptionService,
        cache_get_service_1.CacheGetService,
        cache_normalize_service_1.CacheNormalizeService])
], ProdutosService);
exports.ProdutosService = ProdutosService;
//# sourceMappingURL=produtos.service.js.map