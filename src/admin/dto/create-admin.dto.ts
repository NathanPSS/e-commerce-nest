import { isAlphanumeric, IsAlphanumeric, IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from "class-validator"

export class CreateAdminDto {
    @IsString()
    @IsNotEmpty()
    nome: string 
    
    @IsEmail()
    @IsNotEmpty()
    username: string

    @IsAlphanumeric()
    @IsNotEmpty()
    password: string

    @IsString()
    @IsNotEmpty()
    endereco: string

    @IsPhoneNumber('BR')
    @IsNotEmpty()
    telefone: string

}
