import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { CreateClienteDto } from './create-cliente.dto';

export class UpdateClienteDto extends PartialType(CreateClienteDto) {
    @ApiProperty()
    email?: string;
    @ApiProperty()
    telefone?: string
    @ApiProperty()
    nome?: string
    @ApiProperty()
    password ?:string
}
