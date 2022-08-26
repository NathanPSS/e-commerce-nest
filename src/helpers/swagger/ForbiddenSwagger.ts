import { ApiProperty } from "@nestjs/swagger";

export class ForbiddenSwagger {
    @ApiProperty()
    statusCode: number

    @ApiProperty()
    message: string
}