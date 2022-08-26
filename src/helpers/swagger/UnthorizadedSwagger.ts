import { ApiProperty } from "@nestjs/swagger"

export class UnauthorizedRequestSwagger{
    @ApiProperty()
    statusCode :number
    
    @ApiProperty()
    message: string
}