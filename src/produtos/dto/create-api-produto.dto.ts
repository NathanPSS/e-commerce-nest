import { ApiProperty } from "@nestjs/swagger"
import { IsNumberString, IsNotEmpty, IsString, IsNumber } from "class-validator"

export class CreateProdutoApiDto {
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
    
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    preco: number

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    descricao:string

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    tipo: string
}