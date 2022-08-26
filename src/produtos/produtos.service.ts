import { Injectable } from '@nestjs/common';
import { CacheGetService } from 'src/cache/cache-get/cache-get.service';
import { CacheNormalizeService } from 'src/cache/cache-normalize/cache-normalize.service';
import { PostgreSqlService } from 'src/clients/postgree-service/postgree-service.service';
import { ExceptionService } from 'src/exceptions/bad-request-exception/exception.service';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { ProdutoBD } from './entities/IProduto.entity';

@Injectable()
export class ProdutosService {
  constructor(
    private readonly BD :PostgreSqlService,
    private readonly execptions :ExceptionService,
    private readonly cacheGet :CacheGetService,
    private readonly cacheNormalize :CacheNormalizeService
  ){}
  async create(createProdutoDto: CreateProdutoDto) :Promise<ProdutoBD>{
    const quantidade = parseInt(createProdutoDto.quantidade)
    const preco = parseFloat(createProdutoDto.preco)
    const produto :ProdutoBD= await this.BD.produto.create({
      data: {
        codigo: createProdutoDto.codigo,
        nome: createProdutoDto.nome,
        descricao: createProdutoDto.descricao,
        tipo: createProdutoDto.tipo,
        quantidade: quantidade,
        preco: preco
      }
    })
    return produto
  }

 async findAll() :Promise<Array<ProdutoBD>>{
    const produtos :Array<ProdutoBD> = await this.BD.produto.findMany()
    return produtos
  }

  async findOne(codigo :string) :Promise<ProdutoBD>{
    const produto :ProdutoBD = await this.BD.produto.findUniqueOrThrow({
      where:{
        codigo: codigo
      }
    })
    return produto
  }

 async update(updateProdutoDto: UpdateProdutoDto) :Promise<ProdutoBD>{
    const quantidade = parseInt(updateProdutoDto.quantidade)
    const preco = parseFloat(updateProdutoDto.preco)
    const produtoAtualizado =await this.BD.produto.update({
      where: {
          codigo: updateProdutoDto.codigo
      },
      data: {
        nome: updateProdutoDto.nome,
        quantidade: quantidade,
        preco: preco
      }
    }
    )
    return produtoAtualizado
  }

 async remove(codigo: string) :Promise<string>{
    try {
     const produtoRemovido = await this.BD.produto.delete({
        where:{
          codigo:codigo
        }
      })
      const message = `O produto com codigo ${produtoRemovido.codigo} foi removido`
      return message
    } catch (error) {
      if(error.code === 'P2003'){
        this.execptions.throwForbiddenException('','Produto não pode ser Excluido pois pertece a pedidos abertos')
      }
      this.execptions.throwNotFoundException('','Produto não encontrado')
    }
  }
  async retireToCache(id :string){
    try{
    let totalPedido :number = 0
    let arrayProdutos :Array<object>= []
    const cache = await this.cacheGet.get(id)
    const normalizedCache = this.cacheNormalize.cacheStringToObject(cache)
    let element
    for(let i=0;i < normalizedCache.length;i++){
       element = normalizedCache[i]
       let precoProduto = await this.BD.produto.findUnique({
        select:{
          preco: true
        },
        where:{
          codigo: element.codigo
        }
      })
      let {quantidade} = element
      let {preco} = precoProduto
      totalPedido = totalPedido + (preco * quantidade)
      let produto = {
        codigo: element.codigo,
        preco: preco,
        quantidade: quantidade
      }
      arrayProdutos.push(produto)
    }
      const produtos = {
        total: totalPedido,
        produtos: arrayProdutos
      }
      return produtos
  } catch(error){

  }
  }
}
