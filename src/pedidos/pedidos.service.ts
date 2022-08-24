import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CacheGetService } from 'src/cache/cache-get/cache-get.service';
import { CacheNormalizeService } from 'src/cache/cache-normalize/cache-normalize.service';
import { CacheSetService } from 'src/cache/cache-set/cache-set.service';
import { PostgreSqlService } from 'src/clients/postgree-service/postgree-service.service';
import { ExceptionService } from 'src/exceptions/bad-request-exception/exception.service';
import { CreateProdutoCacheDto } from 'src/produtos/dto/create-produto-cache.dto';
import { CreateProdutoDto } from 'src/produtos/dto/create-produto.dto';
import ValidateProduto from 'src/produtos/validators/ValidateProduto.service';


@Injectable()
export class PedidosService {
  constructor(
    private readonly BD : PostgreSqlService,
    private readonly cacheSet : CacheSetService,
    private readonly cacheGet : CacheGetService,
    private readonly cacheNormalize :CacheNormalizeService,
    private readonly validateProduto: ValidateProduto,
    private readonly execptions :ExceptionService,
  ){}
  async createByCache(id :string) {
    try{
    let totalPedido :number = 0
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
          id_produto: produto.codigo
        }
      })

    })} catch(error){
    } 
  }
 async createCache(id :string, produto :CreateProdutoCacheDto){
  try{
   await this.validateProduto.validate(produto.codigo)
   const produtoString = JSON.stringify(produto)
   console.log(id,produto)
   await this.cacheSet.set(id,produtoString)
  }catch (error){
    return this.execptions.throwNotFoundException('','Produto não encontrado')
  }
  }
  findAll() {
  }
  async findAllById(id :string){
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
  findOne(id: number) {
    return `This action returns a #${id} pedido`;
  }

  remove(id: number) {
    return `This action removes a #${id} pedido`;
  }
}
