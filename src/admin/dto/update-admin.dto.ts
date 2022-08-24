import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { CreateAdminDto } from './create-admin.dto';

export class UpdateAdminDto extends PartialType(CreateAdminDto) {
    @ApiProperty()
    nome?: string;
    @ApiProperty()
    username?: string;
    @ApiProperty()
    password?: string;
    @ApiProperty()
    endereco?: string;
    @ApiProperty()
    telefone?: string;
}
