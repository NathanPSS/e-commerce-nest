import { Injectable } from '@nestjs/common';
import { prisma, Prisma, } from '@prisma/client';
import { NotFoundError } from '@prisma/client/runtime';
import { concatWith } from 'rxjs';

import { CacheDelService } from '../cache/cache-del/cache-del.service';
import { CacheGetService } from '../cache/cache-get/cache-get.service';
import { CacheNormalizeService } from '../cache/cache-normalize/cache-normalize.service'
import { CacheSetService } from '../cache/cache-set/cache-set.service'
import { PostgreSqlService } from '../clients/postgree-service/postgree-service.service'
import { ExceptionService } from '../exceptions/bad-request-exception/exception.service'
import { CreateProdutoCacheDto } from 'src/produtos/dto/create-produto-cache.dto';

import ValidateProduto from '../produtos/validators/ValidateProduto.service'
import { CreatePedidoApiDto } from './dto/CreatePedidoDto';
import { UpdatePedidoApiDto } from './dto/UpdatePedidoDto';


@Injectable()
export class PedidosService {
  constructor(
    private readonly BD : PostgreSqlService,
    private readonly cacheSet : CacheSetService,
    private readonly cacheGet : CacheGetService,
    private readonly cacheNormalize :CacheNormalizeService,
    private readonly cacheDelete :CacheDelService,
    private readonly validateProduto: ValidateProduto,
    private readonly execptions :ExceptionService,
  ){}
  async createByCache(id :string) {
    try{
    let totalPedido :number = 0
    const cache = await this.cacheGet.get(id)
    if(!cache){
      throw new Error
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
      let {preco} = precoProduto
      totalPedido = totalPedido + (preco * quantidade)
    }
    const codPedido = Math.floor(10000 * (Math.random()+1))
    const idNumber = parseInt(id)
    const pedido = await this.BD.pedido.create({
      data:{
        clientID: idNumber,
        id: codPedido,
        total: totalPedido
      }
    })
    normalizedCache.forEach(async (produto :any) =>{
      await this.BD.produtos_em_pedidos.create({
        data:{
          id_pedido: codPedido,
          id_produto: produto.codigo,
          quantidadeEmPedido: parseInt(produto.quantidade)
        }
      })
      await this.cacheDelete.del(id)
    })} catch(error){
    } 
  }
  async createByApi(createPedidoApiDto:CreatePedidoApiDto){
    try{
    await this.BD.cliente.findUniqueOrThrow({
      where:{
        id: createPedidoApiDto.clientID
      }
    })
  } catch(error){
    if(error instanceof NotFoundError){
      return this.execptions.throwNotFoundException('Cliente Inexistente','Coloque um id no campo clienteID valido')
    }
  }
  try{
    const codPedido = Math.floor(10000 * (Math.random()+1))
    let totalPedido :number = 0
    let element
    for(let i=0;i < createPedidoApiDto.produtos.length;i++){
       element = createPedidoApiDto.produtos[i]
       let precoProduto = await this.BD.produto.findUniqueOrThrow({
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
    }
    const pedido = await this.BD.pedido.create({
      data:{
        id: codPedido,
        total: totalPedido,
        clientID: createPedidoApiDto.clientID
      }
    })
    let produtos :Array<object> =[]
   for(let i = 0; i < createPedidoApiDto.produtos.length; i++){
    element = createPedidoApiDto.produtos[i]
    let produto = await this.BD.produtos_em_pedidos.create({
      data:{
        id_pedido: codPedido,
        id_produto: element.codigo,
        quantidadeEmPedido: element.quantidade
      }
    })
     produtos.push(produto)
   }
   const pedidoBD = {
    pedido: pedido,
    produtos: produtos
   }
   return pedidoBD
  }catch (error){
    if(error instanceof NotFoundError){
      return this.execptions.throwNotFoundException('Produto não encontrado','Verifique o codigo do produto')
    }
  }
  }
 async createCache(id :string, produto :CreateProdutoCacheDto){
  try{
   await this.validateProduto.validate(produto.codigo)
   const produtoString = JSON.stringify(produto)
   await this.cacheSet.set(id,produtoString)
  }catch (error){
    return this.execptions.throwNotFoundException('','Produto não encontrado')
  }
  }
  async findAll() {
    const allPedidos = await this.BD.pedido.findMany()
    for(let i =0; i < allPedidos.length; i++){
      let element = allPedidos[i]
      let produtos = await this.BD.produtos_em_pedidos.findMany({
        where:{
          id_pedido: element.id
        }
      })
      allPedidos[i]["produtos"] = produtos
    }
    return allPedidos
  }
  async findAllByIdCliente(id :string){
    const idNumber = parseInt(id)
    let pedidos :Array<object> = []
    const allClientePedidos = await this.BD.pedido.findMany({
      select:{
      id: true,
      total: true,
      },
      where:{
        clientID: idNumber
      }
    })
    for(let i=0; i < allClientePedidos.length; i++){
        let codigoPedido = allClientePedidos[i].id
        let rows :any= await this.BD.$queryRaw(
          Prisma.sql`
          SELECT nome
          FROM produto,pedido,produtos_em_pedidos
          WHERE produtos_em_pedidos.id_pedido = ${codigoPedido} and produtos_em_pedidos.id_produto=produto.codigo GROUP BY nome`
        )
        let {id,total}=allClientePedidos[i]
         pedidos.push({
          id:id,
          total:total,
          produtos: rows
         })
    }
    return pedidos
  }
async findById(id :number){
  try{
    const pedido = await this.BD.pedido.findUniqueOrThrow({
      where:{
        id:id
      }
    })
    const produto = await this.BD.produtos_em_pedidos.findMany({
      where:{
        id_pedido: id
      }
    })
    pedido["produtos"] = produto
    return pedido
  }catch(error){
    if(error instanceof NotFoundError){
      return this.execptions.throwNotFoundException('Pedido não encontrado','Verifique novamente o codigo do pedido')
    }
    
  }
}
  async remove(id: string) {
    try{
    const idNumber = parseInt(id)
    const removedPedido = await this.BD.pedido.delete({
    where:{
      id:idNumber
    }
    })
    return removedPedido
  } catch(error) {
    console.log(error)
    if(error.code === 'P2025'){
    return  this.execptions.throwNotFoundException('','Pedido não encontrado')
    }
  }
}
async updatePedidoByApi(id :number,updatePedidoDto :UpdatePedidoApiDto){
  try{
  const pedidoAtualizado = await this.BD.pedido.update({
    where:{
      id:id
    },
    data:{
      clientID:updatePedidoDto.clientID
    }
  })
  let totalPedido = 0
  let produtosAtt :Array<object> = []
  if(updatePedidoDto.produtos !== undefined){
  for(let i = 0; i < updatePedidoDto.produtos.length ; i++){

    let produto = await this.BD.produto.findUniqueOrThrow({
      where:{
        codigo: updatePedidoDto.produtos[i].codigo
      }
    })
    let produtos = await this.BD.produtos_em_pedidos.update({
      where:{
        id_pedido_id_produto:{
          id_pedido: pedidoAtualizado.id,
          id_produto: produto.codigo
        }
      },
      data:{
        id_pedido:pedidoAtualizado.id,
        id_produto:produto.codigo,
        quantidadeEmPedido: produto.quantidade
      }
    })
    produtosAtt.push(produtos)
    totalPedido = totalPedido + (updatePedidoDto.produtos[i].quantidade * produto.preco)
  }
  const pedidoFinal = await this.BD.pedido.update({
    where: {
      id: id
    },
    data:{
      total: totalPedido
    }
  })
  pedidoFinal["produtos"] = produtosAtt
  return pedidoFinal
}
} catch(error) {
  if(error instanceof NotFoundError){
    return this.execptions.throwNotFoundException('Produto não encontrado no pedido','Verifique o codigo do produto')
  }
}
}
}