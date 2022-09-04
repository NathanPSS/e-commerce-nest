import { Injectable } from '@nestjs/common';
import { CacheGetService } from '../cache/cache-get/cache-get.service'
import { CacheNormalizeService } from '../cache/cache-normalize/cache-normalize.service'
import { PostgreSqlService } from '../clients/postgree-service/postgree-service.service'
import { ExceptionService } from '../exceptions/bad-request-exception/exception.service'
import { CreateProdutoApiDto } from './dto/create-api-produto.dto';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateApiProdutoDto } from './dto/update-api-produto.dto';
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
  async createByApp(createProdutoDto: CreateProdutoDto) :Promise<ProdutoBD>{
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
  async createByAPI(creteProdutoApi :CreateProdutoApiDto) :Promise<ProdutoBD>{
    try{
    const produto :ProdutoBD = await this.BD.produto.create({
      data:creteProdutoApi
    })
    return produto
    }
  catch (error) {
    const mapedEro = error
    console.log(mapedEro.message)
    if(error.code === 'P2002'){
      this.execptions.throwForbiddenException('','Produto ja cadastrado')
    }
  }
  }
 async findAll() :Promise<ProdutoBD[]>{
    const produtos :Array<ProdutoBD> = await this.BD.produto.findMany()
    
    return produtos
  }

  async findOne(codigo :string) :Promise<ProdutoBD>{
    try{
    const produto :ProdutoBD = await this.BD.produto.findUniqueOrThrow({
      where:{
        codigo: codigo
      }
    })
    return produto
  }catch(error){
   this.execptions.throwNotFoundException('',)
  }
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
async updateByApi(codigo :string, updateProdutoDto :UpdateApiProdutoDto) :Promise<ProdutoBD>{
  const produto = await this.BD.produto.update({
    where:{
      codigo: codigo
    },
    data:updateProdutoDto
  })
  return produto
}
 async remove(codigo: string) :Promise<ProdutoBD>{
    try {
     const produtoRemovido = await this.BD.produto.delete({
        where:{
          codigo:codigo
        }
      })
      return produtoRemovido
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
    if(!cache){
      throw new Error()
    }
    
    const normalizedCache = this.cacheNormalize.cacheStringToObject(cache)
    let element
    for(let i=0;i < normalizedCache.length;i++){
       element = normalizedCache[i]
       let precoProduto = await this.BD.produto.findUniqueOrThrow({
        select:{
          preco: true
        },
        where:{
          codigo: element.codigo
        }
      })
      let {quantidade} = element
      let preco = precoProduto.preco
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
