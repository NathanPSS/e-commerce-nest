import { Injectable } from '@nestjs/common';
import { PostgreSqlService } from 'src/clients/postgree-service/postgree-service.service';
import { ExceptionService } from 'src/exceptions/bad-request-exception/exception.service';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { ProdutoBD } from './entities/IProduto.entity';

@Injectable()
export class ProdutosService {
  constructor(
    private readonly BD :PostgreSqlService,
    private readonly execptions :ExceptionService
  ){}
  async create(createProdutoDto: CreateProdutoDto) :Promise<ProdutoBD>{
    const produto :ProdutoBD= await this.BD.produto.create({
      data: createProdutoDto
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

 async update(codigo: string, updateProdutoDto: UpdateProdutoDto) :Promise<ProdutoBD>{
    const produtoAtualizado =await this.BD.produto.update({
      where: {
        codigo: codigo
      },
      data: updateProdutoDto
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
      this.execptions.throwNotFoundException('','Produto não encontrado')
    }
  }
}
