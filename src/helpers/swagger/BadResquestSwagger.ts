import { BadRequestException } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";

export class BadResquestSwagger{
   @ApiProperty()
   statusCode: number

   @ApiProperty()
   message: string[]

   @ApiProperty()
   error:string
}