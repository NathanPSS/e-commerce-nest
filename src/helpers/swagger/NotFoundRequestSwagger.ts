import { ApiProperty } from "@nestjs/swagger";

export class NotFoundSwagger {
    @ApiProperty()
    statusCode:number

    @ApiProperty()
    error:string
    
    @ApiProperty()
    message:string
}