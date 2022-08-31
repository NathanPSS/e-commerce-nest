import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Res, Req, Redirect } from '@nestjs/common';
import { ProdutosService } from './produtos.service';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { CheckAdminAuthenticationGuard } from '../admin/auth-admin/guards/check-admin.guard';
import { ApiBasicAuth, ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProdutoBD, ProdutoId } from './entities/IProduto.entity';
import { UnauthorizedRequestSwagger } from '../helpers/swagger/UnthorizadedSwagger';
import { NotFoundSwagger } from '../helpers/swagger/NotFoundRequestSwagger';
import { Response } from 'express';
import { AdminService } from '../admin/admin.service';
import { urlToHttpOptions } from 'url';

@ApiTags('Admin-Produtos')
@UseGuards(CheckAdminAuthenticationGuard)
@Controller('admin/produtos')
export class ProdutosController {
  constructor(
    private readonly produtosService: ProdutosService,
    private readonly adminService:AdminService
    ) {}

  @ApiOperation({summary: 'Cria um novo produto'})
  @ApiBasicAuth('basic')
  @ApiResponse({status: 201, description:'Produto criado com sucesso', type: ProdutoBD})
  @ApiResponse({status: 401,description:'O administrador não estar logado', type: UnauthorizedRequestSwagger})
  @Post()
  @Redirect('http://localhost:3000/admin/produtos')
  async create(@Body() createProdutoDto: CreateProdutoDto) {
    return await this.produtosService.createByApp(createProdutoDto);
     
  }
  @ApiOperation({summary: 'Rendeniza o Dashboard do Admin'})
  @ApiBasicAuth('basic')
  @ApiResponse({status: 200,description: 'Rendenizado com sucesso'})
  @ApiResponse({status: 401,description:'Admin não logado',type: UnauthorizedRequestSwagger})
  @Get()
 async renderDashboardAdmin(@Res() res:Response,@Req() req:any){
    const id = req.user.admin
    const dataAdmin = await this.adminService.findOneById(+id)
    const produtos = await this.produtosService.findAll()
    res.render('dashBoardAdmin',{dataAdmin:dataAdmin,produtos: produtos})
  }
  
  @ApiBasicAuth('basic')
  @ApiOperation({summary: 'Atualiza os dados do produto'})
  @ApiResponse({status: 200,description:'Produto deletado com sucesso',type: ProdutoBD})
  @ApiResponse({status: 401,description:'O administrador não estar logado', type: UnauthorizedRequestSwagger})
  @ApiResponse({status: 404,description:'Produto não encontrado', type: NotFoundSwagger})
  @Post('/atualiza')
  @Redirect('http://localhost:3000/admin/produtos')
  update(@Body() updateProdutoDto: UpdateProdutoDto) {
    console.log(updateProdutoDto)
    return this.produtosService.update(updateProdutoDto);
  }
  @ApiBasicAuth('basic')
  @ApiOperation({summary: 'Deleta o produto'})
  @ApiResponse({status: 401,description:'O administrador não estar logado', type: UnauthorizedRequestSwagger})
  @ApiResponse({status: 200,description:'Produto atualizado com sucesso'})
  @ApiResponse({status: 404,description:'Produto não encontrado', type:NotFoundSwagger})
  @Post('/deleta')
  @Redirect('http://localhost:3000/admin/produtos')
  async remove(@Body() codigo:ProdutoId) {
    return await this.produtosService.remove(codigo.codigo);
  }
}
