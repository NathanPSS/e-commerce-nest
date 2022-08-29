import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards, Res, Redirect, Render} from '@nestjs/common';
import { Request, Response } from 'express';
import { PedidosService } from 'src/pedidos/pedidos.service';
import { ClientesService } from './clientes.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { LocalClienteAuthGuard } from './auth/guards/local.guard';
import { CheckClienteAuthenticationGuard } from './auth/guards/check-authencation.guard';
import { CreateProdutoCacheDto } from 'src/produtos/dto/create-produto-cache.dto';
import { ApiBasicAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiProperty, ApiResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { ProdutosService } from 'src/produtos/produtos.service';
import { IndexClientBDSwagger } from './swagger/IndexClientBD.swagger';
import { ForbiddenSwagger } from 'src/helpers/swagger/ForbiddenSwagger';
import { BadResquestSwagger } from 'src/helpers/swagger/BadResquestSwagger';
import { LoginClienteDto } from './dto/login-cliente.dto';
import { UnauthorizedRequestSwagger } from 'src/helpers/swagger/UnthorizadedSwagger';
import { NotFoundSwagger } from 'src/helpers/swagger/NotFoundRequestSwagger';
import { IClientBD } from './entities/iClientBD.entity';
import { IPedidoBD } from 'src/pedidos/entities/IPedidoBD.entity';
import { CodigoPedidoDto } from 'src/pedidos/dto/CodigoPedidoDto';



@ApiTags('Clientes')
@Controller('clientes')
export class ClientesController {
  constructor(
    private readonly clientesService: ClientesService,
    private readonly pedidosService :PedidosService,
    private readonly produtosService :ProdutosService
    ) {}

  @ApiOperation({summary: 'Rota para cria clientes'})
  @ApiResponse({status: 201, description: 'Cria um Cliente',type: IndexClientBDSwagger})
  @ApiResponse({status: 403, description: 'Cliente já cadastrado', type: ForbiddenSwagger})
  @ApiResponse({status: 400, description: 'Dados Invalidos', type: BadResquestSwagger})
  @Post()
  @Redirect('http://localhost:3000/clientes/login')
  async create(@Body() createClienteDto: CreateClienteDto) {
    await this.clientesService.create(createClienteDto);
    return 
  }
  


  @ApiOperation({summary: 'Rendeniza o a Pagina de Cadastro'})
  @ApiResponse({status: 200,description: 'Rendenizado com sucesso'})
  @Get()
  renderCadastro(@Res() res:Response){
    return res.render('cadastrar')
  }

  @ApiOperation({summary: 'Rendeniza a Pagina de Login'})
  @ApiResponse({status: 200,description: 'Rendenizado com sucesso'})
  @Get('login')
  renderLogin(@Res() res:Response){
    return res.render('login')
  }

  @UseGuards(LocalClienteAuthGuard)
  @ApiOperation({summary: 'Autentica o Usuario com username e password'})
  @ApiResponse({status: 200,description: 'Usuário Autenticado'})
  @ApiResponse({status:400 ,description: 'Cliente não achado',type: NotFoundSwagger})
  @Post('/login')
  @Redirect('http://localhost:3000/clientes/dashboard')
  login(@Body() loginClienteDto:LoginClienteDto){}

   
  @ApiBasicAuth('basic')
  @ApiOperation({summary: 'Rendeniza o dashboard do usuário'})
  @ApiResponse({status: 200,description: 'Rendenizado com sucesso'})
  @ApiResponse({status: 401, description:'Cliente não logado no sistema',type: UnauthorizedRequestSwagger})
  @UseGuards(CheckClienteAuthenticationGuard)
  @Get('dashboard')
  async renderDashborad(@Req() req:any,@Res() res:Response){
        const dadosCliente = await this.clientesService.findOneById(req.user.cliente)
        const pedidosCliente = await this.pedidosService.findAllByIdCliente(req.user.cliente)
       res.render('dashboard',{dadosCliente: dadosCliente, pedidosCliente: pedidosCliente})
  }

  @ApiBasicAuth('basic')
  @ApiOperation({summary: 'Rendeniza a pagina de Atualizar o Cadastro'})
  @ApiResponse({status: 401, description:'Cliente não logado no sistema',type: UnauthorizedRequestSwagger})
  @ApiResponse({status: 200,description:'Rendenizado com sucesso'})
  @UseGuards(CheckClienteAuthenticationGuard)
  @Get('atualiza')
  async renderClienteAtualiza(@Res() res:Response,@Req() req:any){
  
      const infoCliente = await this.clientesService.findOneById(req.user.cliente)
      return res.render('atualizaCadastroCliente',{infoCliente:infoCliente})
  }

  @ApiBasicAuth('basic')
  @ApiOperation({summary: 'Atualiza os dados do cliente logado'})
  @ApiResponse({status: 401, description:'Cliente não logado no sistema',type: UnauthorizedRequestSwagger})
  @ApiResponse({status: 200, description:'Dados Atualizados com sucesso', type: IClientBD})
  @UseGuards(CheckClienteAuthenticationGuard)
  @Post('/atualiza')
  @Redirect('http://localhost:3000/clientes/dashboard')
  update(@Body() updateClienteDto: UpdateClienteDto,@Req() req:any) {
    const id = req.user.cliente
    return this.clientesService.update(+id, updateClienteDto);
  }

  @ApiBasicAuth('basic')
  @ApiOperation({summary:'Remove o usuario do sistema'})
  @UseGuards(CheckClienteAuthenticationGuard)
  @ApiResponse({status: 401, description:'Cliente não logado no sistema',type: UnauthorizedRequestSwagger})
  @ApiResponse({status: 200, description:'Usuario Removido'})
  @Get('/delete')
  @Redirect('http://localhost:3000')
  remove(@Req() req:any) {
    const id = req.user.cliente
    return this.clientesService.remove(+id);
  }

  @ApiBasicAuth('basic')
  @ApiOperation({summary: 'Rendeniza a pagina dos pedidos'})
  @ApiResponse({status: 401, description:'Cliente não logado no sistema',type: UnauthorizedRequestSwagger})
  @ApiResponse({status: 200,description: 'Rendenizado com sucesso'})
  @UseGuards(CheckClienteAuthenticationGuard)
  @Get('/pedidos')
 async pedidosRender(@Res() res:Response,@Req() req:any){
  console.log(req.user.cliente)
    const produtos = await this.produtosService.retireToCache(req.user.cliente)
    return res.render('pedidos',{produtos:produtos})
  }

  @ApiOperation({summary:'Adiciona produtos ao cache do pedido'})
  @ApiBasicAuth('basic')
  @ApiResponse({status: 401, description:'Cliente não logado no sistema',type: UnauthorizedRequestSwagger})
  @ApiResponse({status: 400, description:'Produto não encontrado',type: NotFoundSwagger})
  @ApiCreatedResponse({description: 'Produtos salvos em cache'})
  @UseGuards(CheckClienteAuthenticationGuard)
  @Post('/pedidos')
  @Redirect('http://localhost:3000/clientes/pedidos')
  pedidosCache(@Body() createProdutoDto :CreateProdutoCacheDto,@Req() req:any){
   return this.pedidosService.createCache(req.user.cliente, createProdutoDto)
  }


  @ApiBasicAuth('basic')
  @ApiOperation({summary: 'Retira o pedido do cache e salva no BD'})
  @ApiResponse({status: 401, description:'Cliente não logado no sistema',type: UnauthorizedRequestSwagger})
  @ApiCreatedResponse({description:'Pedidos Salvos no BD',type: IPedidoBD})
  @UseGuards(CheckClienteAuthenticationGuard)
  @Get('pedidos/fazer_pedidos')
  @Redirect('http://localhost:3000/clientes/dashboard')
 async fazerPedidos(@Req() req:any){
     return this.pedidosService.createByCache(req.user.cliente)
  }
  

  @ApiOperation({summary: 'Deleta o Pedido'})
  @ApiResponse({status: 200,description: 'Pedido Deletado',type: IPedidoBD})
  @ApiResponse({status: 400,description:'Pedido não Encontrado',type:NotFoundSwagger})
  @ApiResponse({status: 401, description:'Cliente não logado no sistema',type: UnauthorizedRequestSwagger})
  @ApiBasicAuth('basic')
  @UseGuards(CheckClienteAuthenticationGuard)
  @Post('/pedidos/deletar')
  @Redirect('http://localhost:3000/clientes/dashboard')
  async deletarPedidos(@Body() idProduto:CodigoPedidoDto){
      return await this.pedidosService.remove(idProduto.id)
  }

}


