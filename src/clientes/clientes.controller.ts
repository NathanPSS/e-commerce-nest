import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards} from '@nestjs/common';
import { Request } from 'express';
import { PedidosService } from 'src/pedidos/pedidos.service';
import { ClientesService } from './clientes.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { isDefined } from 'class-validator';
import { CacheNormalizeService } from 'src/cache/cache-normalize/cache-normalize.service';
import { LocalClienteAuthGuard } from './auth/guards/local.guard';
import { CheckClienteAuthenticationGuard } from './auth/guards/check-authencation.guard';
import { CreateProdutoCacheDto } from 'src/produtos/dto/create-produto-cache.dto';
import { ApiCreatedResponse, ApiProperty, ApiTags } from '@nestjs/swagger';


@ApiTags('Clientes')
@Controller('clientes')
export class ClientesController {
  constructor(
    private readonly clientesService: ClientesService,
    private readonly pedidosService :PedidosService,
    ) {}

  @Post()
  create(@Body() createClienteDto: CreateClienteDto) {
    return this.clientesService.create(createClienteDto);
  }
  @UseGuards(LocalClienteAuthGuard)
  @Post('/login')
  login(){}


  @UseGuards(CheckClienteAuthenticationGuard)
  @Patch()
  update(@Body() updateClienteDto: UpdateClienteDto,@Req() req:any) {
    const id = req.user.cliente
    return this.clientesService.update(+id, updateClienteDto);
  }
  @UseGuards(CheckClienteAuthenticationGuard)
  @ApiCreatedResponse({
    description: 'Pega pega o id do cliente contido na request e o remove do banco'
  })
  @Delete()
  remove(@Req() req:any) {
    const id = req.user.cliente
    return this.clientesService.remove(+id);
  }
  @ApiCreatedResponse({
    description: 'Lista os Pedidos dos Clientes'
  })
  @UseGuards(CheckClienteAuthenticationGuard)
  @Get('/pedidos')
  pedidos(@Req() req:any){
   return this.pedidosService.findAllById(req.user.cliente)
  }
  @ApiCreatedResponse({
    description: 'Adiciona produtos ao Cache da Aplicação'
  })
  @UseGuards(CheckClienteAuthenticationGuard)
  @Post('/pedidos')
  pedidosCache(@Body() createProdutoDto :CreateProdutoCacheDto,@Req() req:any){
   return this.pedidosService.createCache(req.user.cliente, createProdutoDto)
  }
  @ApiCreatedResponse({
    description: 'Pega o cache e salva no Postgree'
  })
  @UseGuards(CheckClienteAuthenticationGuard)
  @Get('pedidos/fazer_pedidos')
  fazerPedidos(@Req() req:any){
     return this.pedidosService.createByCache(req.user.cliente)
  }
}
