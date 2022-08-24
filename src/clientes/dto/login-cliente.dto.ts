import { IsAlphanumeric, IsEmail, IsNotEmpty } from "class-validator"


export class LoginClienteDto{
   @IsEmail()
   @IsNotEmpty()
   email: string

   @IsAlphanumeric()
   @IsNotEmpty()
   password: string
}