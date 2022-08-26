
import { ApiProperty } from "@nestjs/swagger"
import { IsAlphanumeric, IsEmail, IsNotEmpty, IsString } from "class-validator"


export class LoginClienteDto{

   @IsString()
   @IsNotEmpty()
   @ApiProperty()
   username: string
   
   @IsAlphanumeric()
   @IsNotEmpty()
   @ApiProperty()
   password: string
}
