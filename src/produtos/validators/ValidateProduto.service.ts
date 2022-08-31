import { Injectable } from "@nestjs/common";
import { PostgreSqlService } from '../../clients/postgree-service/postgree-service.service';


@Injectable()
export default class ValidateProduto {
    constructor(
        private readonly BD :PostgreSqlService
    ){}
    async validate(codigo :string) :Promise<void>{
     const isValid = await this.BD.produto.count({
        where:{
            codigo: codigo
        }
     })
     if(isValid !== 1){
        throw new Error()
     }
    }
}