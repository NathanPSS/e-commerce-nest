import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CheckClienteAuthenticationApiGuard } from 'src/clientes/auth/guards/check-authencation-api.guard';
import { CheckClienteAuthenticationGuard } from 'src/clientes/auth/guards/check-authencation.guard';
import { ClientesService } from 'src/clientes/clientes.service';
import { CreateClienteDto } from 'src/clientes/dto/create-cliente.dto';
import { UpdateClienteDto } from 'src/clientes/dto/update-cliente.dto';
import { IClientBD } from 'src/clientes/entities/iClientBD.entity';
import { BadResquestSwagger } from 'src/helpers/swagger/BadResquestSwagger';
import { NotFoundSwagger } from 'src/helpers/swagger/NotFoundRequestSwagger';
import { UnauthorizedRequestSwagger } from 'src/helpers/swagger/UnthorizadedSwagger';

@ApiTags('Api-Clientes')
@Controller('api/clientes')
export class ApiClientesController {
   constructor(
    private readonly clientesService :ClientesService
   ){}
   

  @ApiOperation({summary:'Criação de Clientes via API'})
  @ApiResponse({
    status: 201,description:'Cliente Criado com sucesso',type: IClientBD
})
  @ApiResponse({
    status: 400,description:'Dados Invalidos Passados', type:BadResquestSwagger
})
  @Post()
  async create(@Body() createClienteDto:CreateClienteDto) :Promise<IClientBD>{
     return await this.clientesService.create(createClienteDto)     
   }


  @ApiOperation({summary: 'Recuperação de dados dos Clientes via API'})
  @ApiResponse({
    status: 200,description:'Dados do Cliente recuperado com sucesso',type: IClientBD
  })
  @ApiResponse({
    status: 401,description:'Usuario não autenticado',type: UnauthorizedRequestSwagger
  })
  @UseGuards(CheckClienteAuthenticationApiGuard)
  @Get(':id')
  async findById(@Param('id',ParseIntPipe) id:number) :Promise<IClientBD>{
   return await this.clientesService.findOneById(id)
  }

  @ApiOperation({
    summary: 'Recupera os dados dos Clientes via API'
  })
  @ApiResponse({
    status: 200,description:'Recupera todos os clientes', type: IClientBD,isArray:true
  })
  @Get()
  async findAll() :Promise<Array<IClientBD>>{
    return await this.clientesService.findAll()
  }
  @ApiOperation({summary: 'Deleta o Cliente'})
  @ApiResponse({
    status: 200,description:'Cliente Deletado', type: IClientBD
})
@ApiResponse({
    status: 401,description:'Usuario não autenticado',type: UnauthorizedRequestSwagger
  })
  @UseGuards(CheckClienteAuthenticationApiGuard)
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id:number) :Promise<IClientBD>{
    return await this.clientesService.remove(id)
  }



  @UseGuards(CheckClienteAuthenticationApiGuard)
  @ApiOperation({
    summary:'Atualiza a os Dados do Cliente'
  })
  @ApiResponse({
    status: 401,description:'Usuario não autenticado',type: UnauthorizedRequestSwagger
  })
  @ApiResponse({
    status: 200,description:'Clitente atualizado com sucesso', type: IClientBD
  })
  @Patch(':id')
  async update(@Param('id',ParseIntPipe) id:number,@Body() updateCliente:UpdateClienteDto) :Promise<IClientBD>{
    return await this.clientesService.update(id,updateCliente)
  }
}

