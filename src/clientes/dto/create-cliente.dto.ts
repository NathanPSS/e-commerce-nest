import { IsAlphanumeric, IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from "class-validator"

export class CreateClienteDto {
    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsAlphanumeric()
    @IsNotEmpty()
    password: string

    @IsNotEmpty()
    @IsString()
    nome: string

    @IsPhoneNumber('BR')
    telefone: string
}
