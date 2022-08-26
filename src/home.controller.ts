import { Controller, Get, Render, Res } from "@nestjs/common";
import { ApiCreatedResponse, ApiOperation, ApiProperty, ApiResponse, ApiResponseProperty, ApiTags } from "@nestjs/swagger";
import { Response } from "express";
import { ProdutosService } from "./produtos/produtos.service";

@ApiTags('Home')
@Controller('')
export class HomeController {
    constructor(
        private readonly produtosService :ProdutosService
    ){}
    @ApiOperation({summary: 'Rendeniza a Home Page'})
    @ApiResponse({status: 200,description: 'Rendenizado com Sucesso'})
    @Get('')
    async home(@Res() res:Response){
        const produtos = await this.produtosService.findAll()
        return res.render('home',{produtos:produtos})
    }
}