import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";

import { Strategy } from "passport-local";
import { ClientesService } from "src/clientes/clientes.service";
import { LoginClienteDto } from "src/clientes/dto/login-cliente.dto";
import { ExceptionService } from "src/exceptions/bad-request-exception/exception.service";
import { CompareHashDataService } from "src/hash/compare-hash-data/compare-hash-data.service";



@Injectable()
export class LocalClienteStrategy extends PassportStrategy(Strategy,'local-cliente'){
  constructor(
    private clientsService :ClientesService,
    private hash :CompareHashDataService,
    private exceptions :ExceptionService
  ){
    super()
  }
  async validate(username : string,password :string) :Promise<any>{
    // Sem DTO no parametro pois a função precisa obrigatoriamente dos parametros username e password
    const dto : LoginClienteDto = {
      email: username,
      password: password
    }
    const user = await this.clientsService.findOne(dto.email)
    const result = await this.checkPassword(dto.password,user.password)
    if(!result){
      return this.exceptions.throwUnauthorizedException('','Usuario ou Senha Errados')
     }
    
    return  {cliente :user.id.toString()}
  }
  private async checkPassword(passsword :string, hash :string) :Promise<boolean>{
      const result = await this.hash.compareHash(passsword,hash)
      return result
  }
}

