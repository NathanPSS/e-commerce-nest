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
    @IsNumberString()
    @ApiProperty()
    quantidade: string
    
    @IsNumberString()
    @IsNotEmpty()
    @ApiProperty()
    preco: string
    

    @IsNotEmpty()
    @IsString()
    descricao:string

    @IsNotEmpty()
    @IsString()
    tipo: string
}
