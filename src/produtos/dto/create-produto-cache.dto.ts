import { ApiProperty } from "@nestjs/swagger";
import { IsAlphanumeric, isAlphanumeric, IsNotEmpty, IsNumber, IsNumberString } from "class-validator";

export class CreateProdutoCacheDto {
    @ApiProperty()
    @IsNumberString()
    @IsNotEmpty()
    codigo: string;
    
    @ApiProperty()
    @IsNotEmpty()
    @IsAlphanumeric()
    quantidade: number;
}
export class ProdutoCodigo {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumberString()
    codigo: string
}