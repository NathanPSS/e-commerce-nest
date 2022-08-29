import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { NotFoundSwagger } from 'src/helpers/swagger/NotFoundRequestSwagger';
import { CreateProdutoApiDto } from 'src/produtos/dto/create-api-produto.dto';
import { CreateProdutoDto } from 'src/produtos/dto/create-produto.dto';
import { UpdateApiProdutoDto } from 'src/produtos/dto/update-api-produto.dto';
import { ProdutoBD } from 'src/produtos/entities/IProduto.entity';
import { ProdutosService } from 'src/produtos/produtos.service';

@ApiTags('Api-Produtos')
@Controller('api/produtos')
export class ApiProdutosController {
    constructor(
        private readonly produtosService:ProdutosService
    ){}

    @ApiOperation({summary: 'Cria um produto'})
    @ApiResponse({status: 201,description:'Produto criado com sucesso'})
    @Post()
    async create(@Body() createProdutoDto:CreateProdutoApiDto) :Promise<ProdutoBD>{
     return await this.produtosService.createByAPI(createProdutoDto)
    }

    @ApiOperation({summary: 'Retorna um produto fornecendo seu ID'})
    @ApiResponse({status: 200,description:'O produto foi encontrado com sucesso', type:ProdutoBD})
    @ApiResponse({status:404,description:'O produto não foi encontrado',type: NotFoundSwagger})
    @Get(':codigo')
    async findByCodigo(@Param('codigo') codigo:string) :Promise<ProdutoBD>{
     return await this.produtosService.findOne(codigo)
    }

    @ApiOperation({summary:'Retorna todos os produtos cadastrados'})
    @ApiResponse({status: 200,description:'Produtos Retornados com sucesso', type:ProdutoBD, isArray:true})
    @Get()
    async findAll() :Promise<Array<ProdutoBD>>{
        return await this.produtosService.findAll()
    }
    @ApiOperation({summary:'Deleta um produto fornecendo o seu ID'})
    @ApiResponse({status:200 ,description:'Produto encontrado com sucesso',type: ProdutoBD})
    @ApiResponse({status:404,description:'O produto não foi encontrado',type: NotFoundSwagger})
    @Delete(':codigo')
    async delete(@Param('codigo') codigo:string){
        return await this.produtosService.remove(codigo)
    }
    @ApiOperation({summary:'Atualiza um produto'})
    @ApiResponse({status: 200,description: 'O produto foi atualizado com sucesso', type: ProdutoBD})
    @ApiResponse({status:404,description:'O produto não foi encontrado',type: NotFoundSwagger})
    @Patch(':codigo')
    async update(@Param('codigo') codigo:string,@Body() updateProdutoDto:UpdateApiProdutoDto) :Promise<ProdutoBD>{
      return await this.produtosService.updateByApi(codigo,updateProdutoDto)
    }
}
