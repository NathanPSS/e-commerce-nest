import { Controller, Get, Post, Redirect, Res, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { NotFoundSwagger } from '../../helpers/swagger/NotFoundRequestSwagger';
import { LocalAdminAuthGuard } from './guards/local-admin.guard';

@ApiTags('Admin')
@Controller('admin')
export class AuthAdminController {
    @UseGuards(LocalAdminAuthGuard)
    @ApiOperation({summary: 'Autentica um Admin'})
    @ApiResponse({status: 200,description: 'Admin autenticado'})
    @ApiResponse({status: 400,description: 'Admin não encontrado' , type: NotFoundSwagger})
    @Post('/login')
    @Redirect('http://localhost:3000/admin/produtos')
    login(){}
    

    @ApiOperation({summary: 'Rendeniza o Login do Admin'})
    @ApiResponse({status: 200,description:'Rendizou com sucesso'})
    @Get()
    renderLoginAdmin(@Res() res:Response){
      res.render('loginAdmin')
    }
}
