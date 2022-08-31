import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsNumber } from "class-validator";
import { CreateProdutoCacheDto } from "../../produtos/dto/create-produto-cache.dto";

export class CreatePedidoApiDto {
   

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    clientID: number
    
    @ApiProperty({
        type: CreateProdutoCacheDto,
        isArray: true
    })
    @IsNotEmpty()
    @IsArray()
    produtos: Array<CreateProdutoCacheDto>
}
