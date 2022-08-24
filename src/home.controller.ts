import { Controller, Get, Render } from "@nestjs/common";
import { ApiCreatedResponse, ApiProperty, ApiResponseProperty, ApiTags } from "@nestjs/swagger";
import { ProdutosService } from "./produtos/produtos.service";

@ApiTags('Home')
@Controller('')
export class HomeController {
    constructor(
        private readonly produtosService :ProdutosService
    ){}
    @ApiCreatedResponse({
        description: 'Retorna todos os produtos cadastrados'
    })
    @Get('')
    home(){
        return this.produtosService.findAll()
    }
}