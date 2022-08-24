import { ApiProperty } from "@nestjs/swagger";
import { IsBase64, IsCurrency, IsDecimal, IsHexadecimal, IsNotEmpty, IsNumber, IsNumberString, IsString } from "class-validator";
import { IsNumberOptions } from "class-validator";

export class CreateProdutoDto {
    
    @IsNumberString()
    @IsNotEmpty()
    @ApiProperty()
    codigo:string

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    nome: string
    
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty()
    quantidade: number
    
    @IsNumber({maxDecimalPlaces: 2})
    @IsNotEmpty()
    @ApiProperty()
    preco: number
}
