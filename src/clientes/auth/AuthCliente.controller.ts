import { Controller, Post, UseGuards } from "@nestjs/common";
import { LocalClienteAuthGuard } from "./guards/local.guard";


@Controller('clientes')
export class AuthClienteController {
  @UseGuards(LocalClienteAuthGuard)
  @Post('/login')
  login(){}
}