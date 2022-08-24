import {  IsNotEmpty, IsNumber } from "class-validator";
import { CreateProdutoDto } from "src/produtos/dto/create-produto.dto";

export class CreatePedidoDto {
    @IsNumber()
    @IsNotEmpty()
    clientID: number

    @IsNotEmpty()
    produtos: Array<CreateProdutoDto>
}
