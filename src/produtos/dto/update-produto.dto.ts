import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { CreateProdutoDto } from './create-produto.dto';

export class UpdateProdutoDto extends PartialType(CreateProdutoDto) {
    @ApiProperty()
    nome?: string;
    @ApiProperty()
    quantidade?: number;
    @ApiProperty()
    preco?: number;
}
