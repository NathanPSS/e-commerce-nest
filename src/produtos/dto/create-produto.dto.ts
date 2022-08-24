import { IsBase64, IsCurrency, IsDecimal, IsHexadecimal, IsNotEmpty, IsNumber, IsNumberString, IsString } from "class-validator";
import { IsNumberOptions } from "class-validator";

export class CreateProdutoDto {
    
    @IsNumberString()
    @IsNotEmpty()
    codigo:string

    @IsString()
    @IsNotEmpty()
    nome: string
    
    @IsNotEmpty()
    @IsNumber()
    quantidade: number
    
    @IsNumber({maxDecimalPlaces: 2})
    @IsNotEmpty()
    preco: number
}
