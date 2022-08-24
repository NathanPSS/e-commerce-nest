import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";

import { Strategy } from "passport-local";
import { AdminService } from "src/admin/admin.service";
import { ClientesService } from "src/clientes/clientes.service";
import { LoginClienteDto } from "src/clientes/dto/login-cliente.dto";
import { ExceptionService } from "src/exceptions/bad-request-exception/exception.service";
import { CompareHashDataService } from "src/hash/compare-hash-data/compare-hash-data.service";



@Injectable()
export class LocalAdminStrategy extends PassportStrategy(Strategy,'local-admin'){
  constructor(
    private adminService :AdminService,
    private hash :CompareHashDataService,
    private exceptions :ExceptionService
  ){
    super()
  }
  async validate(username : string,password :string) :Promise<any>{
    const user = await this.adminService.findOne(username)
    const result = await this.checkPassword(password,user.password)
    if(!result){
      return this.exceptions.throwUnauthorizedException('','Email ou Senha do Administrador Errados Tente Novamente')
     }
    return  {admin :user.id.toString()}
  }
  private async checkPassword(passsword :string, hash :string) :Promise<boolean>{
      const result = await this.hash.compareHash(passsword,hash)
      return result
  }
}

