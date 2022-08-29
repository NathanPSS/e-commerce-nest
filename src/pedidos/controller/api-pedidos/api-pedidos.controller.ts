import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { NotFoundSwagger } from 'src/helpers/swagger/NotFoundRequestSwagger';
import { CreatePedidoApiDto } from 'src/pedidos/dto/CreatePedidoDto';
import { UpdatePedidoApiDto } from 'src/pedidos/dto/UpdatePedidoDto';
import { IPedidoBD } from 'src/pedidos/entities/IPedidoBD.entity';
import { PedidosService } from 'src/pedidos/pedidos.service';


@ApiTags('Api-Pedidos')
@Controller('api/pedidos')
export class ApiPedidosController {
    constructor(
        private pedidosService :PedidosService
    ){}
    @ApiOperation({summary: 'Cria um novo Pedido via API'})
    @ApiResponse({status: 201,description:'Pedido criado com sucesso',type: IPedidoBD})
    @ApiResponse({status: 404,description:'Produto ou Cliente não encontrados',type: NotFoundSwagger})
    @Post()
    async create(@Body() dto:CreatePedidoApiDto){
        return await this.pedidosService.createByApi(dto)
    }
    @ApiOperation({summary:'Retorna todos os produtos cadastrados'})
    @ApiResponse({status: 200,description:'Produtos retornados com sucesso',type: IPedidoBD,isArray: true})
    @Get()
    async findAll(){
        return await this.pedidosService.findAll()
    }
    @ApiOperation({summary: 'Retorna um pedido especifico fornecendo o id dele'})
    @ApiResponse({status: 200,description:'Pedido Retornado com Sucesso',type: IPedidoBD})
    @ApiResponse({status: 404,description:'O pedido não foi encontrado',type:NotFoundSwagger})
    @Get(':id')
    async findById(@Param('id',ParseIntPipe) id:number){
        return await this.pedidosService.findById(id)
    }

    @ApiOperation({summary:'Deleta um pedido fornercendo o id dele'})
    @ApiResponse({status: 200,description:'Pedido deletado com sucesso',type:IPedidoBD})
    @ApiResponse({status: 404,description:'O pedido não foi encontrado',type:NotFoundSwagger})
    @Delete(':id')
    async delete(@Param('id') id:string){
        return await this.pedidosService.remove(id)
    }
    @Patch(':id')
    @ApiOperation({summary:'Atualiza um pedido fornecendo o id'})
    @ApiResponse({status: 200,description:'Pedido atualizado com sucesso',type: IPedidoBD})
    @ApiResponse({status: 404,description:'O pedido não foi encontrado',type:NotFoundSwagger})
    async update(@Param('id',ParseIntPipe) id:number,@Body() dto:UpdatePedidoApiDto){
        return await this.pedidosService.updatePedidoByApi(id,dto)
    }
}
