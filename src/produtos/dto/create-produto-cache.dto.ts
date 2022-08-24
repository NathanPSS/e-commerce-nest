import { IsNotEmpty, IsNumber, IsNumberString } from "class-validator";

export class CreateProdutoCacheDto {
    @IsNumberString()
    @IsNotEmpty()
    codigo: string;

    @IsNotEmpty()
    @IsNumber()
    quantidade: number;
}