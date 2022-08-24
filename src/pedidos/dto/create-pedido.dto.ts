import { ApiProperty } from "@nestjs/swagger";
import {  IsNotEmpty, IsNumber } from "class-validator";
import { CreateProdutoDto } from "src/produtos/dto/create-produto.dto";

export class CreatePedidoDto {
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    clientID: number

    @IsNotEmpty()
    @ApiProperty()
    produtos: Array<CreateProdutoDto>
}
