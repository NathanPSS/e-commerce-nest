import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsString } from 'class-validator';
import { CreateProdutoDto } from './create-produto.dto';

export class UpdateProdutoDto {
    @ApiProperty()
    @IsNumberString()
    codigo:string
    @ApiProperty()
    @IsString()
    nome: string;
    @ApiProperty()
    @IsNumberString()
    quantidade: string;
    @IsNumberString()
    @ApiProperty()
    preco: string;
}
