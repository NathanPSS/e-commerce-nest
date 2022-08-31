import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { ClientesService } from "../../clientes.service";
import { ExceptionService } from "../../../exceptions/bad-request-exception/exception.service";
import { CompareHashDataService } from "../../../hash/compare-hash-data/compare-hash-data.service";



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
    const user = await this.clientsService.findOneByEmail(username)
    if(user === null){
      return this.exceptions.throwNotFoundException('','Email não cadastrado')
    }
    const result = await this.checkPassword(password,user.password)
    if(!result){
      return this.exceptions.throwNotFoundException('','Usuario ou Senha Errados')
     }
    return  {cliente :user.id}
  }
  private async checkPassword(passsword :string, hash :string) :Promise<boolean>{
      const result = await this.hash.compareHash(passsword,hash)
      return result
  }
}

