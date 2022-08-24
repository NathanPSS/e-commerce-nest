import { Controller, Get, Render } from "@nestjs/common";

@Controller('')
export class TemplatesAuthController {
    @Get('signup')
    @Render('cadastro')
    renderCadastro(){

    }
    @Get('signin')
    @Render('login')
    renderLogin(){
        
    }
}