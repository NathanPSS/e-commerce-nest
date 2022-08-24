import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsNumberString } from "class-validator";

export class CreateProdutoCacheDto {
    @ApiProperty()
    @IsNumberString()
    @IsNotEmpty()
    codigo: string;
    
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    quantidade: number;
}