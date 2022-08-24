import { ApiProperty } from "@nestjs/swagger"
import { IsAlphanumeric, IsEmail, IsNotEmpty } from "class-validator"


export class LoginClienteDto{
   @IsEmail()
   @IsNotEmpty()
   @ApiProperty()
   email: string

   @IsAlphanumeric()
   @ApiProperty()
   @IsNotEmpty()
   password: string
}