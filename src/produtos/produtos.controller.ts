import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ProdutosService } from './produtos.service';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { CheckAdminAuthenticationGuard } from 'src/admin/auth-admin/guards/check-admin.guard';

@UseGuards(CheckAdminAuthenticationGuard)
@Controller('admin/produtos')
export class ProdutosController {
  constructor(private readonly produtosService: ProdutosService) {}

  @Post()
  create(@Body() createProdutoDto: CreateProdutoDto) {
    return this.produtosService.create(createProdutoDto);
  }
  @Get()
  findAll() {
    return this.produtosService.findAll();
  }

  @Get(':codigo')
  findOne(@Param('codigo') codigo: string) {
    return this.produtosService.findOne(codigo);
  }

  @Patch(':codigo')
  update(@Param('codigo') codigo: string, @Body() updateProdutoDto: UpdateProdutoDto) {
    return this.produtosService.update(codigo, updateProdutoDto);
  }

  @Delete(':codigo')
  remove(@Param('codigo') codigo: string) {
    return this.produtosService.remove(codigo);
  }
}
