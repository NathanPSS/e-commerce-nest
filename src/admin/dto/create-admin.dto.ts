import { ApiProperty } from "@nestjs/swagger"
import { isAlphanumeric, IsAlphanumeric, IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from "class-validator"

export class CreateAdminDto {

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    nome: string 
    
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty()
    username: string

    @IsAlphanumeric()
    @IsNotEmpty()
    @ApiProperty()
    password: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    endereco: string

    @IsPhoneNumber('BR')
    @IsNotEmpty()
    @ApiProperty()
    telefone: string

}
