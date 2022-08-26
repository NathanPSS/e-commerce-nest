import { ApiProperty } from "@nestjs/swagger"
import { IsAlphanumeric, IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from "class-validator"


export class CreateClienteDto {
    @IsNotEmpty()
    @IsEmail()
    @ApiProperty()
    email: string

    @IsAlphanumeric()
    @IsNotEmpty()
    @ApiProperty()
    password: string

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    nome: string

    @IsPhoneNumber('BR')
    @ApiProperty()
    telefone: string
}
export class CreateBusaFanDto {
    @ApiProperty()
    email:string
}